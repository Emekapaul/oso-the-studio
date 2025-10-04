"use client";

import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import useMedia from "@/hooks/useMedia";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const { loading, error } = useMedia();

  if (loading) return <LoadingSpinner message="Loading Home Page..." />;

  return (
    <div className="min-h-screen">
      <Hero />
      <Portfolio />
      <About />
      <Services />
      <Contact />
    </div>
  );
}
