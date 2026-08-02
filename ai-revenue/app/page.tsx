"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, CircleDollarSign, Gauge, Layers3, MessageSquareText, ShoppingCart, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { ProblemCard } from "@/components/landing/ProblemCard";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { StepCard } from "@/components/landing/StepCard";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { TestimonialCard } from "@/components/landing/TestimonialCard";
import { FAQAccordion } from "@/components/landing/FAQAccordion";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { LoginModal } from "@/components/auth/LoginModal";
import { SignUpModal } from "@/components/auth/SignUpModal";

const painPoints = [
  { icon: ShoppingCart, title: "Checkout abandonment", description: "Customers leave before purchase because friction in the funnel creates doubt at the exact moment buyers need confidence." },
  { icon: TrendingUp, title: "Unexplained revenue drops", description: "Sales dip without clear context, leaving teams guessing what changed and where to focus next." },
  { icon: Layers3, title: "Inventory mismatches", description: "Stock inconsistencies lead to lost sales, poor fulfillment, and avoidable margin leak across the storefront." },
  { icon: CircleDollarSign, title: "Refund and chargeback pressure", description: "Rising refund issues and payment friction quietly erode revenue and create operational stress." },
  { icon: Target, title: "Marketing waste", description: "Campaigns continue to spend without clear visibility into which channels are creating real business impact." },
  { icon: MessageSquareText, title: "Customer support overload", description: "Support teams field the same questions again and again while urgent sales issues remain unresolved." },
];

const features = [
  { icon: Gauge, title: "Revenue Intelligence", description: "Track revenue performance in real time and understand where profitable growth is being lost." },
  { icon: Sparkles, title: "AI Insights", description: "Get prioritized recommendations that explain what changed, why it matters, and how to act." },
  { icon: Zap, title: "Problem Detection", description: "Identify checkout friction, refund risk, inventory issues, and revenue drops before they spread." },
  { icon: Target, title: "Revenue Recovery", description: "Surface high-confidence actions to recover conversions, margins, and customer lifetime value." },
  { icon: ShoppingCart, title: "Product Analytics", description: "Compare product performance, pricing, and conversion health to uncover hidden opportunities." },
  { icon: TrendingUp, title: "Customer Analytics", description: "Learn how customer behavior shifts over time and which segments deserve attention." },
  { icon: CheckCircle2, title: "Order Intelligence", description: "Monitor fulfillment, payment, and order quality signals without manual spreadsheet tracking." },
  { icon: Layers3, title: "Smart Reports", description: "Translate operational noise into clear, executive-ready insights across your ecommerce business." },
];

const steps = [
  { number: "1", title: "Connect your store", description: "Plug in your storefront and sync the metrics that power your revenue engine." },
  { number: "2", title: "AI analyzes your business", description: "The platform continuously reviews sales, orders, products, and customer behavior for weak spots." },
  { number: "3", title: "Revenue problems detected", description: "It surfaces the specific issues reducing conversion, margins, or retention with real business context." },
  { number: "4", title: "Take action with confidence", description: "Receive clear recommendations and the next best actions to recover more value from every customer." },
];

const reasons = [
  "AI-first approach built for ecommerce growth",
  "Real-time monitoring across revenue and operations",
  "Revenue-focused recommendations tied to business outcomes",
  "Easy to connect and fast to understand",
  "Actionable insights built for teams, not just dashboards",
  "Beautiful, executive-ready reporting your team will actually use",
];

const testimonials = [
  {
    name: "Nina Patel",
    role: "VP of Growth",
    company: "Northstar Goods",
    quote: "We were losing revenue without even realizing it. The AI signals made the bottlenecks obvious and gave our team a clear action path.",
    initials: "NP",
  },
  {
    name: "Marco Alvarez",
    role: "Founder",
    company: "Summit Supply Co.",
    quote: "This gave us a way to understand revenue leaks in plain language. It feels like having an operations analyst watching our store every day.",
    initials: "MA",
  },
  {
    name: "Sophie Nguyen",
    role: "Director of Ecommerce",
    company: "Harbor & Pine",
    quote: "The dashboard is premium, the insights are credible, and the recommendations are actionable. It immediately felt like a strategic tool, not a generic plugin.",
    initials: "SN",
  },
];

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginPrefillEmail, setLoginPrefillEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "1") {
      setLoginOpen(true);
    }
    if (params.get("signup") === "1") {
      setSignupOpen(true);
    }
  }, []);

  const handleCloseLogin = () => {
    setLoginOpen(false);
    setLoginPrefillEmail("");

    const params = new URLSearchParams(window.location.search);
    params.delete("login");
    const nextUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, "", nextUrl);
  };

  const handleCloseSignUp = () => {
    setSignupOpen(false);

    const params = new URLSearchParams(window.location.search);
    params.delete("signup");
    const nextUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, "", nextUrl);
  };

  const openLogin = (prefillEmail?: string) => {
    setLoginPrefillEmail(prefillEmail ?? "");
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const openSignUp = () => {
    setLoginPrefillEmail("");
    setLoginOpen(false);
    setSignupOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar onLoginOpen={openLogin} onSignUpOpen={openSignUp} />

      <main>
        <Hero onLoginOpen={openLogin} onSignUpOpen={openSignUp} />

        <section id="problem" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The problem"
            title="Revenue leaks are often hidden until they become expensive."
            description="Most ecommerce teams know sales are trending down, but they don’t have a clear view of what is actually draining growth across checkout, product performance, inventory, and customer experience."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {painPoints.map((item) => (
              <ProblemCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </section>

        <section id="solution" className="border-y border-slate-200 bg-white/80">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <SectionHeader
                  eyebrow="The solution"
                  title="AI that watches your business, not just your metrics."
                  description="AI Revenue Recovery continuously monitors your storefront, detects hidden performance issues, and explains what is influencing revenue so your team can act before the damage compounds."
                />

                <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <div className="space-y-4">
                    {[
                      "Monitor revenue health across the customer journey",
                      "Detect friction points before they become costly",
                      "Translate business signals into clear recommendations",
                    ].map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8f6ff_100%)] p-6 shadow-[0_24px_60px_-38px_rgba(124,92,252,0.35)]">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Workflow</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">Revenue intelligence loop</p>
                  </div>
                  <div className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">Live</div>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    { title: "Collect signal data", desc: "Orders, traffic, product performance, and customer behavior" },
                    { title: "Analyze patterns", desc: "AI identifies anomalies and correlates them with revenue impact" },
                    { title: "Highlight risks", desc: "Prioritized leak signals surface as clear action areas" },
                    { title: "Recommend recovery", desc: "Your team gets next-best actions with expected impact" },
                  ].map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">{index + 1}</div>
                        {index < 3 && <div className="mt-2 h-10 w-px bg-slate-200" />}
                      </div>
                      <div className="flex-1 rounded-[18px] border border-slate-200 bg-white p-4">
                        <p className="font-semibold text-slate-900">{step.title}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How it works"
            title="A clear four-step path from signal to recovery."
            description="The product is designed to be simple for ecommerce teams: monitor, identify, prioritize, and recover."
            align="center"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {steps.map((step) => (
              <StepCard key={step.number} number={step.number} title={step.title} description={step.description} />
            ))}
          </div>
        </section>

        <section id="features" className="border-y border-slate-200 bg-white/90">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Features"
              title="Everything your team needs to scale revenue intelligently."
              description="From revenue health to order intelligence, each feature is built for real ecommerce decision-making."
              align="center"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why choose us"
                title="Built for teams that want to protect growth, not just report on it."
                description="We give ecommerce leaders a more intelligent way to see what is working, what is leaking, and what deserves action now."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason} className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F7FF] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Dashboard preview"
              title="A premium control center built for revenue clarity."
              description="See the performance story in seconds: revenue trends, recoverable issues, recommendations, and customer impact in one place."
              align="center"
            />

            <div className="mt-12">
              <DashboardPreview />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="Loved by ecommerce operators who care about performance."
            description="Placeholder customer feedback from teams using AI-driven revenue insights to protect growth."
            align="center"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </section>

        <section id="faq" className="border-y border-slate-200 bg-white/90 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="FAQ"
              title="Questions teams ask before they launch."
              description="Straight answers about setup, value, and what makes this different from generic analytics tools."
              align="center"
            />

            <div className="mt-10">
              <FAQAccordion />
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_52px_-38px_rgba(15,23,42,0.22)] sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">Pricing</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-900">Simple pricing for growing brands.</h3>
              </div>

              <div className="rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
                Coming soon
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { name: "Starter", price: "$49", detail: "For early-stage stores", features: ["Basic monitoring", "Weekly summaries", "AI alerts"] },
                { name: "Growth", price: "$129", detail: "For scaling ecommerce teams", features: ["Advanced insights", "Priority detection", "Revenue playbooks"] },
                { name: "Scale", price: "$299", detail: "For multi-brand operations", features: ["Executive reporting", "Custom monitoring", "Team collaboration"] },
              ].map((tier) => (
                <div key={tier.name} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-medium text-slate-600">{tier.name}</p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">{tier.price}</span>
                    <span className="pb-1 text-sm text-slate-500">/ mo</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{tier.detail}</p>
                  <ul className="mt-5 space-y-3 text-sm text-slate-600">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CTASection onLoginOpen={openLogin} onSignUpOpen={openSignUp} />
      <Footer />

      <LoginModal open={loginOpen} onClose={handleCloseLogin} onCreateAccount={openSignUp} prefillEmail={loginPrefillEmail} />
      <SignUpModal open={signupOpen} onClose={handleCloseSignUp} onLoginOpen={openLogin} />
    </div>
  );
}
