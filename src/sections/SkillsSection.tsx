import { Sparkles } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import TagList from '../components/TagList';
import { SKILL_GROUPS, type SkillGroup } from '../data/content';

/**
 * Skills sit on their own cool-gray panel as a bento grid, so they read as a different
 * kind of content from the white, list-style experience panel above.
 */
export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-[5] -mt-10 rounded-t-[40px] bg-[#EEF2F5] px-5 pb-20 pt-20 shadow-[0_-16px_40px_-28px_rgba(12,12,12,0.35)] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-24 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32"
    >
      <SectionHeading surface="light" className="mb-16 sm:mb-20 md:mb-28">
        Skills
      </SectionHeading>
      {/* A soft upward shadow makes this panel read as a sheet laid over the white one. */}

      {/* Desktop: the wide card and the tall featured card frame the two smaller ones.
          Dense flow back-fills the gap the wide card leaves on tablets. */}
      <ul className="mx-auto grid max-w-6xl grid-flow-row-dense gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {SKILL_GROUPS.map((group, index) => (
          <SkillCard key={group.name} group={group} index={index} />
        ))}
      </ul>
    </section>
  );
}

function placementFor(group: SkillGroup) {
  if (group.featured) return 'md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1';
  if (group.wide) return 'md:col-span-2 lg:row-start-1';
  return '';
}

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const Icon = group.icon;
  const dark = Boolean(group.featured);
  const surface = dark
    ? 'bg-[#0C0C0C] text-[#D7E2EA] shadow-[0_24px_60px_-24px_rgba(118,33,176,0.6)]'
    : 'bg-white text-[#0C0C0C] shadow-[0_1px_2px_rgba(12,12,12,0.06)] hover:shadow-[0_24px_48px_-24px_rgba(12,12,12,0.3)]';

  return (
    <FadeIn as="li" delay={index * 0.1} className={placementFor(group)}>
      {/* Hover lift lives on this inner element: FadeIn owns the outer one's transform. */}
      <div
        className={`relative flex h-full flex-col gap-6 overflow-hidden rounded-[32px] p-6 transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1 sm:p-8 md:rounded-[40px] ${surface}`}
      >
        {dark ? (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
              style={{ background: group.accent }}
            />
            <Icon aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 text-white/[0.06]" strokeWidth={1} />
          </>
        ) : null}

        <div className="relative flex items-start justify-between gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_8px_20px_-8px_rgba(118,33,176,0.6)]"
            style={{ background: group.accent }}
          >
            <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <span className="pt-1 text-xs font-medium uppercase tracking-widest opacity-60">
            {String(index + 1).padStart(2, '0')} · {group.skills.length} skills
          </span>
        </div>

        <div className="relative flex flex-col gap-3">
          <h3 className="font-medium uppercase leading-tight" style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.6rem)' }}>
            {group.name}
          </h3>
          {group.tagline ? (
            <p className="font-light leading-relaxed text-[#D7E2EA]/80" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}>
              {group.tagline}
            </p>
          ) : null}
        </div>

        {group.spotlight ? (
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">{group.spotlight.label}</p>
            <ul aria-label={group.spotlight.label} className="flex flex-wrap gap-2">
              {group.spotlight.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white"
                >
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-[#F0ABFC]" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Only the tall featured card pins its pills to the bottom; the others stay compact. */}
        <TagList
          tags={group.skills}
          label={`${group.name} skills`}
          tone={dark ? 'dark' : 'light'}
          className={dark ? 'relative mt-auto' : 'relative'}
        />
      </div>
    </FadeIn>
  );
}
