import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Layers, Users, CreditCard, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "AI-Powered Video Generation",
    desc: "Instantly create short-form videos from your text and audio scripts.",
    icon: Zap,
  },
  {
    title: "Extensive Media Library",
    desc: "Access our vast library of stock images, video clips, and sound effects.",
    icon: Layers,
  },
  {
    title: "User Authentication & Teams",
    desc: "Collaborate with your team members with secure user accounts.",
    icon: Users,
  },
  {
    title: "Stripe Subscription Payments",
    desc: "Simple and secure billing for individuals and teams.",
    icon: CreditCard,
  },
  {
    title: "Email Notifications",
    desc: "Stay updated with real-time project notifications.",
    icon: Mail,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              AI-Powered Video Generation
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Transform your text and voice into engaging short-form videos for
              any platform.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button className="btn-primary px-6 py-3 text-sm">
                Start a Free Trial
              </Button>
              <Link
                to="/pricing"
                className="text-sm text-muted-foreground underline"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-semibold mb-6">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <Card
                  key={idx}
                  className="bg-card border-surface border-border"
                >
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-md bg-primary text-primary-foreground">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {f.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
