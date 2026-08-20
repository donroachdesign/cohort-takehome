'use client';

import { useState, type ReactNode } from 'react';
import { Users, DollarSign, Undo2, Star, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Layout, LayoutContent } from '@astryxdesign/core/Layout';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { VStack, HStack, StackItem } from '@astryxdesign/core/Stack';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { Button } from '@astryxdesign/core/Button';
import { Toolbar } from '@astryxdesign/core/Toolbar';
import { Divider } from '@astryxdesign/core/Divider';
import { AlertDialog } from '@astryxdesign/core/AlertDialog';
import { Avatar } from '@astryxdesign/core/Avatar';
import { List, ListItem } from '@astryxdesign/core/List';
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList';
import {
  Table,
  useTableRowStatus,
  proportional,
  pixel,
} from '@astryxdesign/core/Table';
import type { TableColumn, TableRowStatus } from '@astryxdesign/core/Table';
import { CourseHeader } from './CourseHeader';
import {
  grossRevenue,
  refunds,
  netRevenue,
  platformFee,
  payoutAmount,
  refundRate,
  type OpenCourseData,
  type Transaction,
} from '@/lib/data';

function transactionStatus(t: Transaction): TableRowStatus | null {
  if (t.status === 'refunded') return { color: 'error', icon: 'error', label: 'Refunded' };
  return null;
}

const transactionColumns: TableColumn<Transaction>[] = [
  {
    key: 'student',
    header: 'Student',
    width: proportional(2),
    renderCell: t => (
      <HStack gap={2} vAlign="center">
        <Avatar name={t.student} size="sm" />
        <Text>{t.student}</Text>
      </HStack>
    ),
  },
  { key: 'enrolledOn', header: 'Enrolled', width: pixel(140) },
  {
    key: 'amount',
    header: 'Amount',
    width: pixel(100),
    renderCell: t => <Text hasTabularNumbers>${t.amount}</Text>,
  },
  {
    key: 'status',
    header: 'Status',
    width: pixel(120),
    renderCell: t => (t.status === 'refunded' ? <Text color="secondary">Refunded</Text> : <Text>Paid</Text>),
  },
];

function RevenueChartTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (!active || !payload?.length) return null;
  return (
    <Card padding={2}>
      <Text hasTabularNumbers>${payload[0].value.toLocaleString()}</Text>
    </Card>
  );
}

function RevenueChart({ data }: { data: OpenCourseData['weeklyRevenue'] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis
          dataKey="week"
          tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={v => `$${Math.round(v / 1000)}k`}
          tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<RevenueChartTooltip />} cursor={{ fill: 'var(--color-background-muted)' }} />
        <Bar dataKey="revenue" fill="var(--color-success)" radius={[4, 4, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface OpenViewProps {
  course: OpenCourseData;
  switcher?: ReactNode;
}

export function OpenView({ course, switcher }: OpenViewProps) {
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const rowStatus = useTableRowStatus<Transaction>({ getStatus: transactionStatus });

  return (
    <>
      <Layout
        height="fill"
        header={
          <CourseHeader
            state="open"
            title={course.title}
            instructor={course.instructor}
            meta={`Open since ${course.openedOn}`}
            bannerHeading="Open for enrollment"
            bannerDescription={`Live since ${course.openedOn} · public enrollment at $${course.price}/seat`}
            switcher={switcher}
            actions={
              <>
                <Button
                  label="View public page"
                  variant="secondary"
                  icon={<Icon icon={ExternalLink} size="sm" />}
                />
                <Button label="Edit pricing" variant="secondary" />
                <Button label="Pause enrollment" variant="ghost" onClick={() => setIsPauseOpen(true)} />
              </>
            }
          />
        }
        content={
          <LayoutContent padding={8}>
            <VStack gap={6}>
              <Grid columns={{ minWidth: 220 }} gap={4}>
                <Card padding={4}>
                  <VStack gap={1}>
                    <HStack gap={2} vAlign="center">
                      <Icon icon={Users} size="sm" color="secondary" />
                      <Text type="supporting">Enrolled</Text>
                    </HStack>
                    <Heading level={2} type="display-3">
                      {course.enrolledCount}
                    </Heading>
                    <Text type="supporting">+{course.weeklyDelta} this week</Text>
                  </VStack>
                </Card>

                <Card padding={4}>
                  <VStack gap={1}>
                    <HStack gap={2} vAlign="center">
                      <Icon icon={DollarSign} size="sm" color="secondary" />
                      <Text type="supporting">Net revenue</Text>
                    </HStack>
                    <Heading level={2} type="display-3">
                      ${netRevenue(course).toLocaleString()}
                    </Heading>
                    <Text type="supporting">{course.refundedCount} refunds deducted</Text>
                  </VStack>
                </Card>

                <Card padding={4}>
                  <VStack gap={1}>
                    <HStack gap={2} vAlign="center">
                      <Icon icon={Undo2} size="sm" color="secondary" />
                      <Text type="supporting">Refund rate</Text>
                    </HStack>
                    <Heading level={2} type="display-3">
                      {refundRate(course).toFixed(1)}%
                    </Heading>
                    <Text type="supporting">
                      {course.refundedCount} of {course.enrolledCount} enrollments
                    </Text>
                  </VStack>
                </Card>

                <Card padding={4}>
                  <VStack gap={1}>
                    <HStack gap={2} vAlign="center">
                      <Icon icon={Star} size="sm" color="secondary" />
                      <Text type="supporting">Rating</Text>
                    </HStack>
                    <Heading level={2} type="display-3">
                      {course.combinedRating} / 5
                    </Heading>
                    <Text type="supporting">{course.combinedRatingCount} ratings</Text>
                  </VStack>
                </Card>
              </Grid>

              <HStack gap={6} align="start" wrap="wrap">
                <StackItem size="fill">
                  <VStack gap={6}>
                    <Card padding={4}>
                      <VStack gap={4}>
                        <Heading level={4}>Revenue, last 8 weeks</Heading>
                        <RevenueChart data={course.weeklyRevenue} />
                      </VStack>
                    </Card>

                    <Card padding={0}>
                      <VStack gap={0}>
                        <Toolbar
                          label="Enrollment actions"
                          startContent={<Heading level={4}>Recent enrollments</Heading>}
                          endContent={
                            <Button variant="ghost" size="sm" label="Export CSV" icon={<Icon icon="copy" size="sm" />} />
                          }
                        />
                        <Divider />
                        <Table
                          data={course.transactions}
                          columns={transactionColumns}
                          idKey="id"
                          hasHover
                          plugins={{ rowStatus }}
                        />
                        <Divider />
                        <HStack justify="center" padding={3}>
                          <Text type="supporting">
                            Showing {course.transactions.length} of {course.enrolledCount} enrollments
                          </Text>
                        </HStack>
                      </VStack>
                    </Card>
                  </VStack>
                </StackItem>

                <StackItem>
                  <VStack gap={6} width={340}>
                    <Card padding={4}>
                      <VStack gap={3}>
                        <Heading level={4}>Revenue breakdown</Heading>
                        <MetadataList columns="single">
                          <MetadataListItem label="Gross revenue">
                            <Text hasTabularNumbers>${grossRevenue(course).toLocaleString()}</Text>
                          </MetadataListItem>
                          <MetadataListItem label="Refunds">
                            <Text hasTabularNumbers color="secondary">
                              −${refunds(course).toLocaleString()}
                            </Text>
                          </MetadataListItem>
                          <MetadataListItem label={`Platform fee (${Math.round(course.platformFeeRate * 100)}%)`}>
                            <Text hasTabularNumbers color="secondary">
                              −${platformFee(course).toLocaleString()}
                            </Text>
                          </MetadataListItem>
                          <MetadataListItem label="Your payout">
                            <Text hasTabularNumbers weight="semibold">
                              ${payoutAmount(course).toLocaleString()}
                            </Text>
                          </MetadataListItem>
                          <MetadataListItem label="Schedule">{course.payoutSchedule}</MetadataListItem>
                        </MetadataList>
                      </VStack>
                    </Card>

                    <Card padding={4}>
                      <VStack gap={3}>
                        <Heading level={4}>Why students refunded</Heading>
                        <List hasDividers density="compact">
                          {course.refundReasons.map(r => (
                            <ListItem key={r.id} label={r.reason} endContent={<Text type="supporting">{r.count}</Text>} />
                          ))}
                        </List>
                      </VStack>
                    </Card>
                  </VStack>
                </StackItem>
              </HStack>
            </VStack>
          </LayoutContent>
        }
      />
      <AlertDialog
        isOpen={isPauseOpen}
        onOpenChange={setIsPauseOpen}
        title="Pause enrollment?"
        description="New students won't be able to enroll until you resume. Existing students keep full access."
        actionLabel="Pause enrollment"
        actionVariant="destructive"
        onAction={() => setIsPauseOpen(false)}
      />
    </>
  );
}
