import React from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'home' | 'how-it-works' | 'categories' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-emerald-950/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                ★
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                SmartSahulat <span className="text-emerald-500">AI</span>
              </span>
            </div>
            <p className="text-xs text-amber-400 font-semibold tracking-wide uppercase">
              Tell Us Your Problem. We&apos;ll Help You Take the Next Step.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A Generative AI-powered citizen assistant for Pakistani citizens. Understands everyday problems in Urdu, English, and Roman Urdu, recommends practical steps, and drafts formal complaints for official authorities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Explore &amp; Guide
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-white transition-colors"
                >
                  AI Problem Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works (6 Steps)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('categories')}
                  className="hover:text-white transition-colors"
                >
                  Public Service Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-white transition-colors"
                >
                  About Our Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Public Services Supported */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Supported Domains
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Electricity &amp; DISCOs (LESCO, K-Electric)</li>
              <li>• Gas &amp; Water (SNGPL, SSGC, WASA)</li>
              <li>• Identity &amp; Documents (NADRA, Passport)</li>
              <li>• Healthcare &amp; Sehat Sahulat</li>
              <li>• Education &amp; Degree Attestation</li>
              <li>• Labour, Wages &amp; Pension (EOBI)</li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed mb-6">
          <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            General Informational Guidance Disclaimer:
          </p>
          SmartSahulat AI is an informational civic assistance system. It does not replace official government circulars, statutory instructions, or formal legal advice. Public service procedures and requirements may vary by jurisdiction. Please verify critical requirements with the relevant official department or authority.
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} SmartSahulat AI • Built for Pakistani Citizens</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Powered by</span>
            <span className="font-bold text-emerald-400">Google Gemini</span>
            <span>&amp; Antigravity</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
