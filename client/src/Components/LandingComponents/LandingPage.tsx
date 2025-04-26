import { motion } from "framer-motion";
import { FeatureSection } from "./FeaturePage";

const icons = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png", top: "20%", left: "15%" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVMDZKiipvnrZDIjYwE9-lnNzZodyESvzL4A&s", top: "20%", right: "20%" },
    { src: "https://cdn.iconscout.com/icon/free/png-256/free-mongodb-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-langugae-freebies-pack-logos-icons-1175138.png", bottom: "45%" },
    { src: "https://cdn-icons-png.freepik.com/512/5968/5968292.png", left: "3%",top:"10%" },
    { src: "https://i.pinimg.com/564x/2f/9c/11/2f9c11f9e55efbf1791f12c06d60729b.jpg", top: "5%", },
    { src: "https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg", top: "5%", right: "15%" },
    { src: "https://logowik.com/content/uploads/images/css-icon1720860981.logowik.com.webp", bottom: "20%", right: "5%" },
    { src: "https://static-00.iconduck.com/assets.00/c-icon-456x512-ld9qap3k.png", bottom: "30%", left: "5%" },
    { src: "https://static-00.iconduck.com/assets.00/typescript-icon-icon-2048x2048-2rhh1z66.png", bottom: "20%", left: "32%" },
    { src: "https://cdn.iconscout.com/icon/free/png-256/free-postgresql-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-freebies-pack-logos-icons-1175119.png?f=webp", bottom: "35%", right: "25%" },
    { src: "https://cdn.iconscout.com/icon/free/png-256/free-angular-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-226070.png", top: "40%", right: "5%" },
];


export const LandingPage = () => {
    return (

        <div className="relative w-full h-screen bg-black overflow-hidden flex  justify-center">

            {/* Floating Icons */}
            {icons.map((icon, index) => (
                <motion.img
                    key={index}
                    src={icon.src}
                    alt={`floating-icon-${index}`}
                    className="absolute w-20 h-20 object-contain"
                    style={{ ...icon }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                    }}
                    transition={{
                        duration: 4 + index,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Main Heading */}
            <div className="text-center text-white z-10 px-4 mt-32">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Master Tech Skills<br />and Build Your Future
                </h1>
                <p className="mt-6 text-gray-400 text-lg">
                    Learn Web Development, Data Science, AI, and more with our expert-led courses.
                    Unlock your career potential today.
                </p>
            </div>
            
        </div>
    );
};
