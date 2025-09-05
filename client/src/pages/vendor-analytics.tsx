import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, DollarSign, Clock, Star, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface VendorData {
  id: string;
  name: string;
  performance: number;
  revenue: number;
  deliveryTime: number;
  rating: number;
  orders: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

const mockVendorData: VendorData[] = [
  {
    id: "1",
    name: "TechSupply Co.",
    performance: 92,
    revenue: 45000,
    deliveryTime: 2.1,
    rating: 4.8,
    orders: 156,
    status: 'excellent'
  },
  {
    id: "2", 
    name: "Global Solutions Ltd.",
    performance: 87,
    revenue: 38500,
    deliveryTime: 3.2,
    rating: 4.5,
    orders: 134,
    status: 'good'
  },
  {
    id: "3",
    name: "Prime Vendors Inc.",
    performance: 76,
    revenue: 28900,
    deliveryTime: 4.1,
    rating: 4.2,
    orders: 98,
    status: 'average'
  },
  {
    id: "4",
    name: "Quick Ship Express",
    performance: 94,
    revenue: 52000,
    deliveryTime: 1.8,
    rating: 4.9,
    orders: 189,
    status: 'excellent'
  },
  {
    id: "5",
    name: "Budget Suppliers",
    performance: 65,
    revenue: 19500,
    deliveryTime: 5.2,
    rating: 3.8,
    orders: 72,
    status: 'poor'
  }
];

export default function VendorAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [vendors, setVendors] = useState<VendorData[]>(mockVendorData);
  const [sortBy, setSortBy] = useState("performance");

  useEffect(() => {
    // Simulate data loading based on selected period
    const sortedVendors = [...mockVendorData].sort((a, b) => {
      switch(sortBy) {
        case "performance":
          return b.performance - a.performance;
        case "revenue":
          return b.revenue - a.revenue;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    setVendors(sortedVendors);
  }, [selectedPeriod, sortBy]);

  const totalRevenue = vendors.reduce((sum, vendor) => sum + vendor.revenue, 0);
  const avgPerformance = vendors.reduce((sum, vendor) => sum + vendor.performance, 0) / vendors.length;
  const totalOrders = vendors.reduce((sum, vendor) => sum + vendor.orders, 0);
  const avgRating = vendors.reduce((sum, vendor) => sum + vendor.rating, 0) / vendors.length;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'average': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPerformanceIcon = (performance: number) => {
    return performance >= 80 ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
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
                Comprehensive dashboard for vendor performance monitoring
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32" data-testid="period-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 3 months</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36" data-testid="sort-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="total-revenue-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last period</p>
            </CardContent>
          </Card>

          <Card data-testid="avg-performance-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgPerformance.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">+5.2% from last period</p>
            </CardContent>
          </Card>

          <Card data-testid="total-orders-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">+8.1% from last period</p>
            </CardContent>
          </Card>

          <Card data-testid="avg-rating-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">+0.3 from last period</p>
            </CardContent>
          </Card>
        </div>

        {/* Vendor Performance Table */}
        <Card data-testid="vendor-performance-table">
          <CardHeader>
            <CardTitle>Vendor Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  data-testid={`vendor-row-${vendor.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold" data-testid={`vendor-name-${vendor.id}`}>
                        {vendor.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}
                        data-testid={`vendor-status-${vendor.id}`}
                      >
                        {vendor.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        {getPerformanceIcon(vendor.performance)}
                        <span className="font-semibold" data-testid={`vendor-performance-${vendor.id}`}>
                          {vendor.performance}%
                        </span>
                      </div>
                      <Progress value={vendor.performance} className="w-20 mt-1" />
                    </div>
                    
                    <div className="text-center">
                      <div className="font-semibold" data-testid={`vendor-revenue-${vendor.id}`}>
                        ${vendor.revenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-semibold" data-testid={`vendor-delivery-${vendor.id}`}>
                          {vendor.deliveryTime}d
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">Delivery</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold" data-testid={`vendor-rating-${vendor.id}`}>
                          {vendor.rating}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">{vendor.orders} orders</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card data-testid="insights-card">
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Quick Ship Express leads in performance with 94%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Average delivery time improved by 0.5 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Budget Suppliers needs attention (65% performance)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Customer satisfaction up 8% overall</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="recommendations-card">
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Expand Partnership</p>
                  <p className="text-xs text-green-600">Increase orders with Quick Ship Express</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Performance Review</p>
                  <p className="text-xs text-yellow-600">Schedule meeting with Budget Suppliers</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Optimize Logistics</p>
                  <p className="text-xs text-blue-600">Implement faster delivery for Prime Vendors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}