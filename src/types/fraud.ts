export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type CaseStatus = 
  | 'INVESTIGATING'
  | 'REVIEW_REQUIRED'
  | 'ACTION_PENDING'
  | 'ON_HOLD'
  | 'FROZEN'
  | 'APPROVED'
  | 'RESOLVED'
  | 'CLEARED'
  | 'HELD';

export interface ScoreContribution {
  category: string;
  points: number;
  description: string;
  iconName?: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  customerTier: string;
  amount: number;
  formattedAmount: string;
  currency: string;
  timestamp: string;
  merchant: string;
  merchantCategory: string;
  paymentMethod: string;
  status: CaseStatus;
  riskScore: number;
  riskLevel: RiskLevel;
  confidenceScore: number;
  evidenceStrength: 'LOW' | 'MEDIUM' | 'HIGH';
  verifiedSignalsCount: number;
  totalSignalsEvaluated: number;
  missingInfoCount: number;
  signals: string[];
  breakdown: ScoreContribution[];
  analystExplanation: string;
  executiveExplanation: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountAgeDays: number;
  avgTransactionAmount: number;
  historicalTotalSpent: number;
  previousFraudIncidents: number;
  status: 'ACTIVE' | 'FLAGGED' | 'RESTRICTED';
}

export interface DeviceIntel {
  id: string;
  model: string;
  os: string;
  browserFingerprint: string;
  canvasHash: string;
  isNewDevice: boolean;
  firstSeen: string;
  linkedAccountsCount: number;
  linkedAccounts: {
    accountId: string;
    accountHolder: string;
    riskStatus: 'NORMAL' | 'SUSPICIOUS' | 'FRAUD';
    recentVolume: string;
  }[];
  verdict: string;
}

export interface LocationIntel {
  loginTime: string;
  loginCity: string;
  loginCountry: string;
  loginCountryCode: string;
  loginIp: string;
  txTime: string;
  txCity: string;
  txCountry: string;
  txCountryCode: string;
  txIp: string;
  distanceKm: number;
  elapsedTimeMin: number;
  requiredSpeedKmh: number;
  isImpossible: boolean;
  riskContribution: number;
}

export type NodeType = 'TRANSACTION' | 'CUSTOMER' | 'DEVICE' | 'IP' | 'CARD' | 'MERCHANT' | 'LINKED_USER';

export interface NetworkNode {
  id: string;
  label: string;
  sublabel?: string;
  type: NodeType;
  risk: RiskLevel | 'NORMAL';
  x: number;
  y: number;
  evidence: {
    title: string;
    details: string;
    flags: string[];
    attributes: Record<string, string>;
  };
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  isSuspicious?: boolean;
}

export interface MoneyTraceHop {
  hopNumber: number;
  fromAccount: string;
  toAccount: string;
  amount: number;
  formattedAmount: string;
  timestamp: string;
  hopTimeDelta: string;
  retentionPercent: number;
  flag?: string;
}

export interface MoneyTrace {
  chainId: string;
  rootTransactionId: string;
  originAccount: string;
  destinationMerchant: string;
  totalVolume: string;
  hops: MoneyTraceHop[];
  patternDetected: string;
  layeringSeverity: 'HIGH' | 'CRITICAL';
  amlWarning: string;
}

export interface FraudPattern {
  id: string;
  name: string;
  category: string;
  matchScore: number;
  severity: RiskLevel;
  description: string;
  matchedSignals: string[];
}

export interface AgentStep {
  stepNumber: number;
  agentName: 'Supervisor' | 'Transaction Agent' | 'Identity Agent' | 'Network Agent' | 'Behavior Agent' | 'Risk Analyst' | 'Action Agent';
  actionTitle: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FLAGGED';
  latencyMs: number;
  logDetail: string;
  findings: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  actor: 'AI_SUPERVISOR' | 'TRANSACTION_AGENT' | 'NETWORK_AGENT' | 'RISK_ANALYST' | 'HUMAN_ANALYST';
  action: string;
  payloadSummary: string;
  hash: string;
  status: 'SUCCESS' | 'WAITING_CONFIRMATION' | 'APPROVED' | 'BLOCKED';
}

export interface KnowledgeBaseRule {
  id: string;
  title: string;
  regulatoryBody: string;
  category: string;
  summary: string;
  triggerCondition: string;
  mandatedAction: string;
}

export interface GuardrailRule {
  id: string;
  ruleName: string;
  condition: string;
  enforcement: string;
  status: string;
}

export interface KnowledgeBaseItem {
  id: string;
  title: string;
  category: string;
  content: string;
}

export interface AuditLedgerEntry {
  id: string;
  timestamp: string;
  caseId: string;
  actor: string;
  actorType: 'AI_AGENT' | 'HUMAN';
  action: string;
  modelVersion: string;
  evidenceHash: string;
  rationale: string;
  status: 'EXECUTED' | 'WAITING_CONFIRMATION' | 'OVERRIDDEN';
}

export interface FraudCase {
  id: string;
  title: string;
  description: string;
  transaction: Transaction;
  customer: CustomerProfile;
  device: DeviceIntel;
  location: LocationIntel;
  networkNodes: NetworkNode[];
  networkEdges: NetworkEdge[];
  moneyTrace: MoneyTrace;
  fraudPatterns: FraudPattern[];
  investigationSteps: AgentStep[];
}
