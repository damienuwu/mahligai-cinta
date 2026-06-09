'use client';

import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Video, 
  BookOpen, 
  Home, 
  Users, 
  GraduationCap, 
  Heart, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  ClipboardList, 
  UserCheck, 
  Play, 
  Sparkles,
  Info,
  CheckCircle2,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// ----------------------------------------------------
// GLOBAL DATA & UTILS
// ----------------------------------------------------
const akadIlmuList = [
  {
    category: 'Akad Ilmu 1',
    topics: [
      {
        title: 'Perkara Asas : Makna & Dalil',
        type: 'Video Powtoon',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        description: 'Menjelaskan definisi perkahwinan dari segi bahasa dan syarak beserta dalil pensyariatan naqli.',
        videoUrl: 'https://www.youtube.com/watch?v=-ru6caprSwo',
        tag: 'Powtoon Video'
      },
      {
        title: 'Hikmah Perkahwinan',
        type: 'Infografik',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        description: 'Kepentingan dan hikmah disyariatkan akad nikah bagi individu, keluarga, dan masyarakat.',
        imageUrl: '/assets/infographics/hikmah perkahwinan.jpg',
        tag: 'Infographic'
      }
    ]
  },
  {
    category: 'Akad Ilmu 2',
    topics: [
      {
        title: 'Rukun Nikah & Syarat Sah Nikah',
        type: 'Video Plotagon',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        description: 'Membincangkan 5 rukun nikah (bakal suami, bakal isteri, wali, 2 saksi, & sighah) beserta syarat sahnya menerusi video animasi Plotagon.',
        videoUrl: 'https://youtu.be/Gtk8hmeFOLw',
        tag: 'Plotagon Video'
      },
      {
        title: 'Peta Minda : Rukun dan Syarat Sah Nikah',
        type: 'Peta Minda',
        badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
        description: 'Visual peta minda yang ringkas dan padat menghuraikan rukun perkahwinan dan syarat-syarat sahnya.',
        imageUrl: '/assets/infographics/peta minda rukun dan syarat sah nikah.jpg',
        tag: 'Mind Map'
      },
      {
        title: 'Golongan Wanita Haram Dikahwini',
        type: 'Peta Minda',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        description: 'Peta minda interaktif bagi mengenal pasti golongan wanita yang haram dikahwini sama ada secara selamanya (muabbad) atau sementara (muaqqat).',
        imageUrls: [
          '/assets/infographics/golongan wanita haram dikahwini selamanya.jpg',
          '/assets/infographics/golongan wanita haram dikahwini sementara.jpg'
        ],
        tag: 'Mind Map'
      },
      {
        title: 'Ciri Pemilihan Calon',
        type: 'Komik Interaktif',
        badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
        description: 'Kisah pendek visual berunsur didik hibur menerangkan kriteria memilih calon suami dan isteri mengikut syarak.',
        comicFolder: '/assets/comic/',
        tag: 'Comic Slider'
      }
    ]
  },
  {
    category: 'Akad Ilmu 3',
    topics: [
      {
        title: 'Hukum & Wali',
        type: 'Video Green Screen',
        badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
        description: 'Penerangan komprehensif tentang pembahagian hukum berkahwin serta susunan dan jenis wali (nasab & hakim).',
        videoUrl: 'https://www.youtube.com/watch?v=31mSP3iREgE',
        tag: 'Green Screen Video'
      },
      {
        title: 'Hukum Berkahwin',
        type: 'Infografik',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        description: 'Ringkasan visual bertulis tentang lima hukum perkahwinan (Wajib, Sunat, Makruh, Harus, Haram).',
        imageUrl: '/assets/infographics/hukum berkahwin.jpg',
        tag: 'Infographic Note'
      },
      {
        title: 'Wali dalam Perkahwinan',
        type: 'Infografik',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        description: 'Nota ringkas berstruktur mengenai syarat-syarat wali nikah dan situasi perpindahan wali nasab kepada wali hakim.',
        imageUrl: '/assets/infographics/wali.jpg',
        tag: 'Infographic Note'
      }
    ]
  }
];

const chapters = akadIlmuList.reduce((acc, cat) => {
  return [...acc, ...cat.topics.map((topic, index) => ({ 
    ...topic, 
    id: acc.length, 
    category: cat.category 
  }))];
}, [] as any[]);

// Elegant Golden/Blush Floral Motif Corner
function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`absolute w-12 h-12 pointer-events-none opacity-25 dark:opacity-15 text-primary/60 transition-all duration-300 group-hover:opacity-60 z-0 ${className}`} 
      viewBox="0 0 100 100" 
      fill="currentColor"
    >
      <path d="M 0,0 C 40,0 60,20 60,60 C 60,70 50,80 40,70 C 30,60 40,40 20,50 C 0,55 20,15 0,0 Z" />
      <path d="M 15,15 C 35,15 45,25 45,45 C 45,52 38,59 31,52 C 24,45 31,31 17,38 C 5,42 19,15 15,15 Z" opacity="0.7" />
      <circle cx="30" cy="30" r="3" />
      <circle cx="45" cy="20" r="2" />
      <circle cx="20" cy="45" r="2" />
    </svg>
  );
}

// Elegant Golden/Blush Floral Motif Watermark
function FloralWatermark({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`absolute pointer-events-none opacity-[0.035] dark:opacity-[0.015] text-primary/80 transition-all duration-700 z-0 ${className}`} 
      viewBox="0 0 100 100" 
      fill="currentColor"
    >
      <path d="M50,10 C55,25 65,25 70,10 C75,25 85,25 90,30 C77,35 77,45 90,50 C77,55 77,65 90,70 C85,77 75,77 70,90 C65,77 55,77 50,90 C45,77 35,77 30,90 C25,77 15,77 10,70 C23,65 23,55 10,50 C23,45 23,35 10,30 C15,25 25,25 30,10 C35,25 45,25 50,10 Z" />
      <circle cx="50" cy="50" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="3" />
    </svg>
  );
}

// Elegant Floral Divider
function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-4 text-primary/45 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary/35" />
      <svg className="w-8 h-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0-15C9.75 4.5 8 6.25 8 8.5S9.75 12.5 12 12.5m0-8c2.25 0 4 1.75 4 4s-1.75 4-4 4m0 0v-8m0 8c-2.25 0-4 1.75-4 4s1.75 4 4 4m0-8c2.25 0 4 1.75 4 4s-1.75 4-4 4" />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/35 to-transparent" />
    </div>
  );
}

// Interactive Falling Flower Petals & Blossom Burst
interface InteractivePetal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  opacity: number;
  color: string;
}

function FlowerFall() {
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number; size: number; rotation: number; color: string }[]>([]);
  const [bursts, setBursts] = useState<InteractivePetal[]>([]);
  const petalColors = ['text-pink-300/40', 'text-rose-300/40', 'text-amber-200/30', 'text-rose-400/20'];

  useEffect(() => {
    const newPetals = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 10 + Math.random() * 18,
      rotation: Math.random() * 360,
      color: petalColors[Math.floor(Math.random() * petalColors.length)]
    }));
    setPetals(newPetals);
  }, []);

  useEffect(() => {
    let idCounter = 0;
    const handleClick = (e: MouseEvent) => {
      const count = 8 + Math.floor(Math.random() * 5);
      const newBursts: InteractivePetal[] = [];
      const colors = ['#f9a8d4', '#fca5a5', '#fef08a', '#f43f5e', '#fda4af', '#f472b6'];
      
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
        const speed = 1.5 + Math.random() * 3.5;
        newBursts.push({
          id: ++idCounter + Date.now(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.7,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      setBursts(prev => [...prev, ...newBursts]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (bursts.length === 0) return;

    const interval = setInterval(() => {
      setBursts(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.08,
            rotation: p.rotation + 2.5,
            opacity: p.opacity - 0.022,
          }))
          .filter(p => p.opacity > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [bursts]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className={`absolute ${petal.color} animate-fall animate-sway`}
            style={{
              left: `${petal.left}%`,
              top: `-30px`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              transform: `rotate(${petal.rotation}deg)`,
            }}
          >
            <svg width={petal.size} height={petal.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 17 6 17 11C17 17 12 22 12 22C12 22 7 17 7 11C7 6 12 2 12 2Z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {bursts.map((p) => (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: p.x,
              top: p.y,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.scale})`,
              opacity: p.opacity,
              color: p.color
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 17 6 17 11C17 17 12 22 12 22C12 22 7 17 7 11C7 6 12 2 12 2Z" />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}

// ----------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isIsiKandunganExpanded, setIsIsiKandunganExpanded] = useState(true);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'isi-kandungan', label: 'Isi Kandungan', icon: BookOpen },
    { id: 'nikah-edu', label: 'Nikah Edu & Kuiz', icon: ClipboardList },
    { id: 'tentang-kami', label: 'Tentang Kami', icon: Users },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      <FlowerFall />

      {/* Sidebar Navigation */}
      <aside 
        className={`hidden md:flex flex-col bg-card border-r border-border fixed h-screen z-20 transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20 p-4' : 'w-72 p-6'
        }`}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-border bg-card shadow-sm hidden md:flex items-center justify-center hover:bg-accent text-muted-foreground hover:text-foreground z-30 transition-transform active:scale-95"
          title={isSidebarCollapsed ? "Kembangkan Menu" : "Kecilkan Menu"}
        >
          {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Logo Section */}
        <div className={`mb-10 transition-all duration-300 ${isSidebarCollapsed ? 'text-center' : ''}`}>
          <div className={`flex items-center gap-2 mb-2 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <span className="p-1.5 bg-primary/10 rounded-xl text-primary inline-flex items-center justify-center relative group">
              <Heart className="w-5 h-5 fill-primary/20 transition-transform duration-300 group-hover:scale-110" />
            </span>
            {!isSidebarCollapsed && (
              <h1 className="font-serif text-xl font-bold tracking-tight text-primary animate-fade-in whitespace-nowrap floral-text-gradient">
                Mahligai Cinta
              </h1>
            )}
          </div>
          {!isSidebarCollapsed && (
            <p className="text-[10px] text-muted-foreground px-1 animate-fade-in whitespace-nowrap">
              Pendidikan Perkahwinan & Fiqh
            </p>
          )}
        </div>
        
        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isIsiKandungan = item.id === 'isi-kandungan';
            const isTopicPage = currentPage.startsWith('topik-');
            const isActive = currentPage === item.id || (isIsiKandungan && isTopicPage);

            return (
              <div key={item.id} className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    if (isIsiKandungan) {
                      setIsIsiKandunganExpanded(!isIsiKandunganExpanded);
                      if (!isTopicPage && currentPage !== 'isi-kandungan') {
                        handleNavClick('isi-kandungan');
                      }
                    } else {
                      handleNavClick(item.id);
                    }
                  }}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={`flex items-center rounded-xl transition-all duration-200 ${
                    isSidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
                  } ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10 font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isSidebarCollapsed && (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-medium animate-fade-in whitespace-nowrap">{item.label}</span>
                      {isIsiKandungan && (
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isIsiKandunganExpanded ? 'rotate-90' : ''}`} />
                      )}
                    </div>
                  )}
                </button>

                {/* Nested Categories & Topics */}
                {isIsiKandungan && isIsiKandunganExpanded && !isSidebarCollapsed && (
                  <div className="ml-5 pl-2 border-l border-primary/20 flex flex-col gap-3 mt-1 mb-2 animate-fade-in">
                    {akadIlmuList.map((cat, catIdx) => (
                      <div key={catIdx} className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-primary/80 uppercase tracking-wider px-2 py-0.5">
                          {cat.category}
                        </span>
                        <div className="flex flex-col gap-1 pl-1">
                          {cat.topics.map((ch) => {
                            const flatIdx = chapters.findIndex(c => c.title === ch.title);
                            return (
                              <button
                                key={ch.title}
                                onClick={() => handleNavClick(`topik-${flatIdx}`)}
                                className={`text-left text-[11px] py-1.5 px-2 rounded-lg transition-all duration-150 leading-relaxed ${
                                  currentPage === `topik-${flatIdx}`
                                    ? 'text-primary font-semibold bg-primary/15'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/25'
                                }`}
                              >
                                {ch.title === 'Peta Minda : Rukun dan Syarat Sah Nikah' ? ch.title : ch.title.split(' : ')[0]}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Info Box */}
        {!isSidebarCollapsed && (
          <div className="mt-auto p-4 bg-muted/30 rounded-2xl border border-border/50 animate-fade-in relative overflow-hidden group">
            <FloralCorner className="bottom-0 right-0 w-8 h-8 opacity-10" />
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold">PAK21 & Didik Hibur</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                  Kaedah interaktif memudahkan pemahaman sukatan Fiqh Perkahwinan.
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-40">
          <Button variant="outline" size="icon" className="shadow-md">
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-6 flex flex-col">
          <div className="mb-8 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <Heart className="w-6 h-6 fill-primary/20" />
              </span>
              <h1 className="font-serif text-2xl font-bold text-primary floral-text-gradient">Mahligai Cinta</h1>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Pendidikan Perkahwinan & Fiqh Interaktif</p>
          </div>
          <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isIsiKandungan = item.id === 'isi-kandungan';
              const isTopicPage = currentPage.startsWith('topik-');
              const isActive = currentPage === item.id || (isIsiKandungan && isTopicPage);

              return (
                <div key={item.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      if (isIsiKandungan) {
                        setIsIsiKandunganExpanded(!isIsiKandunganExpanded);
                        if (!isTopicPage && currentPage !== 'isi-kandungan') {
                          handleNavClick('isi-kandungan');
                        }
                      } else {
                        handleNavClick(item.id);
                      }
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {isIsiKandungan && (
                      <ChevronRight className={`w-4 h-4 transition-transform ${isIsiKandunganExpanded ? 'rotate-90' : ''}`} />
                    )}
                  </button>

                  {isIsiKandungan && isIsiKandunganExpanded && (
                    <div className="ml-6 pl-2 border-l border-primary/20 flex flex-col gap-3 mt-1 mb-2">
                      {akadIlmuList.map((cat, catIdx) => (
                        <div key={catIdx} className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-primary/80 uppercase tracking-wider px-2 py-0.5">
                            {cat.category}
                          </span>
                          <div className="flex flex-col gap-1 pl-1">
                            {cat.topics.map((ch) => {
                              const flatIdx = chapters.findIndex(c => c.title === ch.title);
                              return (
                                <button
                                  key={ch.title}
                                  onClick={() => {
                                    handleNavClick(`topik-${flatIdx}`);
                                    setIsMenuOpen(false);
                                  }}
                                  className={`text-left text-xs py-1.5 px-2 rounded-lg transition-all ${
                                    currentPage === `topik-${flatIdx}`
                                      ? 'text-primary font-semibold bg-primary/10'
                                      : 'text-muted-foreground hover:text-foreground'
                                  }`}
                                >
                                  {ch.title === 'Peta Minda : Rukun dan Syarat Sah Nikah' ? ch.title : ch.title.split(' : ')[0]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <main 
        className={`flex-1 min-h-screen bg-gradient-to-br from-background via-background/98 to-primary/5 transition-all duration-300 relative z-10 ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-72'
        }`}
      >
        {/* Mobile Header Spacer */}
        <div className="md:hidden pt-16 px-4 pb-4 text-center border-b border-border/40 bg-card/50 backdrop-blur relative">
          <h1 className="font-serif text-2xl font-bold text-primary floral-text-gradient">Mahligai Cinta</h1>
        </div>

        {/* Page Container */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'isi-kandungan' && <IsiKandunganPage onSelectTopic={(idx) => setCurrentPage(`topik-${idx}`)} />}
          {currentPage.startsWith('topik-') && (
            <TopicDetailPage 
              topicIndex={parseInt(currentPage.split('-')[1])}
              onNavigate={(idx) => setCurrentPage(`topik-${idx}`)}
              onBack={() => setCurrentPage('isi-kandungan')}
            />
          )}
          {currentPage === 'nikah-edu' && <NikahEduPage />}
          {currentPage === 'tentang-kami' && <TentangKamiPage />}
        </div>
      </main>
    </div>
  );
}

// ----------------------------------------------------
// HOME PAGE COMPONENT
// ----------------------------------------------------
function HomePage() {
  const objektifList = [
    {
      id: 1,
      text: 'Meningkatkan kefahaman pelajar terhadap teori dan amali fiqh melalui video animasi.',
      icon: Video,
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    },
    {
      id: 2,
      text: 'Mengaplikasikan pendekatan PAK21 berteraskan didik hibur dalam pembelajaran.',
      icon: Sparkles,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      id: 3,
      text: 'Menggabungkan inovasi teknologi bagi memperkukuh pengajaran dan pembelajaran subjek fiqh.',
      icon: Award,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    }
  ];

  const sasaranList = [
    {
      title: 'Pelajar Tingkatan 5',
      desc: 'Membantu memudahkan persediaan menghadapi peperiksaan SPM bagi subjek Pendidikan Islam.',
      icon: GraduationCap,
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Guru Pendidikan Islam',
      desc: 'Sebagai bahan bantu mengajar (BBM) interaktif bertemakan didik hibur & PAK21.',
      icon: BookOpen,
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Pasangan Muda',
      desc: 'Bakal pengantin yang ingin memperkukuh kefahaman asas tentang hukum & tuntutan perkahwinan.',
      icon: Heart,
      color: 'from-pink-500/10 to-rose-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400'
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in relative overflow-hidden">
      <FloralWatermark className="top-10 left-10 w-96 h-96 opacity-[0.04]" />
      <FloralWatermark className="bottom-10 right-10 w-96 h-96 opacity-[0.04]" />

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-background border border-primary/20 p-8 md:p-12 text-center shadow-lg floral-card">
        {/* Corner flowers */}
        <FloralCorner className="top-0 right-0 rotate-90" />
        <FloralCorner className="bottom-0 left-0 -rotate-90" />
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/15 rounded-full blur-2xl -z-10" />
        
        <Badge className="mb-4 bg-primary/15 text-primary hover:bg-primary/25 border-primary/30 py-1 px-3 text-xs rounded-full">
          Portal Pendidikan Fiqh Perkahwinan
        </Badge>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight floral-text-gradient">
          Selamat Datang ke <span className="text-primary">Mahligai Cinta</span>
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed font-sans relative z-10">
          Platform pembelajaran digital interaktif yang menggabungkan elemen multimedia, infografik, dan komik kreatif untuk menguasai kefahaman Fiqh Perkahwinan dengan cara yang menyeronokkan.
        </p>
      </div>

      <FloralDivider />

      {/* Objektif Section */}
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-primary">Objektif Pembelajaran</h3>
          <p className="text-sm text-muted-foreground mt-1">Tiga matlamat utama platform pendidikan Mahligai Cinta</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {objektifList.map((obj) => {
            const Icon = obj.icon;
            return (
              <Card key={obj.id} className="p-6 border border-border/80 hover:border-primary/30 transition-all hover:shadow-md flex flex-col justify-between relative overflow-hidden group floral-card">
                <FloralCorner className="top-0 right-0 rotate-90" />
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 relative z-10 ${obj.color}`}>
                    <Icon className="w-6 h-6 animate-pulse" style={{ animationDuration: '3s' }} />
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-foreground/90 font-sans relative z-10">
                    {obj.text}
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-muted-foreground/60 font-sans relative z-10">
                  OBJEKTIF 0{obj.id}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <FloralDivider />

      {/* Sasaran Section */}
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-primary">Golongan Sasaran</h3>
          <p className="text-sm text-muted-foreground mt-1">Platform ini direka khas untuk memenuhi keperluan pembelajaran golongan berikut:</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sasaranList.map((sasaran, index) => {
            const Icon = sasaran.icon;
            return (
              <Card key={index} className="overflow-hidden border border-border/60 hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between relative floral-card">
                <div className={`h-1.5 bg-gradient-to-r ${sasaran.color.includes('rose') ? 'from-pink-500 to-rose-500' : sasaran.color.includes('emerald') ? 'from-emerald-500 to-teal-500' : 'from-blue-500 to-indigo-500'}`} />
                <div className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center mb-4 text-primary relative z-10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-foreground mb-2 relative z-10">{sasaran.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans relative z-10">{sasaran.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ISI KANDUNGAN GRID VIEW (All Topics)
// ----------------------------------------------------
interface IsiKandunganPageProps {
  onSelectTopic: (index: number) => void;
}

function IsiKandunganPage({ onSelectTopic }: IsiKandunganPageProps) {
  return (
    <div className="space-y-8 animate-fade-in relative overflow-hidden">
      <FloralWatermark className="top-1/4 right-0 w-80 h-80 opacity-[0.035]" />
      <FloralWatermark className="bottom-1/4 left-0 w-80 h-80 opacity-[0.035]" />

      <div className="text-center md:text-left">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-primary">Isi Kandungan Fiqh</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Pilih mana-mana topik perkahwinan di bawah untuk mempelajari hukum-hakam, dalil, hikmah, serta kriteria memilih pasangan.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((ch, idx) => (
          <Card 
            key={ch.id} 
            onClick={() => onSelectTopic(idx)}
            className="p-6 border border-border/80 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm flex flex-col justify-between cursor-pointer group relative overflow-hidden floral-card"
          >
            <FloralCorner className="top-0 right-0 rotate-90" />
            <FloralCorner className="bottom-0 left-0 -rotate-90" />

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center">
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${ch.badgeColor}`}>
                  {ch.type}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {ch.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed font-sans">
                  {ch.description}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-primary font-bold group-hover:translate-x-1 transition-transform relative z-10">
              <span>Buka Pembelajaran</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TOPIC DETAIL VIEW (Separate Page for Each Topic)
// ----------------------------------------------------
interface TopicDetailPageProps {
  topicIndex: number;
  onNavigate: (index: number) => void;
  onBack: () => void;
}

function TopicDetailPage({ topicIndex, onNavigate, onBack }: TopicDetailPageProps) {
  const currentChapter = chapters[topicIndex];

  const [comicPage, setComicPage] = useState(1);
  const [comicImageError, setComicImageError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const totalComicPages = 4;

  useEffect(() => {
    setComicPage(1);
    setComicImageError(false);
    setImageError(false);
    setExpandedImage(null);
  }, [topicIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!expandedImage || !currentChapter.comicFolder) return;
      if (e.key === 'ArrowRight') {
        const newPage = comicPage < totalComicPages ? comicPage + 1 : 1;
        setComicPage(newPage);
        setExpandedImage(`${currentChapter.comicFolder}ms ${newPage}.jpg`);
      } else if (e.key === 'ArrowLeft') {
        const newPage = comicPage > 1 ? comicPage - 1 : totalComicPages;
        setComicPage(newPage);
        setExpandedImage(`${currentChapter.comicFolder}ms ${newPage}.jpg`);
      } else if (e.key === 'Escape') {
        setExpandedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedImage, comicPage, currentChapter, totalComicPages]);

  const handleComicNext = () => {
    if (comicPage < totalComicPages) {
      setComicPage(prev => prev + 1);
      setComicImageError(false);
    }
  };

  const handleComicPrev = () => {
    if (comicPage > 1) {
      setComicPage(prev => prev - 1);
      setComicImageError(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-border/80">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="self-start gap-2 text-xs text-muted-foreground hover:text-primary transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Isi Kandungan
        </Button>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate((topicIndex - 1 + chapters.length) % chapters.length)}
            className="rounded-lg h-9 px-3 gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Sebelum
          </Button>
          <span className="text-xs font-semibold px-3 py-1.5 bg-secondary/60 rounded-lg min-w-16 text-center">
            {topicIndex + 1} / {chapters.length}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate((topicIndex + 1) % chapters.length)}
            className="rounded-lg h-9 px-3 gap-1"
          >
            Seterusnya <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-2 border-primary/20 bg-card shadow-lg flex flex-col h-full min-h-[500px] relative floral-card">
        <FloralCorner className="top-0 left-0" />
        <FloralCorner className="top-0 right-0 rotate-90" />
        <FloralCorner className="bottom-0 left-0 -rotate-90" />
        <FloralCorner className="bottom-0 right-0 rotate-180" />

        <div className="p-6 md:p-8 border-b border-border/80 bg-muted/10 flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${currentChapter.badgeColor}`}>
              {currentChapter.type}
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mt-1">{currentChapter.title}</h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-2 max-w-3xl font-sans">
            {currentChapter.description}
          </p>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center bg-muted/5 relative z-10">
          <div className="relative border-2 border-dashed border-border/80 rounded-2xl bg-card/65 backdrop-blur-md overflow-hidden min-h-[380px] flex flex-col items-center justify-center p-4 gap-6">
            
            {currentChapter.videoUrl && (() => {
              const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
              const match = currentChapter.videoUrl.match(youtubeRegExp);
              const youtubeId = match && match[2].length === 11 ? match[2] : null;

              if (youtubeId) {
                return (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full aspect-video rounded-lg max-h-[500px] overflow-hidden bg-black shadow-inner">
                      <iframe 
                        className="w-full h-full border-0"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title={currentChapter.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                );
              }

              return (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <video 
                    className="w-full rounded-lg max-h-[500px] bg-black shadow-md" 
                    controls 
                    src={currentChapter.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="mt-4 p-4 text-center bg-primary/5 rounded-xl border border-primary/10 w-full max-w-md">
                    <Play className="w-8 h-8 text-primary mx-auto mb-2 opacity-80" />
                    <p className="text-xs font-semibold">Video Player: {currentChapter.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-sans">
                      Sila letak fail video di: <code className="bg-secondary px-1 py-0.5 rounded text-primary">{currentChapter.videoUrl}</code> atau gantikan dengan URL video YouTube.
                    </p>
                  </div>
                </div>
              );
            })()}

            {(currentChapter.imageUrl || currentChapter.imageUrls) && (
              <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                {!imageError ? (
                  <div className="w-full flex flex-col items-center justify-center gap-6">
                    {currentChapter.imageUrls ? (
                      <div className="flex flex-col gap-8 w-full max-w-5xl">
                        {currentChapter.imageUrls.map((url: string, index: number) => (
                          <div 
                            key={index}
                            className="relative group cursor-zoom-in w-full flex flex-col items-center justify-center overflow-hidden rounded-xl border bg-card shadow-md"
                            onClick={() => setExpandedImage(url)}
                          >
                            <img 
                              src={url} 
                              alt={`${currentChapter.title} - ${index + 1}`}
                              className="max-h-[800px] w-full object-contain rounded-xl transition-transform duration-200 group-hover:scale-[1.005]"
                              onError={() => setImageError(true)}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 flex items-center justify-center">
                              <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                Klik untuk besarkan
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div 
                        className="relative group cursor-zoom-in w-full max-w-5xl flex flex-col items-center justify-center overflow-hidden rounded-xl"
                        onClick={() => setExpandedImage(currentChapter.imageUrl || null)}
                      >
                        <img 
                          src={currentChapter.imageUrl} 
                          alt={currentChapter.title}
                          className="max-h-[85vh] w-full object-contain rounded-xl shadow-md transition-transform duration-200 group-hover:scale-[1.005]"
                          onError={() => setImageError(true)}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 flex items-center justify-center">
                          <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Klik untuk besarkan paparan
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 w-full max-w-2xl bg-gradient-to-br from-card to-secondary/30 rounded-2xl border border-border/85 shadow-inner text-center relative overflow-hidden">
                    <FloralCorner className="top-0 left-0 w-8 h-8 opacity-15" />
                    <FloralCorner className="bottom-0 right-0 w-8 h-8 rotate-180 opacity-15" />
                    
                    <FileText className="w-10 h-10 text-primary/60 mx-auto mb-3" />
                    <h4 className="font-serif text-lg font-bold mb-2 text-primary">{currentChapter.title}</h4>
                    
                    {currentChapter.id === 1 && (
                      <div className="text-left space-y-2 text-xs font-sans">
                        <p className="font-semibold text-center text-muted-foreground mb-3">5 Hikmah Utama Pensyariatan Nikah:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 bg-card rounded border">1. Memenuhi tuntutan fitrah manusia secara halal.</div>
                          <div className="p-2 bg-card rounded border">2. Memelihara keturunan & nasab yang sah.</div>
                          <div className="p-2 bg-card rounded border">3. Mewujudkan ketenangan jiwa (sakinah).</div>
                          <div className="p-2 bg-card rounded border">4. Menghindarkan diri daripada maksiat & zina.</div>
                          <div className="p-2 bg-card rounded border sm:col-span-2">5. Menyatukan dua keluarga besar serta mengukuhkan silaturahim.</div>
                        </div>
                      </div>
                    )}

                    {currentChapter.id === 6 && (
                      <div className="text-left space-y-2 text-xs font-sans">
                        <p className="font-semibold text-center text-muted-foreground mb-2">Pecahan 5 Hukum Nikah:</p>
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex justify-between items-center p-1.5 bg-card rounded border"><span className="font-bold text-red-500">Wajib:</span> Mampu & takut terjatuh ke lembah zina</div>
                          <div className="flex justify-between items-center p-1.5 bg-card rounded border"><span className="font-bold text-emerald-500">Sunat:</span> Mampu & mempunyai keinginan berkahwin</div>
                          <div className="flex justify-between items-center p-1.5 bg-card rounded border"><span className="font-bold text-amber-500">Harus:</span> Tiada desakan & tidak memudaratkan</div>
                          <div className="flex justify-between items-center p-1.5 bg-card rounded border"><span className="font-bold text-orange-500">Makruh:</span> Bimbang tidak dapat penuhi hak isteri</div>
                          <div className="flex justify-between items-center p-1.5 bg-card rounded border"><span className="font-bold text-rose-600">Haram:</span> Niat zalim / memudaratkan pasangan</div>
                        </div>
                      </div>
                    )}

                    {currentChapter.id === 7 && (
                      <div className="text-left space-y-2 text-xs font-sans">
                        <p className="font-semibold text-center text-muted-foreground mb-2">Syarat & Pembahagian Wali:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                          <div className="p-2.5 bg-card rounded border">
                            <span className="font-bold text-primary block">Wali Nasab</span>
                            <p className="text-[10px] mt-1 text-muted-foreground">Wali yang mempunyai hubungan darah (Bapa, Datuk, Adik-beradik lelaki).</p>
                          </div>
                          <div className="p-2.5 bg-card rounded border">
                            <span className="font-bold text-primary block">Wali Hakim</span>
                            <p className="text-[10px] mt-1 text-muted-foreground">Dilantik oleh Sultan/Pemerintah jika ketiadaan wali nasab atau wali enggan (syarat dipenuhi).</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {currentChapter.comicFolder && (
              <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full max-w-4xl border border-border/80 rounded-2xl overflow-hidden bg-card shadow-md">
                  
                  {!comicImageError ? (
                    <div 
                      className="relative w-full aspect-[4/3] bg-black flex items-center justify-center cursor-zoom-in group overflow-hidden"
                      onClick={() => setExpandedImage(`${currentChapter.comicFolder}ms ${comicPage}.jpg`)}
                    >
                      <img 
                        key={comicPage}
                        src={`${currentChapter.comicFolder}ms ${comicPage}.jpg`} 
                        alt={`Comic Page ${comicPage}`}
                        className="max-h-[650px] w-full object-contain transition-transform duration-200 group-hover:scale-[1.005]"
                        onError={() => setComicImageError(true)}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 flex items-center justify-center">
                        <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          Klik untuk besarkan komik
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950/20 dark:to-pink-900/10 flex flex-col items-center justify-center p-6 text-center border-b relative">
                      <FloralCorner className="top-0 left-0 w-8 h-8 opacity-10" />
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-primary">Ciri Pemilihan Calon (Halaman {comicPage}/{totalComicPages})</h4>
                      
                      {comicPage === 1 && (
                        <div className="space-y-2 max-w-sm mt-2 font-sans">
                          <p className="text-xs italic text-foreground">Panel 1: "Kepentingan Agama Lebih Utama"</p>
                          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                            "Seorang wanita dinikahi kerana empat perkara: hartanya, keturunannya, kecantikannya, dan agamanya. Pilihlah yang beragama nescaya kamu beruntung." (Hadis Sahih)
                          </p>
                        </div>
                      )}
                      {comicPage === 2 && (
                        <div className="space-y-2 max-w-sm mt-2 font-sans">
                          <p className="text-xs italic text-foreground">Panel 2: "Kriteria Calon Suami"</p>
                          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                            Memiliki pegangan agama kukuh, akhlak mulia, bertanggungjawab menyediakan nafkah, dan berkemampuan memimpin isteri ke arah kebaikan.
                          </p>
                        </div>
                      )}
                      {comicPage === 3 && (
                        <div className="space-y-2 max-w-sm mt-2 font-sans">
                          <p className="text-xs italic text-foreground">Panel 3: "Kriteria Calon Isteri"</p>
                          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                            Berakhlak sopan, penyayang, subur keturunannya, beragama, serta menjadi penyejuk mata (sakinah) buat bakal suami.
                          </p>
                        </div>
                      )}
                      {comicPage === 4 && (
                        <div className="space-y-2 max-w-sm mt-2 font-sans">
                          <p className="text-xs italic text-foreground">Panel 4: "Bina Baitul Muslim"</p>
                          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                            Kesefahaman yang dibina atas dasar taat kepada Allah akan membuahkan sebuah mahligai perkahwinan yang mawaddah dan warahmah.
                          </p>
                        </div>
                      )}

                      <div className="mt-4 text-[9px] text-muted-foreground bg-background/60 px-2 py-1 rounded font-sans">
                        Mencari fail komik: <code className="text-primary">{currentChapter.comicFolder}ms {comicPage}.jpg</code>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-secondary/35 flex items-center justify-between font-sans">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleComicPrev} 
                      disabled={comicPage === 1}
                      className="gap-1 text-xs"
                    >
                      <ChevronLeft className="w-4 h-4" /> Sebelum
                    </Button>
                    <span className="text-xs font-semibold">
                      Halaman {comicPage} dari {totalComicPages}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleComicNext} 
                      disabled={comicPage === totalComicPages}
                      className="gap-1 text-xs"
                    >
                      Seterusnya <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </Card>

      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setExpandedImage(null)}
        >
          <button 
            onClick={() => setExpandedImage(null)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors border border-white/25 z-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {currentChapter.comicFolder && (
            <div className="absolute inset-x-4 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-50">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  const newPage = comicPage > 1 ? comicPage - 1 : totalComicPages;
                  setComicPage(newPage);
                  setExpandedImage(`${currentChapter.comicFolder}ms ${newPage}.jpg`);
                }}
                className="h-14 w-14 rounded-full border-white/20 bg-black/50 text-white hover:bg-black/80 hover:text-white pointer-events-auto transition-all active:scale-95"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  const newPage = comicPage < totalComicPages ? comicPage + 1 : 1;
                  setComicPage(newPage);
                  setExpandedImage(`${currentChapter.comicFolder}ms ${newPage}.jpg`);
                }}
                className="h-14 w-14 rounded-full border-white/20 bg-black/50 text-white hover:bg-black/80 hover:text-white pointer-events-auto transition-all active:scale-95"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </div>
          )}

          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img 
              src={expandedImage} 
              alt="Expanded view" 
              className={`max-w-full max-h-full object-contain rounded-xl shadow-2xl ${
                currentChapter.comicFolder ? 'cursor-pointer' : 'cursor-default'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (currentChapter.comicFolder) {
                  const newPage = comicPage < totalComicPages ? comicPage + 1 : 1;
                  setComicPage(newPage);
                  setExpandedImage(`${currentChapter.comicFolder}ms ${newPage}.jpg`);
                }
              }}
            />
            {currentChapter.comicFolder && (
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full pointer-events-none font-sans">
                Halaman {comicPage} / {totalComicPages}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// NIKAH EDU & QUESTIONNAIRE PAGE
// ----------------------------------------------------
interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

function NikahEduPage() {
  const links = [
    {
      title: 'Portal e-Syariah Malaysia',
      desc: 'Rujukan kes-kes mahkamah syariah dan pendaftaran urusan undang-undang keluarga Islam.',
      url: 'https://www.esyariah.gov.my/',
      category: 'Undang-undang'
    },
    {
      title: 'JAKIM - Portal Islam.gov.my',
      desc: 'Panduan rasmi keagamaan, garis panduan khutbah, halal, dan perkhidmatan kekeluargaan Islam.',
      url: 'https://www.islam.gov.my/',
      category: 'Rujukan Agama'
    },
    {
      title: 'Sppim (Sistem Pengurusan Perkahwinan Islam Malaysia)',
      desc: 'Urusan permohonan kebenaran berkahwin online dan modul kursus perkahwinan digital.',
      url: 'http://www.sppim.gov.my/',
      category: 'Pendaftaran Nikah'
    },
    {
      title: 'Jabatan Kehakiman Syariah Malaysia (JKSM)',
      desc: 'Maklumat panduan urusan perkahwinan, penceraian, dan tuntutan nafkah bagi umat Islam.',
      url: 'https://www.jksm.gov.my/',
      category: 'Kehakiman & Fiqh'
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in relative overflow-hidden">
      <FloralWatermark className="top-10 right-10 w-80 h-80 opacity-[0.035]" />
      
      {/* Header */}
      <div className="text-center md:text-left">
        <h2 className="font-serif text-3xl font-bold tracking-tight">Nikah Edu</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Akses pautan-pautan rujukan rasmi undang-undang keluarga Islam serta uji kefahaman anda menerusi modul kuiz interaktif.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left Column: Link List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-primary/10 rounded-md text-primary">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="font-serif text-xl font-bold">Pautan Rujukan Rasmi</h3>
          </div>

          <div className="space-y-4">
            {links.map((link, idx) => (
              <Card key={idx} className="p-5 border border-border/60 hover:border-primary/20 hover:shadow-sm transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-bold py-0.5 px-2 bg-secondary/40 text-muted-foreground">
                    {link.category}
                  </Badge>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <h4 className="font-serif text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {link.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  {link.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Quiz (Selamat Jawab) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-primary/10 rounded-md text-primary">
              <ClipboardList className="w-5 h-5" />
            </span>
            <h3 className="font-serif text-xl font-bold">Selamat Jawab</h3>
          </div>

          <Card className="p-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col items-center justify-center text-center space-y-5 min-h-[350px] relative overflow-hidden floral-card">
            <FloralCorner className="top-0 right-0 rotate-90" />
            <FloralCorner className="bottom-0 left-0 -rotate-90" />
            
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary relative z-10">
              <ClipboardList className="w-8 h-8" />
            </div>
            
            <div className="space-y-2 relative z-10">
              <h4 className="font-serif text-xl font-bold text-foreground">Kuiz Perkara Asas Perkahwinan Islam</h4>
              <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mx-auto">
                Uji kefahaman anda mengenai hukum, rukun, dan dalil perkahwinan Islam menerusi aktiviti interaktif di platform Educaplay.
              </p>
            </div>

            <a
              href="https://www.educaplay.com/learning-resources/29532851-kuiz_perkara_asas_perkahwinan_islam.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-95 z-10"
            >
              Mula Kuiz Educaplay <ExternalLink className="w-4 h-4" />
            </a>
          </Card>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// TENTANG KAMI PAGE COMPONENT (Ahli Kumpulan)
// ----------------------------------------------------
function TentangKamiPage() {
  const members = [
    {
      name: '',
      role: 'Ketua Kumpulan & Penyunting Video',
      desc: 'Menyelaras keseluruhan pembangunan aplikasi web serta mengunting video animasi Powtoon & Plotagon.',
      initials: 'AY',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    {
      name: '',
      role: 'Pereka Infografik & Komik',
      desc: 'Melakar peta minda interaktif, mengarang dialog komik pemilihan calon, dan menghasilkan visual nota fiqh.',
      initials: 'AN',
      color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20'
    },
    {
      name: '',
      role: 'Penyelidik Kandungan & Rujukan Syarak',
      desc: 'Memastikan kesahihan dalil hukum, menyaring sukatan Fiqh perkahwinan SPM, dan menyusun soalan kuiz.',
      initials: 'HK',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in relative overflow-hidden">
      <FloralWatermark className="bottom-10 left-10 w-80 h-80 opacity-[0.035]" />

      {/* Header */}
      <div className="text-center md:text-left">
        <h2 className="font-serif text-3xl font-bold tracking-tight">Tentang Kami</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Kenali barisan ahli kumpulan di sebalik pembangunan portal pembelajaran digital Mahligai Cinta.
        </p>
      </div>

      <Card className="p-8 border border-border bg-gradient-to-br from-card via-card to-primary/5">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-10">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Profil Kumpulan</Badge>
          <h3 className="font-serif text-2xl font-bold">Tenaga Kreatif Mahligai Cinta</h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Kami merupakan pasukan pelajar dan pendidik yang berazam untuk memodenkan cara pengajaran Fiqh Perkahwinan melalui kaedah didik hibur bersesuaian dengan standard pembelajaran Pembelajaran Abad Ke-21 (PAK21).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {members.map((member, idx) => (
            <Card key={idx} className="p-6 border border-border/60 hover:shadow-md transition-all text-center flex flex-col justify-between">
              <div>
                <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-lg font-bold border mb-4 ${member.color}`}>
                  {member.initials}
                </div>
                <h4 className="font-serif text-base font-bold text-foreground">
                  {member.name}
                </h4>
                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-wider mt-1 px-2.5 py-0.5 border-primary/20 bg-primary/5 text-primary">
                  {member.role}
                </Badge>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-4">
                  {member.desc}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t text-[10px] text-muted-foreground/60 font-semibold uppercase">
                Ahli Kumpulan 0{idx + 1}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
