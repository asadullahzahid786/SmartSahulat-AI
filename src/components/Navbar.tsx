import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, Layers, Info, History, Menu, X, Globe, Sparkles } from 'lucide-react';
import { InputLanguage } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'how-it-works' | 'categories' | 'about';
  setActiveTab: (tab: 'home' | 'how-it-works' | 'categories' | 'about') => void;
  selectedLanguage: InputLanguage;
  setSelectedLanguage: (lang: InputLanguage) => void;
  historyCount: number;
  onOpenHistory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  historyCount,
  onOpenHistory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'how-it-works' | 'categories' | 'about') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo and Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/15 group-hover:bg-emerald-700 transition-colors">
              <span className="text-xl font-bold tracking-tighter">★</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-emerald-950 font-sans">
                  SmartSahulat <span className="text-emerald-700">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Citizen Assistant
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden md:block">
                Tell Us Your Problem. We'll Help You Take the Next Step.
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-assistant-btn"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50'
              }`}
            >
              AI Assistant
            </button>
            <button
              id="nav-how-it-works-btn"
              onClick={() => handleNavClick('how-it-works')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'how-it-works'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              How It Works
            </button>
            <button
              id="nav-categories-btn"
              onClick={() => handleNavClick('categories')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'categories'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              Categories
            </button>
            <button
              id="nav-about-btn"
              onClick={() => handleNavClick('about')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50'
              }`}
            >
              <Info className="w-4 h-4" />
              About
            </button>
          </nav>

          {/* Right Controls: Language & History */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
              <button
                id="lang-auto-btn"
                type="button"
                onClick={() => setSelectedLanguage('auto')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedLanguage === 'auto' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Auto
              </button>
              <button
                id="lang-en-btn"
                type="button"
                onClick={() => setSelectedLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedLanguage === 'en' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                id="lang-ur-btn"
                type="button"
                onClick={() => setSelectedLanguage('ur')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedLanguage === 'ur' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                اردو
              </button>
              <button
                id="lang-roman-btn"
                type="button"
                onClick={() => setSelectedLanguage('roman-urdu')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedLanguage === 'roman-urdu' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Roman
              </button>
            </div>

            {/* History Button */}
            <button
              id="history-drawer-toggle-btn"
              onClick={onOpenHistory}
              title="View your saved complaints history"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 rounded-lg transition-colors relative"
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {historyCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="mobile-history-btn"
              onClick={onOpenHistory}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg relative"
              aria-label="History"
            >
              <History className="w-5 h-5" />
              {historyCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {historyCount}
                </span>
              )}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded-lg font-medium text-sm ${
                activeTab === 'home' ? 'bg-emerald-800 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              AI Citizen Assistant
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`text-left px-3 py-2 rounded-lg font-medium text-sm ${
                activeTab === 'how-it-works' ? 'bg-emerald-800 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className={`text-left px-3 py-2 rounded-lg font-medium text-sm ${
                activeTab === 'categories' ? 'bg-emerald-800 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Supported Public Services
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2 rounded-lg font-medium text-sm ${
                activeTab === 'about' ? 'bg-emerald-800 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              About SmartSahulat AI
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2">Preferred Response Language</p>
            <div className="grid grid-cols-4 gap-1.5">
              {(['auto', 'en', 'ur', 'roman-urdu'] as InputLanguage[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLanguage(l)}
                  className={`py-1.5 text-xs font-medium rounded-md text-center border ${
                    selectedLanguage === l
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {l === 'auto' ? 'Auto' : l === 'en' ? 'English' : l === 'ur' ? 'اردو' : 'Roman'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
