import { ArrowUpRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { CONTACT_INTRO, CONTACT_LINKS, PROFILE } from '../data/content';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-30 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <SectionHeading surface="dark">Get in touch</SectionHeading>

      <FadeIn
        as="p"
        delay={0.1}
        className="mx-auto mt-10 max-w-[560px] text-center font-light leading-relaxed text-[#D7E2EA]/80 sm:mt-14 md:mt-16"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
      >
        {CONTACT_INTRO}
      </FadeIn>

      <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 lg:grid-cols-3">
        {CONTACT_LINKS.map((link, index) => {
          const Icon = link.icon;
          return (
            <FadeIn as="li" key={link.label} delay={index * 0.1}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="relative flex h-full flex-col items-center gap-3 rounded-[32px] border-2 border-[#D7E2EA] px-6 py-8 text-center text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] md:rounded-[40px]"
              >
                {link.external ? (
                  <ArrowUpRight aria-hidden="true" className="absolute right-6 top-6 h-5 w-5 text-[#D7E2EA]/60" />
                ) : null}
                <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} />
                <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">{link.label}</span>
                <span className="break-words font-medium" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}>
                  {link.value}
                </span>
                {link.external ? <span className="sr-only">(opens in a new tab)</span> : null}
              </a>
            </FadeIn>
          );
        })}
      </ul>

      <footer className="mx-auto mt-20 flex max-w-5xl flex-col items-center gap-3 border-t border-[#D7E2EA]/15 py-10 text-center text-sm text-[#D7E2EA]/60 sm:mt-24 md:mt-32 md:flex-row md:justify-between md:text-left">
        <span className="text-xl font-black text-[#D7E2EA]">
          <span aria-hidden="true" className="text-[#B600A8]">
            &lt;
          </span>
          AK
          <span aria-hidden="true" className="text-[#B600A8]">
            /&gt;
          </span>
        </span>
        <p>Designed &amp; Built by {PROFILE.name}</p>
        <p>&copy; 2026 All rights reserved.</p>
      </footer>
    </section>
  );
}
