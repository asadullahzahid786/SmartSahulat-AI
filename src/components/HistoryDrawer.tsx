import React from 'react';
import { X, Clock, Trash2, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { AnalysisResult } from '../types';

export interface HistoryItem {
  id: string;
  timestamp: string;
  problemInput: string;
  result: AnalysisResult;
}

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
  onDeleteItem: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onClearHistory,
  onDeleteItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base text-white">Session History</h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                {history.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="font-semibold text-sm text-slate-700">No complaints saved yet</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                  Problems you analyze will appear here in your browser so you can easily review them later.
                </p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 hover:border-emerald-300 transition-all group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                      {item.result.category}
                    </span>
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1 line-clamp-1">
                    {item.result.problemDetected}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    &quot;{item.problemInput}&quot;
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectHistoryItem(item);
                        onClose();
                      }}
                      className="font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
                    >
                      <span>Load Action Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Delete from history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {history.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={onClearHistory}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900"
              >
                Clear All History
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
