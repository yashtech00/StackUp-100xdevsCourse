
import { FaqSection } from "../../Components/LandingComponents/FAQs";
import { FeatureSection } from "../../Components/LandingComponents/FeaturePage";
import { Footer } from "../../Components/LandingComponents/Footer";
import { LandingPage } from "../../Components/LandingComponents/LandingPage";
import { StudentTestimonials } from "../../Components/LandingComponents/StdTestimonials";
import { Navbar } from "../../Components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar />
            <LandingPage />
            <FeatureSection />
            <StudentTestimonials />
            <FaqSection />
            <Footer />
        </div>
    )
}