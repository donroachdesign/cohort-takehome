'use client';

import { useState } from 'react';
import { GripVertical, Pencil, Plus, Circle } from 'lucide-react';
import { defineTheme } from '@astryxdesign/core/theme';
import { Theme } from '@astryxdesign/core';
import { stoneTheme } from '@astryxdesign/theme-stone/built';
import { Layout, LayoutContent, LayoutPanel } from '@astryxdesign/core/Layout';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
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
import { Tokenizer } from '@astryxdesign/core/Tokenizer';
import type { SearchableItem, SearchSource } from '@astryxdesign/core/Typeahead';
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList';
import { Divider } from '@astryxdesign/core/Divider';
import { CourseHeader } from './CourseHeader';
import type { ReactNode } from 'react';
import type { pfbDraft } from '@/lib/data';

interface DraftViewProps {
  course: typeof pfbDraft;
  switcher?: ReactNode;
}

const emptySource: SearchSource = { search: () => [], bootstrap: () => [] };

// NumberInput defaults to --color-border-emphasized (a stronger outline than
// Card's --color-border) since a standalone form field needs a clearer
// boundary. Scoped to just the Price field so its stroke matches the module
// cards instead of the rest of the app.
const cardStrokeFieldTheme = defineTheme({
  name: 'draft-panel-field-border',
  extends: stoneTheme,
  components: {
    'number-input': { base: { borderColor: 'var(--color-border)' } },
  },
});

export function DraftView({ course, switcher }: DraftViewProps) {
  const allRecorded = course.recordedLessons === course.totalLessons;
  // Curriculum is considered finalized once every lesson is recorded — there's
  // no separate manual "finalize" step, so this is derived, not its own toggle.
  const curriculumFinalized = allRecorded;
  const [price, setPrice] = useState<number | null>(null);
  const [invitees, setInvitees] = useState<SearchableItem[]>([]);
  const [isInviteListOpen, setIsInviteListOpen] = useState(false);

  const hasInvitees = invitees.length > 0;
  const readyForBeta = allRecorded && hasInvitees;
  const missing = [
    !allRecorded && 'record all lessons',
    !hasInvitees && 'add beta invitees',
  ].filter(Boolean) as string[];

  return (
    <>
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
              isDisabled={!readyForBeta}
              tooltip={!readyForBeta ? `Still needed: ${missing.join(', ')}` : undefined}
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

            <VStack gap={2}>
              <Heading level={5}>Ready for Beta</Heading>
              <Text type="supporting">Items remaining until ready for Beta</Text>
              <List density="compact">
                <ListItem
                  label="Curriculum outlined"
                  startContent={<Icon icon="check" color="success" size="sm" />}
                  endContent={<Text type="supporting">Done</Text>}
                />
                <ListItem
                  label="Course details added"
                  startContent={<Icon icon="check" color="success" size="sm" />}
                  endContent={<Text type="supporting">Done</Text>}
                />
                <ListItem
                  label="Curriculum finalized"
                  startContent={
                    <Icon
                      icon={curriculumFinalized ? 'check' : Circle}
                      color={curriculumFinalized ? 'success' : 'disabled'}
                      size="sm"
                    />
                  }
                  endContent={<Text type="supporting">{curriculumFinalized ? 'Locked' : 'Videos needed'}</Text>}
                />
                <ListItem
                  label={`Beta cohort invite list${hasInvitees ? ` (${invitees.length})` : ''}`}
                  startContent={
                    <Icon
                      icon={hasInvitees ? 'check' : Circle}
                      color={hasInvitees ? 'success' : 'disabled'}
                      size="sm"
                    />
                  }
                  endContent={
                    <button
                      type="button"
                      onClick={() => setIsInviteListOpen(true)}
                      className="cursor-pointer border-0 bg-transparent p-0 hover:underline"
                    >
                      <Text type="supporting">{hasInvitees ? 'Edit' : 'Add invitees'}</Text>
                    </button>
                  }
                />
              </List>
            </VStack>

            <Divider />

            <VStack gap={2}>
              <Heading level={5} color="secondary">
                Before going Open
              </Heading>
              <Text type="supporting">Not required until you&rsquo;re ready for public enrollment.</Text>
              <Theme theme={cardStrokeFieldTheme}>
                <MetadataList columns="single">
                  <MetadataListItem label="Price">
                    <HStack justify="end" gap={1} vAlign="center">
                      <Text color="secondary">$</Text>
                      <NumberInput
                        label="Price"
                        isLabelHidden
                        size="sm"
                        value={price}
                        onChange={setPrice}
                        placeholder="0.00"
                        min={0}
                        step={1}
                        hasClear
                        width={80}
                      />
                    </HStack>
                  </MetadataListItem>
                </MetadataList>
              </Theme>
            </VStack>
          </VStack>
        </LayoutPanel>
      }
    />
    <Dialog isOpen={isInviteListOpen} onOpenChange={setIsInviteListOpen} width={480} purpose="info">
        <Layout height="auto">
          <DialogHeader
            title="Beta cohort invite list"
            subtitle={`${invitees.length} invited so far`}
            onOpenChange={setIsInviteListOpen}
          />
          <LayoutContent padding={4}>
            <VStack gap={3}>
              <Text type="supporting">
                Add the people you want to test this course for free. They&rsquo;ll get access once you invite the cohort.
              </Text>
              <Tokenizer
                label="Beta invitees"
                searchSource={emptySource}
                value={invitees}
                onChange={items => setInvitees(items)}
                hasCreate
                placeholder="Type a name or email and press Enter..."
              />
            </VStack>
          </LayoutContent>
        </Layout>
      </Dialog>
    </>
  );
}
