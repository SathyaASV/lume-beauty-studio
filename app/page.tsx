import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Experience } from "@/components/Experience";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { BookingCta } from "@/components/BookingCta";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Services />
        <Experience />
        <Gallery />
        <Testimonials />
        <BookingCta />
        <Location />
      </main>

      <Footer />
    </>
  );
}
