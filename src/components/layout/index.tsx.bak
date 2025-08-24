import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Features from '@/components/features';
import Pricing from '@/components/pricing';
import BackendStatus from '@/components/backendstatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      
      {/* System Status Section */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <BackendStatus />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
