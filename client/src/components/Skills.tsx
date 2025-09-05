import { useEffect, useRef } from "react";
import { Code, Globe, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach((bar) => {
              const width = bar.getAttribute('data-width');
              if (width) {
                (bar as HTMLElement).style.width = width;
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const programmingSkills = [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "HTML/CSS", level: 95 }
  ];

  const dataScienceSkills = [
    "Machine Learning",
    "Data Modeling", 
    "Statistical Analysis",
    "Data Visualization"
  ];

  const dataAnalytics = [
    "MySQL",
    "Power BI", 
    "Pandas",
    "NumPy",
    "Jupyter"
  ];

  return (
    <section id="skills" className="py-20 bg-muted" ref={skillsRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="skills-title">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Programming Languages */}
          <Card className="card-hover" data-testid="programming-skills-card">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Code className="text-primary text-2xl mr-3" />
                <h3 className="text-xl font-bold">Programming Languages</h3>
              </div>
              <div className="space-y-4">
                {programmingSkills.map((skill) => (
                  <div key={skill.name} data-testid={`skill-${skill.name.toLowerCase().replace('/', '-')}`}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full skill-bar transition-all duration-1000 ease-in-out"
                        data-width={`${skill.level}%`}
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Science */}
          <Card className="card-hover" data-testid="data-science-skills-card">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Globe className="text-accent text-2xl mr-3" />
                <h3 className="text-xl font-bold">Data Science</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {dataScienceSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    data-testid={`data-science-skill-${skill.toLowerCase().replace(/[\s/]/g, '-')}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data & Analytics */}
          <Card className="card-hover" data-testid="data-analytics-skills-card">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="text-accent text-2xl mr-3" />
                <h3 className="text-xl font-bold">Data & Analytics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {dataAnalytics.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                    data-testid={`data-tool-${tool.toLowerCase().replace(/[\s/]/g, '-')}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
