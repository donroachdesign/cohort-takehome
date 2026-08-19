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

export const modules: Module[] = [
  {
    id: 'm1',
    title: 'Foundations of the Stock Market',
    lessons: [
      { id: 'l1-1', title: 'What actually happens when you buy a stock', isRecorded: true },
      { id: 'l1-2', title: 'Stocks vs. bonds vs. funds: knowing what you own', isRecorded: true },
      { id: 'l1-3', title: 'Reading a stock quote without getting overwhelmed', isRecorded: true },
    ],
  },
  {
    id: 'm2',
    title: 'Building Your Investing Toolkit',
    lessons: [
      { id: 'l2-1', title: 'Opening and funding a brokerage account', isRecorded: true },
      { id: 'l2-2', title: 'Index funds and ETFs: the boring stuff that works', isRecorded: true },
      { id: 'l2-3', title: 'Diversification and risk tolerance', isRecorded: true },
      { id: 'l2-4', title: 'Dollar-cost averaging in practice', isRecorded: true },
    ],
  },
  {
    id: 'm3',
    title: 'Reading the Market',
    lessons: [
      { id: 'l3-1', title: "How to read a company's earnings report", isRecorded: true },
      { id: 'l3-2', title: 'P/E ratios and other numbers that matter', isRecorded: true },
      { id: 'l3-3', title: 'Market cycles: bulls, bears, and corrections', isRecorded: true },
      { id: 'l3-4', title: 'Spotting hype vs. substance', isRecorded: true },
    ],
  },
  {
    id: 'm4',
    title: 'Building and Managing a Portfolio',
    lessons: [
      { id: 'l4-1', title: 'Asset allocation for your first portfolio', isRecorded: true },
      { id: 'l4-2', title: 'Rebalancing without overthinking it', isRecorded: true },
      { id: 'l4-3', title: 'Taxes, dividends, and account types (401k / IRA / brokerage)', isRecorded: true },
      { id: 'l4-4', title: 'When (and when not) to sell', isRecorded: true },
    ],
  },
  {
    id: 'm5',
    title: 'Staying the Course',
    lessons: [
      { id: 'l5-1', title: 'Live teardown: analyzing a real portfolio', isRecorded: true },
      { id: 'l5-2', title: 'Cohort project reviews', isRecorded: false },
      { id: 'l5-3', title: 'Closing session + Q&A', isRecorded: false },
    ],
  },
];

export const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0);
export const recordedLessons = modules.reduce(
  (n, m) => n + m.lessons.filter(l => l.isRecorded).length,
  0,
);

export const draftReadiness = [
  { label: 'Curriculum outline', done: true },
  { label: `Lesson videos recorded (${recordedLessons}/${totalLessons})`, done: recordedLessons === totalLessons },
  { label: 'Pricing set', done: false },
  { label: 'Beta cohort invite list', done: false },
];

export const cohortRoster: CohortStudent[] = [
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

export const betaFeedback: FeedbackItem[] = [
  {
    id: 'f1',
    author: 'Marcus Webb',
    rating: 5,
    quote: 'Finally a course that shows me an actual brokerage account, not just theory.',
  },
  {
    id: 'f2',
    author: 'Sofia Torres',
    rating: 3,
    quote: 'Module 2 lost me a bit — I get why diversification matters but the risk tolerance lesson felt rushed.',
  },
  {
    id: 'f3',
    author: 'Naomi Reyes',
    rating: 5,
    quote: 'The portfolio teardown sessions alone are worth it.',
  },
];

export const recentTransactions: Transaction[] = [
  { id: 't1', student: 'Grace Kim', enrolledOn: 'Today', amount: 249, status: 'paid' },
  { id: 't2', student: 'Oscar Lindqvist', enrolledOn: 'Today', amount: 249, status: 'paid' },
  { id: 't3', student: 'Hana Suzuki', enrolledOn: 'Yesterday', amount: 249, status: 'paid' },
  { id: 't4', student: 'Ben Okafor', enrolledOn: 'Yesterday', amount: 249, status: 'refunded' },
  { id: 't5', student: 'Claire Dubois', enrolledOn: '2 days ago', amount: 249, status: 'paid' },
  { id: 't6', student: 'Tariq Malik', enrolledOn: '2 days ago', amount: 249, status: 'paid' },
  { id: 't7', student: 'Ines Moreau', enrolledOn: '3 days ago', amount: 249, status: 'paid' },
  { id: 't8', student: 'Sam Whitfield', enrolledOn: '4 days ago', amount: 249, status: 'paid' },
];

export const course = {
  title: "Investing Fundamentals: Build Your First Stock Portfolio",
  instructor: 'Priya Desai',
  createdOn: 'Jun 2, 2026',
  lastEdited: '2 hours ago',
  price: 249,
  modules,
  beta: {
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
    roster: cohortRoster,
    feedback: betaFeedback,
  },
  open: {
    openedOn: '24 days ago',
    enrolledCount: 187,
    refundedCount: 6,
    weeklyDelta: 23,
    combinedRating: 4.7,
    combinedRatingCount: 203,
    platformFeeRate: 0.15,
    payoutSchedule: 'Every Friday · next payout Aug 21',
    refundReasons: [
      { id: 'r1', reason: 'Requested within 14-day window', count: 3 },
      { id: 'r2', reason: 'Duplicate purchase', count: 2 },
      { id: 'r3', reason: 'Chargeback', count: 1 },
    ],
    transactions: recentTransactions,
  },
};

export function grossRevenue() {
  return course.open.enrolledCount * course.price;
}

export function refunds() {
  return course.open.refundedCount * course.price;
}

export function netRevenue() {
  return (course.open.enrolledCount - course.open.refundedCount) * course.price;
}

export function platformFee() {
  return Math.round(grossRevenue() * course.open.platformFeeRate);
}

export function payoutAmount() {
  return netRevenue() - platformFee();
}

export function refundRate() {
  return (course.open.refundedCount / course.open.enrolledCount) * 100;
}
