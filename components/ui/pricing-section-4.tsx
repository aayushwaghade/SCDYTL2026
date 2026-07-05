"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const SHARED_BENEFITS = [
  "Pass includes:",
  "Official AWS Swags (Standard)",
  "Conference Access",
  "Event Badge",
  "Participation Certificate",
  "Breakfast & Lunch",
  "Refreshments",
  "Networking Opportunities",
  "AWS & Sponsor Giveaways",
  "Community Booth Access",
];

const plans = [
  {
    name: "Super Early Bird",
    description: "Extremely limited tickets for early decision makers.",
    price: 200,
    originalPrice: 300,
    discountPercentage: 33,
    yearlyPrice: 170, // Group discount
    buttonText: "Book Now",
    buttonVariant: "outline" as const,
    includes: SHARED_BENEFITS,
    badge: "🔥 Best Value",
    isSuperEarlyBird: true,
  },
  {
    name: "Standard Pass",
    description: "Discounted pricing for community members.",
    price: 250,
    yearlyPrice: 212, // Group discount
    buttonText: "Book Now",
    buttonVariant: "default" as const,
    popular: true,
    includes: SHARED_BENEFITS,
    badge: "⭐ Popular Choice",
  },
  {
    name: "Professional Pass",
    description: "For professionals seeking VIP perks and comfort.",
    price: 400,
    yearlyPrice: 340, // Group discount
    buttonText: "Book Now",
    buttonVariant: "default" as const,
    includes: SHARED_BENEFITS,
    badge: "VIP",
    isProfessional: true,
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-4 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "0" ? "text-near-black font-bold" : "text-gray-400",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border border-aws-orange/40 shadow-sm shadow-aws-orange/50 bg-gradient-to-t from-aws-orange to-aws-orange-light"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Individual</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-4 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "1" ? "text-near-black font-bold" : "text-gray-400",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border border-aws-orange/40 shadow-sm shadow-aws-orange/50 bg-gradient-to-t from-aws-orange to-aws-orange-light"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Group (3+ Attendees)</span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection6() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  const row1Plans = plans;

  return (
    <div
      className="min-h-screen mx-auto relative bg-[#040308] overflow-x-hidden py-16"
      ref={pricingRef}
    >
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp
          density={1200}
          direction="bottom"
          speed={0.8}
          color="#FFFFFF"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>
      <TimelineContent
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0 pointer-events-none"
      >
        <div className="framer-1i5axl2 relative w-full h-full">
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full opacity-10"
            style={{
              border: "200px solid #3131f5",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
            }}
            data-border="true"
            data-framer-name="Ellipse 1"
          ></div>
        </div>
      </TimelineContent>

      <article className="text-center mb-12 pt-16 max-w-3xl mx-auto space-y-4 relative z-50">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.12}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            AWS Student Community Day Ticket Pricing
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
        >
          Choose the registration pass that fits your goals. Take advantage of group discounts by registering with friends!
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="pt-2"
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(255, 153, 0, 0.08) 0%, transparent 60%)
          `,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Grid (3 Cards) */}
        <div className="grid md:grid-cols-3 gap-6 py-6 items-stretch">
          {row1Plans.map((plan, index) => (
            <TimelineContent
              key={plan.name}
              as="div"
              animationNum={2 + index}
              timelineRef={pricingRef}
              customVariants={revealVariants}
              className="h-full"
            >
              <Card
                className={cn(
                  "relative text-white border-neutral-800 bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 h-full flex flex-col justify-between overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1",
                  plan.popular
                    ? "shadow-[0px_-13px_150px_0px_rgba(255,153,0,0.15)] border-aws-orange/30 z-20 md:scale-[1.03]"
                    : plan.isProfessional
                    ? "border-purple-primary/30 shadow-[0px_-13px_150px_0px_rgba(139,92,246,0.15)] z-10"
                    : "z-10"
                )}
              >
                {plan.badge && (
                  <div
                    className={cn(
                      "absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider z-20",
                      plan.popular
                        ? "bg-aws-orange text-near-black"
                        : plan.isProfessional
                        ? "bg-purple-primary text-white"
                        : "bg-neutral-800 text-gray-300 border border-neutral-700"
                    )}
                  >
                    {plan.badge}
                  </div>
                )}
                
                <CardHeader className="text-left p-6 md:p-8">
                  <div className="flex justify-between">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  </div>
                  
                  {/* Pricing with Original Price support */}
                  <div className="flex flex-col gap-1.5 my-3">
                    {plan.originalPrice && !isYearly && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm line-through text-gray-500">
                          ₹{plan.originalPrice}
                        </span>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {plan.discountPercentage}% OFF
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold flex items-baseline">
                        ₹
                        <NumberFlow
                          value={isYearly ? plan.yearlyPrice : plan.price}
                          className="text-4xl font-extrabold"
                        />
                      </span>
                      <span className="text-gray-400 ml-1 text-xs">
                        /{isYearly ? "person (Group)" : "ticket"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed min-h-[36px]">{plan.description}</p>
                </CardHeader>

                <CardContent className="p-6 md:p-8 pt-0 flex-1 flex flex-col justify-between">
                  <div>
                    <a href="#register" className="block w-full">
                      <button
                        className={cn(
                          "w-full py-4 text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer",
                          plan.popular
                            ? "bg-gradient-to-t from-aws-orange to-aws-orange-light shadow-lg shadow-aws-orange/20 text-near-black hover:opacity-95"
                            : plan.isProfessional
                            ? "bg-gradient-to-t from-purple-primary to-indigo-primary shadow-lg shadow-purple-primary/20 text-white hover:opacity-95"
                            : "bg-gradient-to-t from-neutral-950 to-neutral-800 border border-neutral-700 hover:border-neutral-600 text-white"
                        )}
                      >
                        {plan.buttonText}
                      </button>
                    </a>

                    <div className="space-y-3 pt-6 border-t border-neutral-800 mt-6">
                      <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-3">
                        {plan.includes[0]}
                      </h4>
                      <ul className="space-y-2.5">
                        {plan.includes.slice(1).map((feature, featureIndex) => (
                          <li
                              key={featureIndex}
                              className="flex items-center gap-2.5 text-sm text-gray-300"
                          >
                            <span className={cn(
                              "h-1.5 w-1.5 rounded-full shrink-0",
                              plan.isProfessional ? "bg-purple-primary" : "bg-aws-orange"
                            )}></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TimelineContent>
          ))}
        </div>
      </div>
    </div>
  );
}
