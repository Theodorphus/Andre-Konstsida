import type { Metadata } from "next";
import { getSettings } from "@/sanity/lib/queries";
import SanityImg from "@/components/SanityImg";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { localImages, localProfile } from "@/lib/localContent";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakta konstnären André Roslund.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const name = settings?.name ?? localProfile.name;
  const email = settings?.email ?? localProfile.email;
  const phone = settings?.phone ?? localProfile.phone;

  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Om / porträtt */}
        <Reveal>
          <h1 className="hero-name font-display text-4xl sm:text-5xl">
            {settings?.aboutHeading ?? localProfile.aboutHeading}
          </h1>
          <div className="mt-6 max-w-md">
            <div className="tile !aspect-[5/6]">
              <SanityImg
                image={settings?.portrait}
                fallbackSrc={localImages.portrait}
                alt={name}
                width={480}
                height={560}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            {settings?.aboutText?.length
              ? settings.aboutText.map((block) => {
                  const text =
                    block.children?.map((c) => c.text).join("") ?? "";
                  if (block.style === "h2" || block.style === "h3") {
                    return (
                      <h3
                        key={block._key}
                        className="pt-4 font-display text-xl text-accent"
                      >
                        {text}
                      </h3>
                    );
                  }
                  return <p key={block._key}>{text}</p>;
                })
              : localProfile.aboutIntro.map((p, i) => (
                  <p key={`intro-${i}`}>{p}</p>
                ))}
          </div>
        </Reveal>

        {/* Kontaktuppgifter + formulär */}
        <Reveal delay={120}>
          <h2 className="font-display text-3xl text-accent">Kontakt</h2>
          <p className="mt-4 text-muted">
            Frågor om ett verk, priser eller något annat? Hör gärna av dig – du
            når mig enklast via e-post eller formuläret här nedanför.
          </p>

          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="uppercase tracking-wide text-muted">E-post</dt>
              <dd>
                <a href={`mailto:${email}`} className="link-underline">
                  {email}
                </a>
              </dd>
            </div>
            {phone && (
              <div>
                <dt className="uppercase tracking-wide text-muted">Telefon</dt>
                <dd>
                  <a
                    href={`tel:${phone.replace(/[\s-]/g, "")}`}
                    className="link-underline"
                  >
                    {phone}
                  </a>
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-10">
            <ContactForm toEmail={email} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
