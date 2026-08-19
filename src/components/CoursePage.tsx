'use client';

import { useState } from 'react';
import { AppShell } from '@astryxdesign/core/AppShell';
import { TopNav, TopNavHeading } from '@astryxdesign/core/TopNav';
import { Avatar } from '@astryxdesign/core/Avatar';
import { HStack } from '@astryxdesign/core/Stack';
import { DevStateSwitcher } from './DevStateSwitcher';
import { DraftView } from './DraftView';
import { BetaView } from './BetaView';
import { OpenView } from './OpenView';
import { PromoteDialog } from './PromoteDialog';
import { course, type CourseState } from '@/lib/data';

export function CoursePage() {
  const [state, setState] = useState<CourseState>('open');
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);

  return (
    <AppShell
      contentPadding={0}
      topNav={
        <TopNav
          heading={<TopNavHeading heading="Cohort" superheading="for Instructors" />}
          endContent={
            <HStack gap={3} vAlign="center">
              <Avatar name={course.instructor} size="sm" tooltip={course.instructor} />
              <DevStateSwitcher value={state} onChange={setState} />
            </HStack>
          }
        />
      }
    >
      {state === 'draft' && <DraftView onInviteBeta={() => setState('beta')} />}
      {state === 'beta' && <BetaView onPromote={() => setIsPromoteOpen(true)} />}
      {state === 'open' && <OpenView />}

      <PromoteDialog
        isOpen={isPromoteOpen}
        onOpenChange={setIsPromoteOpen}
        onConfirm={() => {
          setState('open');
          setIsPromoteOpen(false);
        }}
      />
    </AppShell>
  );
}
