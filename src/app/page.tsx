import { Hero } from "@/components/home/hero";
import {
  CallToAction,
  Features,
  HowItWorks,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </>
  );
}
