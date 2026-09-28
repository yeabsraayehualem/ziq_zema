import Image from "next/image";
import NavBar from "./components/shared/navbar";
import HeroSection from "./components/public_profile/hero";
import Footer from "./components/shared/footer";
import AboutSection from "./components/public_profile/about";
import InstrumentsSection from "./components/public_profile/instruments";
import CoursesSection from "./components/public_profile/packages";
import ScheduleSection from "./components/public_profile/weekly_Schedule";
import Testimonilas from "./components/public_profile/testimonials";
import EnrollmentSection from "./components/public_profile/enrolement";
import ContactSection from "./components/public_profile/contact_us";

export default function Home() {
  return <>
    <NavBar />
    <HeroSection />
    <AboutSection />
    <InstrumentsSection />    
    <CoursesSection />
    <ScheduleSection />  

    <Testimonilas />

    <EnrollmentSection />
    <ContactSection />
    <Footer/>
  </>
}
