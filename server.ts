import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

// Lazy Google GenAI initialization
let genAiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!genAiClient) {
    genAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAiClient;
}

// Language detection helper
function detectInputLanguage(text: string): 'ur' | 'roman-urdu' | 'en' | 'mixed' {
  const urduCharRegex = /[\u0600-\u06FF]/;
  const urduCharCount = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const totalLength = text.trim().length;

  if (urduCharCount > totalLength * 0.3) {
    return 'ur';
  }

  const romanUrduKeywords = [
    'mera', 'meri', 'mere', 'hai', 'hain', 'ka', 'ki', 'ke', 'ko', 'se', 'par',
    'nahi', 'bohat', 'zyada', 'bill', 'bijli', 'gas', 'paani', 'kya', 'karun',
    'samajh', 'masla', 'hukumat', 'daftar', 'pesey', 'tanaza', 'mahina', 'shikayat'
  ];

  const lower = text.toLowerCase();
  const matchedKeywords = romanUrduKeywords.filter(kw => new RegExp(`\\b${kw}\\b`, 'i').test(lower));

  if (matchedKeywords.length >= 2) {
    return 'roman-urdu';
  }

  if (urduCharCount > 0) {
    return 'mixed';
  }

  return 'en';
}

// Fallback rule-based Pakistani public service analyzer
function fallbackAnalysis(problem: string, selectedLang: string = 'auto') {
  const detected = detectInputLanguage(problem);
  const lang = selectedLang === 'auto' ? detected : selectedLang;
  const lower = problem.toLowerCase();

  let category = 'General Public Complaints';
  let problemDetected = 'Citizen Public Service Grievance';
  let summary = 'A public-service issue has been reported requiring institutional verification and formal recourse.';
  let possibleReasons = [
    'Administrative processing delay or backlog',
    'Procedural discrepancy between records and ground status',
    'Lack of initial notification from the service provider'
  ];
  let recommendedSteps = [
    'Gather all past bills, receipts, or relevant application tracking slips.',
    'Confirm the active status of your account or reference number with the official helpline or branch.',
    'Submit a formal written complaint with acknowledged receipt stamp at the local office.'
  ];
  let requiredDocuments = [
    { name: 'National Identity Card (CNIC / B-Form copy)', status: 'Required' as const, details: 'Proof of applicant identity' },
    { name: 'Relevant Reference / Consumer / Application Slip', status: 'Required' as const, details: 'Account number or tracking reference' },
    { name: 'Supporting Evidence / Recent Bills / Photographs', status: 'May Be Required' as const, details: 'Physical proof of problem or discrepancy' }
  ];
  let nextStep = 'Verify the latest record against your previous billing or application slip, then file a formal inquiry.';
  let complaintType = 'Formal Citizen Grievance Application';
  let complaintDraft = '';

  // 1. Electricity / Utility
  if (
    lower.includes('electric') || lower.includes('bijli') || lower.includes('lesco') ||
    lower.includes('kelectric') || lower.includes('k-electric') || lower.includes('mepco') ||
    lower.includes('iesco') || lower.includes('fesco') || lower.includes('pesco') ||
    lower.includes('wapda') || lower.includes('meter') || lower.includes('units') ||
    lower.includes('voltage') || lower.includes('load shedding') || lower.includes('بجلی') || lower.includes('میٹر')
  ) {
    category = 'Electricity / Utility';
    problemDetected = 'Unusually High Electricity Bill or Meter Reading Discrepancy';
    summary = 'The reported issue concerns an unexpected billing surge or utility service malfunction requiring discrepancy reconciliation.';
    possibleReasons = [
      'Higher slab tariff consumption during seasonal peak hours',
      'Defective or fast electricity meter, or estimated/provisional meter reading by the meter reader',
      'Unresolved previous arrears or billing adjustments carried over',
      'Unscheduled fuel price adjustment (FPA) or quarterly tariff adjustment charges'
    ];
    recommendedSteps = [
      'Cross-check the current meter display reading against the reading printed on the latest bill snapshot.',
      'Compare unit units consumed in the same month of the previous year to determine whether it is tariff-driven or consumption-driven.',
      'Check if previous arrears or FPA/surcharges were added erroneously.',
      'Visit the local Revenue Officer (RO) or Sub-Divisional Officer (SDO) customer services center for meter testing and bill correction.'
    ];
    requiredDocuments = [
      { name: 'Current Disputed Electricity Bill (Original copy)', status: 'Required', details: 'Shows reference number and latest reading photo' },
      { name: 'Previous 2 to 3 paid bill receipts', status: 'Required', details: 'Proves regular payment history without arrears' },
      { name: 'Clear photograph of current physical meter reading', status: 'May Be Required', details: 'Shows exact accumulated kWh units and meter serial number' },
      { name: 'CNIC copy of consumer or property owner', status: 'Required', details: 'Identification of applicant' }
    ];
    nextStep = 'Take a clear timestamped photograph of your physical meter screen right now, and compare the unit count with the reading printed on your disputed bill.';
    complaintType = 'Electricity Billing Correction & Meter Verification Request';

    if (lang === 'ur') {
      complaintDraft = `بخدمت جناب ایکسیئن / ایس ڈی او صاحب،
متعلقہ الیکٹرک سپلائی کمپنی، پاکستان۔

عنوان: درخواست برائے درستگی بجلی کا زائد بل و معائنہ میٹر

جنابِ عالی!
مؤدبانہ گزارش ہے کہ سائل کے نام پر بجلی کا کنکشن زیر ریفرنس نمبر [Consumer / Reference Number] موجود ہے۔ موجودہ ماہ کا موصول ہونے والا بل معمول کی کھپت سے کئی گنا زیادہ ہے جس میں یونٹس کی غلط ریڈنگ یا غیر معمولی ایڈجسٹمنٹ شامل دکھائی دیتی ہے۔

سائل ہمیشہ باقاعدگی سے بل ادا کرتا رہا ہے اور سابقہ کوئی واجبات نہیں ہیں۔ جسمانی میٹر پر موجود ریڈنگ اور بل پر درج ریڈنگ میں واضح فرق ہے۔

استدعا ہے کہ سائل کے میٹر کا فیلڈ معائنہ کروایا جائے، میٹر ریڈنگ کی تصدیق کر کے بل میں ضروری تصحیح فرمائی جائے اور درست شدہ بل جاری کیا جائے تاکہ سائل بروقت ادائیگی کر سکے۔

درخواست گزار: [Applicant Name]
شناختی کارڈ نمبر: [CNIC Number]
موبائل نمبر: [Contact Number]
پتہ: [Address]
تاریخ: [Date]`;
    } else {
      complaintDraft = `To,
The Executive Engineer (XEN) / Sub-Divisional Officer (SDO),
Customer Services Division,
[Name of Electric Supply Company / DISCO],
Pakistan.

Subject: Formal Application for Electricity Bill Revision and Meter Reading Verification

Respected Sir/Madam,

I am writing to formally dispute the electricity bill issued for the billing month of [Month/Year] against Consumer Reference Number: [Consumer / Reference Number].

The current bill reflects an exorbitant and unexpected amount that deviates significantly from my standard consumption pattern. A preliminary physical check indicates a clear discrepancy between the actual meter counter and the units recorded on the printed bill, or an unwarranted accumulation of unverified adjustment charges. I have consistently cleared all prior dues, and no past arrears should be chargeable.

In light of the above, I respectfully request:
1. An official physical verification of the meter reading by an authorized inspector.
2. Necessary correction and revision of the disputed units/charges.
3. Extension of the due date without late payment surcharge until the revised bill is handed over.

Thank you for your prompt attention to this matter.

Yours faithfully,

[Applicant Name]
CNIC Number: [CNIC / ID Number]
Contact Number: [Contact Number]
Address: [Address]
Date: [Date]`;
    }
  }
  // 2. Gas / Water
  else if (
    lower.includes('gas') || lower.includes('sngpl') || lower.includes('ssgc') ||
    lower.includes('water') || lower.includes('wasa') || lower.includes('paani') ||
    lower.includes('sewerage') || lower.includes('pipe') || lower.includes('گیس') || lower.includes('پانی')
  ) {
    category = 'Gas / Water';
    problemDetected = 'Gas Pressure Drop or Municipal Water / Sewerage Disruption';
    summary = 'Citizen reports disruption, low supply pressure, or contaminated utility flow requiring engineering intervention.';
    possibleReasons = [
      'Main distribution line low pressure or seasonal throttling',
      'Local pipeline leakage, blockage, or sediment accumulation',
      'Supply schedule rationing or municipal pump outage',
      'Billing discrepancy in unmetered or bulk domestic connections'
    ];
    recommendedSteps = [
      'Verify if neighbouring houses in your street share the same low pressure or interruption.',
      'Check household boundary valves and supply inlets for localized blockages.',
      'Log an official grievance with the utility grievance desk (e.g. SNGPL/SSGC helpline or WASA complaint cell) and obtain a complaint tracking ticket.'
    ];
    requiredDocuments = [
      { name: 'Recent Gas / Water Utility Bill (with Account ID)', status: 'Required', details: 'Identifies connection and service zone' },
      { name: 'CNIC copy of registered consumer', status: 'Required', details: 'Applicant verification' },
      { name: 'Photographs of dry taps or leakage site', status: 'May Be Required', details: 'Substantiates field complaint' }
    ];
    nextStep = 'Check with immediate neighbours to establish if the supply disruption is line-wide, and register an official complaint tracking ticket.';
    complaintType = 'Public Utility Service Restoration Request';
    complaintDraft = `To,
The General Manager / Executive Engineer,
[SNGPL / SSGC / WASA / Municipal Water Authority],
Pakistan.

Subject: Urgent Complaint Regarding Severe Gas/Water Supply Disruption

Respected Sir/Madam,

I am a registered consumer holding Consumer Account / Reference No: [Consumer / Reference Number] residing at [Address].

For the past several days, our locality has been facing severe low pressure / complete suspension of supply, causing immense hardship to residents. Despite multiple verbal representations, the normal flow has not been restored.

I request an urgent inspection of the supply line in our street to locate the cause of pressure drop or leakage and restore regular uninterrupted service at the earliest.

Sincerely,

[Applicant Name]
Contact: [Contact Number]
Date: [Date]`;
  }
  // 3. Government Services (NADRA, Passport, BISP, Land records)
  else if (
    lower.includes('nadra') || lower.includes('cnic') || lower.includes('passport') ||
    lower.includes('bisp') || lower.includes('ehsaas') || lower.includes('license') ||
    lower.includes('domicile') || lower.includes('fbr') || lower.includes('tax') ||
    lower.includes('شناختی کارڈ') || lower.includes('پاسپورٹ')
  ) {
    category = 'Government Services';
    problemDetected = 'Identity, Documentation or Government Service Processing Delay';
    summary = 'Citizen faces delays or procedural difficulties in issuance, renewal, or verification of official documentation.';
    possibleReasons = [
      'Document discrepancy or mismatch in family tree/record registry',
      'Centralized verification backlog or security clearance delay',
      'Biometric fingerprint matching difficulties or system downtime'
    ];
    recommendedSteps = [
      'Check the digital tracking portal or SMS status service using your token/tracking ID.',
      'Visit the designated Facilitation Center or Tehsil office with original supplementary documents.',
      'Request escalation to the In-charge / Assistant Director if standard delivery timelines have lapsed.'
    ];
    requiredDocuments = [
      { name: 'Application Token Slip / Tracking Receipt', status: 'Required', details: 'Contains unique tracking number' },
      { name: 'Original family registration documents or old CNIC', status: 'Required', details: 'Baseline proof for verification' },
      { name: 'Birth certificate / Matriculation certificate (if applicable)', status: 'May Be Required', details: 'Supporting age/name verification' }
    ];
    nextStep = 'Track your token number on the official tracking portal or SMS gateway to identify the exact stage where the file is held.';
    complaintType = 'Official Documentation Expedited Processing Application';
    complaintDraft = `To,
The In-Charge / Assistant Director,
[NADRA Registration Center / Directorate General of Passports / Facilitation Center],
Pakistan.

Subject: Application for Expedited Disposal of Pending Token / Application No. [Application Token Slip]

Respected Sir/Madam,

I submitted my application for [CNIC / Passport / Official Document] under Application Token No. [Application Token Slip] on [Submission Date]. The normal delivery timeframe has elapsed, yet the status remains pending without specific objection communication.

All required original documents and prescribed government fees were duly tendered at the time of token issuance. The delay is causing significant personal and administrative hardship.

I kindly request your intervention to review the pending file and facilitate the expeditious issuance and delivery of the said document.

Applicant Name: [Applicant Name]
Contact Number: [Contact Number]
CNIC: [CNIC Number]
Date: [Date]`;
  }
  // 4. Education
  else if (
    lower.includes('school') || lower.includes('college') || lower.includes('university') ||
    lower.includes('degree') || lower.includes('bise') || lower.includes('hec') ||
    lower.includes('scholarship') || lower.includes('fee') || lower.includes('admission') ||
    lower.includes('تعلیم') || lower.includes('ڈگری')
  ) {
    category = 'Education';
    problemDetected = 'Educational Verification, Fee Dispute or Examination Grievance';
    summary = 'The grievance relates to academic administration, credential attestation, or institutional service standards.';
    possibleReasons = [
      'Inter-board or university transcript verification backlog',
      'Discrepancy in enrollment records or subject code allocation',
      'Regulatory compliance checks during degree attestation'
    ];
    recommendedSteps = [
      'Log into the official board/HEC online portal to verify token validation status.',
      'Ensure all preceding certificates (Metric, FSc/FA, Bachelor) are attached in exact sequential order.',
      'Submit a formal application to the Controller of Examinations or Board Secretary.'
    ];
    requiredDocuments = [
      { name: 'Original Transcripts / DMC / Result Cards', status: 'Required', details: 'Educational credentials' },
      { name: 'Paid Challan Form / Receipt', status: 'Required', details: 'Proof of prescribed institutional fee' },
      { name: 'CNIC / B-Form copy', status: 'Required', details: 'Identity verification' }
    ];
    nextStep = 'Log into your student or attestation portal account to confirm if any specific objection remarks were filed by the desk officer.';
    complaintType = 'Academic Grievance & Verification Application';
    complaintDraft = `To,
The Controller of Examinations / Secretary,
[Board of Intermediate & Secondary Education / University / Higher Education Commission],
Pakistan.

Subject: Request for Timely Issuance / Attestation of Academic Credentials

Respected Authority,

I submitted my credentials for [Degree Attestation / Transcript Verification / Result Correction] under Challan / Application Reference: [Consumer / Reference Number]. Despite the lapse of the mandated processing period, the documents remain unissued.

I request an expedited review of my file so that my further academic pursuits and employment opportunities are not prejudiced.

Sincerely,

[Applicant Name]
Roll / Registration No: [Consumer / Reference Number]
Contact: [Contact Number]
Date: [Date]`;
  }
  // 5. Healthcare
  else if (
    lower.includes('hospital') || lower.includes('doctor') || lower.includes('sehat') ||
    lower.includes('medicine') || lower.includes('health') || lower.includes('clinic') ||
    lower.includes('طبی') || lower.includes('ہسپتال')
  ) {
    category = 'Healthcare';
    problemDetected = 'Public Health Facility Service or Sehat Sahulat Card Grievance';
    summary = 'Citizen reports difficulty in medical facilitation, entitlement access, or patient care standards.';
    possibleReasons = [
      'Empanelled hospital quota or pre-authorization approval delay',
      'Medicine inventory shortages at public dispensary',
      'Technical discrepancy in family head CNIC registration under health registry'
    ];
    recommendedSteps = [
      'Verify active eligibility of CNIC via the official Sehat Sahulat SMS service or portal.',
      'Contact the Medical Superintendent (MS) or Hospital Grievance Facilitator desk on-site.',
      'Ensure all medical prescriptions and admission notes are retained.'
    ];
    requiredDocuments = [
      { name: 'Patient CNIC / B-Form & Family Head CNIC', status: 'Required', details: 'Registration & entitlement' },
      { name: 'Hospital Treatment Slip / Discharge / Prescription Summary', status: 'Required', details: 'Medical records' },
      { name: 'Emergency Admission Stamp (if applicable)', status: 'May Be Required', details: 'Urgency documentation' }
    ];
    nextStep = 'Visit the on-site Hospital Citizen Facilitation Desk or Medical Superintendent office with original patient records.';
    complaintType = 'Healthcare Service Entitlement Review Application';
    complaintDraft = `To,
The Medical Superintendent (MS) / District Health Officer (DHO),
[Name of Hospital / District Health Authority],
Pakistan.

Subject: Representation Regarding Healthcare Facilitation / Sehat Entitlement

Respected Sir/Madam,

I am writing regarding the medical treatment of patient [Applicant Name], CNIC: [CNIC Number], who visited the facility on [Date]. 

The patient encountered unwarranted delays/non-provision of prescribed healthcare entitlements under applicable government standards.

We respectfully urge your immediate direction to the relevant department to ensure proper medical attention and provision of mandated medicines/care.

Respectfully,

[Applicant Name]
Contact: [Contact Number]
Date: [Date]`;
  }
  // 6. Employment
  else if (
    lower.includes('salary') || lower.includes('job') || lower.includes('pension') ||
    lower.includes('eobi') || lower.includes('employer') || lower.includes('wages') ||
    lower.includes('termination') || lower.includes('ملازمت') || lower.includes('تنخواہ') || lower.includes('پنشن')
  ) {
    category = 'Employment';
    problemDetected = 'Employment Rights, Wage Arrears or Pension / EOBI Grievance';
    summary = 'Worker or retired employee seeks resolution of outstanding salary, benefits, or pension facilitation.';
    possibleReasons = [
      'Administrative delay in financial audit or clearance sanctions',
      'Dispute over final settlement or overtime computation',
      'Record linkage gap in EOBI contribution history'
    ];
    recommendedSteps = [
      'Review appointment letter and terms of service regarding wage disbursement timelines.',
      'Request an official statement of service and dues from the accounts or HR section.',
      'If unresolved, file an application with the District Labour Officer / Minimum Wages Board or Pension Ombudsman.'
    ];
    requiredDocuments = [
      { name: 'Appointment Letter / Service Contract', status: 'Required', details: 'Proof of employment' },
      { name: 'Bank Statement / Pay Slips showing arrears', status: 'Required', details: 'Proof of non-payment or deduction' },
      { name: 'EOBI / Pension Book or Registration Card', status: 'May Be Required', details: 'For retirement matters' }
    ];
    nextStep = 'Request an official written statement of accounts from your employer or accounts office showing exact pending dues.';
    complaintType = 'Labour Dues & Service Arrears Recovery Application';
    complaintDraft = `To,
The District Labour Officer / Competent Authority,
Department of Labour,
Government of [Province], Pakistan.

Subject: Formal Representation for Settlement of Unpaid Salary / Gratuity / Legal Dues

Respected Sir/Madam,

I was employed as [Designation] at [Employer / Organization Name] from [Start Date] to [End Date].

Despite faithful discharge of duties, my legitimate wages/terminal benefits amounting to Rs. [Amount] for the period of [Months] remain unpaid despite repeated requests.

I respectfully pray that proceedings be initiated under the applicable labour laws to direct the employer to release my due compensation without further delay.

Submitted by:

[Applicant Name]
CNIC: [CNIC Number]
Contact Number: [Contact Number]
Address: [Address]
Date: [Date]`;
  }

  // Default fallback complaint if none matched
  if (!complaintDraft) {
    complaintDraft = `To,
The Competent Authority / In-Charge Officer,
[Relevant Public Department / Municipal Administration],
Pakistan.

Subject: Formal Citizen Grievance Regarding ${problemDetected}

Respected Sir/Madam,

I am a resident of [Address] and wish to bring to your urgent attention a matter of public service deficiency affecting our daily life.

Particulars of the issue:
${problem.slice(0, 200)}...

Despite ordinary efforts, the matter remains unaddressed. I request your prompt on-ground inspection and necessary administrative action to resolve this grievance.

Yours faithfully,

[Applicant Name]
CNIC: [CNIC Number]
Contact: [Contact Number]
Address: [Address]
Date: [Date]`;
  }

  return {
    problemDetected,
    category,
    summary,
    possibleReasons,
    recommendedSteps,
    requiredDocuments,
    nextStep,
    complaintType,
    complaintDraft,
    importantNote:
      'SmartSahulat AI provides general informational guidance and does not replace official government instructions or professional advice. Requirements and procedures may vary. Please verify important information with the relevant official department or qualified professional.',
    detectedLanguage: lang,
    source: 'engine' as const
  };
}

// API: Analyze Citizen Problem
app.post('/api/analyze', async (req, res) => {
  try {
    const { problem, language = 'auto' } = req.body;

    if (!problem || typeof problem !== 'string' || problem.trim().length < 5) {
      return res.status(400).json({
        error: 'Please describe your problem first with at least 5 characters.'
      });
    }

    if (problem.length > 5000) {
      return res.status(400).json({
        error: 'Problem description is too long. Please keep it under 5000 characters.'
      });
    }

    const detectedLang = detectInputLanguage(problem);
    const effectiveLang = language === 'auto' ? detectedLang : language;

    const ai = getGenAI();

    if (!ai) {
      // Use structured realistic fallback
      const fallback = fallbackAnalysis(problem, effectiveLang);
      return res.json(fallback);
    }

    // Call Gemini 3.8 Flash with structured JSON
    try {
      const prompt = `You are SmartSahulat AI, an expert citizen-problem solving assistant for Pakistani citizens.
You understand problems described in Urdu (اردو script), English, Roman Urdu (e.g. "Mera bijli ka bill bohat zyada aya hai"), and mixed Urdu-English.

The citizen submitted the following problem:
"""${problem}"""

Target response language preference: ${effectiveLang} (If user wrote Urdu script, provide summary, steps, next step, and complaint in natural professional Urdu; if English, respond in English; if Roman Urdu, respond in clear Roman Urdu or English with Roman Urdu sensitivity).

Classify into exactly ONE of the following categories:
- Electricity / Utility
- Gas / Water
- Education
- Healthcare
- Government Services
- Employment
- General Public Complaints

CRITICAL GUIDELINES:
1. NEVER fabricate fake government rules, circular numbers, official helpline numbers, fees, or addresses. If requirements vary, state that clearly.
2. Formulate practical, prioritised, and actionable recommended steps.
3. Every response MUST include a clear, immediate "What Should I Do Next?" action step.
4. Draft a complete, formal, professional complaint/application ready for submission to the relevant Pakistani public authority (DISCOs like LESCO/K-Electric, SNGPL/SSGC, WASA, NADRA, Controller of Examinations, Labour Department, etc.). Use clear placeholders like [Applicant Name], [Consumer / Reference Number], [Contact Number], [Address], [Date].
5. Clearly distinguish Required vs May Be Required documents.
6. Return purely valid JSON matching the schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are SmartSahulat AI, a helpful, honest, and action-oriented citizen problem assistant for Pakistan. Deliver structured, realistic citizen guidance. Never hallucinate fake official statistics or policies. Always emphasize actionable next steps.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              problemDetected: {
                type: Type.STRING,
                description: 'Short concise title of the detected issue'
              },
              category: {
                type: Type.STRING,
                description:
                  'One of: Electricity / Utility, Gas / Water, Education, Healthcare, Government Services, Employment, General Public Complaints'
              },
              summary: {
                type: Type.STRING,
                description: 'Simple and concise explanation of the problem'
              },
              possibleReasons: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Realistic possible causes (phrased as possibilities)'
              },
              recommendedSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Prioritised, practical step-by-step actions'
              },
              requiredDocuments: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    status: {
                      type: Type.STRING,
                      description: 'Either "Required" or "May Be Required"'
                    },
                    details: { type: Type.STRING }
                  },
                  required: ['name', 'status']
                },
                description: 'List of necessary documents'
              },
              nextStep: {
                type: Type.STRING,
                description: 'The single immediate action the citizen should take right now'
              },
              complaintType: {
                type: Type.STRING,
                description: 'Title of the formal application or complaint'
              },
              complaintDraft: {
                type: Type.STRING,
                description: 'Full formal complaint document with bracketed placeholders'
              },
              importantNote: {
                type: Type.STRING,
                description: 'Safety disclaimer and official verification reminder'
              }
            },
            required: [
              'problemDetected',
              'category',
              'summary',
              'possibleReasons',
              'recommendedSteps',
              'requiredDocuments',
              'nextStep',
              'complaintType',
              'complaintDraft',
              'importantNote'
            ]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Empty response from Gemini');
      }

      const parsed = JSON.parse(responseText.trim());
      parsed.detectedLanguage = detectedLang;
      parsed.source = 'gemini';

      // Ensure required note exists
      if (!parsed.importantNote) {
        parsed.importantNote =
          'SmartSahulat AI provides general informational guidance and does not replace official government instructions or professional advice. Requirements and procedures may vary. Please verify important information with the relevant official department or qualified professional.';
      }

      return res.json(parsed);
    } catch (aiErr) {
      console.warn('Gemini API call failed, falling back to rule engine:', aiErr);
      const fallback = fallbackAnalysis(problem, effectiveLang);
      return res.json(fallback);
    }
  } catch (err: any) {
    console.error('API Error in /api/analyze:', err);
    return res.status(500).json({
      error: 'SmartSahulat AI is temporarily unavailable. Please try again.'
    });
  }
});

// API: Generate Custom Complaint
app.post('/api/generate-complaint', async (req, res) => {
  try {
    const {
      problemDetected,
      category,
      summary,
      targetLanguage = 'en',
      customDetails
    } = req.body;

    const ai = getGenAI();

    if (!ai) {
      // Fallback complaint template
      if (targetLanguage === 'ur') {
        return res.json({
          complaintDraft: `بخدمت جناب مجاز اتھارٹی / متعلقہ افسر،
محکمہ ${category || 'متعلقہ سروس'}, پاکستان۔

عنوان: درخواست برائے فوری حل مسئلہ ${problemDetected || 'عوامی شکایت'}

جنابِ عالی!
مؤدبانہ گزارش ہے کہ سائل کو درج ذیل مسئلے کا سامنا ہے جس کے باعث شدید پریشانی اور مشکلات لاحق ہیں:

خلاصہ مسئلہ:
${summary || 'سروس میں تعطل / بل میں تضاد'}

${customDetails ? `اضافی کوائف: ${customDetails}\n` : ''}
سائل نے تمام تر ضروری ضوابط اور معمولات کی پابندی کی ہے، تا ہم متعلقہ سطح پر مسئلہ بدستور تشنۂ حل ہے۔

استدعا ہے کہ اس معاملے پر فوری ہمدردانہ غور فرماتے ہوئے معائنہ اور تلافی عمل میں لائی جائے تاکہ قانونی حق اور بنیادی سہولت بحال ہو سکے۔

درخواست گزار:
نام سائل: [Applicant Name]
شناختی کارڈ نمبر: [CNIC Number]
ریفرنس / صارف نمبر: [Consumer / Reference Number]
رابطہ نمبر: [Contact Number]
مکمل پتہ: [Address]
تاریخ: [Date]`
        });
      }

      return res.json({
        complaintDraft: `To,
The Competent Officer / Executive Authority,
Department of ${category || 'Relevant Public Services'},
Government of Pakistan / Provincial Administration.

Subject: Formal Application for Redressal of Grievance Regarding ${problemDetected || 'Public Service Disruption'}

Respected Sir/Madam,

I am writing to bring to your urgent consideration an administrative grievance regarding the aforementioned subject.

Summary of Issue:
${summary || 'Public service disruption / billing irregularity'}

${customDetails ? `Additional Information: ${customDetails}\n` : ''}
I have fulfilled all standard procedural obligations and settled all verified prior charges. Despite this, the disruption/discrepancy remains unresolved, causing undue personal and financial hardship.

Therefore, I respectfully request:
1. An on-ground inspection or administrative record review of this matter.
2. Immediate corrective measures to restore standard service or rectify the records.
3. Written acknowledgment and formal intimation of the action taken.

Yours faithfully,

[Applicant Name]
CNIC Number: [CNIC Number]
Consumer / Reference ID: [Consumer / Reference Number]
Contact Number: [Contact Number]
Postal Address: [Address]
Date: [Date]`
      });
    }

    // Use Gemini to generate an articulate Pakistani complaint
    const prompt = `Generate a formal, polite, and officially styled public service complaint/application for a Pakistani citizen.
Problem Detected: ${problemDetected}
Category: ${category}
Summary: ${summary}
Language: ${targetLanguage === 'ur' ? 'Urdu (using authentic formal Urdu drafting conventions like بخدمت جناب, عنوان, مؤدبانہ گزارش ہے)' : 'English (using formal Pakistani official letter format)'}
Additional Details: ${customDetails || 'None provided'}

Include clear placeholders: [Applicant Name], [CNIC Number], [Consumer / Reference Number], [Contact Number], [Address], [Date].
Do NOT invent fake names or personal details.
Return only the text of the complaint letter.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an expert in formal Pakistani administrative and public-service letter drafting. Write clear, respectful, assertive, and legally sound complaint drafts.'
      }
    });

    const draft = response.text || '';
    return res.json({ complaintDraft: draft.trim() });
  } catch (err: any) {
    console.error('API Error in /api/generate-complaint:', err);
    return res.status(500).json({
      error: 'Unable to generate complaint at this moment.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SmartSahulat AI API',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY')
  });
});

// Vite middleware for development & static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SmartSahulat AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
