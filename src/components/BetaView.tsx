'use client';

import { Users, TriangleAlert, Star } from 'lucide-react';
import { Layout, LayoutContent } from '@astryxdesign/core/Layout';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { Button } from '@astryxdesign/core/Button';
import { ProgressBar } from '@astryxdesign/core/ProgressBar';
import { List, ListItem } from '@astryxdesign/core/List';
import { Table, proportional, pixel } from '@astryxdesign/core/Table';
import type { TableColumn } from '@astryxdesign/core/Table';
import { CourseHeader } from './CourseHeader';
import type { ReactNode } from 'react';
import type { betaCourse, CohortStudent } from '@/lib/data';

interface BetaViewProps {
  course: typeof betaCourse;
  onPromote: () => void;
  switcher?: ReactNode;
}

const rosterColumns: TableColumn<CohortStudent>[] = [
  { key: 'name', header: 'Student', width: proportional(2) },
  {
    key: 'progress',
    header: 'Progress',
    width: pixel(100),
    renderCell: student => <Text hasTabularNumbers>{student.progress}%</Text>,
  },
  {
    key: 'status',
    header: 'Status',
    width: proportional(2),
    renderCell: student =>
      student.status === 'stalled' ? (
        <Text>Stalled at {student.stalledAt}</Text>
      ) : student.status === 'completed' ? (
        <Text>Completed</Text>
      ) : (
        <Text>In progress</Text>
      ),
  },
  { key: 'lastActive', header: 'Last active', width: pixel(120) },
];

export function BetaView({ course, onPromote, switcher }: BetaViewProps) {
  const completedCount = course.roster.filter(s => s.status === 'completed').length;

  return (
    <Layout
      height="fill"
      header={
        <CourseHeader
          state="beta"
          title={course.title}
          instructor={course.instructor}
          meta={`${course.invitedCount} students invited · started ${course.startedOn}`}
          bannerHeading="In Beta"
          bannerDescription={`Day ${course.daysElapsed} of a suggested ${course.suggestedDurationDays} · ${course.invitedCount} invited students, free access`}
          switcher={switcher}
          actions={<Button label="Promote to Open" variant="primary" onClick={onPromote} />}
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
                    <Text type="supporting">Beta cohort</Text>
                  </HStack>
                  <Heading level={2} type="display-3">
                    {course.invitedCount}
                  </Heading>
                  <Text type="supporting">
                    invited · day {course.daysElapsed} of {course.suggestedDurationDays}
                  </Text>
                </VStack>
              </Card>

              <Card padding={4}>
                <VStack gap={2}>
                  <Text type="supporting">Completion rate</Text>
                  <Heading level={2} type="display-3">
                    {Math.round(course.completionRate * 100)}%
                  </Heading>
                  <ProgressBar
                    label="Completion rate"
                    isLabelHidden
                    value={Math.round(course.completionRate * 100)}
                    variant="accent"
                  />
                  <Text type="supporting">
                    {completedCount} of {course.invitedCount} completed
                  </Text>
                </VStack>
              </Card>

              <Card padding={4}>
                <VStack gap={1}>
                  <HStack gap={2} vAlign="center">
                    <Icon icon={Star} size="sm" color="secondary" />
                    <Text type="supporting">Avg. lesson rating</Text>
                  </HStack>
                  <Heading level={2} type="display-3">
                    {course.avgRating} / 5
                  </Heading>
                  <Text type="supporting">{course.ratingCount} ratings</Text>
                </VStack>
              </Card>

              <Card padding={4} variant="orange">
                <VStack gap={1}>
                  <HStack gap={2} vAlign="center">
                    <Icon icon={TriangleAlert} size="sm" color="warning" />
                    <Text type="supporting">Drop-off hotspot</Text>
                  </HStack>
                  <Heading level={2} type="display-3">
                    {course.dropOffPercent}%
                  </Heading>
                  <Text type="supporting">stall at {course.dropOffLesson}</Text>
                </VStack>
              </Card>
            </Grid>

            <VStack gap={2}>
              <Heading level={4}>Cohort roster</Heading>
              <Table data={course.roster} columns={rosterColumns} idKey="id" hasHover dividers="rows" />
              <Text type="supporting">Showing 10 of {course.invitedCount} invited students</Text>
            </VStack>

            <VStack gap={2}>
              <Heading level={4}>Student feedback</Heading>
              <List hasDividers density="compact">
                {course.feedback.map(item => (
                  <ListItem key={item.id} label={`${item.author} · ${item.rating}★`} description={item.quote} />
                ))}
              </List>
            </VStack>
          </VStack>
        </LayoutContent>
      }
    />
  );
}
