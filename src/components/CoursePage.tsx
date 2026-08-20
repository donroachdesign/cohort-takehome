'use client';

import { useState } from 'react';
import { LayoutDashboard, BookOpen, Users, Wallet, Settings } from 'lucide-react';
import { Theme } from '@astryxdesign/core';
import { AppShell } from '@astryxdesign/core/AppShell';
import { TopNav, TopNavHeading } from '@astryxdesign/core/TopNav';
import { SideNav, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { Badge } from '@astryxdesign/core/Badge';
import { stoneTheme } from '@astryxdesign/theme-stone/built';
import { AccountMenu } from './AccountMenu';
import { DraftView } from './DraftView';
import { BetaView } from './BetaView';
import { OpenView } from './OpenView';
import { PromoteDialog } from './PromoteDialog';
import { CourseStateSwitcher } from './CourseStateSwitcher';
import { STATE_META } from './CourseHeader';
import { pfbDraft, pfbBeta, pfbOpen, betaCourse, optionsBeta, type CourseState } from '@/lib/data';

export function CoursePage() {
  const [pfbState, setPfbState] = useState<CourseState>('open');
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);

  return (
    <Theme theme={stoneTheme} mode="light">
      <AppShell
        contentPadding={0}
        topNav={
          <TopNav
            heading={
              <TopNavHeading
                logo={<img src="/Logo-Cohort.png" alt="Cohort" width={156} height={33} />}
                superheading="for Instructors"
              />
            }
            endContent={<AccountMenu name="Priya Desai" />}
          />
        }
        sideNav={
          <SideNav>
            <SideNavSection title="Overview">
              <SideNavItem label="Dashboard" icon={LayoutDashboard} href="#" />
            </SideNavSection>

            <SideNavSection title="Courses">
              <SideNavItem
                label={pfbDraft.title}
                icon={BookOpen}
                isSelected
                endContent={<Badge variant={STATE_META[pfbState].badgeVariant} label={STATE_META[pfbState].label} />}
              />
              <SideNavItem
                label={betaCourse.title}
                icon={BookOpen}
                endContent={<Badge variant={STATE_META.beta.badgeVariant} label={STATE_META.beta.label} />}
              />
              <SideNavItem
                label={optionsBeta.title}
                icon={BookOpen}
                endContent={<Badge variant={STATE_META.beta.badgeVariant} label={STATE_META.beta.label} />}
              />
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
        {pfbState === 'draft' && (
          <DraftView course={pfbDraft} switcher={<CourseStateSwitcher value={pfbState} onChange={setPfbState} />} />
        )}
        {pfbState === 'beta' && (
          <BetaView
            course={pfbBeta}
            onPromote={() => setIsPromoteOpen(true)}
            switcher={<CourseStateSwitcher value={pfbState} onChange={setPfbState} />}
          />
        )}
        {pfbState === 'open' && (
          <OpenView course={pfbOpen} switcher={<CourseStateSwitcher value={pfbState} onChange={setPfbState} />} />
        )}

        <PromoteDialog
          course={pfbBeta}
          isOpen={isPromoteOpen}
          onOpenChange={setIsPromoteOpen}
          onConfirm={() => {
            setPfbState('open');
            setIsPromoteOpen(false);
          }}
        />
      </AppShell>
    </Theme>
  );
}
