import NumberedRow from '../components/NumberedRow';
import SectionHeading from '../components/SectionHeading';
import { EDUCATION } from '../data/content';

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative z-20 -mt-10 rounded-t-[40px] bg-white px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <SectionHeading surface="light" className="mb-16 sm:mb-20 md:mb-28">
        Education
      </SectionHeading>

      <ol className="mx-auto max-w-5xl">
        {EDUCATION.map((item, index) => (
          <NumberedRow
            key={item.year}
            index={index}
            marker={item.year}
            markerClassName="min-w-[2.5em] tabular-nums"
            markerStyle={{ fontSize: 'clamp(2.5rem, 7vw, 100px)' }}
          >
            <div>
              <h3 className="font-medium uppercase leading-tight text-[#0C0C0C]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {item.degree}
              </h3>
              {item.field ? (
                <p className="mt-1 font-medium text-[#0C0C0C]" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}>
                  {item.field}
                </p>
              ) : null}
              <p className="mt-1 font-light text-[#0C0C0C]/70" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
                {item.school}
              </p>
            </div>
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0C0C0C] px-4 py-1.5 text-white">
              <span className="text-xs font-medium uppercase tracking-widest text-white/70">{item.scoreLabel}</span>
              <span className="text-sm font-semibold sm:text-base">{item.score}</span>
            </p>
          </NumberedRow>
        ))}
      </ol>
    </section>
  );
}
