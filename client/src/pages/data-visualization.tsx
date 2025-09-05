import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, RefreshCw, Filter } from "lucide-react";
import { Link } from "wouter";

interface KPIData {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ReactNode;
}

interface ChartData {
  name: string;
  value: number;
  percentage?: number;
  color?: string;
}

interface MetricCard {
  title: string;
  value: number;
  target: number;
  unit: string;
  color: string;
}

export default function DataVisualization() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const kpiData: KPIData[] = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: 12.5,
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Active Users",
      value: "48.2K",
      change: 8.2,
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: -2.1,
      trend: "down",
      icon: <TrendingDown className="h-4 w-4" />
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: 5.7,
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  const salesData: ChartData[] = [
    { name: "Q1", value: 450000 },
    { name: "Q2", value: 620000 },
    { name: "Q3", value: 580000 },
    { name: "Q4", value: 750000 }
  ];

  const categoryData: ChartData[] = [
    { name: "Technology", value: 35, color: "#3B82F6" },
    { name: "Marketing", value: 28, color: "#10B981" },
    { name: "Operations", value: 20, color: "#F59E0B" },
    { name: "HR", value: 12, color: "#EF4444" },
    { name: "Other", value: 5, color: "#8B5CF6" }
  ];

  const performanceMetrics: MetricCard[] = [
    { title: "Sales Target", value: 85, target: 100, unit: "%", color: "bg-blue-500" },
    { title: "Customer Retention", value: 92, target: 95, unit: "%", color: "bg-green-500" },
    { title: "Quality Score", value: 78, target: 90, unit: "%", color: "bg-yellow-500" },
    { title: "Team Productivity", value: 94, target: 100, unit: "%", color: "bg-purple-500" }
  ];

  const recentActivity = [
    { action: "New user registration", time: "2 minutes ago", type: "user" },
    { action: "Sale completed: $1,250", time: "5 minutes ago", type: "sale" },
    { action: "System backup completed", time: "15 minutes ago", type: "system" },
    { action: "New support ticket opened", time: "22 minutes ago", type: "support" },
    { action: "Monthly report generated", time: "1 hour ago", type: "report" }
  ];

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user": return "👤";
      case "sale": return "💰";
      case "system": return "⚙️";
      case "support": return "🎧";
      case "report": return "📊";
      default: return "📋";
    }
  };

  const getTrendColor = (trend: "up" | "down", change: number) => {
    if (trend === "up") return "text-green-600";
    return "text-red-600";
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
              <h1 className="text-3xl font-bold text-foreground" data-testid="dashboard-title">
                Interactive Data Dashboard
              </h1>
              <p className="text-muted-foreground mt-1" data-testid="dashboard-subtitle">
                Real-time business intelligence and KPI tracking
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
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
            
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-36" data-testid="metric-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="conversion">Conversion</SelectItem>
                <SelectItem value="satisfaction">Satisfaction</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              onClick={refreshData}
              disabled={isRefreshing}
              variant="outline"
              data-testid="refresh-data"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`kpi-card-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <div className="text-2xl font-bold" data-testid={`kpi-value-${index}`}>
                      {kpi.value}
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${kpi.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {kpi.icon}
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className={`text-sm font-medium ${getTrendColor(kpi.trend, kpi.change)}`}>
                    {kpi.change > 0 ? '+' : ''}{kpi.change}%
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <Card className="lg:col-span-2" data-testid="sales-chart">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Quarterly Sales Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((item, index) => (
                  <div key={item.name} className="space-y-2" data-testid={`sales-bar-${index}`}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground">
                        ${(item.value / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-1000 ease-in-out"
                        style={{ width: `${(item.value / Math.max(...salesData.map(d => d.value))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card data-testid="category-chart">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Department Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between" data-testid={`category-item-${index}`}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{item.value}%</span>
                      <div className="w-16 bg-secondary rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${item.value}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Metrics */}
          <Card data-testid="performance-metrics">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {performanceMetrics.map((metric, index) => (
                <div key={metric.title} className="space-y-2" data-testid={`metric-${index}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {metric.value}{metric.unit} / {metric.target}{metric.unit}
                    </span>
                  </div>
                  <Progress 
                    value={(metric.value / metric.target) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: {metric.value}{metric.unit}</span>
                    <span>Target: {metric.target}{metric.unit}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card data-testid="recent-activity">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`activity-${index}`}>
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card data-testid="insights-card">
            <CardHeader>
              <CardTitle className="text-lg">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Revenue growth accelerating (+12.5%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>User engagement at all-time high</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Conversion rate needs attention</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Customer satisfaction improving</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="trends-card">
            <CardHeader>
              <CardTitle className="text-lg">Trending Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mobile Traffic</span>
                  <Badge variant="outline" className="text-green-600">+15%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Usage</span>
                  <Badge variant="outline" className="text-blue-600">+8%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Support Tickets</span>
                  <Badge variant="outline" className="text-red-600">-12%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Page Load Speed</span>
                  <Badge variant="outline" className="text-green-600">+22%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="actions-card">
            <CardHeader>
              <CardTitle className="text-lg">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-2 bg-green-50 rounded text-sm">
                  <span className="font-medium text-green-800">Optimize</span>
                  <p className="text-green-600">Focus on mobile experience</p>
                </div>
                <div className="p-2 bg-blue-50 rounded text-sm">
                  <span className="font-medium text-blue-800">Investigate</span>
                  <p className="text-blue-600">Review conversion funnel</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded text-sm">
                  <span className="font-medium text-yellow-800">Monitor</span>
                  <p className="text-yellow-600">Track Q4 sales targets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}