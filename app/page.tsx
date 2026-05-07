'use client';

import { useState } from 'react';
import { Menu, X, Video, BookOpen, Gamepad2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'videos', label: 'Video Learning', icon: Video },
    { id: 'resources', label: 'My Notes', icon: BookOpen },
    { id: 'exercise', label: 'Exercise', icon: Gamepad2 },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border p-6 fixed h-screen">
        <div className="mb-12">
          <h1 className="font-serif text-3xl font-bold text-primary">Mahligai Cinta</h1>
          <p className="text-sm text-muted-foreground mt-1">Wedding Education</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-40">
          <Button variant="outline" size="icon">
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="mb-8 pt-4">
            <h1 className="font-serif text-2xl font-bold text-primary">Mahligai Cinta</h1>
            <p className="text-xs text-muted-foreground mt-1">Wedding Education</p>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden pt-16 px-4 pb-4 text-center">
          <h1 className="font-serif text-3xl font-bold text-primary">Mahligai Cinta</h1>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'videos' && <VideoLearningPage />}
          {currentPage === 'resources' && <ResourcesPage />}
          {currentPage === 'exercise' && <ExercisePage />}
        </div>
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-4xl font-bold text-foreground mb-2">Welcome to Mahligai Cinta</h2>
        <p className="text-lg text-muted-foreground">Empowering couples through comprehensive wedding and marriage education</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-8 border-2 border-primary hover:shadow-lg transition-shadow text-center">
          <h3 className="font-serif text-2xl font-bold text-primary mb-4">About Us</h3>
          <p className="text-foreground leading-relaxed mb-6">
            Mahligai Cinta is dedicated to providing comprehensive, culturally-sensitive education to help couples prepare for their wedding and marriage journey. We believe in empowering individuals with knowledge and skills to create lasting, meaningful relationships.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground flex flex-col items-center">
            <p>✓ Expert-curated content</p>
            <p>✓ Interactive learning experiences</p>
            <p>✓ Community support</p>
          </div>
        </Card>

        <Card className="p-8 border-2 border-accent hover:shadow-lg transition-shadow text-center">
          <h3 className="font-serif text-2xl font-bold text-accent mb-4">Our Objective</h3>
          <p className="text-foreground leading-relaxed mb-6">
            Our mission is to equip couples with the knowledge, skills, and confidence they need to navigate their wedding planning and build strong, healthy marriages.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground flex flex-col items-center">
            <p>✓ Holistic preparation</p>
            <p>✓ Cultural awareness</p>
            <p>✓ Long-term relationship success</p>
          </div>
        </Card>
      </div>

      <Card className="mt-8 p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 text-center">
        <h3 className="font-serif text-2xl font-bold text-primary mb-4">Getting Started</h3>
        <p className="text-foreground mb-6">
          Begin your learning journey by exploring our video library, accessing educational resources, and engaging with interactive exercises. Each section is designed to build upon the previous one.
        </p>
        <div className="flex justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Start Learning Today
          </Button>
        </div>
      </Card>
    </div>
  );
}

function VideoLearningPage() {
  const videos = [
    {
      id: 1,
      title: 'Theory',
      description: 'Learn the fundamental concepts and theoretical foundations of marriage and relationships.',
      type: 'Educational Content',
    },
    {
      id: 2,
      title: 'Storytelling & Animation',
      subtitle: 'Contoh Situasi',
      description: 'Explore real-life scenarios and examples through engaging storytelling and animated illustrations.',
      type: 'Case Studies',
    },
    {
      id: 3,
      title: 'Summary',
      subtitle: 'Nota Ringkas',
      description: 'Quick reference guides and summaries of key concepts covered in previous sections.',
      type: 'Reference',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-4xl font-bold text-foreground mb-2">Video Learning</h2>
        <p className="text-lg text-muted-foreground">Master essential concepts through our comprehensive video library</p>
      </div>

      <div className="space-y-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden border border-border hover:border-primary transition-colors">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Video className="w-16 h-16 text-primary/40" />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">{video.type}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-1">{video.title}</h3>
                {video.subtitle && (
                  <p className="text-sm text-muted-foreground mb-3">{video.subtitle}</p>
                )}
                <p className="text-foreground mb-4">{video.description}</p>
                <Button className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground">
                  Watch Video
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ResourcesPage() {
  const quizzes = [
    { id: 1, title: 'Wedding Planning Basics' },
    { id: 2, title: 'Communication in Marriage' },
    { id: 3, title: 'Financial Planning for Couples' },
    { id: 4, title: 'Building a Strong Foundation' },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-4xl font-bold text-foreground mb-2">My Notes & Resources</h2>
        <p className="text-lg text-muted-foreground">Access comprehensive learning resources and interactive quizzes</p>
      </div>

      <div className="grid gap-6">
        {/* Mindmap Section */}
        <Card className="p-8 border-2 border-primary/30 text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Mindmap</h3>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-primary/40 mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive mindmap visualization coming soon</p>
            </div>
          </div>
        </Card>

        {/* Flip Book Section */}
        <Card className="p-8 border-2 border-accent/30 text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Flip Book</h3>
          <div className="bg-gradient-to-br from-accent/5 to-primary/5 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-accent/20">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-accent/40 mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive flip book resource coming soon</p>
            </div>
          </div>
        </Card>

        {/* Kuiz Section */}
        <Card className="p-8 border border-border text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Kuiz (Quiz)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {quizzes.map((quiz) => (
              <Button
                key={quiz.id}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center border-2 hover:border-primary hover:bg-primary/5 transition-colors text-center"
              >
                <span className="text-lg font-semibold text-foreground">{quiz.id}.</span>
                <span className="text-sm text-foreground mt-2">{quiz.title}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ExercisePage() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-4xl font-bold text-foreground mb-2">Exercise & Games</h2>
        <p className="text-lg text-muted-foreground">Interactive activities to reinforce your learning</p>
      </div>

      <Card className="p-12 border-2 border-primary/30">
        <div className="text-center">
          <Gamepad2 className="w-16 h-16 text-primary/40 mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Interactive Games Coming Soon</h3>
          <p className="text-muted-foreground mb-6">
            We&apos;re developing engaging exercises and games to make your learning experience interactive and fun. Check back soon!
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
            Games in Development
          </Button>
        </div>
      </Card>
    </div>
  );
}
