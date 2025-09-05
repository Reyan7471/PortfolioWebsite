import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Ansari";

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 150);
      }
    };
    const timer = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const downloadResume = () => {
    // Create a mock resume download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Ansari_Reyanahmad_Resume.pdf';
    link.click();
  };

  return (
    <section id="home" className="min-h-screen flex items-center gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in">
              Hi, I'm <span className="typing-animation" data-testid="typing-text">{typedText}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 fade-in" data-testid="hero-description">
              MCA Student & Aspiring Data Analyst passionate about creating data-driven solutions and modern web applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 fade-in">
              <Button
                onClick={downloadResume}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                data-testid="download-resume-button"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                onClick={scrollToProjects}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors bg-transparent"
                data-testid="view-projects-button"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-96 h-96 rounded-full overflow-hidden shadow-2xl" data-testid="hero-image">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
                alt="Professional headshot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
