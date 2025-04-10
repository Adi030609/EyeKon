import React from "react";
import { EyeFatigueScore } from "@/components/eye-fatigue-score";
import FeatureCard from "@/components/feature-card";
import { HeroSection } from "@/components/hero-section";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { AccessibilitySettings } from "@/components/accessibility-settings";
// import Visual from "@/components/visual";
import StarBackground from "@/components/stars";

function Home() {
  const features = [
    {
      title: "Real-time Screen Protection",
      description:
        "Automatically adjusts brightness & contrast based on your environment and eye strain levels.",
      iconName: "Eye",
    },
    {
      title: "Vision Stress AI",
      description:
        "Advanced AI algorithms detect eye fatigue & discomfort before you notice symptoms.",
      iconName: "Brain",
    },
    {
      title: "Smart Workspace Setup",
      description:
        "Analyzes your desk & lighting conditions to provide optimal ergonomic recommendations.",
      iconName: "Layout",
    },
    {
      title: "Gamified Eye Exercises",
      description:
        "Earn rewards and track progress with fun, scientifically-proven eye health exercises.",
      iconName: "Gamepad2",
    },
    {
      title: "Digital Eye Insurance",
      description:
        "AI-based risk scoring for better coverage and personalized eye health plans.",
      iconName: "Shield",
    },
  ];

  return (
    <main className="flex min-h-screen gap-0 flex-col items-center justify-between">
      <HeroSection />
      <StarBackground>
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Your Real-Time Eye Health Dashboard
              </h2>
              <p className="max-w-[700px] text-zinc-400 md:text-xl">
                Monitor your eye health in real-time with our advanced
                AI-powered analytics.
              </p>
            </div>

            <div className="mx-auto mt-12 flex justify-center">
              <EyeFatigueScore />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Core Features
              </h2>
              <p className="max-w-[700px] text-zinc-400 md:text-xl">
                Cutting-edge technology to protect and enhance your vision
                health.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.iconName} // Pass string instead of icon function
                />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Take Control of Your Eye Health
              </h2>
              <p className="max-w-[700px] text-zinc-400 md:text-xl">
                Join thousands of users who have improved their eye health with
                VisionGuard AI.
              </p>
              <button className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50">
                Start Your Vision Check →
              </button>
            </div>
          </div>
        </section>

        <AccessibilitySettings />
        <ChatbotWidget />
      </StarBackground>
    </main>
  );
}

export default Home;
