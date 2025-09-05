import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Upload, Scan, UserCheck, Users, Eye } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface DetectedFace {
  id: string;
  name: string;
  confidence: number;
  coordinates: { x: number; y: number; width: number; height: number };
  timestamp: Date;
}

interface RecognitionSession {
  id: string;
  type: "camera" | "upload";
  faces: DetectedFace[];
  status: "idle" | "scanning" | "complete";
  timestamp: Date;
}

const mockFaces = [
  { name: "John Doe", confidence: 0.94 },
  { name: "Jane Smith", confidence: 0.87 },
  { name: "Mike Johnson", confidence: 0.91 },
  { name: "Sarah Wilson", confidence: 0.89 },
  { name: "Unknown Person", confidence: 0.65 }
];

export default function FaceRecognition() {
  const [sessions, setSessions] = useState<RecognitionSession[]>([]);
  const [currentSession, setCurrentSession] = useState<RecognitionSession | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        createNewSession("camera");
        toast({
          title: "Camera Started",
          description: "Real-time face detection is now active.",
        });
      }
    } catch (error) {
      toast({
        title: "Camera Access Failed",
        description: "Please allow camera access to use this feature.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        createNewSession("upload");
        toast({
          title: "Image Uploaded",
          description: "Ready to analyze faces in the uploaded image.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const createNewSession = (type: "camera" | "upload") => {
    const newSession: RecognitionSession = {
      id: Date.now().toString(),
      type,
      faces: [],
      status: "idle",
      timestamp: new Date()
    };
    
    setSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession);
  };

  const simulateFaceRecognition = () => {
    if (!currentSession) return;

    setIsScanning(true);
    setCurrentSession(prev => prev ? { ...prev, status: "scanning" } : null);

    // Simulate processing time
    setTimeout(() => {
      const detectedFaces: DetectedFace[] = [];
      const numFaces = Math.floor(Math.random() * 3) + 1; // 1-3 faces

      for (let i = 0; i < numFaces; i++) {
        const randomFace = mockFaces[Math.floor(Math.random() * mockFaces.length)];
        const face: DetectedFace = {
          id: `face_${Date.now()}_${i}`,
          name: randomFace.name,
          confidence: randomFace.confidence + (Math.random() * 0.1 - 0.05), // Add slight variation
          coordinates: {
            x: Math.random() * 200 + 50,
            y: Math.random() * 150 + 50,
            width: 80 + Math.random() * 40,
            height: 80 + Math.random() * 40
          },
          timestamp: new Date()
        };
        detectedFaces.push(face);
      }

      const updatedSession = {
        ...currentSession,
        faces: detectedFaces,
        status: "complete" as const
      };

      setCurrentSession(updatedSession);
      setSessions(prev => prev.map(s => s.id === currentSession.id ? updatedSession : s));
      setIsScanning(false);

      toast({
        title: "Recognition Complete",
        description: `Detected ${detectedFaces.length} face(s) in the image.`,
      });
    }, 2000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600 bg-green-50";
    if (confidence >= 0.8) return "text-blue-600 bg-blue-50"; 
    if (confidence >= 0.7) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.9) return "Very High";
    if (confidence >= 0.8) return "High";
    if (confidence >= 0.7) return "Medium";
    return "Low";
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
              <h1 className="text-3xl font-bold text-foreground" data-testid="face-recognition-title">
                Face Recognition System
              </h1>
              <p className="text-muted-foreground mt-1" data-testid="face-recognition-subtitle">
                Real-time face detection and recognition using computer vision
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={cameraActive ? stopCamera : startCamera}
              variant={cameraActive ? "destructive" : "default"}
              data-testid="camera-toggle"
            >
              <Camera className="mr-2 h-4 w-4" />
              {cameraActive ? "Stop Camera" : "Start Camera"}
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              data-testid="upload-image"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Camera/Image Section */}
          <div className="lg:col-span-2">
            <Card data-testid="camera-section">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {cameraActive ? "Live Camera Feed" : selectedImage ? "Uploaded Image" : "Detection Area"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  {cameraActive ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                      data-testid="camera-video"
                    />
                  ) : selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                      data-testid="uploaded-image"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Start camera or upload an image to begin face recognition</p>
                      </div>
                    </div>
                  )}

                  {/* Face Detection Overlays */}
                  {currentSession?.faces.map((face) => (
                    <div
                      key={face.id}
                      className="absolute border-2 border-green-400"
                      style={{
                        left: `${face.coordinates.x}px`,
                        top: `${face.coordinates.y}px`,
                        width: `${face.coordinates.width}px`,
                        height: `${face.coordinates.height}px`
                      }}
                      data-testid={`face-overlay-${face.id}`}
                    >
                      <div className="absolute -top-6 left-0 bg-green-400 text-white text-xs px-2 py-1 rounded">
                        {face.name}
                      </div>
                    </div>
                  ))}

                  {/* Scan Button Overlay */}
                  {(cameraActive || selectedImage) && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <Button
                        onClick={simulateFaceRecognition}
                        disabled={isScanning}
                        className="bg-primary/90 backdrop-blur-sm hover:bg-primary"
                        data-testid="scan-faces"
                      >
                        <Scan className="mr-2 h-4 w-4" />
                        {isScanning ? "Scanning..." : "Scan for Faces"}
                      </Button>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  data-testid="file-input"
                />
              </CardContent>
            </Card>

            {/* Current Results */}
            {currentSession && (
              <Card className="mt-6" data-testid="current-results">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Recognition Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentSession.status === "scanning" && (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <span className="ml-2">Analyzing faces...</span>
                    </div>
                  )}

                  {currentSession.status === "complete" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Detected Faces: {currentSession.faces.length}</span>
                        <Badge variant="outline">
                          {currentSession.type === "camera" ? "Live Camera" : "Uploaded Image"}
                        </Badge>
                      </div>

                      {currentSession.faces.map((face) => (
                        <div
                          key={face.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                          data-testid={`face-result-${face.id}`}
                        >
                          <div>
                            <div className="font-medium" data-testid={`face-name-${face.id}`}>
                              {face.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {face.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={getConfidenceColor(face.confidence)}
                              data-testid={`face-confidence-${face.id}`}
                            >
                              {getConfidenceLabel(face.confidence)} ({Math.round(face.confidence * 100)}%)
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentSession.status === "idle" && (
                    <div className="text-center py-8 text-muted-foreground">
                      Click "Scan for Faces" to start recognition
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Stats */}
            <Card data-testid="system-stats">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  System Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Sessions</span>
                  <Badge variant="secondary">{sessions.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Faces Detected</span>
                  <Badge variant="secondary">
                    {sessions.reduce((total, session) => total + session.faces.length, 0)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Active Camera</span>
                  <Badge variant={cameraActive ? "default" : "secondary"}>
                    {cameraActive ? "Online" : "Offline"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Recognition Engine</span>
                  <Badge variant="default">Ready</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card data-testid="recent-sessions">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sessions.length > 0 ? (
                  sessions.slice(0, 5).map((session) => (
                    <div
                      key={session.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => setCurrentSession(session)}
                      data-testid={`session-${session.id}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">
                            {session.type === "camera" ? "Camera Session" : "Image Upload"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {session.faces.length} faces detected
                          </div>
                        </div>
                        <Badge
                          variant={session.status === "complete" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {session.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {session.timestamp.toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No sessions yet
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            <Card data-testid="features-card">
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Real-time face detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Multiple face recognition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Confidence scoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Image upload support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Session history</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}