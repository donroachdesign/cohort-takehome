export type CourseState = 'draft' | 'beta' | 'open';

export interface Lesson {
  id: string;
  title: string;
  isRecorded: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CohortStudent extends Record<string, unknown> {
  id: string;
  name: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'stalled';
  lastActive: string;
  stalledAt?: string;
}

export interface FeedbackItem {
  id: string;
  author: string;
  rating: number;
  quote: string;
}

export interface Transaction extends Record<string, unknown> {
  id: string;
  student: string;
  enrolledOn: string;
  amount: number;
  status: 'paid' | 'refunded';
}

export interface RefundReason {
  id: string;
  reason: string;
  count: number;
}

export interface WeeklyRevenuePoint {
  week: string;
  enrollments: number;
  revenue: number;
}

export interface OpenCourseData {
  title: string;
  instructor: string;
  price: number;
  openedOn: string;
  enrolledCount: number;
  refundedCount: number;
  weeklyDelta: number;
  combinedRating: number;
  combinedRatingCount: number;
  completionRate: number;
  landingPageVisitors: number;
  platformFeeRate: number;
  payoutSchedule: string;
  refundReasons: RefundReason[];
  transactions: Transaction[];
  weeklyRevenue: WeeklyRevenuePoint[];
}

function draftReadinessFor(modules: Module[]) {
  const total = modules.reduce((n, m) => n + m.lessons.length, 0);
  const recorded = modules.reduce((n, m) => n + m.lessons.filter(l => l.isRecorded).length, 0);
  return {
    totalLessons: total,
    recordedLessons: recorded,
    readiness: [
      { label: 'Curriculum outline', done: true },
      { label: 'Pricing set', done: false },
      { label: 'Beta cohort invite list', done: false },
    ],
  };
}

// ============= PERSONAL FINANCE BASICS — the switchable demo course =============

const pfbModules: Module[] = [
  {
    id: 'd-m1',
    title: 'Getting Your Numbers Right',
    lessons: [
      { id: 'd-l1-1', title: 'Tracking spending without a spreadsheet headache', isRecorded: true },
      { id: 'd-l1-2', title: 'Building a budget that survives contact with real life', isRecorded: true },
      { id: 'd-l1-3', title: 'Understanding your true monthly cash flow', isRecorded: true },
    ],
  },
  {
    id: 'd-m2',
    title: 'Saving With a Purpose',
    lessons: [
      { id: 'd-l2-1', title: 'Emergency funds: how much is enough', isRecorded: true },
      { id: 'd-l2-2', title: 'High-yield savings vs. checking: where cash should sit', isRecorded: true },
      { id: 'd-l2-3', title: "Automating savings so willpower isn't the plan", isRecorded: true },
      { id: 'd-l2-4', title: 'Saving for short-term goals vs. long-term goals', isRecorded: true },
    ],
  },
  {
    id: 'd-m3',
    title: 'Taming Debt',
    lessons: [
      { id: 'd-l3-1', title: 'Good debt, bad debt, and the difference that matters', isRecorded: true },
      { id: 'd-l3-2', title: 'Avalanche vs. snowball: picking a payoff strategy', isRecorded: true },
      { id: 'd-l3-3', title: 'Understanding your credit score without the mystery', isRecorded: true },
      { id: 'd-l3-4', title: 'Negotiating with lenders and collectors', isRecorded: true },
    ],
  },
  {
    id: 'd-m4',
    title: "Protecting What You've Built",
    lessons: [
      { id: 'd-l4-1', title: 'Insurance basics: what you actually need', isRecorded: true },
      { id: 'd-l4-2', title: 'Understanding your paycheck and withholdings', isRecorded: true },
      { id: 'd-l4-3', title: 'Employer benefits most people leave on the table', isRecorded: true },
      { id: 'd-l4-4', title: 'When to actually talk to a professional', isRecorded: true },
    ],
  },
  {
    id: 'd-m5',
    title: 'Building Momentum',
    lessons: [
      { id: 'd-l5-1', title: 'Live teardown: a real household budget', isRecorded: true },
      { id: 'd-l5-2', title: 'Cohort project reviews', isRecorded: false },
      { id: 'd-l5-3', title: 'Closing session + Q&A', isRecorded: false },
    ],
  },
];

const pfbReadiness = draftReadinessFor(pfbModules);

export const pfbDraft = {
  title: 'Personal Finance Basics',
  instructor: 'Priya Desai',
  createdOn: 'Jul 28, 2026',
  lastEdited: '3 hours ago',
  modules: pfbModules,
  totalLessons: pfbReadiness.totalLessons,
  recordedLessons: pfbReadiness.recordedLessons,
  readiness: pfbReadiness.readiness,
};

const pfbRoster: CohortStudent[] = [
  { id: 'p1', name: 'Maya Lindström', progress: 100, status: 'completed', lastActive: '1 day ago' },
  { id: 'p2', name: 'Carlos Jiménez', progress: 100, status: 'completed', lastActive: '4 days ago' },
  { id: 'p3', name: 'Beatrice Owusu', progress: 91, status: 'in-progress', lastActive: 'Today' },
  { id: 'p4', name: 'Felix Grant', progress: 58, status: 'stalled', lastActive: '7 days ago', stalledAt: 'Avalanche vs. snowball: picking a payoff strategy' },
  { id: 'p5', name: 'Nadia Petrov', progress: 100, status: 'completed', lastActive: '2 days ago' },
  { id: 'p6', name: 'Simon Achebe', progress: 40, status: 'stalled', lastActive: '10 days ago', stalledAt: 'Avalanche vs. snowball: picking a payoff strategy' },
  { id: 'p7', name: 'Wren Sullivan', progress: 88, status: 'in-progress', lastActive: 'Today' },
  { id: 'p8', name: 'Delphine Roy', progress: 100, status: 'completed', lastActive: '5 days ago' },
  { id: 'p9', name: 'Kofi Mensah', progress: 26, status: 'stalled', lastActive: '13 days ago', stalledAt: 'Understanding your true monthly cash flow' },
  { id: 'p10', name: 'Harriet Boone', progress: 70, status: 'in-progress', lastActive: 'Yesterday' },
];

const pfbFeedback: FeedbackItem[] = [
  { id: 'pf1', author: 'Beatrice Owusu', rating: 5, quote: 'I finally understand my own paycheck. Wish I had this at 22.' },
  { id: 'pf2', author: 'Felix Grant', rating: 3, quote: 'The debt payoff module was good but I wanted more on negotiating with collectors specifically.' },
  { id: 'pf3', author: 'Delphine Roy', rating: 5, quote: 'Short lessons, no fluff. I actually finished it.' },
];

export const pfbBeta = {
  title: 'Personal Finance Basics',
  instructor: 'Priya Desai',
  price: 129,
  invitedCount: 35,
  startedOn: '14 days ago',
  daysElapsed: 14,
  suggestedDurationDays: 21,
  completionRate: 0.74,
  avgRating: 4.8,
  ratingCount: 31,
  dropOffLesson: 'Avalanche vs. snowball: picking a payoff strategy (Module 3.2)',
  dropOffPercent: 17,
  lowRatedCount: 1,
  roster: pfbRoster,
  feedback: pfbFeedback,
};

const pfbTransactions: Transaction[] = [
  { id: 'pt1', student: 'Rosa Delgado', enrolledOn: 'Today', amount: 129, status: 'paid' },
  { id: 'pt2', student: 'Anders Berg', enrolledOn: 'Today', amount: 129, status: 'paid' },
  { id: 'pt3', student: 'Fatima Siddiqui', enrolledOn: 'Yesterday', amount: 129, status: 'paid' },
  { id: 'pt4', student: 'Jules Bergeron', enrolledOn: 'Yesterday', amount: 129, status: 'refunded' },
  { id: 'pt5', student: 'Trevor Lynch', enrolledOn: '2 days ago', amount: 129, status: 'paid' },
  { id: 'pt6', student: 'Amani Diallo', enrolledOn: '2 days ago', amount: 129, status: 'paid' },
  { id: 'pt7', student: 'Sven Håkansson', enrolledOn: '3 days ago', amount: 129, status: 'paid' },
  { id: 'pt8', student: 'Renata Silva', enrolledOn: '4 days ago', amount: 129, status: 'paid' },
];

export const pfbOpen: OpenCourseData = {
  title: 'Personal Finance Basics',
  instructor: 'Priya Desai',
  price: 129,
  openedOn: '56 days ago',
  enrolledCount: 214,
  refundedCount: 9,
  weeklyDelta: 37,
  combinedRating: 4.8,
  combinedRatingCount: 245,
  completionRate: 0.58,
  landingPageVisitors: 4460,
  platformFeeRate: 0.15,
  payoutSchedule: 'Every Friday · next payout Aug 21',
  refundReasons: [
    { id: 'r1', reason: 'Requested within 14-day window', count: 4 },
    { id: 'r2', reason: 'Duplicate purchase', count: 3 },
    { id: 'r3', reason: 'Course not what expected', count: 2 },
  ],
  transactions: pfbTransactions,
  weeklyRevenue: [
    { week: 'W1', enrollments: 18, revenue: 2322 },
    { week: 'W2', enrollments: 20, revenue: 2580 },
    { week: 'W3', enrollments: 24, revenue: 3096 },
    { week: 'W4', enrollments: 22, revenue: 2838 },
    { week: 'W5', enrollments: 27, revenue: 3483 },
    { week: 'W6', enrollments: 32, revenue: 4128 },
    { week: 'W7', enrollments: 34, revenue: 4386 },
    { week: 'W8', enrollments: 37, revenue: 4773 },
  ],
};

// ============= INVESTING FUNDAMENTALS — Beta, with the real promotion flow =============

const investingRoster: CohortStudent[] = [
  { id: 's1', name: 'Jordan Ames', progress: 100, status: 'completed', lastActive: '2 days ago' },
  { id: 's2', name: 'Priya Chandra', progress: 100, status: 'completed', lastActive: '5 days ago' },
  { id: 's3', name: 'Marcus Webb', progress: 89, status: 'in-progress', lastActive: 'Today' },
  { id: 's4', name: 'Sofia Torres', progress: 61, status: 'stalled', lastActive: '9 days ago', stalledAt: 'Diversification and risk tolerance' },
  { id: 's5', name: 'Devon Blake', progress: 100, status: 'completed', lastActive: '1 day ago' },
  { id: 's6', name: 'Amara Osei', progress: 33, status: 'stalled', lastActive: '12 days ago', stalledAt: 'Diversification and risk tolerance' },
  { id: 's7', name: 'Liam Chen', progress: 94, status: 'in-progress', lastActive: 'Today' },
  { id: 's8', name: 'Naomi Reyes', progress: 100, status: 'completed', lastActive: '3 days ago' },
  { id: 's9', name: 'Ravi Patel', progress: 22, status: 'stalled', lastActive: '14 days ago', stalledAt: 'Opening and funding a brokerage account' },
  { id: 's10', name: 'Ella Fitzgerald', progress: 78, status: 'in-progress', lastActive: 'Yesterday' },
];

const investingFeedback: FeedbackItem[] = [
  { id: 'f1', author: 'Marcus Webb', rating: 5, quote: 'Finally a course that shows me an actual brokerage account, not just theory.' },
  { id: 'f2', author: 'Sofia Torres', rating: 3, quote: 'Module 2 lost me a bit — I get why diversification matters but the risk tolerance lesson felt rushed.' },
  { id: 'f3', author: 'Naomi Reyes', rating: 5, quote: 'The portfolio teardown sessions alone are worth it.' },
];

export const betaCourse = {
  title: 'Investing Fundamentals: Build Your First Stock Portfolio',
  instructor: 'Priya Desai',
  price: 249,
  invitedCount: 42,
  startedOn: '19 days ago',
  daysElapsed: 19,
  suggestedDurationDays: 21,
  completionRate: 0.68,
  avgRating: 4.6,
  ratingCount: 128,
  dropOffLesson: 'Diversification and risk tolerance (Module 2.3)',
  dropOffPercent: 24,
  lowRatedCount: 3,
  roster: investingRoster,
  feedback: investingFeedback,
};

const investingTransactions: Transaction[] = [
  { id: 't1', student: 'Grace Kim', enrolledOn: 'Today', amount: 249, status: 'paid' },
  { id: 't2', student: 'Oscar Lindqvist', enrolledOn: 'Today', amount: 249, status: 'paid' },
  { id: 't3', student: 'Hana Suzuki', enrolledOn: 'Yesterday', amount: 249, status: 'paid' },
  { id: 't4', student: 'Ben Okafor', enrolledOn: 'Yesterday', amount: 249, status: 'refunded' },
  { id: 't5', student: 'Claire Dubois', enrolledOn: '2 days ago', amount: 249, status: 'paid' },
  { id: 't6', student: 'Tariq Malik', enrolledOn: '2 days ago', amount: 249, status: 'paid' },
  { id: 't7', student: 'Ines Moreau', enrolledOn: '3 days ago', amount: 249, status: 'paid' },
  { id: 't8', student: 'Sam Whitfield', enrolledOn: '4 days ago', amount: 249, status: 'paid' },
];

// What Investing Fundamentals looks like once its instructor promotes it.
export const investingOpenData: OpenCourseData = {
  title: betaCourse.title,
  instructor: betaCourse.instructor,
  price: betaCourse.price,
  openedOn: '56 days ago',
  enrolledCount: 187,
  refundedCount: 6,
  weeklyDelta: 33,
  combinedRating: 4.7,
  combinedRatingCount: 203,
  completionRate: 0.52,
  landingPageVisitors: 4100,
  platformFeeRate: 0.15,
  payoutSchedule: 'Every Friday · next payout Aug 21',
  refundReasons: [
    { id: 'r1', reason: 'Requested within 14-day window', count: 3 },
    { id: 'r2', reason: 'Duplicate purchase', count: 2 },
    { id: 'r3', reason: 'Chargeback', count: 1 },
  ],
  transactions: investingTransactions,
  weeklyRevenue: [
    { week: 'W1', enrollments: 14, revenue: 3486 },
    { week: 'W2', enrollments: 18, revenue: 4482 },
    { week: 'W3', enrollments: 21, revenue: 5229 },
    { week: 'W4', enrollments: 19, revenue: 4731 },
    { week: 'W5', enrollments: 24, revenue: 5976 },
    { week: 'W6', enrollments: 27, revenue: 6723 },
    { week: 'W7', enrollments: 31, revenue: 7719 },
    { week: 'W8', enrollments: 33, revenue: 8217 },
  ],
};

// ============= OPTIONS TRADING 201 — Beta for now =============

const optionsRoster: CohortStudent[] = [
  { id: 'o1', name: 'Grant Okafor', progress: 100, status: 'completed', lastActive: '3 days ago' },
  { id: 'o2', name: 'Wendy Park', progress: 95, status: 'in-progress', lastActive: 'Today' },
  { id: 'o3', name: 'Elliot Marsh', progress: 48, status: 'stalled', lastActive: '6 days ago', stalledAt: 'Greeks: delta, theta, and vega without the math panic' },
  { id: 'o4', name: 'Sana Malik', progress: 100, status: 'completed', lastActive: '1 day ago' },
  { id: 'o5', name: 'Otto Brandt', progress: 33, status: 'stalled', lastActive: '8 days ago', stalledAt: 'Reading an options chain' },
  { id: 'o6', name: 'Ingrid Solberg', progress: 82, status: 'in-progress', lastActive: 'Today' },
  { id: 'o7', name: 'Marcus Feld', progress: 100, status: 'completed', lastActive: '4 days ago' },
  { id: 'o8', name: 'Priya Rao', progress: 60, status: 'in-progress', lastActive: 'Yesterday' },
  { id: 'o9', name: 'Declan Murphy', progress: 20, status: 'stalled', lastActive: '9 days ago', stalledAt: 'Reading an options chain' },
  { id: 'o10', name: 'Zara Ahmed', progress: 91, status: 'in-progress', lastActive: 'Today' },
];

const optionsFeedback: FeedbackItem[] = [
  { id: 'of1', author: 'Wendy Park', rating: 5, quote: "This is the first options course that didn't assume I already knew what a strike price was." },
  { id: 'of2', author: 'Elliot Marsh', rating: 2, quote: 'The Greeks lesson moved too fast. Had to rewatch it three times.' },
  { id: 'of3', author: 'Sana Malik', rating: 5, quote: 'Paper trading the whole cohort together made this click.' },
];

export const optionsBeta = {
  title: 'Options Trading 201',
  instructor: 'Priya Desai',
  price: 349,
  invitedCount: 28,
  startedOn: '10 days ago',
  daysElapsed: 10,
  suggestedDurationDays: 21,
  completionRate: 0.54,
  avgRating: 4.3,
  ratingCount: 22,
  dropOffLesson: 'Greeks: delta, theta, and vega without the math panic (Module 2.2)',
  dropOffPercent: 29,
  lowRatedCount: 2,
  roster: optionsRoster,
  feedback: optionsFeedback,
};

// Kept for later use — Options Trading 201's Open cockpit, once it's ready to leave Beta.
export const optionsOpen: OpenCourseData = {
  title: 'Options Trading 201',
  instructor: 'Priya Desai',
  price: 349,
  openedOn: '112 days ago',
  enrolledCount: 96,
  refundedCount: 4,
  weeklyDelta: 16,
  combinedRating: 4.5,
  combinedRatingCount: 88,
  completionRate: 0.46,
  landingPageVisitors: 2900,
  platformFeeRate: 0.15,
  payoutSchedule: 'Every Friday · next payout Aug 21',
  refundReasons: [
    { id: 'r1', reason: 'Requested within 14-day window', count: 2 },
    { id: 'r2', reason: 'Course too advanced for my level', count: 1 },
    { id: 'r3', reason: 'Duplicate purchase', count: 1 },
  ],
  transactions: [
    { id: 'ot1', student: 'Derek Holt', enrolledOn: 'Today', amount: 349, status: 'paid' },
    { id: 'ot2', student: 'Priya Nair', enrolledOn: 'Today', amount: 349, status: 'paid' },
    { id: 'ot3', student: 'Yusuf Karim', enrolledOn: 'Yesterday', amount: 349, status: 'paid' },
    { id: 'ot4', student: 'Molly Sanders', enrolledOn: 'Yesterday', amount: 349, status: 'refunded' },
    { id: 'ot5', student: 'Ben Ortiz', enrolledOn: '2 days ago', amount: 349, status: 'paid' },
    { id: 'ot6', student: 'Claudia Reyes', enrolledOn: '3 days ago', amount: 349, status: 'paid' },
    { id: 'ot7', student: 'Tom Bennett', enrolledOn: '4 days ago', amount: 349, status: 'paid' },
    { id: 'ot8', student: 'Layla Haddad', enrolledOn: '5 days ago', amount: 349, status: 'paid' },
  ],
  weeklyRevenue: [
    { week: 'W1', enrollments: 8, revenue: 2792 },
    { week: 'W2', enrollments: 9, revenue: 3141 },
    { week: 'W3', enrollments: 11, revenue: 3839 },
    { week: 'W4', enrollments: 10, revenue: 3490 },
    { week: 'W5', enrollments: 13, revenue: 4537 },
    { week: 'W6', enrollments: 14, revenue: 4886 },
    { week: 'W7', enrollments: 15, revenue: 5235 },
    { week: 'W8', enrollments: 16, revenue: 5584 },
  ],
};

// ============= OPEN-STATE HELPERS (shared shape) =============

export function grossRevenue(open: OpenCourseData) {
  return open.enrolledCount * open.price;
}

export function refunds(open: OpenCourseData) {
  return open.refundedCount * open.price;
}

export function netRevenue(open: OpenCourseData) {
  return (open.enrolledCount - open.refundedCount) * open.price;
}

export function platformFee(open: OpenCourseData) {
  return Math.round(grossRevenue(open) * open.platformFeeRate);
}

export function payoutAmount(open: OpenCourseData) {
  return netRevenue(open) - platformFee(open);
}

export function refundRate(open: OpenCourseData) {
  return (open.refundedCount / open.enrolledCount) * 100;
}

export function conversionRate(open: OpenCourseData) {
  return (open.enrolledCount / open.landingPageVisitors) * 100;
}
