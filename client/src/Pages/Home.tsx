
import { FeatureSection } from "../Components/FeaturePage";
import { LandingPage } from "../Components/LandingComponents/LandingPage";
import { Navbar } from "../Components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar/>
            <LandingPage />
            <FeatureSection/>
            </div>
    )
}