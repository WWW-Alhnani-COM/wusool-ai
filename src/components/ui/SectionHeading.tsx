interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "start" | "center";
}

export function SectionHeading({ eyebrow, heading, description, align = "start" }: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center items-center mx-auto" : "text-right items-end";
  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignCls}`}>
      {eyebrow && <span className="text-brass text-sm">{eyebrow}</span>}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-ink">
        {heading}
      </h2>
      {description && <p className="text-ink-muted text-base sm:text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
