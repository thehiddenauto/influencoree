import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Video, 
  TrendingUp, 
  Users, 
  Crown, 
  Play,
  Download,
  Share2,
  MoreHorizontal,
  Calendar,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const stats = [
    {
      title: 'Videos Created',
      value: '127',
      change: '+12%',
      icon: Video,
      color: 'text-primary'
    },
    {
      title: 'Total Views',
      value: '2.4M',
      change: '+23%',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Engagement Rate',
      value: '8.7%',
      change: '+5%',
      icon: Users,
      color: 'text-blue-500'
    }
  ];

  const recentVideos = [
    {
      id: 1,
      title: 'How to Scale Your SaaS in 2024',
      thumbnail: '/placeholder.svg',
      duration: '2:34',
      views: '12.5K',
      status: 'Published',
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      title: 'AI Revolution: What You Need to Know',
      thumbnail: '/placeholder.svg',
      duration: '3:21',
      views: '8.9K',
      status: 'Processing',
      createdAt: '5 hours ago'
    },
    {
      id: 3,
      title: 'Marketing Trends for Digital Creators',
      thumbnail: '/placeholder.svg',
      duration: '1:58',
      views: '15.2K',
      status: 'Published',
      createdAt: '1 day ago'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, Creator! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Ready to create your next viral video?
              </p>
            </div>
            <Button size="lg" className="shadow-md hover:shadow-lg transition-all duration-300" asChild>
              <Link to="/create-video">
                <Plus className="w-5 h-5 mr-2" />
                Create Video
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.title} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-500 font-medium">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-primary/10 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="videos">My Videos</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Videos */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Recent Videos
                    </CardTitle>
                    <CardDescription>
                      Your latest video creations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentVideos.map((video) => (
                      <div key={video.id} className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                        <div className="w-16 h-12 bg-muted rounded-md flex items-center justify-center">
                          <Play className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{video.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{video.views} views</span>
                            <span>•</span>
                            <span>{video.createdAt}</span>
                          </div>
                        </div>
                        <Badge variant={video.status === 'Published' ? 'default' : 'secondary'}>
                          {video.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Usage & Limits */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-primary" />
                      Usage & Limits
                    </CardTitle>
                    <CardDescription>
                      Track your monthly usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Videos Created</span>
                        <span>27/50</span>
                      </div>
                      <Progress value={54} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Storage Used</span>
                        <span>2.1/10 GB</span>
                      </div>
                      <Progress value={21} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>API Calls</span>
                        <span>1,247/5,000</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Upgrade Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>My Videos</CardTitle>
                      <CardDescription>
                        Manage all your created videos
                      </CardDescription>
                    </div>
                    <Button asChild>
                      <Link to="/create-video">
                        <Plus className="w-4 h-4 mr-2" />
                        New Video
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentVideos.map((video) => (
                      <Card key={video.id} className="group hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                          <Play className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-sm mb-2 line-clamp-2">{video.title}</h4>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {video.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {video.views}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Share2 className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>
                    Track your content performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Analytics dashboard coming soon</p>
                      <p className="text-sm">Track views, engagement, and growth metrics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your profile and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Account settings coming soon</p>
                      <p className="text-sm">Manage profile, billing, and preferences</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;