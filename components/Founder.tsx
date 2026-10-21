"use client";
import { useT } from "@/lib/i18n";
import { site } from "@/content/site";
import { Placeholder, Section } from "./ui";

export default function Founder({ photo }: { photo: boolean }) {
  const { t } = useT();
  const f = t.founder;
  return (
    <Section id="founder" n="10" label={f.label}>
      <div className="grid pt-8 lg:grid-cols-12">
        <figure className="pad pb-8 lg:col-span-5 lg:pb-12">
          <div className="group relative aspect-[4/5] w-full max-w-[460px] border border-line bg-surface">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/founder.jpg"
                alt="DI JIAHAO"
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-6 text-center font-mono text-[12px] text-muted">
                {f.photoMissing}
              </div>
            )}
          </div>
          <figcaption className="mt-3 font-mono text-[12px] text-muted">{f.caption}</figcaption>
        </figure>
        <div className="pad border-t border-line py-10 lg:col-span-7 lg:border-l lg:border-t-0 lg:py-4">
          <div className="max-w-[38rem] space-y-6 text-[18px] leading-relaxed sm:text-[20px]">
            {f.body.map((para, i) => (
              <p key={i} className={i === 0 ? "font-medium" : "text-muted"}>
                {para}
              </p>
            ))}
          </div>
          <Contacts className="mt-10" />
        </div>
      </div>
    </Section>
  );
}

export function Contacts({ className = "" }: { className?: string }) {
  return (
    <p className={`flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] ${className}`}>
      <Handle label="Telegram" value={site.telegram} href={(v) => `https://t.me/${v}`} />
      <Handle label="X" value={site.x} href={(v) => `https://x.com/${v}`} />
      <a href={site.github} target="_blank" rel="noreferrer" className="link">
        GitHub
      </a>
    </p>
  );
}

function Handle({ label, value, href }: { label: string; value: string; href: (v: string) => string }) {
  if (value.startsWith("["))
    return (
      <span>
        <span className="text-muted">{label} </span>
        <Placeholder value={value} prefix="@" />
      </span>
    );
  return (
    <a href={href(value)} target="_blank" rel="noreferrer" className="link">
      {label} @{value}
    </a>
  );
}
