import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import BackendStatus from '@/components/BackendStatus';
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
