import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Pricing</h1>
        <p className="text-muted-foreground mb-8">
          Choose a plan that fits your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card border-surface border-border">
            <CardHeader>
              <CardTitle>Freemium</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                $0<span className="text-sm text-muted-foreground">/month</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Limited video generation</li>
                <li>Basic media library access</li>
              </ul>
              <div className="mt-6">
                <Button className="btn-primary">Start for Free</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-surface border-border">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                $XX<span className="text-sm text-muted-foreground">/month</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Unlimited video generation</li>
                <li>Full media library access</li>
                <li>Team collaboration</li>
                <li>Priority support</li>
              </ul>
              <div className="mt-6">
                <Button className="btn-primary">Start Pro</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
