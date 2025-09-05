import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Clock, 
  Star, 
  ArrowLeft, 
  Plus, 
  Edit,
  Trash2,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  RefreshCw
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface VendorData {
  id: string;
  name: string;
  category: string;
  contactEmail: string;
  contactPhone: string;
  performance: number;
  revenue: number;
  deliveryTime: number;
  rating: number;
  orders: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
  contractStart: string;
  contractEnd: string;
  riskLevel: 'low' | 'medium' | 'high';
  location: string;
  lastOrderDate: string;
  paymentTerms: string;
  notes: string;
  monthlyData: { month: string; revenue: number; orders: number; performance: number; }[];
}

const initialVendorData: VendorData[] = [
  {
    id: "1",
    name: "TechSupply Co.",
    category: "Technology",
    contactEmail: "contact@techsupply.com",
    contactPhone: "+1-555-0123",
    performance: 92,
    revenue: 45000,
    deliveryTime: 2.1,
    rating: 4.8,
    orders: 156,
    status: 'excellent',
    contractStart: "2023-01-15",
    contractEnd: "2024-12-31",
    riskLevel: 'low',
    location: "New York, USA",
    lastOrderDate: "2024-01-20",
    paymentTerms: "Net 30",
    notes: "Reliable partner with excellent delivery track record.",
    monthlyData: [
      { month: "Jan", revenue: 38000, orders: 28, performance: 94 },
      { month: "Feb", revenue: 42000, orders: 32, performance: 91 },
      { month: "Mar", revenue: 45000, orders: 35, performance: 92 },
    ]
  },
  {
    id: "2", 
    name: "Global Solutions Ltd.",
    category: "Manufacturing",
    contactEmail: "sales@globalsolutions.com",
    contactPhone: "+1-555-0456",
    performance: 87,
    revenue: 38500,
    deliveryTime: 3.2,
    rating: 4.5,
    orders: 134,
    status: 'good',
    contractStart: "2023-03-10",
    contractEnd: "2024-09-30",
    riskLevel: 'low',
    location: "Chicago, USA",
    lastOrderDate: "2024-01-18",
    paymentTerms: "Net 45",
    notes: "Good quality products, occasional delivery delays.",
    monthlyData: [
      { month: "Jan", revenue: 35000, orders: 24, performance: 89 },
      { month: "Feb", revenue: 36500, orders: 26, performance: 85 },
      { month: "Mar", revenue: 38500, orders: 28, performance: 87 },
    ]
  },
  {
    id: "3",
    name: "Prime Vendors Inc.",
    category: "Services",
    contactEmail: "info@primevendors.com",
    contactPhone: "+1-555-0789",
    performance: 76,
    revenue: 28900,
    deliveryTime: 4.1,
    rating: 4.2,
    orders: 98,
    status: 'average',
    contractStart: "2023-05-20",
    contractEnd: "2024-05-19",
    riskLevel: 'medium',
    location: "Denver, USA",
    lastOrderDate: "2024-01-15",
    paymentTerms: "Net 60",
    notes: "Average performance, needs improvement in delivery times.",
    monthlyData: [
      { month: "Jan", revenue: 26000, orders: 18, performance: 78 },
      { month: "Feb", revenue: 27500, orders: 19, performance: 74 },
      { month: "Mar", revenue: 28900, orders: 21, performance: 76 },
    ]
  },
  {
    id: "4",
    name: "Quick Ship Express",
    category: "Logistics",
    contactEmail: "orders@quickship.com",
    contactPhone: "+1-555-0321",
    performance: 94,
    revenue: 52000,
    deliveryTime: 1.8,
    rating: 4.9,
    orders: 189,
    status: 'excellent',
    contractStart: "2023-02-01",
    contractEnd: "2025-01-31",
    riskLevel: 'low',
    location: "Los Angeles, USA",
    lastOrderDate: "2024-01-22",
    paymentTerms: "Net 15",
    notes: "Outstanding logistics partner with fastest delivery times.",
    monthlyData: [
      { month: "Jan", revenue: 48000, orders: 34, performance: 95 },
      { month: "Feb", revenue: 50000, orders: 36, performance: 93 },
      { month: "Mar", revenue: 52000, orders: 38, performance: 94 },
    ]
  },
  {
    id: "5",
    name: "Budget Suppliers",
    category: "Raw Materials",
    contactEmail: "support@budgetsuppliers.com",
    contactPhone: "+1-555-0654",
    performance: 65,
    revenue: 19500,
    deliveryTime: 5.2,
    rating: 3.8,
    orders: 72,
    status: 'poor',
    contractStart: "2023-08-15",
    contractEnd: "2024-08-14",
    riskLevel: 'high',
    location: "Phoenix, USA",
    lastOrderDate: "2024-01-10",
    paymentTerms: "Net 90",
    notes: "Low-cost option but frequently misses delivery deadlines.",
    monthlyData: [
      { month: "Jan", revenue: 18000, orders: 12, performance: 67 },
      { month: "Feb", revenue: 18800, orders: 13, performance: 63 },
      { month: "Mar", revenue: 19500, orders: 14, performance: 65 },
    ]
  },
  {
    id: "6",
    name: "Elite Manufacturing",
    category: "Manufacturing",
    contactEmail: "contact@elitemfg.com",
    contactPhone: "+1-555-0987",
    performance: 89,
    revenue: 41200,
    deliveryTime: 2.8,
    rating: 4.6,
    orders: 142,
    status: 'good',
    contractStart: "2023-06-01",
    contractEnd: "2024-11-30",
    riskLevel: 'low',
    location: "Seattle, USA",
    lastOrderDate: "2024-01-19",
    paymentTerms: "Net 30",
    notes: "High-quality manufacturing with consistent performance.",
    monthlyData: [
      { month: "Jan", revenue: 39000, orders: 26, performance: 91 },
      { month: "Feb", revenue: 40100, orders: 28, performance: 87 },
      { month: "Mar", revenue: 41200, orders: 30, performance: 89 },
    ]
  }
];

export default function VendorAnalytics() {
  const [vendors, setVendors] = useState<VendorData[]>(initialVendorData);
  const [filteredVendors, setFilteredVendors] = useState<VendorData[]>(initialVendorData);
  const [selectedPeriod, setSelectedPeriod] = useState("90");
  const [sortBy, setSortBy] = useState("performance");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<VendorData | null>(null);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isEditVendorOpen, setIsEditVendorOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const { toast } = useToast();

  // New vendor form state
  const [newVendor, setNewVendor] = useState<Partial<VendorData>>({
    name: "",
    category: "",
    contactEmail: "",
    contactPhone: "",
    performance: 80,
    revenue: 0,
    deliveryTime: 3.0,
    rating: 4.0,
    orders: 0,
    status: 'good',
    contractStart: "",
    contractEnd: "",
    riskLevel: 'low',
    location: "",
    paymentTerms: "Net 30",
    notes: ""
  });

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...vendors];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(vendor => vendor.status === filterStatus);
    }

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter(vendor => vendor.category === filterCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch(sortBy) {
        case "performance":
          return b.performance - a.performance;
        case "revenue":
          return b.revenue - a.revenue;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "deliveryTime":
          return a.deliveryTime - b.deliveryTime;
        default:
          return 0;
      }
    });

    setFilteredVendors(filtered);
  }, [vendors, searchTerm, filterStatus, filterCategory, sortBy]);

  // Calculate metrics
  const totalRevenue = filteredVendors.reduce((sum, vendor) => sum + vendor.revenue, 0);
  const avgPerformance = filteredVendors.length > 0 ? 
    filteredVendors.reduce((sum, vendor) => sum + vendor.performance, 0) / filteredVendors.length : 0;
  const totalOrders = filteredVendors.reduce((sum, vendor) => sum + vendor.orders, 0);
  const avgRating = filteredVendors.length > 0 ? 
    filteredVendors.reduce((sum, vendor) => sum + vendor.rating, 0) / filteredVendors.length : 0;
  const avgDeliveryTime = filteredVendors.length > 0 ? 
    filteredVendors.reduce((sum, vendor) => sum + vendor.deliveryTime, 0) / filteredVendors.length : 0;

  // Risk analysis
  const riskCounts = filteredVendors.reduce((acc, vendor) => {
    acc[vendor.riskLevel] = (acc[vendor.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Status distribution
  const statusCounts = filteredVendors.reduce((acc, vendor) => {
    acc[vendor.status] = (acc[vendor.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Category distribution
  const categoryData = filteredVendors.reduce((acc, vendor) => {
    acc[vendor.category] = (acc[vendor.category] || 0) + vendor.revenue;
    return acc;
  }, {} as Record<string, number>);

  const categories = Array.from(new Set(vendors.map(v => v.category)));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'average': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPerformanceIcon = (performance: number) => {
    return performance >= 80 ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const addVendor = () => {
    if (!newVendor.name || !newVendor.category) {
      toast({
        title: "Error",
        description: "Please fill in required fields (Name and Category).",
        variant: "destructive",
      });
      return;
    }

    const vendor: VendorData = {
      ...newVendor,
      id: Date.now().toString(),
      monthlyData: [
        { month: "Jan", revenue: newVendor.revenue || 0, orders: newVendor.orders || 0, performance: newVendor.performance || 80 },
        { month: "Feb", revenue: newVendor.revenue || 0, orders: newVendor.orders || 0, performance: newVendor.performance || 80 },
        { month: "Mar", revenue: newVendor.revenue || 0, orders: newVendor.orders || 0, performance: newVendor.performance || 80 },
      ]
    } as VendorData;

    setVendors(prev => [...prev, vendor]);
    setNewVendor({
      name: "",
      category: "",
      contactEmail: "",
      contactPhone: "",
      performance: 80,
      revenue: 0,
      deliveryTime: 3.0,
      rating: 4.0,
      orders: 0,
      status: 'good',
      contractStart: "",
      contractEnd: "",
      riskLevel: 'low',
      location: "",
      paymentTerms: "Net 30",
      notes: ""
    });
    setIsAddVendorOpen(false);
    
    toast({
      title: "Vendor Added",
      description: `${vendor.name} has been successfully added to the system.`,
    });
  };

  const deleteVendor = (id: string) => {
    const vendor = vendors.find(v => v.id === id);
    setVendors(prev => prev.filter(v => v.id !== id));
    toast({
      title: "Vendor Deleted",
      description: `${vendor?.name} has been removed from the system.`,
    });
  };

  const updateVendor = (updatedVendor: VendorData) => {
    setVendors(prev => prev.map(v => v.id === updatedVendor.id ? updatedVendor : v));
    setIsEditVendorOpen(false);
    setSelectedVendor(null);
    toast({
      title: "Vendor Updated",
      description: `${updatedVendor.name} has been successfully updated.`,
    });
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Category,Performance,Revenue,Rating,Orders,Status,Risk Level\n" +
      filteredVendors.map(v => 
        `"${v.name}","${v.category}",${v.performance},${v.revenue},${v.rating},${v.orders},"${v.status}","${v.riskLevel}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vendor_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Data Exported",
      description: "Vendor analytics data has been exported to CSV.",
    });
  };

  const refreshData = () => {
    // Simulate data refresh
    toast({
      title: "Data Refreshed",
      description: "Analytics data has been updated with latest information.",
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
              <h1 className="text-3xl font-bold text-foreground" data-testid="analytics-title">
                Vendor Performance Analytics
              </h1>
              <p className="text-muted-foreground mt-1" data-testid="analytics-subtitle">
                Comprehensive vendor management and performance tracking
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={refreshData} variant="outline" data-testid="refresh-data">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={exportData} variant="outline" data-testid="export-data">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
              <DialogTrigger asChild>
                <Button data-testid="add-vendor">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vendor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Vendor</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div>
                    <label className="text-sm font-medium">Vendor Name *</label>
                    <Input
                      value={newVendor.name}
                      onChange={(e) => setNewVendor(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter vendor name"
                      data-testid="new-vendor-name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category *</label>
                    <Select 
                      value={newVendor.category} 
                      onValueChange={(value) => setNewVendor(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger data-testid="new-vendor-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Services">Services</SelectItem>
                        <SelectItem value="Logistics">Logistics</SelectItem>
                        <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact Email</label>
                    <Input
                      type="email"
                      value={newVendor.contactEmail}
                      onChange={(e) => setNewVendor(prev => ({ ...prev, contactEmail: e.target.value }))}
                      placeholder="contact@vendor.com"
                      data-testid="new-vendor-email"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact Phone</label>
                    <Input
                      value={newVendor.contactPhone}
                      onChange={(e) => setNewVendor(prev => ({ ...prev, contactPhone: e.target.value }))}
                      placeholder="+1-555-0123"
                      data-testid="new-vendor-phone"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={newVendor.location}
                      onChange={(e) => setNewVendor(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                      data-testid="new-vendor-location"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Payment Terms</label>
                    <Select 
                      value={newVendor.paymentTerms} 
                      onValueChange={(value) => setNewVendor(prev => ({ ...prev, paymentTerms: value }))}
                    >
                      <SelectTrigger data-testid="new-vendor-payment">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Net 15">Net 15</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 45">Net 45</SelectItem>
                        <SelectItem value="Net 60">Net 60</SelectItem>
                        <SelectItem value="Net 90">Net 90</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Performance (%)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={newVendor.performance}
                      onChange={(e) => setNewVendor(prev => ({ ...prev, performance: parseInt(e.target.value) || 0 }))}
                      data-testid="new-vendor-performance"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Expected Revenue</label>
                    <Input
                      type="number"
                      min="0"
                      value={newVendor.revenue}
                      onChange={(e) => setNewVendor(prev => ({ ...prev, revenue: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                      data-testid="new-vendor-revenue"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Rating (1-5)</label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={newVendor.rating}
                      onChange={(e) => setNewVendor(prev => ({ ...prev, rating: parseFloat(e.target.value) || 4.0 }))}
                      data-testid="new-vendor-rating"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Delivery Time (days)</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      value={newVendor.deliveryTime}
                      onChange={(e) => setNewVendor(prev => ({ ...prev, deliveryTime: parseFloat(e.target.value) || 3.0 }))}
                      data-testid="new-vendor-delivery"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Risk Level</label>
                    <Select 
                      value={newVendor.riskLevel} 
                      onValueChange={(value) => setNewVendor(prev => ({ ...prev, riskLevel: value as 'low' | 'medium' | 'high' }))}
                    >
                      <SelectTrigger data-testid="new-vendor-risk">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select 
                      value={newVendor.status} 
                      onValueChange={(value) => setNewVendor(prev => ({ ...prev, status: value as 'excellent' | 'good' | 'average' | 'poor' }))}
                    >
                      <SelectTrigger data-testid="new-vendor-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea
                      value={newVendor.notes}
                      onChange={(e) => setNewVendor(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes about the vendor..."
                      rows={3}
                      data-testid="new-vendor-notes"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddVendorOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addVendor} data-testid="save-vendor">
                    Add Vendor
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Controls */}
        <Card className="mb-8" data-testid="controls-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="search-input"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger data-testid="status-filter">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger data-testid="category-filter">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-testid="sort-select">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger data-testid="period-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="180">Last 6 months</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  data-testid="grid-view"
                >
                  Grid
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("list")}
                  data-testid="list-view"
                >
                  List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow" data-testid="revenue-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-green-600 mt-1">+12.5% from last period</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-testid="performance-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Performance</p>
                  <div className="text-2xl font-bold">{avgPerformance.toFixed(1)}%</div>
                  <p className="text-xs text-blue-600 mt-1">+3.2% improvement</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-testid="orders-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
                  <p className="text-xs text-purple-600 mt-1">+8.7% increase</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-testid="rating-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                  <p className="text-xs text-yellow-600 mt-1">+0.3 improvement</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-testid="delivery-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Delivery</p>
                  <div className="text-2xl font-bold">{avgDeliveryTime.toFixed(1)} days</div>
                  <p className="text-xs text-orange-600 mt-1">-0.5 days faster</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-testid="vendors-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
                  <div className="text-2xl font-bold">{filteredVendors.length}</div>
                  <p className="text-xs text-indigo-600 mt-1">of {vendors.length} total</p>
                </div>
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Distribution Chart */}
          <Card data-testid="performance-chart">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Distribution
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setChartType(chartType === "bar" ? "pie" : "bar")}
                  data-testid="toggle-chart"
                >
                  {chartType === "bar" ? <PieChart className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium">{status}</span>
                      <span className="text-muted-foreground">{count} vendors</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          status === 'excellent' ? 'bg-green-500' :
                          status === 'good' ? 'bg-blue-500' :
                          status === 'average' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(count / filteredVendors.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Analysis */}
          <Card data-testid="risk-analysis">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(riskCounts).map(([risk, count]) => (
                  <div key={risk} className="flex justify-between items-center p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        risk === 'low' ? 'bg-green-500' :
                        risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="capitalize font-medium">{risk} Risk</span>
                    </div>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Revenue */}
          <Card data-testid="category-revenue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Revenue by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(categoryData).map(([category, revenue]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category}</span>
                      <span className="text-muted-foreground">${revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(revenue / totalRevenue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vendor List/Grid */}
        <Card data-testid="vendors-list">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Vendor Details ({filteredVendors.length})</CardTitle>
              <div className="text-sm text-muted-foreground">
                Showing {filteredVendors.length} of {vendors.length} vendors
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                  <Card key={vendor.id} className="hover:shadow-lg transition-shadow" data-testid={`vendor-card-${vendor.id}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{vendor.name}</h3>
                          <p className="text-sm text-muted-foreground">{vendor.category}</p>
                          <p className="text-xs text-muted-foreground">{vendor.location}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setSelectedVendor(vendor)}
                            data-testid={`view-vendor-${vendor.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedVendor(vendor);
                              setIsEditVendorOpen(true);
                            }}
                            data-testid={`edit-vendor-${vendor.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteVendor(vendor.id)}
                            data-testid={`delete-vendor-${vendor.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Performance</span>
                          <div className="flex items-center gap-2">
                            {getPerformanceIcon(vendor.performance)}
                            <span className="font-semibold">{vendor.performance}%</span>
                          </div>
                        </div>
                        <Progress value={vendor.performance} className="h-2" />

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-semibold">${vendor.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Orders</p>
                            <p className="font-semibold">{vendor.orders}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{vendor.rating}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Delivery</p>
                            <p className="font-semibold">{vendor.deliveryTime} days</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <Badge className={getStatusColor(vendor.status)} variant="outline">
                            {vendor.status}
                          </Badge>
                          <Badge className={getRiskColor(vendor.riskLevel)} variant="outline">
                            {vendor.riskLevel} risk
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVendors.map((vendor) => (
                  <Card key={vendor.id} className="hover:shadow-md transition-shadow" data-testid={`vendor-row-${vendor.id}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold truncate">{vendor.name}</h4>
                            <p className="text-sm text-muted-foreground">{vendor.category} • {vendor.location}</p>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                              <p className="font-semibold">{vendor.performance}%</p>
                              <p className="text-muted-foreground">Performance</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold">${vendor.revenue.toLocaleString()}</p>
                              <p className="text-muted-foreground">Revenue</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold">{vendor.rating}</p>
                              <p className="text-muted-foreground">Rating</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold">{vendor.deliveryTime}d</p>
                              <p className="text-muted-foreground">Delivery</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Badge className={getStatusColor(vendor.status)} variant="outline">
                              {vendor.status}
                            </Badge>
                            <Badge className={getRiskColor(vendor.riskLevel)} variant="outline">
                              {vendor.riskLevel}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setSelectedVendor(vendor)}
                            data-testid={`view-vendor-list-${vendor.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedVendor(vendor);
                              setIsEditVendorOpen(true);
                            }}
                            data-testid={`edit-vendor-list-${vendor.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteVendor(vendor.id)}
                            data-testid={`delete-vendor-list-${vendor.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredVendors.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterStatus !== "all" || filterCategory !== "all" 
                    ? "Try adjusting your filters or search terms." 
                    : "Get started by adding your first vendor."}
                </p>
                <Button onClick={() => setIsAddVendorOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vendor
                </Button>
              </div>
            )}
          </CardContent>
        </Card>


        {/* Vendor Detail Modal */}
        {selectedVendor && !isEditVendorOpen && (
          <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>{selectedVendor.name}</span>
                  <Badge className={getStatusColor(selectedVendor.status)} variant="outline">
                    {selectedVendor.status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Email:</span> {selectedVendor.contactEmail}</p>
                      <p><span className="font-medium">Phone:</span> {selectedVendor.contactPhone}</p>
                      <p><span className="font-medium">Location:</span> {selectedVendor.location}</p>
                      <p><span className="font-medium">Category:</span> {selectedVendor.category}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Contract Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Payment Terms:</span> {selectedVendor.paymentTerms}</p>
                      <p><span className="font-medium">Contract Start:</span> {selectedVendor.contractStart}</p>
                      <p><span className="font-medium">Contract End:</span> {selectedVendor.contractEnd}</p>
                      <p><span className="font-medium">Last Order:</span> {selectedVendor.lastOrderDate}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Performance Score</span>
                          <span className="font-semibold">{selectedVendor.performance}%</span>
                        </div>
                        <Progress value={selectedVendor.performance} className="h-2 mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-semibold text-lg">${selectedVendor.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Orders</p>
                          <p className="font-semibold text-lg">{selectedVendor.orders}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-lg">{selectedVendor.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Delivery</p>
                          <p className="font-semibold text-lg">{selectedVendor.deliveryTime} days</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Risk Assessment</h4>
                    <Badge className={getRiskColor(selectedVendor.riskLevel)} variant="outline">
                      {selectedVendor.riskLevel} risk
                    </Badge>
                  </div>
                </div>
              </div>

              {selectedVendor.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    {selectedVendor.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsEditVendorOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Vendor
                </Button>
                <Button onClick={() => setSelectedVendor(null)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Vendor Dialog */}
        {selectedVendor && isEditVendorOpen && (
          <Dialog open={isEditVendorOpen} onOpenChange={() => {
            setIsEditVendorOpen(false);
            setSelectedVendor(null);
          }}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Vendor: {selectedVendor.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <label className="text-sm font-medium">Vendor Name *</label>
                  <Input
                    value={selectedVendor.name}
                    onChange={(e) => setSelectedVendor(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                    placeholder="Enter vendor name"
                    data-testid="edit-vendor-name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category *</label>
                  <Select 
                    value={selectedVendor.category} 
                    onValueChange={(value) => setSelectedVendor(prev => prev ? ({ ...prev, category: value }) : null)}
                  >
                    <SelectTrigger data-testid="edit-vendor-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input
                    type="email"
                    value={selectedVendor.contactEmail}
                    onChange={(e) => setSelectedVendor(prev => prev ? ({ ...prev, contactEmail: e.target.value }) : null)}
                    placeholder="contact@vendor.com"
                    data-testid="edit-vendor-email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Phone</label>
                  <Input
                    value={selectedVendor.contactPhone}
                    onChange={(e) => setSelectedVendor(prev => prev ? ({ ...prev, contactPhone: e.target.value }) : null)}
                    placeholder="+1-555-0123"
                    data-testid="edit-vendor-phone"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={selectedVendor.location}
                    onChange={(e) => setSelectedVendor(prev => prev ? ({ ...prev, location: e.target.value }) : null)}
                    placeholder="City, Country"
                    data-testid="edit-vendor-location"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Payment Terms</label>
                  <Select 
                    value={selectedVendor.paymentTerms} 
                    onValueChange={(value) => setSelectedVendor(prev => prev ? ({ ...prev, paymentTerms: value }) : null)}
                  >
                    <SelectTrigger data-testid="edit-vendor-payment">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 45">Net 45</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                      <SelectItem value="Net 90">Net 90</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Performance (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={selectedVendor.performance}
                    onChange={(e) => setSelectedVendor(prev => prev ? ({ ...prev, performance: parseInt(e.target.value) || 0 }) : null)}
                    data-testid="edit-vendor-performance"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Revenue</label>
                  <Input
                    type="number"
                    min="0"
                    value={selectedVendor.revenue}
                    onChange={(e) => setSelectedVendor(prev => prev ? ({ ...prev, revenue: parseInt(e.target.value) || 0 }) : null)}
                    data-testid="edit-vendor-revenue"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Rating (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={selectedVendor.rating}
                    onChange={(e) => setSelectedVendor(prev => prev ? ({ ...prev, rating: parseFloat(e.target.value) || 4.0 }) : null)}
                    data-testid="edit-vendor-rating"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Delivery Time (days)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={selectedVendor.deliveryTime}
                    onChange={(e) => setSelectedVendor(prev => prev ? ({ ...prev, deliveryTime: parseFloat(e.target.value) || 3.0 }) : null)}
                    data-testid="edit-vendor-delivery"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Risk Level</label>
                  <Select 
                    value={selectedVendor.riskLevel} 
                    onValueChange={(value) => setSelectedVendor(prev => prev ? ({ ...prev, riskLevel: value as 'low' | 'medium' | 'high' }) : null)}
                  >
                    <SelectTrigger data-testid="edit-vendor-risk">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={selectedVendor.status} 
                    onValueChange={(value) => setSelectedVendor(prev => prev ? ({ ...prev, status: value as 'excellent' | 'good' | 'average' | 'poor' }) : null)}
                  >
                    <SelectTrigger data-testid="edit-vendor-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea
                    value={selectedVendor.notes}
                    onChange={(e) => setSelectedVendor(prev => prev ? ({ ...prev, notes: e.target.value }) : null)}
                    placeholder="Additional notes about the vendor..."
                    rows={3}
                    data-testid="edit-vendor-notes"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setIsEditVendorOpen(false);
                  setSelectedVendor(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={() => selectedVendor && updateVendor(selectedVendor)} data-testid="update-vendor">
                  Update Vendor
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}