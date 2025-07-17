
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Book, Star, Github, Award, Trophy, Rocket } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import React from 'react';


// Mock data for the profile page
const userProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://placehold.co/100x100.png',
  roadmaps: [
    { title: 'Advanced React and Next.js', progress: 75, modules: 15 },
    { title: 'Python for Data Science', progress: 30, modules: 5 },
  ],
  skills: ['React', 'Next.js', 'TypeScript', 'Python', 'Pandas', 'SQL', 'Docker', 'PostgreSQL'],
  rank: 'Pro Learner',
  activity: [
    { month: 'Jan', modules: 4 },
    { month: 'Feb', modules: 6 },
    { month: 'Mar', modules: 10 },
    { month: 'Apr', modules: 5 },
    { month: 'May', modules: 8 },
    { month: 'Jun', modules: 7 },
  ],
  projects: [
      {
          title: 'Personal Portfolio Website',
          description: 'A responsive portfolio site built with Next.js to showcase my projects and skills.',
          repoUrl: 'https://github.com/example/portfolio',
          techStack: ['Next.js', 'React', 'Tailwind CSS']
      },
      {
          title: 'Data Analysis Dashboard',
          description: 'An interactive dashboard for visualizing sales data using Pandas and Matplotlib.',
          repoUrl: 'https://github.com/example/dashboard',
          techStack: ['Python', 'Pandas', 'Flask']
      }
  ],
  achievements: [
    { icon: Trophy, title: 'Roadmap Conqueror', description: 'Completed a full learning roadmap.' },
    { icon: Award, title: 'Century Club', description: 'Completed 100 learning units.' },
    { icon: Rocket, title: 'Project Launcher', description: 'Finished and deployed a project.' },
  ]
};


export default function ProfilePage() {

  const roadmapsStarted = userProfile.roadmaps.length;
  const modulesCompleted = userProfile.roadmaps.reduce((total, roadmap) => {
    return total + Math.floor(roadmap.modules * (roadmap.progress / 100));
  }, 0);


  return (
    <div className="space-y-8">
        <header>
            <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
            <p className="text-muted-foreground">Manage your learning journey and personal information.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-24 w-24 border-2 border-primary/50">
                                <AvatarImage src={userProfile.avatarUrl} data-ai-hint="person portrait" />
                                <AvatarFallback><User size={40}/></AvatarFallback>
                            </Avatar>
                            <Button variant="outline">Change Photo</Button>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={userProfile.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={userProfile.email} />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Learning Activity</CardTitle>
                        <CardDescription>Modules completed per month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ChartContainer config={{
                            modules: {
                                label: "Modules",
                                color: "hsl(var(--chart-1))",
                            },
                         }} className="h-64 w-full">
                            <RechartsBarChart data={userProfile.activity} margin={{ top: 20, right: 20, left: -10, bottom: 5 }} accessibilityLayer>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis tickLine={false} axisLine={false} />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="modules" fill="var(--color-modules)" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Projects Built</CardTitle>
                        <CardDescription>Showcase of your completed projects.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       {userProfile.projects.map((project, index) => (
                           <React.Fragment key={index}>
                           {index > 0 && <Separator />}
                           <div className="flex flex-col sm:flex-row gap-6 pt-4">
                               <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg">{project.title}</h3>
                                        {project.repoUrl && (
                                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" size="sm">
                                                    <Github className="mr-2 h-4 w-4"/> View on GitHub
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground mt-1">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                                    </div>
                               </div>
                           </div>
                           </React.Fragment>
                       ))}
                       {userProfile.projects.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No projects built yet. Start learning to build something amazing!</p>
                          </div>
                       )}
                    </CardContent>
                </Card>

            </div>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Learning Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center">
                            <Book className="mr-4 h-8 w-8 text-primary"/>
                            <div>
                                <p className="font-bold text-2xl">{roadmapsStarted}</p>
                                <p className="text-sm text-muted-foreground">Roadmaps Started</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center">
                            <Star className="mr-4 h-8 w-8 text-primary"/>
                            <div>
                                <p className="font-bold text-2xl">{modulesCompleted}</p>
                                <p className="text-sm text-muted-foreground">Modules Completed</p>
                            </div>
                        </div>
                         <Separator />
                        <div className="flex items-center">
                            <User className="mr-4 h-8 w-8 text-primary"/>
                            <div>
                                <p className="font-bold text-2xl">{userProfile.rank}</p>
                                <p className="text-sm text-muted-foreground">Current Rank</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {userProfile.skills.map((skill, index) => (
                            <Badge key={index} variant={index < 4 ? 'default' : 'secondary'}>{skill}</Badge>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>My Roadmaps</CardTitle>
                        <CardDescription>Your saved learning paths.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {userProfile.roadmaps.map((roadmap, index) => (
                           <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                                <div>
                                    <h3 className="font-semibold">{roadmap.title}</h3>
                                    <p className="text-sm text-muted-foreground">{roadmap.progress}% complete</p>
                                </div>
                                <Button variant="secondary" size="sm">Continue</Button>
                            </div>
                        ))}
                         {userProfile.roadmaps.length === 0 && (
                          <div className="text-center py-4 text-muted-foreground">
                            <p>No roadmaps yet.</p>
                          </div>
                       )}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                        <CardDescription>Badges you've earned.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {userProfile.achievements.map((achievement, index) => (
                           <div key={index} className="flex items-center">
                                <achievement.icon className="mr-4 h-8 w-8 text-yellow-500"/>
                                <div>
                                    <p className="font-semibold">{achievement.title}</p>
                                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                </div>
                            </div>
                        ))}
                        {userProfile.achievements.length === 0 && (
                            <div className="text-center py-4 text-muted-foreground">
                                <p>No achievements yet.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
