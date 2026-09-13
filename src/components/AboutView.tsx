import React from 'react';
import { ShieldCheck, Heart, Sparkles, Lock, AlertCircle, CheckCircle2, Globe2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
          <span>CITIZEN EMPOWERMENT MISSION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          About SmartSahulat AI
        </h2>
        <p className="text-base text-slate-600 leading-relaxed">
          Bridging the gap between ordinary citizens and complex Pakistani public service bureaucracies through respectful, intelligent, and action-oriented AI.
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          The Core Problem We Solve
        </h3>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
          Every day in Pakistan, millions of citizens face billing disputes, sudden utility disconnections, document backlogs at NADRA or the passport office, contaminated municipal water, or denied hospital entitlements. Most citizens do not know where to start, what documents they need to carry, or how to draft an official formal representation.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          SmartSahulat AI replaces the frustrating cycle of unguided office visits with a transparent 5-stage pipeline: <strong className="text-emerald-900">PROBLEM → UNDERSTAND → GUIDE → GENERATE → TAKE ACTION</strong>.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
            <Globe2 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">True Multilingual Inclusion</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pakistani citizens naturally express grievances in colloquial Urdu, English, or Roman Urdu (e.g. <em>&quot;Mera bijli ka bill bohat zyada aya hai&quot;</em>). SmartSahulat AI understands natural dialects without requiring bureaucratic phrasing.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Anti-Hallucination Discipline</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            We strictly forbid inventing artificial fees, fabricated telephone numbers, non-existent gazettes, or fake departmental regulations. Where ground requirements vary, we explicitly instruct verification.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Guest-First &amp; Privacy Protected</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zero mandatory login walls, passwords, or telephone verification. We do not store citizen CNICs or personal contact records in remote databases. Complaint auto-fill executes strictly inside your browser.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Always an Action Plan</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generic chatbots output walls of unhelpful text. SmartSahulat AI always answers the definitive question: <strong className="text-slate-900">&quot;What should I do right now?&quot;</strong> alongside a ready-to-print official complaint.
          </p>
        </div>
      </div>

      {/* Official Disclaimer Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          Official Status &amp; Legal Notice
        </div>
        <p className="leading-relaxed">
          SmartSahulat AI is an independent, non-governmental public interest civic tech solution powered by Google Gemini and generative AI. It is NOT an official government portal. It provides informational guidance and document drafting assistance to help citizens advocate for their legitimate rights. Always verify deadlines, statutory requirements, and submission desks with the relevant official department.
        </p>
      </div>
    </div>
  );
};
