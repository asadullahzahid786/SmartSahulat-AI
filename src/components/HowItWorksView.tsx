import React from 'react';
import { ArrowRight, CheckCircle2, MessageSquare, Brain, Compass, FileText, CheckCheck, Sparkles } from 'lucide-react';

interface HowItWorksViewProps {
  onGetStarted: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onGetStarted }) => {
  const steps = [
    {
      num: '01',
      title: '1. Tell Us (Problem Input)',
      icon: MessageSquare,
      desc: 'Describe your everyday citizen challenge in your own words. Type in Urdu (اردو), English, or Roman Urdu (e.g. "Mera bijli ka bill bohat zyada aya hai"). No bureaucratic jargon needed.',
      highlight: 'Multilingual & natural language comprehension'
    },
    {
      num: '02',
      title: '2. Understand (AI Classification)',
      icon: Brain,
      desc: 'SmartSahulat AI parses your issue, identifies the governing public service category (Electricity, Gas, NADRA, WASA, Healthcare, Education, Labour), and produces a concise summary.',
      highlight: 'Identifies institutional jurisdiction'
    },
    {
      num: '03',
      title: '3. Guide (Possible Causes & Actions)',
      icon: Compass,
      desc: 'Rather than generic advice, the system outlines realistic potential reasons for the failure, and provides a clear, sequential, prioritized plan of action.',
      highlight: 'Realistic causes & actionable steps'
    },
    {
      num: '04',
      title: '4. Prepare (Document Readiness)',
      icon: FileText,
      desc: 'See an exact checklist of documents required by Pakistani departments (bills, CNIC copies, token slips, meter photos) distinguished by Mandatory vs Conditional.',
      highlight: 'Interactive document checklist'
    },
    {
      num: '05',
      title: '5. Generate (Official Application)',
      icon: Sparkles,
      desc: 'Instantly generate an officially phrased formal representation or complaint letter ready for submission, available in either formal English or Urdu (بخدمت جناب), with easy auto-fill.',
      highlight: 'Official Pakistani letter conventions'
    },
    {
      num: '06',
      title: '6. Act (What Should I Do Next?)',
      icon: CheckCheck,
      desc: 'The single most important takeaway: one unambiguous, immediate action step you can take right now to avoid pointless bureaucratic delays.',
      highlight: 'Immediate first step clarity'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
          <span>THE SMARTSAHULAT METHOD</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          How SmartSahulat AI Works
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          From a citizen&apos;s confusing public-service problem to a practical, step-by-step action plan and ready-to-submit official complaint.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-200">{step.num}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{step.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{step.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="bg-emerald-900 text-white rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl">
        <div className="mb-6 sm:mb-0 max-w-xl">
          <h3 className="text-2xl font-extrabold mb-2">Have a Public Service Problem?</h3>
          <p className="text-sm text-emerald-100">
            Tell us about your electricity bill, gas pressure, NADRA document, or hospital issue and let AI build your action plan.
          </p>
        </div>

        <button
          onClick={onGetStarted}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md active:scale-95"
        >
          <span>Try SmartSahulat Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
