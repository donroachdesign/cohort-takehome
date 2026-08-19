'use client';

import { Wrench } from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import type { CourseState } from '@/lib/data';

interface DevStateSwitcherProps {
  value: CourseState;
  onChange: (value: CourseState) => void;
}

export function DevStateSwitcher({ value, onChange }: DevStateSwitcherProps) {
  return (
    <Card variant="muted" padding={1}>
      <HStack gap={2} vAlign="center" paddingInline={1}>
        <Icon icon={Wrench} size="xsm" color="disabled" />
        <Text type="supporting">Preview:</Text>
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
      </HStack>
    </Card>
  );
}
