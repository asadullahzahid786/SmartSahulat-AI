import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  Printer,
  Edit3,
  SlidersHorizontal,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface ComplaintEditorProps {
  result: AnalysisResult;
  onRegenerate: (targetLanguage: 'en' | 'ur', customDetails?: string) => Promise<void>;
  isRegenerating: boolean;
}

export const ComplaintEditor: React.FC<ComplaintEditorProps> = ({
  result,
  onRegenerate,
  isRegenerating,
}) => {
  const [complaintText, setComplaintText] = useState(result.complaintDraft);
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<'en' | 'ur'>(
    result.detectedLanguage === 'ur' ? 'ur' : 'en'
  );
  const [showAutofillModal, setShowAutofillModal] = useState(false);

  // Autofill fields for quick placeholder replacement
  const [autofillData, setAutofillData] = useState({
    name: '',
    cnic: '',
    refNumber: '',
    phone: '',
    address: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Keep complaint text in sync if result changes
  React.useEffect(() => {
    setComplaintText(result.complaintDraft);
  }, [result.complaintDraft]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(complaintText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadTxt = () => {
    const filename = `SmartSahulat_Complaint_${result.category.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.txt`;
    const element = document.createElement('a');
    const file = new Blob([complaintText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${result.complaintType} - SmartSahulat AI</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; line-height: 1.6; color: #111; }
            pre { white-space: pre-wrap; font-family: inherit; font-size: 14pt; }
            .header { border-bottom: 2px solid #064e3b; padding-bottom: 12px; margin-bottom: 24px; }
            .header h1 { margin: 0; color: #064e3b; font-size: 18pt; }
            .header p { margin: 4px 0 0; color: #555; font-size: 10pt; }
            .footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #ccc; font-size: 9pt; color: #777; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SmartSahulat AI - Citizen Application Draft</h1>
            <p>Category: ${result.category} | Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <pre>${complaintText}</pre>
          <div class="footer">
            Generated via SmartSahulat AI (www.smartsahulat.pk) • Verify official requirements with relevant department.
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 300);
    }
  };

  const applyAutofill = () => {
    let text = complaintText;
    if (autofillData.name.trim()) {
      text = text.replaceAll(/\[Applicant Name\]/gi, autofillData.name.trim());
      text = text.replaceAll(/\[نام سائل\]/gi, autofillData.name.trim());
    }
    if (autofillData.cnic.trim()) {
      text = text.replaceAll(/\[CNIC Number\]/gi, autofillData.cnic.trim());
      text = text.replaceAll(/\[CNIC \/ ID Number\]/gi, autofillData.cnic.trim());
      text = text.replaceAll(/\[شناختی کارڈ نمبر\]/gi, autofillData.cnic.trim());
    }
    if (autofillData.refNumber.trim()) {
      text = text.replaceAll(/\[Consumer \/ Reference Number\]/gi, autofillData.refNumber.trim());
      text = text.replaceAll(/\[Consumer Account \/ Reference No\]/gi, autofillData.refNumber.trim());
      text = text.replaceAll(/\[Application Token Slip\]/gi, autofillData.refNumber.trim());
      text = text.replaceAll(/\[ریفرنس \/ صارف نمبر\]/gi, autofillData.refNumber.trim());
    }
    if (autofillData.phone.trim()) {
      text = text.replaceAll(/\[Contact Number\]/gi, autofillData.phone.trim());
      text = text.replaceAll(/\[رابطہ نمبر\]/gi, autofillData.phone.trim());
    }
    if (autofillData.address.trim()) {
      text = text.replaceAll(/\[Address\]/gi, autofillData.address.trim());
      text = text.replaceAll(/\[مکمل پتہ\]/gi, autofillData.address.trim());
      text = text.replaceAll(/\[پتہ\]/gi, autofillData.address.trim());
    }
    if (autofillData.date) {
      text = text.replaceAll(/\[Date\]/gi, autofillData.date);
      text = text.replaceAll(/\[تاریخ\]/gi, autofillData.date);
    }

    setComplaintText(text);
    setShowAutofillModal(false);
  };

  const handleLanguageSwitch = async (lang: 'en' | 'ur') => {
    if (lang === activeLang) return;
    setActiveLang(lang);
    await onRegenerate(lang);
  };

  const isUrdu = /[\u0600-\u06FF]/.test(complaintText);

  return (
    <div id="complaint-generator-section" className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
      {/* Header bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Official Complaint / Application Generator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            {result.complaintType || 'Formal Citizen Representation Document'}
          </p>
        </div>

        {/* Language Tabs for Complaint */}
        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700 self-start sm:self-auto">
          <span className="text-xs text-slate-400 ml-2 hidden sm:inline">Draft in:</span>
          <button
            id="draft-lang-en-btn"
            type="button"
            disabled={isRegenerating}
            onClick={() => handleLanguageSwitch('en')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeLang === 'en'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            id="draft-lang-ur-btn"
            type="button"
            disabled={isRegenerating}
            onClick={() => handleLanguageSwitch('ur')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeLang === 'ur'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            اردو (Urdu)
          </button>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <button
            id="open-autofill-btn"
            type="button"
            onClick={() => setShowAutofillModal(!showAutofillModal)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
            <span>Fill My Details (Auto-Replace [Placeholders])</span>
          </button>

          <span className="text-slate-400 hidden md:inline">|</span>
          <span className="text-slate-500 hidden md:inline">
            Editable text • Bracketed items are placeholders
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Copy Button */}
          <button
            id="copy-complaint-btn"
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 font-bold rounded-lg transition-all ${
              copied
                ? 'bg-emerald-700 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied Successfully!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Download TXT */}
          <button
            id="download-complaint-txt-btn"
            type="button"
            onClick={handleDownloadTxt}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-medium bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg transition-colors"
            title="Download formatted text document"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Download .TXT</span>
            <span className="sm:hidden">TXT</span>
          </button>

          {/* Print */}
          <button
            id="print-complaint-btn"
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-medium bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg transition-colors"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Regenerate */}
          <button
            id="regenerate-complaint-btn"
            type="button"
            disabled={isRegenerating}
            onClick={() => onRegenerate(activeLang)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-medium bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg transition-colors disabled:opacity-50"
            title="Regenerate complaint draft with AI"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-slate-600 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Regenerate</span>
          </button>
        </div>
      </div>

      {/* Auto-fill Helper Drawer/Panel */}
      {showAutofillModal && (
        <div className="bg-emerald-50/70 border-b border-emerald-200 p-4 transition-all">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-emerald-800" />
                Quick Placeholder Auto-Fill:
              </h4>
              <button
                type="button"
                onClick={() => setShowAutofillModal(false)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-emerald-900 mb-3">
              Enter your details below and click &quot;Replace Placeholders&quot;. SmartSahulat AI never sends your personal data to any external server.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Applicant Name</label>
                <input
                  type="text"
                  placeholder="e.g. Muhammad Asad"
                  value={autofillData.name}
                  onChange={(e) => setAutofillData({ ...autofillData, name: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">CNIC Number</label>
                <input
                  type="text"
                  placeholder="e.g. 35202-XXXXXXX-X"
                  value={autofillData.cnic}
                  onChange={(e) => setAutofillData({ ...autofillData, cnic: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Consumer / Ref No.</label>
                <input
                  type="text"
                  placeholder="e.g. 14-11223-XXXXXXX"
                  value={autofillData.refNumber}
                  onChange={(e) => setAutofillData({ ...autofillData, refNumber: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  placeholder="e.g. 0300-XXXXXXX"
                  value={autofillData.phone}
                  onChange={(e) => setAutofillData({ ...autofillData, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Postal Address / City</label>
                <input
                  type="text"
                  placeholder="e.g. House 12, Street 4, Lahore"
                  value={autofillData.address}
                  onChange={(e) => setAutofillData({ ...autofillData, address: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Application Date</label>
                <input
                  type="date"
                  value={autofillData.date}
                  onChange={(e) => setAutofillData({ ...autofillData, date: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={applyAutofill}
                className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
              >
                Apply Details to Complaint Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Main Content Area */}
      <div className="p-4 sm:p-6">
        <textarea
          id="complaint-draft-textarea"
          rows={16}
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          dir={isUrdu ? 'rtl' : 'ltr'}
          className={`w-full p-4 sm:p-5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 font-mono text-xs sm:text-sm leading-relaxed focus:bg-white focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 focus:outline-hidden transition-all resize-y ${
            isUrdu ? 'font-serif text-right text-base leading-loose' : ''
          }`}
        />
        <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
          <span>{complaintText.length} characters</span>
          <span>Tip: You can edit or paste extra details directly in the box above</span>
        </div>
      </div>
    </div>
  );
};
