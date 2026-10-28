type LiveProjectButtonProps = {
  href: string;
  projectName: string;
};

export default function LiveProjectButton({ href, projectName }: LiveProjectButtonProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      // Three identical "Live Project" links need distinct names for screen readers.
      aria-label={`Live Project: ${projectName}`}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-block whitespace-nowrap rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] sm:px-10 sm:py-3.5 sm:text-base"
    >
      Live Project
    </a>
  );
}
