'use client';

import { useState } from 'react';
import { LayoutDashboard, BookOpen, Users, Wallet, Settings, Plus } from 'lucide-react';
import { Theme } from '@astryxdesign/core';
import { AppShell } from '@astryxdesign/core/AppShell';
import { TopNav, TopNavHeading } from '@astryxdesign/core/TopNav';
import { SideNav, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { Badge } from '@astryxdesign/core/Badge';
import { Icon } from '@astryxdesign/core/Icon';
import { IconButton } from '@astryxdesign/core/IconButton';
import { defineTheme } from '@astryxdesign/core/theme';
import { stoneTheme } from '@astryxdesign/theme-stone/built';
import { AccountMenu } from './AccountMenu';
import { DraftView } from './DraftView';
import { BetaView } from './BetaView';
import { OpenView } from './OpenView';
import { PromoteDialog } from './PromoteDialog';
import { CourseStateSwitcher } from './CourseStateSwitcher';
import { STATE_META } from './CourseHeader';
import { pfbDraft, pfbBeta, pfbOpen, betaCourse, optionsBeta, type CourseState } from '@/lib/data';

const NAV_BACKGROUND = '#F3F1ED';
const BETA_ACCENT = '#C6E4FB';

const liveTheme = defineTheme({
  name: 'cohort-live-theme',
  extends: stoneTheme,
  tokens: {
    '--color-background-orange': BETA_ACCENT,
  },
  components: {
    'app-shell-header': { base: { backgroundColor: NAV_BACKGROUND } },
    'app-shell-sidenav': { base: { backgroundColor: NAV_BACKGROUND } },
  },
});

export function CoursePage() {
  const [pfbState, setPfbState] = useState<CourseState>('draft');
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);
  const [betaPrice, setBetaPrice] = useState<number | null>(pfbBeta.price);

  return (
    <Theme theme={liveTheme} mode="light">
      <AppShell
        contentPadding={0}
        topNav={
          <TopNav
            heading={
              <TopNavHeading
                logo={<img src="/Logo-Cohort.png" alt="Cohort" width={172} height={46} />}
                superheading="for Instructors"
              />
            }
            endContent={<AccountMenu name="Priya Desai" lastLogin="Aug 20, 2026 · 9:14 AM" />}
          />
        }
        sideNav={
          <SideNav>
            <SideNavSection title="Overview">
              <SideNavItem label="Dashboard" icon={LayoutDashboard} href="#" />
            </SideNavSection>

            <SideNavSection
              title="Courses"
              endContent={
                <IconButton
                  icon={<Icon icon={Plus} size="sm" />}
                  label="Add course"
                  variant="ghost"
                  size="sm"
                  isDisabled
                  tooltip="Add new course"
                />
              }
            >
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
          <DraftView
            course={pfbDraft}
            switcher={<CourseStateSwitcher value={pfbState} onChange={setPfbState} betaColor={BETA_ACCENT} />}
          />
        )}
        {pfbState === 'beta' && (
          <BetaView
            course={pfbBeta}
            price={betaPrice}
            onPriceChange={setBetaPrice}
            onPromote={() => setIsPromoteOpen(true)}
            switcher={<CourseStateSwitcher value={pfbState} onChange={setPfbState} betaColor={BETA_ACCENT} />}
          />
        )}
        {pfbState === 'open' && (
          <OpenView course={pfbOpen} switcher={<CourseStateSwitcher value={pfbState} onChange={setPfbState} betaColor={BETA_ACCENT} />} />
        )}

        <PromoteDialog
          course={pfbBeta}
          price={betaPrice}
          onPriceChange={setBetaPrice}
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
