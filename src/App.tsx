import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroInput } from './components/HeroInput';
import { ResultDashboard } from './components/ResultDashboard';
import { HowItWorksView } from './components/HowItWorksView';
import { CategoriesView } from './components/CategoriesView';
import { AboutView } from './components/AboutView';
import { HistoryDrawer, HistoryItem } from './components/HistoryDrawer';
import { Footer } from './components/Footer';
import { AnalysisResult, InputLanguage } from './types';

const LOCAL_STORAGE_KEY = 'smartsahulat_history_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'how-it-works' | 'categories' | 'about'>('home');
  const [problemText, setProblemText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<InputLanguage>('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isRegeneratingComplaint, setIsRegeneratingComplaint] = useState(false);

  // History state
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read history from localStorage', e);
    }
  }, []);

  // Save history helper
  const saveToHistory = (problemInput: string, res: AnalysisResult) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      problemInput,
      result: res,
    };
    const updated = [newItem, ...history.slice(0, 19)]; // keep up to 20
    setHistory(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear history', e);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not update history', e);
    }
  };

  // Submit problem for analysis
  const handleAnalyzeProblem = async (text: string, lang: InputLanguage) => {
    setIsLoading(true);
    setErrorMessage(null);
    setLoadingStep('Understanding your problem in Urdu / English...');

    // Progress animation timers
    const timer1 = setTimeout(() => {
      setLoadingStep('Analyzing category, jurisdiction, and potential causes...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setLoadingStep('Preparing practical action steps and document checklist...');
    }, 2400);

    const timer3 = setTimeout(() => {
      setLoadingStep('Formulating immediate next steps and drafting formal complaint...');
    }, 3800);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem: text,
          language: lang,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      saveToHistory(text, data);
      setActiveTab('home');

      // Scroll to result smoothly
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(
        err.message || "We couldn't connect to the service. Please check your connection and try again."
      );
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  // Regenerate complaint in specific language
  const handleRegenerateComplaint = async (targetLanguage: 'en' | 'ur', customDetails?: string) => {
    if (!result) return;
    setIsRegeneratingComplaint(true);
    try {
      const response = await fetch('/api/generate-complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemDetected: result.problemDetected,
          category: result.category,
          summary: result.summary,
          targetLanguage,
          customDetails,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to regenerate complaint');
      }

      const data = await response.json();
      if (data.complaintDraft) {
        setResult({
          ...result,
          complaintDraft: data.complaintDraft,
          detectedLanguage: targetLanguage,
        });
      }
    } catch (err) {
      console.error('Complaint regeneration error:', err);
    } finally {
      setIsRegeneratingComplaint(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setProblemText('');
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryPrompt = (sampleText: string) => {
    setProblemText(sampleText);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setProblemText(item.problemInput);
    setResult(item.result);
    setActiveTab('home');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-emerald-800 selection:text-white">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        historyCount={history.length}
        onOpenHistory={() => setHistoryDrawerOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Always display Hero Input for prompt entry or adjustment */}
            <HeroInput
              problemText={problemText}
              setProblemText={setProblemText}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              onSubmit={handleAnalyzeProblem}
              isLoading={isLoading}
              loadingStep={loadingStep}
              errorMessage={errorMessage}
              onHowItWorksClick={() => setActiveTab('how-it-works')}
            />

            {/* Results Dashboard if an analysis exists */}
            {result && (
              <div className="animate-in fade-in duration-300">
                <ResultDashboard
                  result={result}
                  onReset={handleReset}
                  onRegenerateComplaint={handleRegenerateComplaint}
                  isRegeneratingComplaint={isRegeneratingComplaint}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksView onGetStarted={() => setActiveTab('home')} />
        )}

        {activeTab === 'categories' && (
          <CategoriesView onSelectCategoryPrompt={handleSelectCategoryPrompt} />
        )}

        {activeTab === 'about' && <AboutView />}
      </main>

      {/* History Slide-over Drawer */}
      <HistoryDrawer
        isOpen={historyDrawerOpen}
        onClose={() => setHistoryDrawerOpen(false)}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onClearHistory={handleClearHistory}
        onDeleteItem={handleDeleteHistoryItem}
      />

      {/* Footer */}
      <Footer onNavClick={(tab) => setActiveTab(tab)} />
    </div>
  );
}
