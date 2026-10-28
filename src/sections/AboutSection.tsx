import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { ABOUT_IMAGES, ABOUT_TEXT, STATS } from '../data/content';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10"
    >
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
      >
        <img src={ABOUT_IMAGES.moon} alt="" loading="lazy" className="block h-auto w-full" />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
      >
        <img src={ABOUT_IMAGES.object} alt="" loading="lazy" className="block h-auto w-full" />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"
      >
        <img src={ABOUT_IMAGES.lego} alt="" loading="lazy" className="block h-auto w-full" />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] right-[3%] w-[100px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
      >
        <img src={ABOUT_IMAGES.group} alt="" loading="lazy" className="block h-auto w-full" />
      </FadeIn>

      {/* z-10 keeps text above the decorative 3D images where they overlap on small screens. */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <SectionHeading surface="dark">About me</SectionHeading>
        <AnimatedText
          text={ABOUT_TEXT}
          className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
      </div>

      <dl className="relative z-10 grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-8">
        {STATS.map((stat, index) => (
          <FadeIn key={stat.label} delay={index * 0.1} className="flex flex-col items-center gap-2 text-center">
            <dt className="order-2 text-[11px] font-medium uppercase tracking-widest text-[#D7E2EA]/60 sm:text-xs md:text-sm">
              {stat.label}
            </dt>
            <dd className="hero-heading order-1 font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)' }}>
              {stat.value}+
            </dd>
          </FadeIn>
        ))}
      </dl>

      <div className="relative z-10">
        <ContactButton />
      </div>
    </section>
  );
}
