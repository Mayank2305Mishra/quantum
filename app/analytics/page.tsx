"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Calendar, 
  CalendarRange, 
  Clock, 
  Download, 
  Filter, 
  LineChart, 
  PieChart, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

// Project Status Distribution Data
const projectStatusData = [
  { name: "Active", value: 12 },
  { name: "Completed", value: 8 },
  { name: "On Hold", value: 3 },
  { name: "Archived", value: 2 },
];

// Project Timeline Data (Tasks Completed Over Time)
const taskCompletionData = [
  { date: "Jan", completed: 15, total: 20 },
  { date: "Feb", completed: 18, total: 22 },
  { date: "Mar", completed: 23, total: 25 },
  { date: "Apr", completed: 20, total: 28 },
  { date: "May", completed: 25, total: 30 },
  { date: "Jun", completed: 22, total: 24 },
  { date: "Jul", completed: 28, total: 32 },
  { date: "Aug", completed: 32, total: 35 },
  { date: "Sep", completed: 30, total: 38 },
  { date: "Oct", completed: 35, total: 40 },
  { date: "Nov", completed: 28, total: 42 },
  { date: "Dec", completed: 34, total: 45 },
];

// Team Performance Data
const teamPerformanceData = [
  { 
    name: "Alex",
    onTime: 18,
    delayed: 2,
  },
  { 
    name: "Maria",
    onTime: 15,
    delayed: 1,
  },
  { 
    name: "David",
    onTime: 12,
    delayed: 3,
  },
  { 
    name: "Sarah",
    onTime: 20,
    delayed: 0,
  },
  { 
    name: "James",
    onTime: 16,
    delayed: 4,
  },
];

// Resource Allocation Data
const resourceAllocationData = [
  { name: "Market Analysis", value: 25 },
  { name: "Customer Segmentation", value: 30 },
  { name: "Supply Chain", value: 20 },
  { name: "Pricing Strategy", value: 15 },
  { name: "Other Projects", value: 10 },
];

// Project Metrics by Month
const projectMetricsData = [
  { month: "Jan", meetings: 12, tasks: 45, documents: 8 },
  { month: "Feb", meetings: 15, tasks: 50, documents: 10 },
  { month: "Mar", meetings: 18, tasks: 55, documents: 12 },
  { month: "Apr", meetings: 14, tasks: 60, documents: 9 },
  { month: "May", meetings: 20, tasks: 65, documents: 15 },
  { month: "Jun", meetings: 22, tasks: 70, documents: 18 },
  { month: "Jul", meetings: 25, tasks: 75, documents: 20 },
  { month: "Aug", meetings: 28, tasks: 80, documents: 22 },
  { month: "Sep", meetings: 30, tasks: 85, documents: 25 },
  { month: "Oct", meetings: 24, tasks: 90, documents: 19 },
  { month: "Nov", meetings: 26, tasks: 95, documents: 21 },
  { month: "Dec", meetings: 32, tasks: 100, documents: 28 },
];

// Time Tracking Data
const timeTrackingData = [
  { category: "Research", hours: 120 },
  { category: "Analysis", hours: 150 },
  { category: "Development", hours: 200 },
  { category: "Design", hours: 85 },
  { category: "Meetings", hours: 95 },
  { category: "Documentation", hours: 70 },
];

// Project Burndown Data
const burndownData = [
  { day: "Week 1", remaining: 100, ideal: 100 },
  { day: "Week 2", remaining: 90, ideal: 87.5 },
  { day: "Week 3", remaining: 85, ideal: 75 },
  { day: "Week 4", remaining: 80, ideal: 62.5 },
  { day: "Week 5", remaining: 65, ideal: 50 },
  { day: "Week 6", remaining: 55, ideal: 37.5 },
  { day: "Week 7", remaining: 40, ideal: 25 },
  { day: "Week 8", remaining: 30, ideal: 12.5 },
  { day: "Week 9", remaining: 10, ideal: 0 },
];

// Colors for charts
const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("year");
  const [projectFilter, setProjectFilter] = useState("all");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track performance, metrics, and insights across all projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]">
              <div className="flex items-center gap-2">
                <CalendarRange className="h-4 w-4" />
                <SelectValue placeholder="Date Range" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[150px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="market">Market Analysis</SelectItem>
              <SelectItem value="customer">Customer Segmentation</SelectItem>
              <SelectItem value="supply">Supply Chain</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
            <div className="mt-4 h-1 w-full bg-secondary">
              <div
                className="h-1 bg-primary"
                style={{ width: "75%" }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">+18% from last quarter</p>
            <div className="mt-4 h-1 w-full bg-secondary">
              <div
                className="h-1 bg-green-600"
                style={{ width: "85%" }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 since last month</p>
            <div className="mt-4 h-1 w-full bg-secondary">
              <div
                className="h-1 bg-blue-600"
                style={{ width: "60%" }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4 days</div>
            <p className="text-xs text-muted-foreground">-2.3 days from last quarter</p>
            <div className="mt-4 h-1 w-full bg-secondary">
              <div
                className="h-1 bg-amber-600"
                style={{ width: "65%" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current status of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Timeline</CardTitle>
            <CardDescription>Tasks completed vs. total over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={taskCompletionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke={COLORS[0]}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="completed" stroke={COLORS[1]} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Team Performance</TabsTrigger>
          <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          <TabsTrigger value="metrics">Project Metrics</TabsTrigger>
          <TabsTrigger value="burndown">Project Burndown</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Analysis</CardTitle>
              <CardDescription>Task completion metrics by team member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={teamPerformanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="onTime" stackId="a" fill={COLORS[1]} name="On Time" />
                    <Bar dataKey="delayed" stackId="a" fill={COLORS[4]} name="Delayed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
              <CardDescription>How resources are distributed across projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={resourceAllocationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {resourceAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Activity Metrics</CardTitle>
              <CardDescription>Monthly activity breakdown by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectMetricsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="meetings" fill={COLORS[0]} name="Meetings" />
                    <Bar dataKey="tasks" fill={COLORS[1]} name="Tasks" />
                    <Bar dataKey="documents" fill={COLORS[2]} name="Documents" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="burndown" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Burndown Chart</CardTitle>
              <CardDescription>Remaining work vs. ideal burndown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={burndownData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="remaining"
                      stroke={COLORS[0]}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Actual Remaining"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ideal" 
                      stroke={COLORS[2]} 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      name="Ideal Burndown" 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Time Tracking</CardTitle>
            <CardDescription>Hours spent by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timeTrackingData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 60,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" fill={COLORS[3]} name="Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </div>
            <Select defaultValue="quarter">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Projects On Time</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Budget Adherence</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Task Completion Rate</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "78%" }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Client Satisfaction</span>
                  <span className="font-medium">93%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-green-600" style={{ width: "93%" }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Team Efficiency</span>
                  <span className="font-medium">82%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: "82%" }} />
                </div>
              </div>
              
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-4">
                  <LineChart className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Overall Performance</p>
                    <p className="text-sm text-muted-foreground">Up 12% from previous quarter</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}