export default function About() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        About
      </h2>
      <div className="flex flex-col gap-3 text-pretty text-base leading-relaxed text-foreground/80">
        <p>
          I&apos;m Sam — a builder and developer based in Sydney. I&apos;m
          currently studying Advanced Computing at the University of Sydney,
          where I explore systems, security, and software engineering.
        </p>
        <p>
          I enjoy building things that live on the internet — from personal
          websites and tools to more experiments. Outside of code, I take
          photos, read when I remember to, and find ways to learn things the
          hard way.
        </p>
      </div>
    </section>
  );
}
