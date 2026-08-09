import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { teamSection } from "@/data/home";
import { team } from "@/data/team";

/** §6.7 — headshot above name above role. */
export function TeamSection() {
  return (
    <Section tone="white">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <h2 className="text-h2">{teamSection.heading}</h2>
        <p className="mt-6 text-body">{teamSection.body}</p>
      </Reveal>

      <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {team.map((member, index) => (
          <Reveal as="li" key={member.name} delay={index * 70} className="text-center">
            <Image
              src={member.image}
              alt={`${member.name}, ${member.role} at Reinstate GBP`}
              width={300}
              height={300}
              sizes="140px"
              className="mx-auto size-[140px] rounded-image object-cover"
            />
            <h3 className="mt-5 text-team font-semibold text-navy">{member.name}</h3>
            <p className="mt-1 text-[13px] font-bold uppercase tracking-wide">{member.role}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
