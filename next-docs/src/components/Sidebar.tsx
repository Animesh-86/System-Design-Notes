"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Book, FileText, File, Layers, ChevronRight, Search, Sun, Moon, Menu, X, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContentItem } from '@/lib/content';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAppStore } from '@/lib/store';

export function Sidebar({ items }: { items: ContentItem[] }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { sidebarOpen, setSidebarOpen, checklist } = useAppStore();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    lld: false,
    docx: true,
    pdf: true,
    resource: true,
  });

  // Load and apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [pathname, setSidebarOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const grouped = items.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const filteredGrouped = Object.entries(grouped).reduce((acc, [type, typeItems]) => {
    const filtered = typeItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[type] = filtered;
    }
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lld': return <Book className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
      case 'docx': return <FileText className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'pdf': return <File className="w-4 h-4 text-rose-500 dark:text-rose-400" />;
      case 'resource': return <Layers className="w-4 h-4 text-purple-500 dark:text-purple-400" />;
      default: return <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lld': return 'Low Level Design Course';
      case 'docx': return 'High Level Design (HLD)';
      case 'pdf': return 'Roadmaps & Diagrams';
      case 'resource': return 'Interview resources';
      default: return 'Other';
    }
  };

  const getChecklistIcon = (slug: string) => {
    const item = checklist[slug];
    if (!item) return <Circle className="w-3 h-3 text-gray-400/40 flex-shrink-0" />;
    switch (item.status) {
      case 'completed':
        return <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />;
      case 'in_progress':
        return <Clock className="w-3 h-3 text-amber-500 flex-shrink-0" />;
      default:
        return <Circle className="w-3 h-3 text-gray-400/40 flex-shrink-0" />;
    }
  };

  const getCompletionCount = (typeItems: ContentItem[]) => {
    const completed = typeItems.filter(item => checklist[item.slug]?.status === 'completed').length;
    return { completed, total: typeItems.length };
  };

  const isSearching = searchQuery.trim() !== '';

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={clsx(
          "md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white/80 dark:bg-[#141417]/80 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-lg transition-all duration-200 cursor-pointer",
          sidebarOpen && "opacity-0 pointer-events-none"
        )}
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={clsx(
        "h-screen overflow-hidden border-r border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl flex flex-col flex-shrink-0 z-40 transition-all duration-300",
        // Desktop
        "md:relative md:w-80",
        // Mobile
        "fixed top-0 left-0 w-80",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Brand Header */}
        <div className="p-5 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-black/20">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                S
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  System Design Hub
                </h1>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Learning Portal</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-1">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors shadow-sm cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search lessons & resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-xs text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Nav Content */}
        <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
          {Object.entries(filteredGrouped).map(([type, typeItems]) => {
            const isExpanded = isSearching || expandedSections[type];
            const { completed, total } = getCompletionCount(typeItems);
            
            return (
              <div key={type} className="border border-black/5 dark:border-white/5 rounded-xl bg-black/[0.005] dark:bg-white/[0.01] overflow-hidden">
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleSection(type)}
                  className="w-full flex items-center justify-between p-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5">
                      {getTypeIcon(type)}
                    </div>
                    <div>
                      <h2 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        {getTypeLabel(type)}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                          {typeItems.length} {typeItems.length === 1 ? 'item' : 'items'}
                        </span>
                        {completed > 0 && (
                          <span className="text-[10px] text-emerald-500 font-medium">
                            {completed}/{total} done
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 dark:text-gray-500"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-black/10"
                    >
                      <div className="p-2 space-y-0.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                        {typeItems.map(item => {
                          const isActive = pathname === `/docs/${item.slug}`;
                          return (
                            <Link
                              key={item.slug}
                              href={`/docs/${item.slug}`}
                              className={clsx(
                                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-150 relative",
                                isActive
                                  ? "bg-blue-500/10 dark:bg-gradient-to-r dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-300 font-semibold border border-blue-500/20 dark:border-blue-500/30"
                                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
                              )}
                            >
                              {getChecklistIcon(item.slug)}
                              <span className="truncate block flex-1" title={item.title}>
                                {item.title}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
        
        {/* User Footer */}
        <div className="p-3 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-black/20">
          <UserMenu />
        </div>
      </aside>
    </>
  );
}
