import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

type ProjectCategory = "all" | "data" | "web" | "ai";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  tags: string[];
  github?: string;
  demo?: string;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const projects: Project[] = [
    {
      id: "vendor-analytics",
      title: "Vendor Performance Data Analytics",
      description: "Comprehensive analytics dashboard using Python, MySQL, and Power BI to analyze vendor performance metrics and generate actionable insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "data",
      tags: ["DATA ANALYTICS", "PYTHON"],
      github: "https://github.com/Reyan7471/vendor-analytics-dashboard",
      demo: "/projects/vendor-analytics"
    },
    {
      id: "ai-resume-builder",
      title: "AI Resume Builder",
      description: "Intelligent resume generation system using machine learning algorithms to create optimized resumes based on job requirements and user skills.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "ai",
      tags: ["AI/ML", "PYTHON"],
      github: "https://github.com/Reyan7471/ai-resume-builder",
      demo: "/projects/ai-resume-builder"
    },
    {
      id: "advanced-chatbot",
      title: "Advanced Chatbot",
      description: "Sophisticated conversational AI built with Python featuring natural language processing, context awareness, and multi-domain knowledge.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "ai",
      tags: ["CHATBOT", "NLP"],
      github: "https://github.com/Reyan7471/advanced-chatbot",
      demo: "/projects/advanced-chatbot"
    },
    {
      id: "cv-builder-webapp",
      title: "CV/Resume Builder Web App",
      description: "Modern web application for creating professional resumes with real-time preview, multiple templates, and PDF export functionality.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "web",
      tags: ["WEB APP", "JAVASCRIPT"],
      github: "https://github.com/Reyan7471/cv-builder-webapp",
      demo: "/projects/cv-builder-webapp"
    },
    {
      id: "face-recognition",
      title: "Face Recognition System",
      description: "Real-time face detection and recognition system using OpenCV and machine learning algorithms for security and identification applications.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "ai",
      tags: ["COMPUTER VISION", "OPENCV"],
      github: "https://github.com/Reyan7471/face-recognition-system",
      demo: "/projects/face-recognition"
    },
    {
      id: "data-visualization",
      title: "Interactive Data Dashboard",
      description: "Dynamic business intelligence dashboard featuring interactive visualizations, KPI tracking, and real-time data insights using Power BI.",
      image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "data",
      tags: ["VISUALIZATION", "POWER BI"],
      github: "https://github.com/Reyan7471/data-visualization-dashboard",
      demo: "/projects/data-visualization"
    }
  ];

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "data", label: "Data Analytics" },
    { key: "web", label: "Web Development" },
    { key: "ai", label: "AI/ML" }
  ] as const;

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="projects-title">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-xl text-muted-foreground mt-6" data-testid="projects-subtitle">
            Showcasing my journey in data science and web development
          </p>
        </div>
        
        {/* Project Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4" data-testid="project-filters">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={
                  activeFilter === filter.key
                    ? "px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold"
                    : "px-6 py-2 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                }
                data-testid={`filter-${filter.key}`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="projects-grid">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="rounded-2xl shadow-lg overflow-hidden card-hover"
              data-testid={`project-card-${project.id}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
                data-testid={`project-image-${project.id}`}
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        index === 0
                          ? "bg-accent/10 text-accent"
                          : "bg-primary/10 text-primary"
                      }`}
                      data-testid={`project-tag-${project.id}-${index}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-3" data-testid={`project-title-${project.id}`}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`project-description-${project.id}`}>
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="text-primary font-semibold hover:underline p-0"
                    onClick={() => window.open(project.demo, '_blank')}
                    data-testid={`project-view-${project.id}`}
                  >
                    View Project
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                      data-testid={`project-demo-${project.id}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
