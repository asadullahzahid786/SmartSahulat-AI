import React, { useState } from 'react';
import { ArrowRight, Sparkles, AlertCircle, X, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { InputLanguage, SampleProblem } from '../types';
import { SAMPLE_PROBLEMS } from '../data/samples';

interface HeroInputProps {
  problemText: string;
  setProblemText: (text: string) => void;
  selectedLanguage: InputLanguage;
  setSelectedLanguage: (lang: InputLanguage) => void;
  onSubmit: (problem: string, lang: InputLanguage) => void;
  isLoading: boolean;
  loadingStep: string;
  errorMessage: string | null;
  onHowItWorksClick: () => void;
}

export const HeroInput: React.FC<HeroInputProps> = ({
  problemText,
  setProblemText,
  selectedLanguage,
  setSelectedLanguage,
  onSubmit,
  isLoading,
  loadingStep,
  errorMessage,
  onHowItWorksClick,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const maxChars = 4000;
  const charsRemaining = maxChars - problemText.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problemText.trim().length >= 5 && !isLoading) {
      onSubmit(problemText, selectedLanguage);
    }
  };

  const handleSelectSample = (sample: SampleProblem) => {
    setProblemText(sample.text);
  };

  const isRtl = /[\u0600-\u06FF]/.test(problemText);

  return (
    <div className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white">
      {/* Decorative subtle texture & gold glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-amber-500 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Journey Breadcrumb */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-600/40 text-xs font-semibold text-emerald-100 backdrop-blur-xs">
            <span className="text-amber-400 font-bold">SMARTSAHULAT AI</span>
            <span className="text-emerald-400">•</span>
            <span>From Citizen's Problem to a Practical Action Plan</span>
          </div>
        </div>

        {/* Hero Title & Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Tell Us Your Problem.{' '}
            <span className="text-amber-400 block sm:inline">We'll Help You Take the Next Step.</span>
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
            Describe your public-service problem in <span className="text-white font-semibold">Urdu</span>,{' '}
            <span className="text-white font-semibold">English</span>, or{' '}
            <span className="text-white font-semibold">Roman Urdu</span>. Get an immediate analysis, required documents checklist, clear next action, and formal complaint draft.
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 text-xs font-medium text-emerald-200/80">
            <button
              onClick={onHowItWorksClick}
              className="inline-flex items-center gap-1 hover:text-white underline underline-offset-4 transition-colors"
            >
              Learn how the 5-step journey works →
            </button>
          </div>
        </div>

        {/* Journey steps indicator */}
        <div className="hidden sm:grid grid-cols-5 gap-2 max-w-3xl mx-auto mb-8 text-center text-xs font-semibold">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-200">
            1. PROBLEM
          </div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-200">
            2. UNDERSTAND
          </div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-200">
            3. GUIDE
          </div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-200">
            4. GENERATE
          </div>
          <div className="p-2 rounded-lg bg-white/10 border border-amber-400/40 text-amber-300 font-bold">
            5. TAKE ACTION
          </div>
        </div>

        {/* Problem Input Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-7 text-slate-900 border border-slate-200">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <label htmlFor="problem-textarea" className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 inline-block" />
                Describe your citizen problem:
              </label>

              {/* Language Selector */}
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span className="text-slate-500 hidden sm:inline">Language:</span>
                <select
                  id="problem-language-select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as InputLanguage)}
                  className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-md px-2.5 py-1.5 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                >
                  <option value="auto">Auto-detect Language</option>
                  <option value="en">English</option>
                  <option value="ur">اردو (Urdu)</option>
                  <option value="roman-urdu">Roman Urdu</option>
                </select>
              </div>
            </div>

            {/* Main Textarea */}
            <div className="relative">
              <textarea
                id="problem-textarea"
                rows={5}
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Describe your problem in Urdu, English or Roman Urdu... (e.g. Mera bijli ka bill bohat zyada aya hai, ya gas pressure ka masla hai...)"
                dir={isRtl ? 'rtl' : 'ltr'}
                maxLength={maxChars}
                disabled={isLoading}
                className={`w-full p-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base leading-relaxed focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden transition-all resize-y ${
                  isRtl ? 'font-serif text-right' : ''
                }`}
              />

              {/* Clear button */}
              {problemText.length > 0 && !isLoading && (
                <button
                  type="button"
                  id="clear-problem-input-btn"
                  onClick={() => setProblemText('')}
                  title="Clear input"
                  className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bottom Bar: Character count & Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3.5 pt-2">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>{charsRemaining} characters left</span>
                <span>•</span>
                <span className="text-slate-600">Supports mixed Urdu & English</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  id="submit-problem-btn"
                  disabled={isLoading || problemText.trim().length < 5}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base text-white shadow-md transition-all ${
                    isLoading || problemText.trim().length < 5
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                      : 'bg-emerald-800 hover:bg-emerald-700 active:scale-[0.99] shadow-emerald-900/20'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Analyzing Problem...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Problem &amp; Plan Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Loading step tracker */}
            {isLoading && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-700 border-t-transparent animate-spin" />
                  <div className="text-xs sm:text-sm font-semibold">
                    {loadingStep || 'SmartSahulat AI is processing your problem...'}
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Unable to process</p>
                  <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}
          </form>

          {/* Quick Preset Test Problems */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Or Try Sample Citizen Problems:
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">Click any prompt to test</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {SAMPLE_PROBLEMS.slice(0, 5).map((sample) => (
                <button
                  key={sample.id}
                  id={`sample-prompt-btn-${sample.id}`}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  disabled={isLoading}
                  className="text-left text-xs bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-slate-700 hover:text-emerald-950 px-3 py-2 rounded-lg transition-all"
                >
                  <span className="font-semibold text-emerald-800 mr-1.5">[{sample.language}]</span>
                  <span>{sample.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
