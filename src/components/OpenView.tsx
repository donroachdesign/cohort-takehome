'use client';

import { useState } from 'react';
import { Users, DollarSign, Undo2, Star } from 'lucide-react';
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
  course,
  grossRevenue,
  refunds,
  netRevenue,
  platformFee,
  payoutAmount,
  refundRate,
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

export function OpenView() {
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const { open } = course;
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
            meta={`Open since ${open.openedOn}`}
            bannerHeading="Open for enrollment"
            bannerDescription={`Live for ${open.openedOn} · public enrollment at $${course.price}/seat`}
            actions={
              <>
                <Button label="Edit pricing" variant="secondary" />
                <Button label="Pause enrollment" variant="ghost" onClick={() => setIsPauseOpen(true)} />
              </>
            }
          />
        }
        content={
          <LayoutContent padding={4}>
            <VStack gap={6}>
              <Grid columns={{ minWidth: 220 }} gap={4}>
                <Card padding={4}>
                  <VStack gap={1}>
                    <HStack gap={2} vAlign="center">
                      <Icon icon={Users} size="sm" color="secondary" />
                      <Text type="supporting">Enrolled</Text>
                    </HStack>
                    <Heading level={2} type="display-3">
                      {open.enrolledCount}
                    </Heading>
                    <Text type="supporting">+{open.weeklyDelta} this week</Text>
                  </VStack>
                </Card>

                <Card padding={4}>
                  <VStack gap={1}>
                    <HStack gap={2} vAlign="center">
                      <Icon icon={DollarSign} size="sm" color="secondary" />
                      <Text type="supporting">Net revenue</Text>
                    </HStack>
                    <Heading level={2} type="display-3">
                      ${netRevenue().toLocaleString()}
                    </Heading>
                    <Text type="supporting">{open.refundedCount} refunds deducted</Text>
                  </VStack>
                </Card>

                <Card padding={4}>
                  <VStack gap={1}>
                    <HStack gap={2} vAlign="center">
                      <Icon icon={Undo2} size="sm" color="secondary" />
                      <Text type="supporting">Refund rate</Text>
                    </HStack>
                    <Heading level={2} type="display-3">
                      {refundRate().toFixed(1)}%
                    </Heading>
                    <Text type="supporting">
                      {open.refundedCount} of {open.enrolledCount} enrollments
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
                      {open.combinedRating} / 5
                    </Heading>
                    <Text type="supporting">{open.combinedRatingCount} ratings</Text>
                  </VStack>
                </Card>
              </Grid>

              <HStack gap={6} align="start" wrap="wrap">
                <StackItem size="fill">
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
                        data={open.transactions}
                        columns={transactionColumns}
                        idKey="id"
                        hasHover
                        plugins={{ rowStatus }}
                      />
                      <Divider />
                      <HStack justify="center" padding={3}>
                        <Text type="supporting">
                          Showing {open.transactions.length} of {open.enrolledCount} enrollments
                        </Text>
                      </HStack>
                    </VStack>
                  </Card>
                </StackItem>

                <StackItem>
                  <VStack gap={6} width={340}>
                    <Card padding={4}>
                      <VStack gap={3}>
                        <Heading level={4}>Revenue breakdown</Heading>
                        <MetadataList columns="single">
                          <MetadataListItem label="Gross revenue">
                            <Text hasTabularNumbers>${grossRevenue().toLocaleString()}</Text>
                          </MetadataListItem>
                          <MetadataListItem label="Refunds">
                            <Text hasTabularNumbers color="secondary">
                              −${refunds().toLocaleString()}
                            </Text>
                          </MetadataListItem>
                          <MetadataListItem label="Platform fee (15%)">
                            <Text hasTabularNumbers color="secondary">
                              −${platformFee().toLocaleString()}
                            </Text>
                          </MetadataListItem>
                          <MetadataListItem label="Your payout">
                            <Text hasTabularNumbers weight="semibold">
                              ${payoutAmount().toLocaleString()}
                            </Text>
                          </MetadataListItem>
                          <MetadataListItem label="Schedule">{open.payoutSchedule}</MetadataListItem>
                        </MetadataList>
                      </VStack>
                    </Card>

                    <Card padding={4}>
                      <VStack gap={3}>
                        <Heading level={4}>Why students refunded</Heading>
                        <List hasDividers density="compact">
                          {open.refundReasons.map(r => (
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
