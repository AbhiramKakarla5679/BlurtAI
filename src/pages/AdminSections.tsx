import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Section {
  id: string;
  title: string;
  spec_tag: string;
  level: string;
  learning_objectives: string[];
  content: string;
  keywords: string[];
}

const AdminSections = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    spec_tag: "",
    level: "Foundation",
    learning_objectives: "",
    content: "",
    keywords: "",
  });

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    const hasAdmin = roles?.some(r => r.role === "admin");
    
    if (!hasAdmin) {
      toast.error("Access denied. Admin only.");
      navigate("/dashboard");
      return;
    }

    setIsAdmin(true);
    await fetchSections();
    setLoading(false);
  };

  const fetchSections = async () => {
    const { data } = await supabase
      .from("sections")
      .select("*")
      .order("spec_tag");
    
    if (data) setSections(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sectionData = {
      title: formData.title,
      spec_tag: formData.spec_tag,
      level: formData.level,
      learning_objectives: formData.learning_objectives.split("\n").filter(s => s.trim()),
      content: formData.content,
      keywords: formData.keywords.split(",").map(k => k.trim()).filter(k => k),
    };

    if (editing) {
      const { error } = await supabase
        .from("sections")
        .update(sectionData)
        .eq("id", editing);

      if (error) {
        toast.error("Failed to update section");
      } else {
        toast.success("Section updated!");
        setEditing(null);
        resetForm();
        fetchSections();
      }
    } else {
      const { error } = await supabase
        .from("sections")
        .insert(sectionData);

      if (error) {
        toast.error("Failed to create section");
      } else {
        toast.success("Section created!");
        resetForm();
        fetchSections();
      }
    }
  };

  const handleEdit = (section: Section) => {
    setEditing(section.id);
    setFormData({
      title: section.title,
      spec_tag: section.spec_tag,
      level: section.level,
      learning_objectives: section.learning_objectives.join("\n"),
      content: section.content,
      keywords: section.keywords.join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    const { error } = await supabase
      .from("sections")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete section");
    } else {
      toast.success("Section deleted");
      fetchSections();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      spec_tag: "",
      level: "Foundation",
      learning_objectives: "",
      content: "",
      keywords: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Section Editor</h1>
          <p className="text-muted-foreground">Create and manage chemistry sections</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editing ? "Edit Section" : "Create New Section"}</CardTitle>
            <CardDescription>Fill in the details below. Use Markdown for content.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spec_tag">Spec Tag</Label>
                  <Input
                    id="spec_tag"
                    placeholder="e.g. 4.1.1"
                    value={formData.spec_tag}
                    onChange={(e) => setFormData({ ...formData, spec_tag: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Foundation">Foundation</SelectItem>
                    <SelectItem value="Higher">Higher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objectives">Learning Objectives (one per line)</Label>
                <Textarea
                  id="objectives"
                  value={formData.learning_objectives}
                  onChange={(e) => setFormData({ ...formData, learning_objectives: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown supported)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Textarea
                  id="keywords"
                  placeholder="atom, protons, electrons, nucleus"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">
                  {editing ? "Update Section" : "Create Section"}
                </Button>
                {editing && (
                  <Button type="button" variant="outline" onClick={() => { setEditing(null); resetForm(); }}>
                    Cancel Edit
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Existing Sections</h2>
          {sections.map((section) => (
            <Card key={section.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{section.spec_tag}</Badge>
                      <Badge variant={section.level === "Higher" ? "default" : "secondary"}>
                        {section.level}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.learning_objectives.length} objectives • {section.keywords.length} keywords
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(section)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(section.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSections;
