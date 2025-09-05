import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, Plus, X, FileText } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface CVSection {
  id: string;
  type: string;
  title: string;
  content: any;
}

interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  sections: CVSection[];
}

const templateStyles = {
  modern: {
    primary: "#3B82F6",
    secondary: "#1F2937",
    accent: "#10B981",
    background: "#FFFFFF"
  },
  classic: {
    primary: "#1F2937",
    secondary: "#374151",
    accent: "#DC2626",
    background: "#FFFFFF"
  },
  creative: {
    primary: "#8B5CF6",
    secondary: "#EC4899",
    accent: "#F59E0B",
    background: "#FFFFFF"
  }
};

export default function CVBuilderWebApp() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [showPreview, setShowPreview] = useState(true);
  const { toast } = useToast();

  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: ""
    },
    sections: [
      {
        id: "summary",
        type: "summary",
        title: "Professional Summary",
        content: ""
      },
      {
        id: "experience",
        type: "experience",
        title: "Work Experience",
        content: []
      },
      {
        id: "education",
        type: "education", 
        title: "Education",
        content: []
      },
      {
        id: "skills",
        type: "skills",
        title: "Skills",
        content: []
      }
    ]
  });

  const updatePersonalInfo = (field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSection = (sectionId: string, content: any) => {
    setCvData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, content } : section
      )
    }));
  };

  const addExperience = () => {
    const experienceSection = cvData.sections.find(s => s.type === "experience");
    if (experienceSection) {
      const newExp = {
        id: Date.now().toString(),
        company: "",
        position: "",
        duration: "",
        description: ""
      };
      updateSection("experience", [...experienceSection.content, newExp]);
    }
  };

  const addEducation = () => {
    const educationSection = cvData.sections.find(s => s.type === "education");
    if (educationSection) {
      const newEdu = {
        id: Date.now().toString(),
        institution: "",
        degree: "",
        year: ""
      };
      updateSection("education", [...educationSection.content, newEdu]);
    }
  };

  const addSkill = (skill: string) => {
    const skillsSection = cvData.sections.find(s => s.type === "skills");
    if (skillsSection && skill.trim()) {
      updateSection("skills", [...skillsSection.content, skill.trim()]);
    }
  };

  const removeSkill = (index: number) => {
    const skillsSection = cvData.sections.find(s => s.type === "skills");
    if (skillsSection) {
      const newSkills = skillsSection.content.filter((_: any, i: number) => i !== index);
      updateSection("skills", newSkills);
    }
  };

  const downloadCV = () => {
    toast({
      title: "CV Downloaded!",
      description: "Your CV has been saved as PDF with the selected template.",
    });
  };

  const currentStyle = templateStyles[selectedTemplate as keyof typeof templateStyles];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" data-testid="back-to-home">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground" data-testid="cv-builder-title">
                CV/Resume Builder
              </h1>
              <p className="text-muted-foreground mt-1" data-testid="cv-builder-subtitle">
                Create professional CVs with real-time preview
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              data-testid="toggle-preview"
            >
              <Eye className="mr-2 h-4 w-4" />
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
            <Button onClick={downloadCV} data-testid="download-cv">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card data-testid="template-card">
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger data-testid="template-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern Professional</SelectItem>
                    <SelectItem value="classic">Classic Traditional</SelectItem>
                    <SelectItem value="creative">Creative Designer</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {Object.entries(templateStyles).map(([key, style]) => (
                    <div
                      key={key}
                      className={`p-2 border rounded cursor-pointer transition-colors ${
                        selectedTemplate === key ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedTemplate(key)}
                      data-testid={`template-${key}`}
                    >
                      <div className="h-12 rounded" style={{ backgroundColor: style.primary }}></div>
                      <div className="text-xs text-center mt-1 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card data-testid="personal-info-card">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    value={cvData.personalInfo.name}
                    onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    data-testid="input-name"
                  />
                  <Input
                    placeholder="Professional Title"
                    value={cvData.personalInfo.title}
                    onChange={(e) => updatePersonalInfo("title", e.target.value)}
                    data-testid="input-title"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={cvData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    data-testid="input-email"
                  />
                  <Input
                    placeholder="Phone"
                    value={cvData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    data-testid="input-phone"
                  />
                  <Input
                    placeholder="Location"
                    value={cvData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    data-testid="input-location"
                  />
                  <Input
                    placeholder="Website/Portfolio"
                    value={cvData.personalInfo.website}
                    onChange={(e) => updatePersonalInfo("website", e.target.value)}
                    data-testid="input-website"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card data-testid="summary-card">
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write a brief professional summary..."
                  value={cvData.sections.find(s => s.type === "summary")?.content || ""}
                  onChange={(e) => updateSection("summary", e.target.value)}
                  rows={4}
                  data-testid="summary-textarea"
                />
              </CardContent>
            </Card>

            {/* Experience */}
            <Card data-testid="experience-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Work Experience</CardTitle>
                  <Button onClick={addExperience} size="sm" data-testid="add-experience">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cvData.sections.find(s => s.type === "experience")?.content.map((exp: any, index: number) => (
                  <div key={exp.id} className="border rounded-lg p-4 space-y-3" data-testid={`experience-${index}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...cvData.sections.find(s => s.type === "experience")!.content];
                          updated[index] = { ...updated[index], company: e.target.value };
                          updateSection("experience", updated);
                        }}
                        data-testid={`exp-company-${index}`}
                      />
                      <Input
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => {
                          const updated = [...cvData.sections.find(s => s.type === "experience")!.content];
                          updated[index] = { ...updated[index], position: e.target.value };
                          updateSection("experience", updated);
                        }}
                        data-testid={`exp-position-${index}`}
                      />
                    </div>
                    <Input
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => {
                        const updated = [...cvData.sections.find(s => s.type === "experience")!.content];
                        updated[index] = { ...updated[index], duration: e.target.value };
                        updateSection("experience", updated);
                      }}
                      data-testid={`exp-duration-${index}`}
                    />
                    <Textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...cvData.sections.find(s => s.type === "experience")!.content];
                        updated[index] = { ...updated[index], description: e.target.value };
                        updateSection("experience", updated);
                      }}
                      rows={2}
                      data-testid={`exp-description-${index}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card data-testid="skills-card">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Add a skill..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addSkill((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                    data-testid="skill-input"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {cvData.sections.find(s => s.type === "skills")?.content.map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                      data-testid={`skill-${index}`}
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSkill(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="space-y-6">
              <Card data-testid="preview-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="bg-white rounded-lg p-8 shadow-lg min-h-[800px]"
                    style={{ 
                      borderLeft: `4px solid ${currentStyle.primary}`,
                      fontFamily: 'serif'
                    }}
                    data-testid="cv-preview"
                  >
                    {/* Header */}
                    {cvData.personalInfo.name && (
                      <div className="text-center border-b-2 pb-6 mb-6" style={{ borderColor: currentStyle.primary }}>
                        <h1 
                          className="text-3xl font-bold mb-2" 
                          style={{ color: currentStyle.primary }}
                          data-testid="preview-name"
                        >
                          {cvData.personalInfo.name}
                        </h1>
                        {cvData.personalInfo.title && (
                          <h2 className="text-xl text-gray-600 mb-4" data-testid="preview-title">
                            {cvData.personalInfo.title}
                          </h2>
                        )}
                        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
                          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
                          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
                          {cvData.personalInfo.location && <span>{cvData.personalInfo.location}</span>}
                          {cvData.personalInfo.website && <span>{cvData.personalInfo.website}</span>}
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    {cvData.sections.find(s => s.type === "summary")?.content && (
                      <div className="mb-6">
                        <h3 
                          className="text-lg font-bold mb-3 pb-1 border-b" 
                          style={{ color: currentStyle.secondary, borderColor: currentStyle.accent }}
                        >
                          Professional Summary
                        </h3>
                        <p className="text-gray-700 leading-relaxed" data-testid="preview-summary">
                          {cvData.sections.find(s => s.type === "summary")?.content}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {cvData.sections.find(s => s.type === "experience")?.content.length > 0 && (
                      <div className="mb-6">
                        <h3 
                          className="text-lg font-bold mb-3 pb-1 border-b" 
                          style={{ color: currentStyle.secondary, borderColor: currentStyle.accent }}
                        >
                          Work Experience
                        </h3>
                        {cvData.sections.find(s => s.type === "experience")?.content.map((exp: any, index: number) => (
                          <div key={index} className="mb-4" data-testid={`preview-exp-${index}`}>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold" style={{ color: currentStyle.primary }}>
                                {exp.position}
                              </h4>
                              <span className="text-sm text-gray-500">{exp.duration}</span>
                            </div>
                            <p className="text-gray-600 mb-2">{exp.company}</p>
                            <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skills */}
                    {cvData.sections.find(s => s.type === "skills")?.content.length > 0 && (
                      <div className="mb-6">
                        <h3 
                          className="text-lg font-bold mb-3 pb-1 border-b" 
                          style={{ color: currentStyle.secondary, borderColor: currentStyle.accent }}
                        >
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2" data-testid="preview-skills">
                          {cvData.sections.find(s => s.type === "skills")?.content.map((skill: string, index: number) => (
                            <span 
                              key={index}
                              className="px-3 py-1 rounded text-sm"
                              style={{ 
                                backgroundColor: `${currentStyle.primary}20`,
                                color: currentStyle.primary 
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}