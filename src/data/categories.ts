import { ProblemCategory } from '../types';

export interface CategoryInfo {
  name: ProblemCategory;
  urduName: string;
  iconName: string;
  authorities: string[];
  commonIssues: string[];
  description: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    name: 'Electricity / Utility',
    urduName: 'بجلی اور توانائی',
    iconName: 'Zap',
    authorities: ['LESCO', 'K-Electric', 'IESCO', 'MEPCO', 'FESCO', 'PESCO', 'HESCO', 'QESCO', 'WAPDA', 'NEPRA'],
    commonIssues: ['Excessive / wrong meter reading', 'Detection bills / excessive slabs', 'Frequent transformer breakdown', 'Voltage fluctuation', 'New connection delays'],
    description: 'Matters regarding DISCO billing discrepancies, unverified units, meter testing, transformer faults, and tariff disputes.'
  },
  {
    name: 'Gas / Water',
    urduName: 'سوئی گیس اور بلدیاتی پانی',
    iconName: 'Droplets',
    authorities: ['SNGPL', 'SSGC', 'WASA', 'Municipal Water Boards', 'Cantonment Boards', 'OGRA'],
    commonIssues: ['Low gas pressure / load management', 'Contaminated water supply', 'Sewerage line blockage / backflow', 'Disputed estimated billing', 'Pipeline leakage'],
    description: 'Domestic gas pressure drop, Sui gas meter disputes, WASA pipeline contamination, unannounced water supply suspension, and sanitation.'
  },
  {
    name: 'Government Services',
    urduName: 'سرکاری دستاویزات و خدمات',
    iconName: 'Building2',
    authorities: ['NADRA', 'Directorate General Immigration & Passports', 'Excise & Taxation', 'BISP / Ehsaas', 'Post Office', 'Tehsil Facilitation (e-Khidmat)'],
    commonIssues: ['CNIC issuance / family tree block', 'Urgent passport delivery delays', 'Vehicle token tax & transfer', 'BISP beneficiary stipend issues', 'Domicile / PRC processing'],
    description: 'Identity documentation, citizenship records, vehicle registration, welfare disbursement, and public facilitation portals.'
  },
  {
    name: 'Education',
    urduName: 'تعلیمی امور و اسناد',
    iconName: 'GraduationCap',
    authorities: ['BISE (Boards of Intermediate & Secondary Education)', 'HEC (Higher Education Commission)', 'Provincial Higher Education Commissions', 'Universities', 'Directorate of Public Instructions'],
    commonIssues: ['Degree / transcript attestation delays', 'Migration & NOC issuance', 'Examination re-checking disputes', 'Unwarranted private school fee hikes', 'Scholarship disbursement'],
    description: 'Credential attestation, board equivalence, institutional dispute resolution, and examination management issues.'
  },
  {
    name: 'Healthcare',
    urduName: 'صحت اور طبی سہولیات',
    iconName: 'HeartPulse',
    authorities: ['Sehat Sahulat Program', 'Provincial Health Departments', 'District Health Authorities', 'Public Hospital Medical Superintendents', 'DRAP'],
    commonIssues: ['Sehat card hospital denial or quota capping', 'Non-availability of emergency medicines', 'Doctor / nursing negligence or absence', 'Exorbitant private clinic billing', 'Patient referral bottlenecks'],
    description: 'Access to public hospital treatment, Sehat Sahulat card claim denial, essential medicine shortages, and emergency medical rights.'
  },
  {
    name: 'Employment',
    urduName: 'ملازمت، تنخواہ اور پنشن',
    iconName: 'Briefcase',
    authorities: ['Department of Labour', 'EOBI (Employees Old-Age Benefits Institution)', 'Provincial Ombudsman', 'Pension Cell (Accountant General)', 'Minimum Wages Board'],
    commonIssues: ['Unpaid salary arrears & delayed wages', 'EOBI pension registration & claim rejection', 'Unfair termination without notice / dues', 'Sub-minimum wage violations', 'Gratuity & provident fund withholding'],
    description: 'Wage recovery, employee welfare rights, pension verification, gratuity disputes, and labor ombudsman petitions.'
  },
  {
    name: 'General Public Complaints',
    urduName: 'عمومی عوامی شکایات',
    iconName: 'FileText',
    authorities: ['District Administration (Deputy Commissioner)', 'Municipal Corporation / Town Committee', 'Traffic Police', 'Environmental Protection Agency (EPA)', 'Pakistan Citizen Portal (PCP)'],
    commonIssues: ['Road potholes & street light faults', 'Illegal encroachment & public noise nuisance', 'Garbage dumping in residential streets', 'Unregulated commercial activities', 'Consumer rights overcharging'],
    description: 'Municipal governance, environmental hazards, public safety, consumer protection, and community welfare issues.'
  }
];
