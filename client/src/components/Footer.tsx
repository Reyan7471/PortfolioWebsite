import { Linkedin, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-3xl font-bold mb-4" data-testid="footer-name">
            Ansari Reyanahmad
          </div>
          <p className="text-gray-300 mb-6" data-testid="footer-tagline">
            Data Analyst | Python Developer | Problem Solver
          </p>
          
          <div className="flex justify-center space-x-6 mb-8" data-testid="footer-social-links">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              data-testid="footer-linkedin"
            >
              <Linkedin className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              data-testid="footer-github"
            >
              <Github className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              data-testid="footer-twitter"
            >
              <Twitter className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              data-testid="footer-email"
            >
              <Mail className="text-2xl" />
            </a>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400" data-testid="footer-copyright">
              © 2024 Ansari Reyanahmad. All rights reserved. Built with passion for innovation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
