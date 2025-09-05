import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="contact-title">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-xl text-blue-100 mt-6" data-testid="contact-subtitle">
            Ready to collaborate on exciting projects
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h3 className="text-3xl font-bold mb-6" data-testid="contact-cta-title">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-xl text-blue-100 mb-8" data-testid="contact-cta-description">
              I'm actively seeking opportunities in Data Analysis and Python Development. 
              Let's discuss how I can contribute to your team's success.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4" data-testid="contact-email">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-blue-100">ansari.reyanahmad@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4" data-testid="contact-linkedin">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Linkedin className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">LinkedIn</h4>
                  <p className="text-blue-100">linkedin.com/in/ansari-reyanahmad</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4" data-testid="contact-github">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Github className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">GitHub</h4>
                  <p className="text-blue-100">github.com/ansari-reyanahmad</p>
                </div>
              </div>
            </div>
          </div>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20" data-testid="contact-form-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <label className="block text-white font-semibold mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/20 text-white placeholder-blue-200 border-white/30 focus:border-white"
                    placeholder="Your Name"
                    required
                    data-testid="input-name"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/20 text-white placeholder-blue-200 border-white/30 focus:border-white"
                    placeholder="your.email@example.com"
                    required
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-white/20 text-white placeholder-blue-200 border-white/30 focus:border-white resize-none"
                    placeholder="Tell me about your project..."
                    required
                    data-testid="textarea-message"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-primary py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                  data-testid="button-submit"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
