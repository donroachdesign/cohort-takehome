'use client';

import { Layout, LayoutContent, LayoutPanel } from '@astryxdesign/core/Layout';
import { Card } from '@astryxdesign/core/Card';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { Icon } from '@astryxdesign/core/Icon';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { ProgressBar } from '@astryxdesign/core/ProgressBar';
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList';
import { Divider } from '@astryxdesign/core/Divider';
import { CourseHeader } from './CourseHeader';
import type { ReactNode } from 'react';
import type { pfbDraft } from '@/lib/data';

interface DraftViewProps {
  course: typeof pfbDraft;
  switcher?: ReactNode;
}

export function DraftView({ course, switcher }: DraftViewProps) {
  const allRecorded = course.recordedLessons === course.totalLessons;

  return (
    <Layout
      height="fill"
      header={
        <CourseHeader
          state="draft"
          title={course.title}
          instructor={course.instructor}
          meta={`Created ${course.createdOn} · Edited ${course.lastEdited}`}
          bannerHeading="In Draft"
          bannerDescription={`${course.recordedLessons} of ${course.totalLessons} lessons recorded · not visible to students yet`}
          switcher={switcher}
          actions={
            <Button
              label="Invite beta cohort"
              variant="primary"
              isDisabled={!allRecorded}
              tooltip={!allRecorded ? 'Finish recording all lessons before inviting a beta cohort' : undefined}
            />
          }
        />
      }
      content={
        <LayoutContent padding={8}>
          <VStack gap={4}>
            {course.modules.map(module => {
              const done = module.lessons.filter(l => l.isRecorded).length;
              return (
                <Card key={module.id} padding={4}>
                  <VStack gap={3}>
                    <HStack justify="between" vAlign="center">
                      <Heading level={4}>{module.title}</Heading>
                      <Text type="supporting">
                        {done}/{module.lessons.length} recorded
                      </Text>
                    </HStack>
                    <List hasDividers density="balanced">
                      {module.lessons.map(lesson => (
                        <ListItem
                          key={lesson.id}
                          label={lesson.title}
                          startContent={
                            <Icon
                              icon={lesson.isRecorded ? 'check' : 'clock'}
                              color={lesson.isRecorded ? 'success' : 'disabled'}
                              size="sm"
                            />
                          }
                          endContent={!lesson.isRecorded ? <Badge variant="warning" label="Needs video" /> : undefined}
                        />
                      ))}
                    </List>
                  </VStack>
                </Card>
              );
            })}
          </VStack>
        </LayoutContent>
      }
      end={
        <LayoutPanel width={340} hasDivider padding={8}>
          <VStack gap={5}>
            <VStack gap={2}>
              <Heading level={4}>Readiness</Heading>
              <ProgressBar
                label="Lessons recorded"
                value={course.recordedLessons}
                max={course.totalLessons}
                hasValueLabel
                variant={allRecorded ? 'success' : 'accent'}
              />
            </VStack>

            <Divider />

            <MetadataList columns="single">
              <MetadataListItem label="Price">
                <Text color="secondary">Not set</Text>
              </MetadataListItem>
              <MetadataListItem label="Visibility">Private</MetadataListItem>
              <MetadataListItem label="Created">{course.createdOn}</MetadataListItem>
              <MetadataListItem label="Last edited">{course.lastEdited}</MetadataListItem>
            </MetadataList>

            <Divider />

            <VStack gap={2}>
              <Heading level={5}>Before inviting a beta cohort</Heading>
              <List density="compact">
                {course.readiness.map(item => (
                  <ListItem
                    key={item.label}
                    label={item.label}
                    startContent={
                      <Icon icon={item.done ? 'check' : 'close'} color={item.done ? 'success' : 'disabled'} size="sm" />
                    }
                  />
                ))}
              </List>
            </VStack>
          </VStack>
        </LayoutPanel>
      }
    />
  );
}
