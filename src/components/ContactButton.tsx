type ContactButtonProps = {
  href?: string;
  label?: string;
};

export default function ContactButton({ href = '#contact', label = 'Contact Me' }: ContactButtonProps) {
  return (
    <a
      href={href}
      className="inline-block whitespace-nowrap rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition-[outline-offset] duration-200 focus-visible:outline-offset-2 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      }}
    >
      {label}
    </a>
  );
}
