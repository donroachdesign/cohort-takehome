'use client';

import type { ReactNode } from 'react';
import { PencilLine, FlaskConical, Rocket, type LucideIcon } from 'lucide-react';
import { LayoutHeader } from '@astryxdesign/core/Layout';
import { Breadcrumbs, BreadcrumbItem } from '@astryxdesign/core/Breadcrumbs';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Icon } from '@astryxdesign/core/Icon';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import type { CourseState } from '@/lib/data';

const STATE_META: Record<
  CourseState,
  {
    label: string;
    badgeVariant: 'neutral' | 'warning' | 'success';
    cardVariant: 'gray' | 'orange' | 'green';
    iconColor: 'secondary' | 'warning' | 'success';
    icon: LucideIcon;
  }
> = {
  draft: { label: 'Draft', badgeVariant: 'neutral', cardVariant: 'gray', iconColor: 'secondary', icon: PencilLine },
  beta: { label: 'Beta', badgeVariant: 'warning', cardVariant: 'orange', iconColor: 'warning', icon: FlaskConical },
  open: { label: 'Open', badgeVariant: 'success', cardVariant: 'green', iconColor: 'success', icon: Rocket },
};

interface CourseHeaderProps {
  state: CourseState;
  title: string;
  instructor: string;
  meta: string;
  bannerHeading: string;
  bannerDescription: string;
  actions: ReactNode;
}

export function CourseHeader({
  state,
  title,
  instructor,
  meta,
  bannerHeading,
  bannerDescription,
  actions,
}: CourseHeaderProps) {
  const stateMeta = STATE_META[state];

  return (
    <LayoutHeader hasDivider>
      <VStack gap={4} padding={4} paddingBlock={3}>
        <Breadcrumbs>
          <BreadcrumbItem href="#">Courses</BreadcrumbItem>
          <BreadcrumbItem isCurrent>{title}</BreadcrumbItem>
        </Breadcrumbs>

        <VStack gap={1}>
          <HStack gap={3} vAlign="center">
            <Heading level={1}>{title}</Heading>
            <Badge variant={stateMeta.badgeVariant} label={stateMeta.label} />
          </HStack>
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
