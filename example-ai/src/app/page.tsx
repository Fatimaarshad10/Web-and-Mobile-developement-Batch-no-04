import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { SiteFooter } from "@/components/sections/site-footer";

export default function HomePage() {
  return (
    <main id="top" className="bg-ink">
      <Hero />
      <About />
      <ProblemSolution />
      <SiteFooter />
    </main>
  );
}
