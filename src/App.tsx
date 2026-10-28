import { MotionConfig } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';

export default function App() {
  useSmoothScroll();

  return (
    // "user" keeps fades but drops x/y movement for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <main className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </MotionConfig>
  );
}
