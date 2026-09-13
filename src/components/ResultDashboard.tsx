import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Compass,
  Zap,
  Droplets,
  Building2,
  GraduationCap,
  HeartPulse,
  Briefcase,
  FileText,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { AnalysisResult, ProblemCategory } from '../types';
import { ComplaintEditor } from './ComplaintEditor';

interface ResultDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
  onRegenerateComplaint: (targetLanguage: 'en' | 'ur', customDetails?: string) => Promise<void>;
  isRegeneratingComplaint: boolean;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  result,
  onReset,
  onRegenerateComplaint,
  isRegeneratingComplaint,
}) => {
  const [copiedPlan, setCopiedPlan] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  const getCategoryIcon = (cat: ProblemCategory) => {
    switch (cat) {
      case 'Electricity / Utility':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Gas / Water':
        return <Droplets className="w-5 h-5 text-sky-500" />;
      case 'Government Services':
        return <Building2 className="w-5 h-5 text-emerald-600" />;
      case 'Education':
        return <GraduationCap className="w-5 h-5 text-indigo-500" />;
      case 'Healthcare':
        return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'Employment':
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  const handleCopySummary = async () => {
    const summaryText = `SmartSahulat AI - Citizen Action Plan
----------------------------------------
Problem: ${result.problemDetected}
Category: ${result.category}

Summary:
${result.summary}

WHAT SHOULD I DO NEXT?
${result.nextStep}

Recommended Steps:
${result.recommendedSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

Required Documents:
${result.requiredDocuments.map((doc) => `- [${doc.status}] ${doc.name} ${doc.details ? `(${doc.details})` : ''}`).join('\n')}

Important Note:
${result.importantNote}`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedPlan(true);
      setTimeout(() => setCopiedPlan(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const scrollToComplaint = () => {
    document.getElementById('complaint-generator-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Action Bar & Journey Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              Analysis Completed
            </span>
            {result.source === 'gemini' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Gemini Powered
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review the practical action plan, gather documents, and customize your complaint below.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            id="top-start-new-btn"
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start New Problem</span>
          </button>
          <button
            id="top-copy-plan-btn"
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            {copiedPlan ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPlan ? 'Plan Copied!' : 'Copy Plan'}</span>
          </button>
          <button
            id="top-jump-complaint-btn"
            type="button"
            onClick={scrollToComplaint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span>View Complaint Draft</span>
          </button>
        </div>
      </div>

      {/* 1. Problem Detected & Category Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
            {getCategoryIcon(result.category)}
            <span>{result.category}</span>
          </div>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-medium text-slate-500">Citizen Service Redressal</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          {result.problemDetected}
        </h2>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-slate-900 mb-1 text-xs uppercase tracking-wider">Problem Summary:</p>
          <p>{result.summary}</p>
        </div>
      </div>

      {/* 2. CORE USP HIGHLIGHT: WHAT SHOULD I DO NEXT? */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-850 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/30 relative overflow-hidden">
        {/* Subtle accent emblem */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Compass className="w-36 h-36 text-amber-400" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            WHAT SHOULD I DO NEXT?
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-3">
            Your Immediate First Action Step:
          </h3>

          <p className="text-base sm:text-lg text-emerald-50 leading-relaxed font-medium bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-xl border border-white/15">
            {result.nextStep}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Prioritised to prevent unnecessary visits or costs
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Establishes verifiable written records
            </span>
          </div>
        </div>
      </div>

      {/* 3. Two-Column Grid: Possible Reasons & Recommended Action Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Possible Reasons */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Possible Reasons / Causes
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Potential factors contributing to this issue. These are presented as possibilities, not confirmed facts:
            </p>

            <ul className="space-y-2.5">
              {result.possibleReasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            *Ground verification required before determining legal liability.
          </div>
        </div>

        {/* Recommended Steps */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Recommended Action Plan
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Practical, sequential steps to resolve this grievance systematically:
            </p>

            <ol className="space-y-3">
              {result.recommendedSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 bg-slate-50/70 p-2.5 rounded-lg border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Always retain a signed duplicate or diary number when submitting documents.
          </div>
        </div>
      </div>

      {/* 4. Required Documents Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Document Readiness Checklist
              </h3>
              <p className="text-xs text-slate-500">
                Tick the documents you have prepared before heading to the office or submitting online
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 self-start sm:self-auto">
            {Object.values(checkedDocs).filter(Boolean).length} of {result.requiredDocuments.length} Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.requiredDocuments.map((doc, idx) => {
            const isChecked = !!checkedDocs[doc.name];
            const isMandatory = doc.status === 'Required';

            return (
              <div
                key={idx}
                onClick={() => toggleDoc(doc.name)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                  isChecked
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // Handled by parent div
                  className="mt-0.5 h-4 w-4 rounded-sm border-slate-300 text-emerald-800 focus:ring-emerald-700"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-xs sm:text-sm font-semibold ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {doc.name}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm shrink-0 ${
                        isMandatory
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  {doc.details && (
                    <p className="text-xs text-slate-500">{doc.details}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 mt-4">
          Note: Specific document requirements may vary by province or district. Verify with the relevant official department before submission.
        </p>
      </div>

      {/* 5. Complete Complaint / Application Generator */}
      <ComplaintEditor
        result={result}
        onRegenerate={onRegenerateComplaint}
        isRegenerating={isRegeneratingComplaint}
      />

      {/* 6. Official Safety Disclaimer & Important Note */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 text-xs text-slate-600 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-800 text-xs sm:text-sm">
            Important Information &amp; Official Disclaimer:
          </p>
          <p className="leading-relaxed text-slate-600">
            {result.importantNote}
          </p>
        </div>
      </div>

      {/* Bottom Floating/Fixed Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          id="bottom-start-new-btn"
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Another Problem Analysis</span>
        </button>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-semibold text-emerald-800 hover:underline text-center sm:text-right"
        >
          ↑ Back to top
        </button>
      </div>
    </div>
  );
};
