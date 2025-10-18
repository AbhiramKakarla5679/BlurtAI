import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>Introduction</h2>
            <p>
              ChemBlur ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our application.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We collect information that you provide directly to us:</p>
            <ul>
              <li>Email address (for account creation and authentication)</li>
              <li>Full name (optional, for personalization)</li>
              <li>Password (encrypted and never stored in plain text)</li>
            </ul>

            <h3>Usage Data</h3>
            <p>We automatically collect certain information when you use ChemBlur:</p>
            <ul>
              <li>Your blur submissions and answers</li>
              <li>Scores and performance metrics</li>
              <li>Sections viewed and practiced</li>
              <li>Usage patterns and preferences</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your blur submissions and calculate scores</li>
              <li>Track your progress and provide performance analytics</li>
              <li>Generate personalized spaced repetition recommendations</li>
              <li>Send important updates about the service (if you opt-in)</li>
              <li>Respond to your comments and questions</li>
            </ul>

            <h2>Data Storage and Security</h2>
            <p>
              Your data is stored securely using industry-standard encryption. We use Supabase for data storage,
              which provides enterprise-grade security including:
            </p>
            <ul>
              <li>Data encryption in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Secure authentication protocols</li>
              <li>Automatic backups</li>
            </ul>

            <h2>Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              only in the following circumstances:
            </p>
            <ul>
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>In connection with a business transfer (acquisition, merger, etc.)</li>
            </ul>

            <h2>Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Update or correct your information</li>
              <li>Delete your submissions (via Settings)</li>
              <li>Request account deletion</li>
              <li>Opt out of non-essential communications</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide you services.
              You can delete your submissions at any time from the Settings page. If you request account deletion,
              we will remove your data within 30 days.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              ChemBlur is intended for students aged 13 and above. If you are under 13, please do not use our services
              without parental consent. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us via the Contact page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
