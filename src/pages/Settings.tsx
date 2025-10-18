import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Trash2, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface Profile {
  full_name: string | null;
}

interface Settings {
  timer_enabled: boolean;
  notifications_enabled: boolean;
  theme: 'light' | 'dark' | 'system';
}

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({ full_name: "" });
  const [settings, setSettings] = useState<Settings>({ 
    timer_enabled: true, 
    notifications_enabled: true,
    theme: 'system'
  });
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const applyTheme = () => {
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      } else if (settings.theme === 'light') {
        document.documentElement.classList.remove('dark');
        setDarkMode(false);
      } else {
        // system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
          setDarkMode(true);
        } else {
          document.documentElement.classList.remove('dark');
          setDarkMode(false);
        }
      }
    };
    
    applyTheme();
  }, [settings.theme]);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    setUserId(user.id);

    const { data: profileData } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
    }

    const { data: settingsData } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (settingsData) {
      const theme = settingsData.theme as 'light' | 'dark' | 'system';
      setSettings({
        timer_enabled: settingsData.timer_enabled,
        notifications_enabled: settingsData.notifications_enabled,
        theme: theme || 'system',
      });
    }

    setLoading(false);
  };

  const updateProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: profile.full_name })
      .eq("id", userId);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated!");
    }
  };

  const updateSettings = async (key: keyof Settings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    const { error } = await supabase
      .from("user_settings")
      .update({ [key]: value, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    if (error) {
      toast.error("Failed to update settings");
    } else {
      toast.success("Settings updated!");
    }
  };

  const updateTheme = async (newTheme: 'light' | 'dark') => {
    const themeValue = newTheme;
    const newSettings = { ...settings, theme: themeValue };
    setSettings(newSettings);

    const { error } = await supabase
      .from("user_settings")
      .update({ theme: themeValue, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    if (error) {
      toast.error("Failed to update theme");
    } else {
      toast.success("Theme updated!");
    }
  };

  const handleThemeToggle = (checked: boolean) => {
    updateTheme(checked ? 'dark' : 'light');
  };

  const updatePassword = async () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error("Failed to update password");
    } else {
      toast.success("Password updated!");
      setNewPassword("");
    }
  };

  const deleteAllSubmissions = async () => {
    if (!confirm("Are you sure you want to delete all your submissions? This cannot be undone.")) {
      return;
    }

    const { error } = await supabase
      .from("submissions")
      .delete()
      .eq("user_id", userId);

    if (error) {
      toast.error("Failed to delete submissions");
    } else {
      toast.success("All submissions deleted");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.full_name || ""}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                />
              </div>
              <Button onClick={updateProfile}>Update Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button onClick={updatePassword} disabled={!newPassword}>
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="timer">Enable Timer</Label>
                  <p className="text-sm text-muted-foreground">
                    Show timer during blur exercises
                  </p>
                </div>
                <Switch
                  id="timer"
                  checked={settings.timer_enabled}
                  onCheckedChange={(checked) => updateSettings("timer_enabled", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive review reminders
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notifications_enabled}
                  onCheckedChange={(checked) => updateSettings("notifications_enabled", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle dark/light theme
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <Switch
                    id="darkMode"
                    checked={darkMode}
                    onCheckedChange={handleThemeToggle}
                  />
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={deleteAllSubmissions}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete All Submissions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
