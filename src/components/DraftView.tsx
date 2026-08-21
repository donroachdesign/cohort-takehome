'use client';

import { useState } from 'react';
import { GripVertical, Pencil, Plus } from 'lucide-react';
import { Layout, LayoutContent, LayoutPanel } from '@astryxdesign/core/Layout';
import { Card } from '@astryxdesign/core/Card';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { Icon } from '@astryxdesign/core/Icon';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { DropdownMenu } from '@astryxdesign/core/DropdownMenu';
import { ProgressBar } from '@astryxdesign/core/ProgressBar';
import { NumberInput } from '@astryxdesign/core/NumberInput';
import { InputGroup, InputGroupText } from '@astryxdesign/core/InputGroup';
import { Selector } from '@astryxdesign/core/Selector';
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
  const [price, setPrice] = useState<number | null>(null);
  const [visibility, setVisibility] = useState('private');
  const readiness = course.readiness.map(item =>
    item.label === 'Pricing set' ? { ...item, done: price !== null && price > 0 } : item,
  );

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
            <HStack justify="between" vAlign="center">
              <VStack gap={0}>
                <Heading level={3}>Curriculum</Heading>
                <Text type="supporting">
                  {course.modules.length} modules · {course.totalLessons} lessons
                </Text>
              </VStack>
              <Button label="Add module" variant="secondary" icon={<Icon icon={Plus} size="sm" />} />
            </HStack>

            {course.modules.map(module => {
              const done = module.lessons.filter(l => l.isRecorded).length;
              return (
                <Card key={module.id} padding={4}>
                  <VStack gap={3}>
                    <HStack justify="between" vAlign="center">
                      <Heading level={4}>{module.title}</Heading>
                      <HStack gap={3} vAlign="center">
                        <Text type="supporting">
                          {done}/{module.lessons.length} recorded
                        </Text>
                        <Button
                          label="Add lesson"
                          variant="ghost"
                          size="sm"
                          icon={<Icon icon={Plus} size="sm" />}
                        />
                        <DropdownMenu
                          button={{
                            label: `${module.title} actions`,
                            variant: 'ghost',
                            size: 'sm',
                            isIconOnly: true,
                            icon: <Icon icon="moreHorizontal" size="sm" />,
                          }}
                          hasChevron={false}
                          items={[
                            { label: 'Move up', icon: 'arrowUp' },
                            { label: 'Move down', icon: 'arrowDown' },
                            { type: 'divider' },
                            { label: 'Delete module', variant: 'destructive' },
                          ]}
                        />
                      </HStack>
                    </HStack>
                    <List hasDividers density="balanced" className="[&>li:last-child]:border-b-0">
                      {module.lessons.map(lesson => (
                        <ListItem
                          key={lesson.id}
                          label={lesson.title}
                          startContent={
                            <HStack gap={2} vAlign="center">
                              <Icon icon={GripVertical} size="sm" color="disabled" />
                              <Icon
                                icon={lesson.isRecorded ? 'check' : 'clock'}
                                color={lesson.isRecorded ? 'success' : 'disabled'}
                                size="sm"
                              />
                            </HStack>
                          }
                          endContent={
                            <HStack gap={2} vAlign="center">
                              {!lesson.isRecorded && <Badge variant="warning" label="Needs video" />}
                              <IconButton
                                icon={<Icon icon={Pencil} size="sm" />}
                                label={`Edit ${lesson.title}`}
                                variant="ghost"
                                size="sm"
                              />
                            </HStack>
                          }
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
      start={
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
                <HStack justify="end">
                  <InputGroup label="Price" isLabelHidden size="sm">
                    <InputGroupText>$</InputGroupText>
                    <NumberInput
                      label="Amount"
                      isLabelHidden
                      value={price}
                      onChange={setPrice}
                      placeholder="0"
                      min={0}
                      step={1}
                      hasClear
                      width={80}
                    />
                  </InputGroup>
                </HStack>
              </MetadataListItem>
              <MetadataListItem label="Visibility">
                <HStack justify="end">
                  <Selector
                    label="Visibility"
                    isLabelHidden
                    size="sm"
                    width={140}
                    value={visibility}
                    onChange={setVisibility}
                    options={[
                      { value: 'private', label: 'Private' },
                      { value: 'beta', label: 'Invite-only (Beta)' },
                      { value: 'public', label: 'Public' },
                    ]}
                  />
                </HStack>
              </MetadataListItem>
              <MetadataListItem label="Created">
                <HStack justify="end">
                  <Text>{course.createdOn}</Text>
                </HStack>
              </MetadataListItem>
              <MetadataListItem label="Last edited">
                <HStack justify="end">
                  <Text>{course.lastEdited}</Text>
                </HStack>
              </MetadataListItem>
            </MetadataList>

            <Divider />

            <VStack gap={2}>
              <Heading level={5}>Before inviting a beta cohort</Heading>
              <List density="compact">
                {readiness.map(item => (
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
