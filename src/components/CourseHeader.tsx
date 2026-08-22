'use client';

import type { ReactNode } from 'react';
import { PencilLine, FlaskConical, Rocket, Star, type LucideIcon } from 'lucide-react';
import { defineTheme } from '@astryxdesign/core/theme';
import { Theme } from '@astryxdesign/core';
import { stoneTheme } from '@astryxdesign/theme-stone/built';
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
    iconColor: 'secondary' | 'success';
    icon: LucideIcon;
  }
> = {
  draft: { label: 'Draft', badgeVariant: 'neutral', cardVariant: 'gray', iconColor: 'secondary', icon: PencilLine },
  // badgeVariant is 'orange' (not the semantic 'warning') specifically so this
  // badge reads var(--color-background-orange)/var(--color-text-orange) — the
  // exact same tokens the "In Beta" banner Card (cardVariant: 'orange') and
  // the dev-preview switcher's beta chip already use. 'warning' resolves to a
  // different token (--color-warning) and was the source of the color drift.
  // iconColor is 'secondary' (not 'warning') because the amber warning icon
  // measured 1.61:1 against this orange-tinted banner — well under the 3:1
  // WCAG minimum for non-text contrast; text-secondary measures 5.30:1 here.
  beta: { label: 'Beta', badgeVariant: 'orange', cardVariant: 'orange', iconColor: 'secondary', icon: FlaskConical },
  open: { label: 'Open', badgeVariant: 'success', cardVariant: 'green', iconColor: 'success', icon: Rocket },
};

// The Draft banner's supporting text measured 4.20:1 against its gray-tinted
// card — just under the 4.5:1 text minimum (the gray tint is lighter than
// the orange/green cards at the same opacity, which both clear 5.3:1+ with
// the same text-secondary color). Scoped here rather than changing the
// global token, which is used everywhere else and already passes.
const draftBannerTextTheme = defineTheme({
  name: 'draft-banner-text',
  extends: stoneTheme,
  tokens: { '--color-text-secondary': '#42525E' },
});

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
          // --color-warning (amber) measured 1.98:1 against the white page —
          // under the 3:1 WCAG minimum for a graphical object like a filled
          // star. --color-icon-orange clears 3.24:1 while staying in the
          // same warm/gold family.
          fill={i < filled ? 'var(--color-icon-orange)' : 'none'}
          stroke={i < filled ? 'var(--color-icon-orange)' : 'var(--color-border-emphasized)'}
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
                {state === 'draft' ? (
                  <Theme theme={draftBannerTextTheme}>
                    <Text type="supporting">{bannerDescription}</Text>
                  </Theme>
                ) : (
                  <Text type="supporting">{bannerDescription}</Text>
                )}
              </VStack>
            </HStack>
            <HStack gap={2}>{actions}</HStack>
          </HStack>
        </Card>
      </VStack>
    </LayoutHeader>
  );
}
