import { Card, CardContent } from '@/components/ui/card';
import { Zap, Brain, Wand2, Rocket, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Generation',
    description: 'Advanced AI models create stunning videos from simple text prompts in seconds.',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate professional-quality videos in under 30 seconds with our optimized pipeline.',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Wand2,
    title: 'Smart Templates',
    description: 'Pre-built templates for viral content, social media, and marketing campaigns.',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Rocket,
    title: 'Viral Optimization',
    description: 'Built-in algorithms optimize your content for maximum engagement and reach.',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Multi-language support and cultural adaptation for worldwide audiences.',
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance and data encryption.',
    gradient: 'from-indigo-500 to-indigo-600'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Content Creators
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to create, optimize, and scale your video content with cutting-edge AI technology.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
