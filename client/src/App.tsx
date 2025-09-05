import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import VendorAnalytics from "@/pages/vendor-analytics";
import AIResumeBuilder from "@/pages/ai-resume-builder";
import AdvancedChatbot from "@/pages/advanced-chatbot";
import CVBuilderWebApp from "@/pages/cv-builder-webapp";
import FaceRecognition from "@/pages/face-recognition";
import DataVisualization from "@/pages/data-visualization";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects/vendor-analytics" component={VendorAnalytics} />
      <Route path="/projects/ai-resume-builder" component={AIResumeBuilder} />
      <Route path="/projects/advanced-chatbot" component={AdvancedChatbot} />
      <Route path="/projects/cv-builder-webapp" component={CVBuilderWebApp} />
      <Route path="/projects/face-recognition" component={FaceRecognition} />
      <Route path="/projects/data-visualization" component={DataVisualization} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
