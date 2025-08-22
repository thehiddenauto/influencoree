import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Wand2, 
  Upload, 
  Palette, 
  Music, 
  Video, 
  Sparkles,
  Clock,
  Eye,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar';

const CreateVideo = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('input'); // input, generating, preview
  const [formData, setFormData] = useState({
    prompt: '',
    style: '',
    duration: '',
    aspect: '',
    voiceover: false
  });
  const { toast } = useToast();

  const videoStyles = [
    { id: 'cinematic', name: 'Cinematic', description: 'Professional movie-like quality' },
    { id: 'animated', name: 'Animated', description: 'Colorful cartoon style' },
    { id: 'realistic', name: 'Realistic', description: 'Photorealistic footage' },
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple design' },
    { id: 'retro', name: 'Retro', description: 'Vintage 80s/90s aesthetic' },
    { id: 'corporate', name: 'Corporate', description: 'Professional business style' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = async () => {
    if (!formData.prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please describe what video you want to create.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setCurrentStep('generating');
    setGenerationProgress(0);

    try {
      // Simulate video generation progress
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setCurrentStep('preview');
            setIsGenerating(false);
            toast({
              title: "Video generated!",
              description: "Your AI-powered video is ready for preview.",
            });
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // TODO: Implement actual video generation API
      console.log('Generating video with:', formData);

    } catch (error) {
      setIsGenerating(false);
      setCurrentStep('input');
      toast({
        title: "Generation failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderInputStep = () => (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Describe Your Video
          </CardTitle>
          <CardDescription>
            Tell our AI what kind of video you want to create
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Video Description</Label>
            <Textarea
              id="prompt"
              placeholder="A modern tech startup founder explaining their innovative SaaS product in a sleek office environment..."
              value={formData.prompt}
              onChange={(e) => handleInputChange('prompt', e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Be specific about scenes, actions, and mood for best results
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Visual Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {videoStyles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => handleInputChange('style', style.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    formData.style === style.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-border/80'
                  }`}
                >
                  <h4 className="font-medium text-sm">{style.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Video Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15s">15 seconds</SelectItem>
                  <SelectItem value="30s">30 seconds</SelectItem>
                  <SelectItem value="60s">1 minute</SelectItem>
                  <SelectItem value="120s">2 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <Select value={formData.aspect} onValueChange={(value) => handleInputChange('aspect', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                  <SelectItem value="9:16">9:16 (Vertical/TikTok)</SelectItem>
                  <SelectItem value="1:1">1:1 (Square/Instagram)</SelectItem>
                  <SelectItem value="4:5">4:5 (Instagram Post)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleGenerate}
          size="lg"
          className="shadow-md hover:shadow-lg transition-all duration-300"
          disabled={!formData.prompt.trim()}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Video
        </Button>
      </div>
    </div>
  );

  const renderGeneratingStep = () => (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Wand2 className="w-8 h-8 text-primary animate-pulse" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Creating Your Video</h3>
            <p className="text-muted-foreground">
              Our AI is working its magic. This usually takes 30-60 seconds.
            </p>
          </div>

          <div className="space-y-2">
            <Progress value={generationProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {Math.round(generationProgress)}% complete
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Processing scenes
            </div>
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Adding audio
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Final touches
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPreviewStep = () => (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Video Preview
          </CardTitle>
          <CardDescription>
            Your AI-generated video is ready! Review and download.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">Video Preview</p>
              <p className="text-sm text-muted-foreground">Click to play generated video</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Duration: 30s</span>
              <span>•</span>
              <span>16:9 Landscape</span>
              <span>•</span>
              <span>1080p HD</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline">
                Regenerate
              </Button>
              <Button>
                Download Video
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      <main className="container mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Create New Video
              </h1>
              <p className="text-muted-foreground mt-2">
                Transform your ideas into engaging videos with AI
              </p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Powered
            </Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {currentStep === 'input' && renderInputStep()}
          {currentStep === 'generating' && renderGeneratingStep()}
          {currentStep === 'preview' && renderPreviewStep()}
        </motion.div>
      </main>
    </div>
  );
};

export default CreateVideo;