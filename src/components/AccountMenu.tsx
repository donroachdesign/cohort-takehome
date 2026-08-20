'use client';

import { Bell } from 'lucide-react';
import { HStack } from '@astryxdesign/core/Stack';
import { Icon } from '@astryxdesign/core/Icon';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Popover } from '@astryxdesign/core/Popover';
import { List, ListItem } from '@astryxdesign/core/List';

interface AccountMenuProps {
  name: string;
}

export function AccountMenu({ name }: AccountMenuProps) {
  return (
    // me-6 = 24px (token-backed via tailwind-theme.css: --spacing base * 6).
    // TopNav has an 8px (--spacing-2) built-in inset; CourseHeader below it
    // uses 32px (--spacing-8). This closes that gap so the avatar's right
    // edge lines up with the dev-preview switcher's right edge below it.
    <HStack gap={2} vAlign="center" className="me-6">
      <IconButton
        icon={<Icon icon={Bell} size="sm" />}
        label="Notifications"
        variant="ghost"
        tooltip="Notifications"
      />
      <Popover
        label={`${name} account menu`}
        content={
          <List hasDividers density="compact">
            <ListItem label="Profile" href="#" />
            <ListItem label="Payouts" href="#" />
            <ListItem label="Settings" href="#" />
            <ListItem label="Log out" href="#" />
          </List>
        }
      >
        <IconButton
          icon={<Avatar name={name} size="md" tooltip={false} />}
          label={`${name} account menu`}
          variant="ghost"
          size="lg"
        />
      </Popover>
    </HStack>
  );
}
