import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import SocialLinks from "@/components/SocialLinks";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-end px-6 py-4">
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-16 px-6 py-16 sm:py-24">
        <Hero />
        <About />
        <Projects />

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Connect
          </h2>
          <SocialLinks />
        </div>
      </main>

      <Footer />
    </div>
  );
}
