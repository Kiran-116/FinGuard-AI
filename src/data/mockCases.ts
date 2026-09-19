import {
  Transaction,
  CustomerProfile,
  DeviceIntel,
  LocationIntel,
  NetworkNode,
  NetworkEdge,
  MoneyTrace,
  FraudPattern,
  AgentStep,
  AuditRecord,
  KnowledgeBaseRule,
  FraudCase,
  AuditLedgerEntry,
  KnowledgeBaseItem,
  GuardrailRule
} from '../types/fraud';

export const PRIMARY_TRANSACTION: Transaction = {
  id: 'FG-84721',
  customerId: 'CUST-1847',
  customerName: 'Rahul Sharma',
  customerTier: 'Preferred Banking',
  amount: 482000,
  formattedAmount: '₹4,82,000',
  currency: 'INR',
  timestamp: 'Today, 10:47:12 AM',
  merchant: 'Apex Global Assets Ltd (Digital Exchange)',
  merchantCategory: 'High-Risk Cryptocurrency & FX Brokerage',
  paymentMethod: 'Instant IMPS Wire Transfer (Card ending in 9402)',
  status: 'INVESTIGATING',
  riskScore: 93,
  riskLevel: 'CRITICAL',
  confidenceScore: 92,
  evidenceStrength: 'HIGH',
  verifiedSignalsCount: 6,
  totalSignalsEvaluated: 7,
  missingInfoCount: 1,
  signals: [
    'Amount 18.4x normal customer average (₹26,200 avg)',
    'New unrecognized device (first seen 8 mins ago)',
    'New high-risk merchant category (Offshore crypto gateway)',
    'Impossible travel detected (Bangalore -> London in 16 min)',
    '3 failed 2FA verification attempts prior to execution',
    'Hardware fingerprint linked to 4 known fraudulent accounts'
  ],
  breakdown: [
    { category: 'Transaction Anomaly', points: 22, description: '18.4x deviation from 90-day rolling baseline', iconName: 'TrendingUp' },
    { category: 'New Device Risk', points: 18, description: 'Zero history for hardware canvas hash DEV-8472', iconName: 'Smartphone' },
    { category: 'Impossible Travel', points: 17, description: '8,000 km geographic jump in 16 minutes (~30,000 km/h)', iconName: 'Plane' },
    { category: 'Velocity & Failed Auths', points: 13, description: '3 consecutive PIN failures within 120 seconds', iconName: 'Activity' },
    { category: 'Known Risky IP / Subnet', points: 12, description: 'Commercial VPN egress node on spamhaus banlist', iconName: 'Globe' },
    { category: 'Linked Fraud Syndicate', points: 10, description: 'Shared MAC/Canvas fingerprint with Accounts B, C, & D', iconName: 'Share2' }
  ],
  analystExplanation:
    'The transaction is highly anomalous because it exceeds the customer\'s 90-day baseline by approximately 18.4×, originating from an unverified headless device registering in London only 16 minutes after a confirmed Bangalore mobile session. Crucially, device DEV-8472 is simultaneously linked to 4 other accounts undergoing active chargeback and fraud-layering investigations.',
  executiveExplanation:
    'FinGuard detected a coordinated Account Takeover combined with a Mule Funnel Transfer. The funds are being rapidly layered to an offshore crypto off-ramp. Immediate human approval is requested to place a hard hold.'
};

export const ALL_TRANSACTIONS: Transaction[] = [
  PRIMARY_TRANSACTION,
  {
    id: 'FG-84719',
    customerId: 'CUST-3902',
    customerName: 'Priya Iyer',
    customerTier: 'Retail Gold',
    amount: 210000,
    formattedAmount: '₹2,10,000',
    currency: 'INR',
    timestamp: 'Today, 10:22:04 AM',
    merchant: 'Nova Electronics MegaStore',
    merchantCategory: 'Consumer Electronics & Gift Cards',
    paymentMethod: 'Credit Card (ending 1148)',
    status: 'REVIEW_REQUIRED',
    riskScore: 89,
    riskLevel: 'HIGH',
    confidenceScore: 88,
    evidenceStrength: 'HIGH',
    verifiedSignalsCount: 5,
    totalSignalsEvaluated: 6,
    missingInfoCount: 1,
    signals: [
      'Rapid card testing: 6 micro-charges in 40 seconds',
      'Sudden gift voucher purchase spikes',
      'IP mismatch with shipping address',
      'Device emulator signature identified'
    ],
    breakdown: [
      { category: 'Card Velocity Testing', points: 28, description: '6 micro-transactions under ₹50 before large spike' },
      { category: 'Device Fingerprint', points: 24, description: 'Rooted Android emulator detected via WebGL strings' },
      { category: 'Merchant Risk Profile', points: 19, description: 'High-resale gift voucher purchases' },
      { category: 'Behavioral Variance', points: 18, description: 'Zero history with high-end tech goods' }
    ],
    analystExplanation: 'Classic card cracking behavior followed by rapid gift card liquidation before cardholder discovers intrusion.',
    executiveExplanation: 'Card testing pattern followed by ₹2.10L electronics liquidation attempt. Review required.'
  },
  {
    id: 'FG-84711',
    customerId: 'CUST-0891',
    customerName: 'Vikram Malhotra',
    customerTier: 'Commercial HNI',
    amount: 820000,
    formattedAmount: '₹8,20,000',
    currency: 'INR',
    timestamp: 'Today, 09:55:40 AM',
    merchant: 'Starlight Jewels & Bullion',
    merchantCategory: 'Precious Metals & Bullion Merchant',
    paymentMethod: 'RTGS Interbank Gateway',
    status: 'ACTION_PENDING',
    riskScore: 87,
    riskLevel: 'HIGH',
    confidenceScore: 90,
    evidenceStrength: 'HIGH',
    verifiedSignalsCount: 6,
    totalSignalsEvaluated: 7,
    missingInfoCount: 1,
    signals: [
      'Layering structure detected from 3 inbound UPI transfers',
      'Funds emptied within 14 minutes of receipt',
      'Beneficiary bullion dealer blacklisted in AML circular'
    ],
    breakdown: [
      { category: 'Mule Funnel Behavior', points: 32, description: '100% pass-through velocity with <15m dwell time' },
      { category: 'Beneficiary Entity Risk', points: 25, description: 'Merchant identified in previous FATF SAR report' },
      { category: 'Rapid Smurfing', points: 18, description: 'Aggregated micro-deposits totaling exact bullion price' },
      { category: 'Time of Execution', points: 12, description: 'Initiated immediately upon RTGS window opening' }
    ],
    analystExplanation: 'Suspected money mule pass-through account aggregating illicit payments and converting to untraceable bullion.',
    executiveExplanation: 'Account used as a staging funnel for rapid bullion liquidation. Recommend immediate account debit freeze.'
  },
  {
    id: 'FG-84705',
    customerId: 'CUST-6114',
    customerName: 'Ananya Deshmukh',
    customerTier: 'Standard Savings',
    amount: 45000,
    formattedAmount: '₹45,000',
    currency: 'INR',
    timestamp: 'Today, 09:12:18 AM',
    merchant: 'Reliance Smart Superstore',
    merchantCategory: 'Groceries & Household Goods',
    paymentMethod: 'UPI Direct (GPay)',
    status: 'RESOLVED',
    riskScore: 22,
    riskLevel: 'LOW',
    confidenceScore: 96,
    evidenceStrength: 'HIGH',
    verifiedSignalsCount: 7,
    totalSignalsEvaluated: 7,
    missingInfoCount: 0,
    signals: [
      'Device verified (28 months trusted history)',
      'Typical home geo-fence and routine ISP',
      'Amount within 1.2x monthly grocery spend'
    ],
    breakdown: [
      { category: 'Historical Alignment', points: 8, description: 'Consistent monthly grocery baseline' },
      { category: 'Biometric Authenticated', points: 6, description: 'TouchID biometric verification passed' },
      { category: 'Geo Match', points: 4, description: 'Registered home location matches WiFi BSSID' },
      { category: 'Low Risk Merchant', points: 4, description: 'Tier-1 verified national enterprise merchant' }
    ],
    analystExplanation: 'Standard verified household commerce with zero anomaly indicators.',
    executiveExplanation: 'Clean transaction consistent with customer profile and trusted hardware.'
  }
];

export const PRIMARY_CUSTOMER: CustomerProfile = {
  id: 'CUST-1847',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@enterprise-tech.in',
  phone: '+91 98451 •••••',
  accountAgeDays: 684,
  avgTransactionAmount: 26200,
  historicalTotalSpent: 1840000,
  previousFraudIncidents: 0,
  status: 'FLAGGED'
};

export const PRIMARY_DEVICE: DeviceIntel = {
  id: 'DEV-8472',
  model: 'Linux x86_64 / Headless Chrome 122.0',
  os: 'Linux OS Kernel 6.1 (Docker container footprint)',
  browserFingerprint: 'fp_a94f83e201bce471829',
  canvasHash: '0x9b4a1f22e8d',
  isNewDevice: true,
  firstSeen: '8 minutes ago (10:39 AM)',
  linkedAccountsCount: 7,
  linkedAccounts: [
    { accountId: 'ACC-9821 (Current)', accountHolder: 'Rahul Sharma', riskStatus: 'SUSPICIOUS', recentVolume: '₹4,82,000' },
    { accountId: 'ACC-4412 (User B)', accountHolder: 'Karan Mehra', riskStatus: 'FRAUD', recentVolume: '₹4,80,000' },
    { accountId: 'ACC-7731 (User C)', accountHolder: 'Sunil Rao', riskStatus: 'FRAUD', recentVolume: '₹4,50,000' },
    { accountId: 'ACC-1102 (User D)', accountHolder: 'Dinesh Patel', riskStatus: 'FRAUD', recentVolume: '₹7,20,000' },
    { accountId: 'ACC-5520 (User E)', accountHolder: 'Tarun Verma', riskStatus: 'SUSPICIOUS', recentVolume: '₹1,90,000' },
    { accountId: 'ACC-3319 (User F)', accountHolder: 'Aarav Joshi', riskStatus: 'NORMAL', recentVolume: '₹12,400' },
    { accountId: 'ACC-8804 (User G)', accountHolder: 'Neha Kapoor', riskStatus: 'NORMAL', recentVolume: '₹8,500' }
  ],
  verdict: 'This device is associated with multiple high-risk accounts and has generated ₹21.3L in coordinated transfers in the last 24 hours.'
};

export const PRIMARY_LOCATION: LocationIntel = {
  loginTime: '10:31 AM (16 min ago)',
  loginCity: 'Bangalore',
  loginCountry: 'India',
  loginCountryCode: 'IN',
  loginIp: '49.207.182.41',
  txTime: '10:47 AM (Active)',
  txCity: 'London',
  txCountry: 'United Kingdom',
  txCountryCode: 'GB',
  txIp: '103.241.12.88 (M247 UK Hosting)',
  distanceKm: 8024,
  elapsedTimeMin: 16,
  requiredSpeedKmh: 30090,
  isImpossible: true,
  riskContribution: 31
};

export const FRAUD_NETWORK_NODES: NetworkNode[] = [
  {
    id: 'MERCHANT_X',
    label: 'Apex Global Assets',
    sublabel: 'Crypto Exchange',
    type: 'MERCHANT',
    risk: 'CRITICAL',
    x: 400,
    y: 70,
    evidence: {
      title: 'Merchant Profile',
      details: 'Offshore unhosted digital asset exchange gateway without mandatory travel-rule KYC.',
      flags: ['FATF High Risk Jurisdiction', 'High Resale Liquidity', 'Rapid Layering Destination'],
      attributes: { MCC: '6051', Country: 'Seychelles', Tier: 'Unregulated' }
    }
  },
  {
    id: 'TX_84721',
    label: 'TX #84721',
    sublabel: '₹4,82,000',
    type: 'TRANSACTION',
    risk: 'CRITICAL',
    x: 400,
    y: 190,
    evidence: {
      title: 'Flagged Transaction',
      details: 'Large outbound transfer executing after multiple authentication failures.',
      flags: ['18.4x Spike', 'New Beneficiary', 'Crypto Off-ramp'],
      attributes: { Amount: '₹4,82,000', Velocity: 'Spike', Type: 'IMPS Outward' }
    }
  },
  {
    id: 'CUST_A',
    label: 'Customer A (Rahul S.)',
    sublabel: 'CUST-1847',
    type: 'CUSTOMER',
    risk: 'HIGH',
    x: 400,
    y: 310,
    evidence: {
      title: 'Primary Victim Profile',
      details: 'Salaried tech manager with clean 2-year history. Sudden credential reset 22 mins ago.',
      flags: ['Account Takeover Suspected', 'Password Reset Spike', 'Dormant Wire Reactivated'],
      attributes: { Tier: 'Preferred', Age: '684 Days', AvgMonthly: '₹42,000' }
    }
  },
  {
    id: 'DEVICE_X',
    label: 'Device DEV-8472',
    sublabel: 'Linux Headless',
    type: 'DEVICE',
    risk: 'CRITICAL',
    x: 220,
    y: 440,
    evidence: {
      title: 'Syndicate Hardware Footprint',
      details: 'Headless automated browser running on cloud VPS. Linked to 4 previously banned accounts.',
      flags: ['Emulator Footprint', 'Canvas Hash Collisions', 'Multi-Account Multiplexer'],
      attributes: { Fingerprint: 'fp_a94f83e201bce471829', AccountsLinked: '7', FirstSeen: '10:39 AM' }
    }
  },
  {
    id: 'IP_NODE',
    label: 'IP 103.241.12.88',
    sublabel: 'London / Egress',
    type: 'IP',
    risk: 'HIGH',
    x: 400,
    y: 440,
    evidence: {
      title: 'Commercial Egress Proxy',
      details: 'Known VPN datacenter IP associated with credential stuffing botnets.',
      flags: ['VPN Node', 'High Anomaly Score', 'Impossible Travel Vector'],
      attributes: { ISP: 'M247 Ltd UK', ASN: 'AS9009', AbuseScore: '94/100' }
    }
  },
  {
    id: 'CARD_NODE',
    label: 'Card ending 9402',
    sublabel: 'Virtual Card Token',
    type: 'CARD',
    risk: 'MEDIUM',
    x: 580,
    y: 440,
    evidence: {
      title: 'Payment Instrument',
      details: 'Virtual token provisioned 12 minutes prior to transaction execution.',
      flags: ['Recent Provisioning', 'International Enabled'],
      attributes: { Brand: 'Visa Platinum', Status: 'Active', Cardholder: 'Rahul Sharma' }
    }
  },
  {
    id: 'USER_B',
    label: 'Account B (Karan M.)',
    sublabel: 'ACC-4412',
    type: 'LINKED_USER',
    risk: 'CRITICAL',
    x: 100,
    y: 560,
    evidence: {
      title: 'Mule Intermediary 1',
      details: 'Received ₹4.80L from Account A, transferred ₹4.50L out within 4 minutes.',
      flags: ['Confirmed Mule', 'SAR Filed', 'Rapid Dwell Time'],
      attributes: { Status: 'Frozen', LossAvoided: '₹4,80,000', Role: 'Layer 1 Mule' }
    }
  },
  {
    id: 'USER_C',
    label: 'Account C (Sunil R.)',
    sublabel: 'ACC-7731',
    type: 'LINKED_USER',
    risk: 'CRITICAL',
    x: 260,
    y: 560,
    evidence: {
      title: 'Mule Intermediary 2',
      details: 'Part of coordinated device sharing ring DEV-8472.',
      flags: ['Synthetic Identity', 'Device Collision', 'Active Smurfing'],
      attributes: { Status: 'Restricted', KYC: 'Forged PAN', Ring: 'Syndicate Omega' }
    }
  },
  {
    id: 'USER_D',
    label: 'Account D (Dinesh P.)',
    sublabel: 'ACC-1102',
    type: 'LINKED_USER',
    risk: 'CRITICAL',
    x: 400,
    y: 560,
    evidence: {
      title: 'Syndicate Staging Account',
      details: 'Collected ₹7.20L across 3 accounts and routed to Apex Global Assets.',
      flags: ['Aggregation Point', 'Blacklist Match', 'Chargeback Spike'],
      attributes: { Role: 'Funnel Lead', PreviousCases: '2', Exposure: '₹14,50,000' }
    }
  }
];

export const FRAUD_NETWORK_EDGES: NetworkEdge[] = [
  { id: 'e1', source: 'MERCHANT_X', target: 'TX_84721', label: 'Payment Recipient', isSuspicious: true },
  { id: 'e2', source: 'TX_84721', target: 'CUST_A', label: 'Initiated By', isSuspicious: true },
  { id: 'e3', source: 'CUST_A', target: 'DEVICE_X', label: 'Used Device', isSuspicious: true },
  { id: 'e4', source: 'CUST_A', target: 'IP_NODE', label: 'Session IP', isSuspicious: true },
  { id: 'e5', source: 'CUST_A', target: 'CARD_NODE', label: 'Authorized With', isSuspicious: false },
  { id: 'e6', source: 'DEVICE_X', target: 'USER_B', label: 'Shared Hardware', isSuspicious: true },
  { id: 'e7', source: 'DEVICE_X', target: 'USER_C', label: 'Shared Hardware', isSuspicious: true },
  { id: 'e8', source: 'DEVICE_X', target: 'USER_D', label: 'Shared Hardware', isSuspicious: true },
  { id: 'e9', source: 'IP_NODE', target: 'USER_B', label: 'Shared IP Cluster', isSuspicious: true },
  { id: 'e10', source: 'USER_D', target: 'MERCHANT_X', label: 'Previous Off-ramp Flow', isSuspicious: true }
];

export const MONEY_TRACE_CHAIN: MoneyTrace = {
  chainId: 'MTC-99410',
  rootTransactionId: 'FG-84721',
  originAccount: 'Account A (CUST-1847 / Rahul Sharma)',
  destinationMerchant: 'Apex Global Assets Ltd (Crypto Gateway)',
  totalVolume: '₹5,00,000 Initial -> ₹4,32,000 Terminal Layered',
  patternDetected: 'Potential fund-layering and structuring pattern detected across 4 intermediary hops.',
  layeringSeverity: 'CRITICAL',
  amlWarning: 'High risk of money laundering under Section 3 of PMLA / FATF Recommendation 16 (Dwell time < 5 mins per hop).',
  hops: [
    {
      hopNumber: 1,
      fromAccount: 'Account A (Rahul Sharma)',
      toAccount: 'Account B (Karan Mehra - ACC-4412)',
      amount: 500000,
      formattedAmount: '₹5,00,000',
      timestamp: '10:35:10 AM',
      hopTimeDelta: 'Initial Transfer',
      retentionPercent: 100,
      flag: 'Trigger Event (Account Takeover Outflow)'
    },
    {
      hopNumber: 2,
      fromAccount: 'Account B (Karan Mehra)',
      toAccount: 'Account C (Sunil Rao - ACC-7731)',
      amount: 480000,
      formattedAmount: '₹4,80,000',
      timestamp: '10:39:18 AM',
      hopTimeDelta: '+4m 08s',
      retentionPercent: 96,
      flag: 'Layering Hop 1 (4% Mule Commission Retained)'
    },
    {
      hopNumber: 3,
      fromAccount: 'Account C (Sunil Rao)',
      toAccount: 'Account D (Dinesh Patel - ACC-1102)',
      amount: 450000,
      formattedAmount: '₹4,50,000',
      timestamp: '10:43:02 AM',
      hopTimeDelta: '+3m 44s',
      retentionPercent: 93.7,
      flag: 'Layering Hop 2 (6.2% Retained / Funnel Aggregation)'
    },
    {
      hopNumber: 4,
      fromAccount: 'Account D (Dinesh Patel)',
      toAccount: 'Merchant X (Apex Global Assets Ltd)',
      amount: 432000,
      formattedAmount: '₹4,32,000',
      timestamp: '10:47:12 AM',
      hopTimeDelta: '+4m 10s',
      retentionPercent: 96,
      flag: 'Final Liquidation to Digital Asset Off-Ramp'
    }
  ]
};

export const FRAUD_PATTERNS_LIBRARY: FraudPattern[] = [
  {
    id: 'PAT-01',
    name: 'Account Takeover (ATO)',
    category: 'Identity Compromise',
    matchScore: 91,
    severity: 'CRITICAL',
    description: 'Rapid credential reset followed by device change, beneficiary addition, and high-value wire execution.',
    matchedSignals: ['Password reset in last 30m', 'New device canvas hash', 'Max limit transfer']
  },
  {
    id: 'PAT-02',
    name: 'Device Sharing & Multiplexing',
    category: 'Syndicate Infrastructure',
    matchScore: 88,
    severity: 'CRITICAL',
    description: 'Hardware fingerprint shared across 5+ unconnected accounts with concurrent velocity spikes.',
    matchedSignals: ['Canvas hash 0x9b4a1f linked to 7 users', 'Headless browser UA', 'Virtual machine indicators']
  },
  {
    id: 'PAT-03',
    name: 'Impossible Travel Jump',
    category: 'Geolocation Anomaly',
    matchScore: 95,
    severity: 'CRITICAL',
    description: 'Geographic distance between consecutive authentication events violates maximum physical flight speeds.',
    matchedSignals: ['Bangalore -> London in 16 mins', 'Calculated speed: 30,090 km/h', 'Datacenter egress IP']
  },
  {
    id: 'PAT-04',
    name: 'Velocity Anomaly',
    category: 'Behavioral Deviation',
    matchScore: 76,
    severity: 'HIGH',
    description: 'Sudden high-velocity transaction frequency after long periods of typical baseline stability.',
    matchedSignals: ['18.4x baseline spend deviation', '3 failed PIN attempts', 'Instant fund drainage']
  },
  {
    id: 'PAT-05',
    name: 'Structuring & Fund Layering',
    category: 'Money Laundering (AML)',
    matchScore: 89,
    severity: 'CRITICAL',
    description: 'Breaking large illicit capital into cascading sequential transfers across intermediary mule accounts.',
    matchedSignals: ['4 consecutive rapid hops', 'Dwell time < 5 minutes', 'Final hop to crypto exchange']
  },
  {
    id: 'PAT-06',
    name: 'Rapid Fund Movement (Mule Funnel)',
    category: 'Money Laundering (AML)',
    matchScore: 82,
    severity: 'HIGH',
    description: 'Account receives external funds and immediately distributes 90%+ volume without typical holding time.',
    matchedSignals: ['Pass-through ratio > 94%', 'Zero regular merchant spending', 'Mule account linkage']
  },
  {
    id: 'PAT-07',
    name: 'Card Testing & Micro-probing',
    category: 'Payment Instrument Fraud',
    matchScore: 72,
    severity: 'MEDIUM',
    description: 'Automated rapid small authorization attempts to verify stolen card validity before major liquidation.',
    matchedSignals: ['Consecutive declined micro-auths', 'Scripted interval < 2 sec', 'Address verification failures']
  },
  {
    id: 'PAT-08',
    name: 'Synthetic Identity Footprint',
    category: 'Identity Fraud',
    matchScore: 65,
    severity: 'MEDIUM',
    description: 'Fabricated identity combining real and forged credit bureau variables with disposable contact points.',
    matchedSignals: ['Thin bureau file with high credit request', 'VOIP phone carrier', 'Recent email creation']
  },
  {
    id: 'PAT-09',
    name: 'Merchant Risk Anomaly',
    category: 'Merchant Counterparty',
    matchScore: 70,
    severity: 'HIGH',
    description: 'Unregulated offshore merchant with elevated chargeback ratio and lack of transaction dispute resolution.',
    matchedSignals: ['MCC 6051 unregulated exchange', 'Offshore jurisdiction', 'No 3DS chargeback protection']
  },
  {
    id: 'PAT-10',
    name: 'Behavioral Deviation Index',
    category: 'Biometric & Behavioral',
    matchScore: 84,
    severity: 'HIGH',
    description: 'Mouse movement, typing cadence, and session navigation dynamics heavily deviate from genuine user baseline.',
    matchedSignals: ['No natural mouse curve / scripted input', 'Copy-paste in OTP field', 'Zero page browsing dwell']
  }
];

export const AUTONOMOUS_INVESTIGATION_STEPS: AgentStep[] = [
  {
    stepNumber: 1,
    agentName: 'Supervisor',
    actionTitle: 'Ingest Transaction & Spin Up Agent Swarm',
    status: 'COMPLETED',
    latencyMs: 14,
    logDetail: 'Ingested Transaction FG-84721 (₹4,82,000) from Kafka ingress stream. Initialized 5 specialized investigation agents.',
    findings: 'Dispatched task tokens to Transaction, Identity, Network, Behavior, and Risk Agents.'
  },
  {
    stepNumber: 2,
    agentName: 'Transaction Agent',
    actionTitle: 'Calculate Amount & Velocity Deviation',
    status: 'COMPLETED',
    latencyMs: 38,
    logDetail: 'Queried historical 90-day transaction ledger for Customer CUST-1847. Rolling average = ₹26,200.',
    findings: 'CRITICAL ANOMALY: Transaction amount is 18.4× higher than rolling average. Velocity score: 94/100.'
  },
  {
    stepNumber: 3,
    agentName: 'Identity Agent',
    actionTitle: 'Device Fingerprint & Hardware Telemetry',
    status: 'COMPLETED',
    latencyMs: 42,
    logDetail: 'Extracted hardware canvas hash 0x9b4a1f22e8d and client TCP fingerprint. Queried central device database.',
    findings: 'FLAGGED: DEV-8472 is an unverified Linux headless browser, first observed 8 minutes ago.'
  },
  {
    stepNumber: 4,
    agentName: 'Identity Agent',
    actionTitle: 'IP Geolocation & Impossible Travel Validation',
    status: 'COMPLETED',
    latencyMs: 31,
    logDetail: 'Correlated Bangalore login (10:31 AM, 49.207.182.41) with London execution (10:47 AM, 103.241.12.88).',
    findings: 'IMPOSSIBLE TRAVEL: 8,024 km traversed in 16 minutes (~30,090 km/h). Commercial datacenter proxy detected.'
  },
  {
    stepNumber: 5,
    agentName: 'Network Agent',
    actionTitle: 'Recursive Entity Graph Discovery',
    status: 'COMPLETED',
    latencyMs: 84,
    logDetail: 'Traversed graph database 3 hops out from Device DEV-8472 and IP 103.241.12.88.',
    findings: 'SYNDICATE DETECTED: Hardware hash links to 4 other accounts (Karan M., Sunil R., Dinesh P.) with active fraud marks.'
  },
  {
    stepNumber: 6,
    agentName: 'Network Agent',
    actionTitle: 'Follow-The-Money Chain Tracing',
    status: 'COMPLETED',
    latencyMs: 65,
    logDetail: 'Traced funds across downstream ledger hops from Account A through B, C, D to Merchant X.',
    findings: 'MULE FUNNEL IDENTIFIED: ₹5.00L -> ₹4.80L -> ₹4.50L -> ₹4.32L within 12 minutes. Layering pattern confirmed.'
  },
  {
    stepNumber: 7,
    agentName: 'Behavior Agent',
    actionTitle: 'Behavioral Biometrics & Session Cadence Check',
    status: 'COMPLETED',
    latencyMs: 29,
    logDetail: 'Analyzed keystroke dynamics, paste actions, and 3 failed PIN authentication cycles.',
    findings: 'SUSPECTED ATO: Password changed 22 mins ago via automated script. OTP was directly pasted from clipboard.'
  },
  {
    stepNumber: 8,
    agentName: 'Risk Analyst',
    actionTitle: 'Cross-Reference Knowledge Base & Synthesize Score',
    status: 'COMPLETED',
    latencyMs: 52,
    logDetail: 'Evaluated against RBI Circular on Digital Payment Fraud & FATF Recommendation 16. Consolidated 6 verified signals.',
    findings: 'FINAL RISK SCORE: 93 / 100 (CRITICAL). AI Confidence: 92%. Evidence Strength: HIGH (6/7 signals verified).'
  },
  {
    stepNumber: 9,
    agentName: 'Action Agent',
    actionTitle: 'Enforce AI Guardrails & Propose Operational Action',
    status: 'COMPLETED',
    latencyMs: 18,
    logDetail: 'Target action: HOLD_TRANSACTION + REVOKE_SESSION. Evaluated consequential impact guardrail.',
    findings: 'GUARDRAIL ENGAGED: Action requires Human-in-the-Loop authorization. Modal dispatched to Fraud Analyst console.'
  },
  {
    stepNumber: 10,
    agentName: 'Supervisor',
    actionTitle: 'Emit Audit Ledger Hash & Ready Case Dossier',
    status: 'COMPLETED',
    latencyMs: 12,
    logDetail: 'Generated immutable audit block hash 0x7f4e91a0c4. Case #FG-84721 ready for analyst inspection.',
    findings: 'Autonomous investigation completed in 385ms. Dossier, Graph, and Money Trail synchronized.'
  }
];

export const AUDIT_RECORDS: AuditRecord[] = [
  {
    id: 'AUD-001',
    timestamp: '10:47:12.104',
    actor: 'AI_SUPERVISOR',
    action: 'INGEST_TRANSACTION',
    payloadSummary: 'Transaction FG-84721 ingested from IMPS switch for ₹4,82,000.',
    hash: '0x882a4f...991e',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-002',
    timestamp: '10:47:12.188',
    actor: 'TRANSACTION_AGENT',
    action: 'EVALUATE_VELOCITY',
    payloadSummary: 'Calculated 18.4x baseline deviation (Score +22).',
    hash: '0x44bc19...320d',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-003',
    timestamp: '10:47:12.240',
    actor: 'NETWORK_AGENT',
    action: 'RESOLVE_GRAPH_ENTITIES',
    payloadSummary: 'Identified DEV-8472 collision with 4 confirmed fraud mule accounts.',
    hash: '0xa910ce...77ff',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-004',
    timestamp: '10:47:12.312',
    actor: 'RISK_ANALYST',
    action: 'CALCULATE_RISK_SCORE',
    payloadSummary: 'Risk score finalized at 93/100 (CRITICAL). 6/7 signals verified.',
    hash: '0x17fa2b...84aa',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-005',
    timestamp: '10:47:12.385',
    actor: 'AI_SUPERVISOR',
    action: 'REQUEST_CONSEQUENTIAL_ACTION',
    payloadSummary: 'Requested HOLD_TRANSACTION on FG-84721. Awaiting human approval.',
    hash: '0xfe9921...013b',
    status: 'WAITING_CONFIRMATION'
  }
];

export const KNOWLEDGE_BASE_RULES: KnowledgeBaseRule[] = [
  {
    id: 'KB-PMLA-01',
    title: 'PMLA Section 3 & 12: Suspicious Rapid Fund Layering',
    regulatoryBody: 'Financial Intelligence Unit (FIU-IND) / FATF',
    category: 'Anti-Money Laundering',
    summary: 'Transactions where funds are deposited and dispersed within minutes across multiple unconnected accounts with high aggregate velocity must be flagged for mandatory Suspicious Transaction Reporting (STR).',
    triggerCondition: 'Dwell time < 15 minutes, pass-through ratio > 90%, 3+ intermediaries.',
    mandatedAction: 'Hold transaction pending identity verification; report within 7 business days.'
  },
  {
    id: 'KB-RBI-SEC-804',
    title: 'RBI Master Direction on Digital Payment Fraud Safeguards',
    regulatoryBody: 'Reserve Bank of India',
    category: 'Consumer & Payment Protection',
    summary: 'Requires multi-factor step-up authentication when an impossible geographic travel jump or unprecedented 10x ticket size deviation occurs from a novel hardware identifier.',
    triggerCondition: 'Speed > 800 km/h between sessions OR Ticket size > 10x average.',
    mandatedAction: 'Revoke active authentication token; require verified out-of-band biometric challenge.'
  },
  {
    id: 'KB-FATF-REC-16',
    title: 'FATF Recommendation 16 (The Travel Rule)',
    regulatoryBody: 'Financial Action Task Force',
    category: 'Cross-Border Wire Transfers',
    summary: 'Virtual asset service providers (VASPs) must obtain, verify, and transmit required originator and beneficiary information immediately upon digital asset transfers exceeding USD/EUR 1,000.',
    triggerCondition: 'Outbound crypto exchange gateway transfer without verified counterparty metadata.',
    mandatedAction: 'Immediate transaction hold until counterparty VASP verification is supplied.'
  },
  {
    id: 'KB-PCI-DSS-10',
    title: 'PCI-DSS Requirement 10: Immutable Logging & Audit Integrity',
    regulatoryBody: 'PCI Security Standards Council',
    category: 'Cybersecurity & Auditability',
    summary: 'All automated fraud detection engines and analytical intervention decisions must generate cryptographic audit trails recording model confidence, verified evidence, and actor approvals.',
    triggerCondition: 'Any automated or human decision altering transaction clearance status.',
    mandatedAction: 'Append tamper-evident entry to AI Decision Ledger.'
  }
];

export const PRIMARY_FRAUD_CASE: FraudCase = {
  id: 'FG-84721',
  title: 'Coordinated Account Takeover & Crypto Gateway Layering',
  description: 'Unusual ₹4,82,000 disbursement executed from newly registered London headless device following consecutive 2FA failures, routed into high-risk crypto off-ramp.',
  transaction: PRIMARY_TRANSACTION,
  customer: PRIMARY_CUSTOMER,
  device: PRIMARY_DEVICE,
  location: PRIMARY_LOCATION,
  networkNodes: FRAUD_NETWORK_NODES,
  networkEdges: FRAUD_NETWORK_EDGES,
  moneyTrace: MONEY_TRACE_CHAIN,
  fraudPatterns: FRAUD_PATTERNS_LIBRARY,
  investigationSteps: AUTONOMOUS_INVESTIGATION_STEPS
};

export const SUSPICIOUS_MULE_CASE: FraudCase = {
  id: 'FG-84722',
  title: 'Smurfing Mule Funnel & Inter-Bank Structuring Ring',
  description: 'Series of rapid micro-deposits aggregated into single staging hub and immediately wired outward within 3 minutes.',
  transaction: {
    ...PRIMARY_TRANSACTION,
    id: 'FG-84722',
    amount: 250000,
    formattedAmount: '₹2,50,000',
    merchant: 'Bullion Express Dealers',
    riskScore: 88,
    riskLevel: 'HIGH',
    status: 'REVIEW_REQUIRED',
    signals: [
      'Rapid velocity aggregation (4 inbound deposits in 12 min)',
      'Immediate 94% outbound balance depletion',
      'Account holder opened 14 days ago with zero prior credit history'
    ]
  },
  customer: {
    ...PRIMARY_CUSTOMER,
    id: 'CUST-8492',
    name: 'Vikram Mehta',
    status: 'FLAGGED'
  },
  device: PRIMARY_DEVICE,
  location: PRIMARY_LOCATION,
  networkNodes: FRAUD_NETWORK_NODES,
  networkEdges: FRAUD_NETWORK_EDGES,
  moneyTrace: MONEY_TRACE_CHAIN,
  fraudPatterns: FRAUD_PATTERNS_LIBRARY,
  investigationSteps: AUTONOMOUS_INVESTIGATION_STEPS
};

export const CLEARED_NORMAL_CASE: FraudCase = {
  id: 'FG-84723',
  title: 'Routine Corporate Monthly Payroll Settlement',
  description: 'Regular recurring wire transfer to verified corporate account from recognized corporate office subnet.',
  transaction: {
    ...PRIMARY_TRANSACTION,
    id: 'FG-84723',
    amount: 45000,
    formattedAmount: '₹45,000',
    merchant: 'Infosys Employee Payroll Clearing',
    riskScore: 12,
    riskLevel: 'LOW',
    status: 'APPROVED',
    signals: [
      'Matches 12-month recurring payroll schedule exactly',
      'Authorized biometric passkey fingerprint verified',
      'Originating from verified enterprise office IP'
    ]
  },
  customer: PRIMARY_CUSTOMER,
  device: {
    ...PRIMARY_DEVICE,
    isNewDevice: false,
    linkedAccountsCount: 1,
    verdict: 'Standard personal corporate workstation.'
  },
  location: {
    ...PRIMARY_LOCATION,
    distanceKm: 0,
    elapsedTimeMin: 0,
    requiredSpeedKmh: 0,
    isImpossible: false,
    riskContribution: 0
  },
  networkNodes: FRAUD_NETWORK_NODES,
  networkEdges: FRAUD_NETWORK_EDGES,
  moneyTrace: MONEY_TRACE_CHAIN,
  fraudPatterns: FRAUD_PATTERNS_LIBRARY,
  investigationSteps: AUTONOMOUS_INVESTIGATION_STEPS
};

export const ALL_CASES: FraudCase[] = [
  PRIMARY_FRAUD_CASE,
  SUSPICIOUS_MULE_CASE,
  CLEARED_NORMAL_CASE
];

export const INITIAL_AUDIT_LEDGER: AuditLedgerEntry[] = [
  {
    id: 'AL-1001',
    timestamp: '10:47:12.385 AM',
    caseId: 'FG-84721',
    actor: 'Action Agent (FinGuard Engine)',
    actorType: 'AI_AGENT',
    action: 'REQUEST_HOLD_TRANSACTION',
    modelVersion: 'FinGuard-Core-v4.2 (Bedrock Swarm)',
    evidenceHash: '0x7f4e91a0c4982a4f091bc78901',
    rationale: 'High composite risk (93/100). Mandatory human sign-off required for hold action per Enterprise Guardrail SEC-804.',
    status: 'WAITING_CONFIRMATION'
  },
  {
    id: 'AL-1002',
    timestamp: '10:47:12.312 AM',
    caseId: 'FG-84721',
    actor: 'Risk Analyst Agent',
    actorType: 'AI_AGENT',
    action: 'EVALUATE_COMPOSITE_RISK',
    modelVersion: 'FinGuard-Core-v4.2 (Bedrock Swarm)',
    evidenceHash: '0x17fa2bc018392091eacdf81928',
    rationale: 'Additive score calibrated at 93/100 across 6 verified signals with 92% model certainty.',
    status: 'EXECUTED'
  },
  {
    id: 'AL-1003',
    timestamp: '10:47:12.240 AM',
    caseId: 'FG-84721',
    actor: 'Network Agent',
    actorType: 'AI_AGENT',
    action: 'ENTITY_GRAPH_TRAVERSAL',
    modelVersion: 'FinGuard-Core-v4.2 (Bedrock Swarm)',
    evidenceHash: '0xa910ce44bc1908291f09230193',
    rationale: 'Traversed entity graph. Established hardware canvas hash DEV-8472 collision with 4 fraudulent accounts.',
    status: 'EXECUTED'
  },
  {
    id: 'AL-1004',
    timestamp: '10:22:15 AM',
    caseId: 'FG-84719',
    actor: 'Sr. Fraud Officer (Badge #9102)',
    actorType: 'HUMAN',
    action: 'BIOMETRIC_STEP_UP_CHALLENGED',
    modelVersion: 'Human Supervisory Override',
    evidenceHash: '0x38b2910fa9081eac8091726019',
    rationale: 'Customer contacted via telephone and completed biometric passkey re-enrollment.',
    status: 'EXECUTED'
  }
];

export const KNOWLEDGE_BASE_DATA: KnowledgeBaseItem[] = [
  {
    id: 'KB-PMLA-01',
    title: 'PMLA Section 3 & 12: Suspicious Rapid Fund Layering',
    category: 'Anti-Money Laundering (FIU-IND)',
    content: `Under Section 3 & 12 of the Prevention of Money Laundering Act (PMLA), financial entities must actively monitor transactions characterized by rapid fund dispersion.\n\nCriteria:\n1. Funds received are swiftly dispersed within minutes (< 15 mins dwell time).\n2. Multiple accounts with low historical average balances are used as intermediate hops.\n3. The final destination is a high-risk entity (unregulated VASP, crypto exchange, or bullion dealer).\n\nMandate: Place outbound debit hold and submit an automated Suspicious Transaction Report (STR) to FIU-IND within 7 working days.`
  },
  {
    id: 'KB-RBI-SEC-804',
    title: 'RBI Master Direction: Impossible Travel & Geolocation Anomalies',
    category: 'Payment Safeguards (RBI)',
    content: `Reserve Bank of India Directive on Digital Payment Fraud Safeguards:\n\nWhen two successive digital payment authentication sessions occur from distinct geographic regions where the distance divided by elapsed time exceeds 800 km/h (aerodynamic speed threshold), the banking platform must immediately:\n1. Invalidate active session tokens.\n2. Suppress automated clearing approval.\n3. Require out-of-band biometric liveness verification from the enrolled device before honoring transfers.`
  },
  {
    id: 'KB-FATF-REC-16',
    title: 'FATF Recommendation 16: The Travel Rule for Crypto Asset Transfers',
    category: 'International Standards (FATF)',
    content: `Financial Action Task Force Recommendation 16 requires ordering and beneficiary institutions to identify counterparty entities for any virtual asset transfer exceeding USD/EUR 1,000 (INR 85,000).\n\nWhere counterparty VASP verification metadata is missing or obfuscated via mixer subnets, the transaction must be flagged as Critical AML risk and subjected to manual supervisor sign-off.`
  },
  {
    id: 'KB-PCI-DSS-10',
    title: 'PCI-DSS Req 10: Immutable Logging and AI Decision Transparency',
    category: 'Audit & Compliance',
    content: `All automated algorithmic decision engines that modify consumer financial status (holds, restrictions, denials) must maintain an immutable, time-synchronized ledger entry. The entry must record input attributes, model confidence, decision hash, and the human supervisor authorizing consequential actions.`
  }
];

export const GUARDRAIL_RULES: GuardrailRule[] = [
  {
    id: 'GR-01',
    ruleName: 'Human Sign-off for Account Freezes',
    condition: 'Action == FREEZE_ACCOUNT OR HOLD_TRANSACTION > ₹1,00,000',
    enforcement: 'Block automated execution; trigger analyst approval dialog.',
    status: 'ACTIVE'
  },
  {
    id: 'GR-02',
    ruleName: 'Permitted Autonomous Biometric Step-Up',
    condition: 'RiskScore >= 50 AND RiskScore < 80',
    enforcement: 'AI Agent invokes step-up passkey challenge automatically.',
    status: 'ACTIVE'
  },
  {
    id: 'GR-03',
    ruleName: 'No Autonomous Fund Seizure',
    condition: 'Action == ASSET_CONFISCATION OR PERMANENT_REVERSAL',
    enforcement: 'Strictly prohibited. System will abort with error code GR-ERR-403.',
    status: 'ENFORCED'
  },
  {
    id: 'GR-04',
    ruleName: 'STR Report Drafting vs Filing Gate',
    condition: 'DocumentType == FIU_STR_REPORT',
    enforcement: 'AI may draft and populate forensic report; submission requires Compliance Officer signature.',
    status: 'ACTIVE'
  }
];
