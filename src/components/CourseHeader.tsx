'use client';

import type { ReactNode } from 'react';
import { PencilLine, FlaskConical, Rocket, Star, type LucideIcon } from 'lucide-react';
import { LayoutHeader } from '@astryxdesign/core/Layout';
import { Breadcrumbs, BreadcrumbItem } from '@astryxdesign/core/Breadcrumbs';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Icon } from '@astryxdesign/core/Icon';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import type { CourseState } from '@/lib/data';

export const STATE_META: Record<
  CourseState,
  {
    label: string;
    badgeVariant: 'neutral' | 'orange' | 'success';
    cardVariant: 'gray' | 'orange' | 'green';
    iconColor: 'secondary' | 'warning' | 'success';
    icon: LucideIcon;
  }
> = {
  draft: { label: 'Draft', badgeVariant: 'neutral', cardVariant: 'gray', iconColor: 'secondary', icon: PencilLine },
  // badgeVariant is 'orange' (not the semantic 'warning') specifically so this
  // badge reads var(--color-background-orange)/var(--color-text-orange) — the
  // exact same tokens the "In Beta" banner Card (cardVariant: 'orange') and
  // the dev-preview switcher's beta chip already use. 'warning' resolves to a
  // different token (--color-warning) and was the source of the color drift.
  beta: { label: 'Beta', badgeVariant: 'orange', cardVariant: 'orange', iconColor: 'warning', icon: FlaskConical },
  open: { label: 'Open', badgeVariant: 'success', cardVariant: 'green', iconColor: 'success', icon: Rocket },
};

// Astryx's own Product Detail template uses this exact number+stars+count
// shape for a course/product's public rating — no dropdown, since there's
// no per-tier breakdown data to make one meaningful.
function StarRating({ value, count, note }: { value: number; count: number; note?: string }) {
  const filled = Math.round(value);
  return (
    <HStack gap={1} vAlign="center">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < filled ? 'var(--color-warning)' : 'none'}
          stroke={i < filled ? 'var(--color-warning)' : 'var(--color-border-emphasized)'}
        />
      ))}
      <Text type="supporting">
        {value} ({count}){note ? ` · ${note}` : ''}
      </Text>
    </HStack>
  );
}

interface CourseHeaderProps {
  state: CourseState;
  title: string;
  instructor: string;
  meta: string;
  rating?: { value: number; count: number; note?: string };
  bannerHeading: string;
  bannerDescription: string;
  actions: ReactNode;
  switcher?: ReactNode;
}

export function CourseHeader({
  state,
  title,
  instructor,
  meta,
  rating,
  bannerHeading,
  bannerDescription,
  actions,
  switcher,
}: CourseHeaderProps) {
  const stateMeta = STATE_META[state];

  return (
    <LayoutHeader hasDivider>
      <VStack gap={4} padding={8}>
        <HStack justify="between" vAlign="center">
          <Breadcrumbs>
            <BreadcrumbItem href="#">Courses</BreadcrumbItem>
            <BreadcrumbItem isCurrent>{title}</BreadcrumbItem>
          </Breadcrumbs>
          {switcher}
        </HStack>

        <VStack gap={1}>
          <HStack gap={3} vAlign="center">
            <Heading level={1}>{title}</Heading>
            <Badge variant={stateMeta.badgeVariant} label={stateMeta.label} />
          </HStack>
          {rating && <StarRating value={rating.value} count={rating.count} note={rating.note} />}
          <Text type="supporting">
            by {instructor} · {meta}
          </Text>
        </VStack>

        <Card variant={stateMeta.cardVariant} width="100%" padding={4}>
          <HStack gap={4} justify="between" vAlign="center" wrap="wrap">
            <HStack gap={3} vAlign="center">
              <Icon icon={stateMeta.icon} size="lg" color={stateMeta.iconColor} />
              <VStack gap={0.5}>
                <Heading level={3}>{bannerHeading}</Heading>
                <Text type="supporting">{bannerDescription}</Text>
              </VStack>
            </HStack>
            <HStack gap={2}>{actions}</HStack>
          </HStack>
        </Card>
      </VStack>
    </LayoutHeader>
  );
}
