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
import { getPublicCatalog } from "./lib/public-catalog";

export default async function Home() {
  const catalog = await getPublicCatalog();

  return <>
    <NavBar />
    <HeroSection />
    <AboutSection students={catalog.students} instruments={catalog.instruments} packages={ catalog.packages.length } />
    <InstrumentsSection />
    <CoursesSection courses={catalog.courses} packages={catalog.packages} />
    <ScheduleSection schedules={catalog.schedules} />
    <Testimonilas />
    <EnrollmentSection courses={catalog.courses} packages={catalog.packages} />
    <ContactSection />
    <Footer />
  </>;
}
