import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Work from "@/components/Work";
import WhyUs from "@/components/WhyUs";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import RecentBlog from "@/components/RecentBlog";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--bg-base)" }}>
      <Navbar />
      <Hero />
      <Clients />
      <Services />
      <Work />
      <WhyUs />
      <section className="py-4" style={{ background: "var(--bg-surface)" }}>
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <span className="section-label">Pricing</span>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
          >
            Simple, <span className="text-fire">Transparent</span> Pricing
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto text-sm"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Four tiers to match every stage of your business — from ignition to
            full inferno.
          </p>
        </div>
        <Pricing />
      </section>
      <Testimonials />
      <RecentBlog />
      <CTA />
      <Footer />
    </main>
  );
}
