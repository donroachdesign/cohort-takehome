'use client';

import { useMemo } from 'react';
import { defineTheme } from '@astryxdesign/core/theme';
import { Theme } from '@astryxdesign/core';
import { stoneTheme } from '@astryxdesign/theme-stone/built';
import { HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import type { CourseState } from '@/lib/data';

// The selected segment's fill color is hardcoded inside Astryx's
// SegmentedControlItem (--color-background-surface), not exposed as an
// overridable token. A scoped theme override — applied only around the
// switcher via a nested <Theme> — is the sanctioned way to recolor just
// that pill without touching the switcher's own track/background.
const staticChipThemes: Record<'draft' | 'open', ReturnType<typeof defineTheme>> = {
  draft: defineTheme({
    name: 'switcher-draft',
    extends: stoneTheme,
    components: {
      'segmented-control-item': {
        selected: {
          backgroundColor: 'var(--color-background-gray)',
          color: 'var(--color-text-gray)',
        },
      },
    },
  }),
  open: defineTheme({
    name: 'switcher-open',
    extends: stoneTheme,
    components: {
      'segmented-control-item': {
        selected: {
          backgroundColor: 'var(--color-background-green)',
          color: 'var(--color-text-green)',
        },
      },
    },
  }),
};

interface CourseStateSwitcherProps {
  value: CourseState;
  onChange: (value: CourseState) => void;
  betaColor: string;
}

export function CourseStateSwitcher({ value, onChange, betaColor }: CourseStateSwitcherProps) {
  // Built from the live playground color rather than var(--color-background-orange):
  // this Theme's own `extends: stoneTheme` re-declares that variable from
  // stoneTheme's base value, so referencing it here would shadow whatever the
  // outer app theme currently has it set to instead of tracking it.
  const betaChipTheme = useMemo(
    () =>
      defineTheme({
        name: 'switcher-beta',
        extends: stoneTheme,
        components: {
          'segmented-control-item': {
            selected: {
              backgroundColor: betaColor,
              color: 'var(--color-text-orange)',
            },
          },
        },
      }),
    [betaColor]
  );

  const chipThemes: Record<CourseState, ReturnType<typeof defineTheme>> = {
    ...staticChipThemes,
    beta: betaChipTheme,
  };

  return (
    <HStack gap={2} vAlign="center">
      <Text type="supporting">Dev preview:</Text>
      <Theme theme={chipThemes[value]} mode="light">
        <SegmentedControl
          label="Preview lifecycle state"
          value={value}
          onChange={v => onChange(v as CourseState)}
          size="sm"
        >
          <SegmentedControlItem value="draft" label="Draft" />
          <SegmentedControlItem value="beta" label="Beta" />
          <SegmentedControlItem value="open" label="Open" />
        </SegmentedControl>
      </Theme>
    </HStack>
  );
}
