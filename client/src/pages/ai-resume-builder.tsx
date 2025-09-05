import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Wand2, Plus, X } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
}

const templates = [
  { id: "modern", name: "Modern Professional", description: "Clean and contemporary design" },
  { id: "classic", name: "Classic Traditional", description: "Timeless and professional" },
  { id: "creative", name: "Creative Designer", description: "Bold and eye-catching" },
  { id: "minimal", name: "Minimal Clean", description: "Simple and elegant" }
];

export default function AIResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [targetJob, setTargetJob] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: ""
    },
    summary: "",
    experiences: [],
    education: [],
    skills: []
  });

  const [newSkill, setNewSkill] = useState("");

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      duration: "",
      description: ""
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      year: ""
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const generateAIContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const aiSuggestions = {
        summary: targetJob.toLowerCase().includes("data") 
          ? "Results-driven data analyst with expertise in Python, SQL, and machine learning. Proven track record of transforming complex datasets into actionable business insights. Passionate about leveraging statistical analysis and visualization tools to drive data-informed decision making."
          : "Motivated software developer with strong problem-solving skills and experience in modern web technologies. Dedicated to creating efficient, scalable solutions and continuously learning new technologies to deliver exceptional user experiences.",
        
        skills: targetJob.toLowerCase().includes("data")
          ? ["Python", "SQL", "Power BI", "Machine Learning", "Statistical Analysis", "Data Visualization", "Pandas", "NumPy"]
          : ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", "Git", "RESTful APIs", "Problem Solving"]
      };

      setResumeData(prev => ({
        ...prev,
        summary: aiSuggestions.summary,
        skills: [...new Set([...prev.skills, ...aiSuggestions.skills])]
      }));

      setIsGenerating(false);
      toast({
        title: "AI Content Generated!",
        description: "Your resume has been enhanced with AI-powered suggestions.",
      });
    }, 2000);
  };

  const downloadResume = () => {
    toast({
      title: "Resume Downloaded!",
      description: "Your AI-generated resume has been saved as PDF.",
    });
  };

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
              <h1 className="text-3xl font-bold text-foreground" data-testid="resume-builder-title">
                AI Resume Builder
              </h1>
              <p className="text-muted-foreground mt-1" data-testid="resume-builder-subtitle">
                Create professional resumes with AI-powered optimization
              </p>
            </div>
          </div>
          <Button 
            onClick={downloadResume}
            className="bg-primary text-primary-foreground"
            data-testid="download-resume"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Enhancement */}
            <Card data-testid="ai-enhancement-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  AI Enhancement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter target job title (e.g., Data Analyst, Frontend Developer)"
                    value={targetJob}
                    onChange={(e) => setTargetJob(e.target.value)}
                    className="flex-1"
                    data-testid="target-job-input"
                  />
                  <Button 
                    onClick={generateAIContent}
                    disabled={!targetJob || isGenerating}
                    data-testid="generate-ai-content"
                  >
                    {isGenerating ? "Generating..." : "Enhance with AI"}
                  </Button>
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
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                    data-testid="input-full-name"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    data-testid="input-email"
                  />
                  <Input
                    placeholder="Phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    data-testid="input-phone"
                  />
                  <Input
                    placeholder="Location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    data-testid="input-location"
                  />
                  <Input
                    placeholder="LinkedIn URL"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    data-testid="input-linkedin"
                  />
                  <Input
                    placeholder="GitHub URL"
                    value={resumeData.personalInfo.github}
                    onChange={(e) => updatePersonalInfo("github", e.target.value)}
                    data-testid="input-github"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card data-testid="summary-card">
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write a brief summary of your professional background and career objectives..."
                  value={resumeData.summary}
                  onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
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
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.experiences.map((exp) => (
                  <div key={exp.id} className="border rounded-lg p-4 space-y-3" data-testid={`experience-${exp.id}`}>
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          data-testid={`exp-company-${exp.id}`}
                        />
                        <Input
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          data-testid={`exp-position-${exp.id}`}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        data-testid={`remove-exp-${exp.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                      data-testid={`exp-duration-${exp.id}`}
                    />
                    <Textarea
                      placeholder="Describe your responsibilities and achievements..."
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      rows={3}
                      data-testid={`exp-description-${exp.id}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card data-testid="education-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Education</CardTitle>
                  <Button onClick={addEducation} size="sm" data-testid="add-education">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="border rounded-lg p-4 space-y-3" data-testid={`education-${edu.id}`}>
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                          data-testid={`edu-institution-${edu.id}`}
                        />
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          data-testid={`edu-degree-${edu.id}`}
                        />
                        <Input
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                          data-testid={`edu-year-${edu.id}`}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        data-testid={`remove-edu-${edu.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
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
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    data-testid="skill-input"
                  />
                  <Button onClick={addSkill} data-testid="add-skill">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="flex items-center gap-1"
                      data-testid={`skill-${index}`}
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Selection & Preview */}
          <div className="space-y-6">
            <Card data-testid="template-selection-card">
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger data-testid="template-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4 space-y-2">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedTemplate === template.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                      data-testid={`template-${template.id}`}
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">{template.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card data-testid="preview-card">
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6 text-sm space-y-4 min-h-[400px]">
                  {resumeData.personalInfo.fullName && (
                    <div className="text-center border-b pb-4">
                      <h2 className="text-xl font-bold" data-testid="preview-name">
                        {resumeData.personalInfo.fullName}
                      </h2>
                      <div className="text-gray-600">
                        {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                        {resumeData.personalInfo.phone && <span> • {resumeData.personalInfo.phone}</span>}
                      </div>
                      {resumeData.personalInfo.location && (
                        <div className="text-gray-600">{resumeData.personalInfo.location}</div>
                      )}
                    </div>
                  )}

                  {resumeData.summary && (
                    <div>
                      <h3 className="font-semibold mb-2">Professional Summary</h3>
                      <p className="text-gray-700" data-testid="preview-summary">{resumeData.summary}</p>
                    </div>
                  )}

                  {resumeData.experiences.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Experience</h3>
                      {resumeData.experiences.map((exp) => (
                        <div key={exp.id} className="mb-3" data-testid={`preview-exp-${exp.id}`}>
                          <div className="font-medium">{exp.position}</div>
                          <div className="text-gray-600">{exp.company} • {exp.duration}</div>
                          <div className="text-gray-700 text-xs mt-1">{exp.description}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.education.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Education</h3>
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="mb-2" data-testid={`preview-edu-${edu.id}`}>
                          <div className="font-medium">{edu.degree}</div>
                          <div className="text-gray-600">{edu.institution} • {edu.year}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-1" data-testid="preview-skills">
                        {resumeData.skills.map((skill, index) => (
                          <span key={skill} className="bg-gray-100 px-2 py-1 rounded text-xs">
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
        </div>
      </div>
    </div>
  );
}