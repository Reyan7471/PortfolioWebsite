import { GraduationCap, Heart, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="about-title">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-testid="about-image">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Modern developer workspace"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground" data-testid="about-subtitle">
              Building the Future with Data & Code
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="about-description">
              I am currently pursuing a Master's in Computer Applications (MCA) at Silver Oak University. 
              With a strong foundation in programming, web development, and data-driven solutions, 
              I aim to leverage my skills to create impactful applications and solve real-world problems.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4" data-testid="education-info">
                <GraduationCap className="text-primary text-xl" />
                <div>
                  <h4 className="font-semibold">Education</h4>
                  <p className="text-muted-foreground">Master of Computer Applications (MCA) - Silver Oak University</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4" data-testid="passion-info">
                <Heart className="text-primary text-xl" />
                <div>
                  <h4 className="font-semibold">Passion</h4>
                  <p className="text-muted-foreground">Data Science, Web Development, Generative AI & Chatbots</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4" data-testid="goal-info">
                <Target className="text-primary text-xl" />
                <div>
                  <h4 className="font-semibold">Goal</h4>
                  <p className="text-muted-foreground">Data Analyst, Data Scientist, or Python Developer role in innovative projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
