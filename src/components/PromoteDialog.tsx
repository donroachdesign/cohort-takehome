'use client';

import { useState } from 'react';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { Layout, LayoutContent, LayoutFooter } from '@astryxdesign/core/Layout';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { Banner } from '@astryxdesign/core/Banner';
import { Divider } from '@astryxdesign/core/Divider';
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput';
import { NumberInput } from '@astryxdesign/core/NumberInput';
import { Button } from '@astryxdesign/core/Button';
import type { betaCourse } from '@/lib/data';

interface PromoteDialogProps {
  course: typeof betaCourse;
  price: number | null;
  onPriceChange: (value: number | null) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}

export function PromoteDialog({ course, price, onPriceChange, isOpen, onOpenChange, onConfirm }: PromoteDialogProps) {
  const [reviewedFeedback, setReviewedFeedback] = useState(false);
  const [understandsIrreversible, setUnderstandsIrreversible] = useState(false);

  const priceIsSet = price !== null && price > 0;
  const canPublish = priceIsSet && reviewedFeedback && understandsIrreversible;

  function handleCancel() {
    onOpenChange(false);
  }

  function handlePublish() {
    if (!canPublish) return;
    onConfirm();
    setReviewedFeedback(false);
    setUnderstandsIrreversible(false);
  }

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange} width={560} purpose="required">
      <Layout height="auto">
        <DialogHeader
          title="Promote to Open enrollment"
          subtitle={course.title}
          onOpenChange={onOpenChange}
        />
        <LayoutContent padding={4}>
          <VStack gap={4}>
            <VStack gap={2}>
              <Heading level={5}>What happens when you publish</Heading>
              <List hasDividers density="compact" listStyle="disc">
                <ListItem
                  label={
                    priceIsSet
                      ? `Public enrollment opens immediately at $${price}/seat`
                      : 'Public enrollment opens immediately at the price you set below'
                  }
                />
                <ListItem label={`Your ${course.invitedCount} beta students keep free lifetime access`} />
                <ListItem label="The curriculum stays locked, as it's been throughout Beta" />
                <ListItem
                  label={`Your public rating starts at ${course.avgRating}★ from ${course.ratingCount} beta ratings — visible on your profile immediately`}
                />
              </List>
            </VStack>

            <Banner
              status="warning"
              container="card"
              title={`${course.lowRatedCount} of ${course.invitedCount} beta students rated below 4 stars`}
              description="Worth a read before this goes public — their feedback is what future students will echo first."
            />

            <Divider />

            <VStack gap={2}>
              <Heading level={5}>Price</Heading>
              <Text type="supporting">What public students pay per seat once this publishes.</Text>
              <HStack gap={1} vAlign="center">
                <Text color="secondary">$</Text>
                <NumberInput
                  label="Price per seat"
                  isLabelHidden
                  size="sm"
                  value={price}
                  onChange={onPriceChange}
                  placeholder="0.00"
                  min={0}
                  step={1}
                  hasClear
                  width={80}
                />
              </HStack>
            </VStack>

            <Divider />

            <VStack gap={3}>
              <Heading level={5}>Confirm before publishing</Heading>
              <CheckboxInput
                label="I've reviewed the cohort feedback"
                value={reviewedFeedback}
                onChange={setReviewedFeedback}
              />
              <CheckboxInput
                label={`I understand this opens public enrollment immediately and can't be undone`}
                value={understandsIrreversible}
                onChange={setUnderstandsIrreversible}
              />
            </VStack>
          </VStack>
        </LayoutContent>
        <LayoutFooter hasDivider>
          <HStack gap={2} justify="end" padding={4}>
            <Button label="Cancel" variant="ghost" onClick={handleCancel} />
            <Button
              label="Publish course"
              variant="primary"
              isDisabled={!canPublish}
              tooltip={
                !canPublish
                  ? !priceIsSet
                    ? 'Set a price before publishing'
                    : "Check both boxes to confirm you've reviewed the consequences"
                  : undefined
              }
              onClick={handlePublish}
            />
          </HStack>
        </LayoutFooter>
      </Layout>
    </Dialog>
  );
}
