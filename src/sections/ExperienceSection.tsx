import NumberedRow from '../components/NumberedRow';
import SectionHeading from '../components/SectionHeading';
import TagList from '../components/TagList';
import { EXPERIENCE } from '../data/content';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      // Bottom padding leaves room for the skills panel that overlaps this one.
      className="rounded-t-[40px] bg-white px-5 pb-20 pt-20 sm:rounded-t-[50px] sm:px-8 sm:pb-24 sm:pt-24 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32"
    >
      <SectionHeading surface="light" className="mb-16 sm:mb-20 md:mb-28">
        Experience
      </SectionHeading>

      <ol className="mx-auto max-w-5xl">
        {EXPERIENCE.map((job, index) => (
          <NumberedRow key={job.company} index={index} marker={String(index + 1).padStart(2, '0')} stackOnMobile>
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="font-medium uppercase leading-tight text-[#0C0C0C]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                  {job.role}
                </h3>
                {job.current ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#166534]">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                    Current
                  </span>
                ) : null}
              </div>
              <p
                className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#0C0C0C]/60"
                style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
              >
                <span className="font-medium text-[#0C0C0C]">{job.company}</span>
                <span aria-hidden="true">·</span>
                <span>{job.period}</span>
                <span aria-hidden="true">·</span>
                <span>{job.location}</span>
              </p>
            </div>

            <ul className="flex max-w-2xl flex-col gap-3">
              {job.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-5 font-light leading-relaxed text-[#0C0C0C]/70"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.15rem)' }}
                >
                  <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-[#0C0C0C]/40" />
                  {highlight}
                </li>
              ))}
            </ul>

            <TagList tags={job.tags} label={`Technologies used at ${job.company}`} />
          </NumberedRow>
        ))}
      </ol>
    </section>
  );
}
