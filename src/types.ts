export type ProblemCategory =
  | 'Electricity / Utility'
  | 'Gas / Water'
  | 'Education'
  | 'Healthcare'
  | 'Government Services'
  | 'Employment'
  | 'General Public Complaints';

export interface RequiredDocument {
  name: string;
  status: 'Required' | 'May Be Required';
  details?: string;
}

export interface AnalysisResult {
  problemDetected: string;
  category: ProblemCategory;
  summary: string;
  possibleReasons: string[];
  recommendedSteps: string[];
  requiredDocuments: RequiredDocument[];
  nextStep: string;
  complaintType: string;
  complaintDraft: string;
  importantNote: string;
  detectedLanguage?: 'en' | 'ur' | 'roman-urdu' | 'mixed';
  source?: 'gemini' | 'engine';
}

export type InputLanguage = 'auto' | 'en' | 'ur' | 'roman-urdu';

export interface SampleProblem {
  id: string;
  title: string;
  language: 'English' | 'اردو' | 'Roman Urdu';
  category: ProblemCategory;
  text: string;
}
