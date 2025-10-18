import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing and using ChemBlur, you agree to be bound by these Terms of Service and all applicable
              laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily access and use ChemBlur for personal, non-commercial educational
              purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2>User Accounts</h2>
            <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>

            <h2>Content and Intellectual Property</h2>
            <h3>Our Content</h3>
            <p>
              The service and its original content (excluding user submissions), features, and functionality are and
              will remain the exclusive property of ChemBlur. The chemistry content is aligned with AQA GCSE
              Chemistry specifications but is independently created.
            </p>

            <h3>Your Content</h3>
            <p>
              You retain ownership of your blur submissions. By using ChemBlur, you grant us a license to store,
              process, and analyze your submissions to provide scoring and analytics services.
            </p>

            <h2>Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Upload any malicious code or harmful material</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Share your account with others</li>
            </ul>

            <h2>Service Availability</h2>
            <p>
              We strive to provide reliable service but do not guarantee that ChemBlur will be available at all times.
              We may modify, suspend, or discontinue any part of the service at any time without notice.
            </p>

            <h2>Educational Disclaimer</h2>
            <p>
              ChemBlur is a study aid and should be used alongside official AQA resources and guidance from qualified
              teachers. While we align our content with AQA specifications, we are not affiliated with or endorsed by AQA.
              We make no guarantees about exam results.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              ChemBlur and its contributors shall not be liable for any damages arising from the use or inability to
              use the service, including but not limited to direct, indirect, incidental, punitive, and consequential
              damages.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes
              by posting the new Terms of Service on this page. Continued use of the service after changes constitutes
              acceptance of the new terms.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason,
              including if you breach these Terms. Upon termination, your right to use the service will immediately cease.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of England and Wales,
              without regard to its conflict of law provisions.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us via the Contact page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
