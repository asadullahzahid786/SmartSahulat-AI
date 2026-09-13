import React from 'react';
import {
  Zap,
  Droplets,
  Building2,
  GraduationCap,
  HeartPulse,
  Briefcase,
  FileText,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';
import { ProblemCategory } from '../types';

interface CategoriesViewProps {
  onSelectCategoryPrompt: (sampleText: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategoryPrompt }) => {
  const getIcon = (name: ProblemCategory) => {
    switch (name) {
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

  const getSampleTextForCategory = (cat: ProblemCategory): string => {
    switch (cat) {
      case 'Electricity / Utility':
        return "My electricity bill is three times higher this month. I don't understand why. What should I do?";
      case 'Gas / Water':
        return 'Our neighborhood has experienced zero gas pressure for the last five days during cooking hours. What is the immediate step to complain?';
      case 'Government Services':
        return 'Maine NADRA office se normal CNIC renewal ke liye apply kiya tha, 6 hafte guzar chuke hain lekin status abhi bhi pending hai.';
      case 'Education':
        return 'My university transcript and degree verification has been delayed for over two months. Need help filing an application to HEC/controller.';
      case 'Healthcare':
        return 'Public hospital refused treatment and free medicines stating their Sehat Sahulat card portal is not working. What are my citizen rights?';
      case 'Employment':
        return 'My employer has withheld my salary and final settlement for the last 3 months without any official explanation.';
      default:
        return 'Street lights in our lane have been broken for months and garbage is piling up on the public road without municipal collection.';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
          <span>PUBLIC JURISDICTIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Supported Citizen Service Categories
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          SmartSahulat AI specializes in resolving grievances across Pakistan&apos;s most critical public services and regulatory bodies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getIcon(cat.name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{cat.name}</h3>
                    <p className="text-xs text-emerald-800 font-serif font-bold">{cat.urduName}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {cat.description}
              </p>

              {/* Authorities */}
              <div className="mb-4">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Relevant Departments &amp; Providers:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.authorities.map((auth) => (
                    <span
                      key={auth}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                    >
                      {auth}
                    </span>
                  ))}
                </div>
              </div>

              {/* Common Issues */}
              <div className="mb-4">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Frequent Grievances:
                </p>
                <ul className="space-y-1">
                  {cat.commonIssues.slice(0, 3).map((issue, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onSelectCategoryPrompt(getSampleTextForCategory(cat.name))}
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <span>Analyze a Problem in this Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
