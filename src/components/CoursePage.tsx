'use client';

import { useState } from 'react';
import { LayoutDashboard, BookOpen, Users, Wallet, Settings, GraduationCap } from 'lucide-react';
import { AppShell } from '@astryxdesign/core/AppShell';
import { TopNav, TopNavHeading } from '@astryxdesign/core/TopNav';
import { SideNav, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { NavIcon } from '@astryxdesign/core/NavIcon';
import { Icon } from '@astryxdesign/core/Icon';
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
          heading={
            <TopNavHeading
              logo={<NavIcon icon={<Icon icon={GraduationCap} size="sm" color="accent" />} />}
              heading="Cohort"
              superheading="for Instructors"
            />
          }
          endContent={
            <HStack gap={3} vAlign="center">
              <Avatar name={course.instructor} size="sm" tooltip={course.instructor} />
              <DevStateSwitcher value={state} onChange={setState} />
            </HStack>
          }
        />
      }
      sideNav={
        <SideNav>
          <SideNavSection title="Overview">
            <SideNavItem label="Dashboard" icon={LayoutDashboard} href="#" />
          </SideNavSection>

          <SideNavSection title="Courses">
            <SideNavItem label="Personal Finance Basics" icon={BookOpen} href="#" />
            <SideNavItem label={course.title} icon={BookOpen} isSelected href="#" />
            <SideNavItem label="Options Trading 201" icon={BookOpen} href="#" />
          </SideNavSection>

          <SideNavSection title="Business">
            <SideNavItem label="Students" icon={Users} href="#" />
            <SideNavItem label="Payouts" icon={Wallet} href="#" />
          </SideNavSection>

          <SideNavSection title="Account">
            <SideNavItem label="Settings" icon={Settings} href="#" />
          </SideNavSection>
        </SideNav>
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
