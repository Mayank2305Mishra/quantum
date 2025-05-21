"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Calendar, 
  ChevronRight, 
  Clock, 
  FileText, 
  MessageSquare, 
  MoreHorizontal, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Pencil, 
  Plus, 
  Users 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface Member {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  department?: string;
  email?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: "to-do" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignees: { id: string; name: string; avatar?: string }[];
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: "remote" | "in-person";
  description?: string;
  attendees: { id: string; name: string; avatar?: string }[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  timestamp: string;
}

const project = {
  id: "1",
  name: "Market Analysis Dashboard",
  description: "Create interactive dashboard for market trend analysis with visualization of key metrics, competitor benchmarking, and predictive analytics components.",
  status: "active",
  startDate: "2023-09-05",
  dueDate: "2023-12-15",
  client: "Acme Corp",
  budget: "$25,000",
  progress: 75,
  tags: ["dashboard", "analytics", "market-research"],
  members: [
    { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png", role: "Project Manager", department: "Management", email: "alex@example.com" },
    { id: "2", name: "Maria Garcia", role: "Data Scientist", department: "Analytics", email: "maria@example.com" },
    { id: "3", name: "David Chen", role: "Strategy Consultant", department: "Consulting", email: "david@example.com" },
    { id: "4", name: "Sarah Wilson", role: "UI/UX Designer", department: "Design", email: "sarah@example.com" },
  ],
  tasks: [
    {
      id: "1",
      title: "Define dashboard KPIs",
      description: "Identify and define key performance indicators for the dashboard based on client requirements",
      status: "completed",
      priority: "high",
      dueDate: "2023-09-15",
      assignees: [
        { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png" },
        { id: "3", name: "David Chen" },
      ],
    },
    {
      id: "2",
      title: "Data collection and cleaning",
      description: "Gather data from client sources and prepare it for analysis",
      status: "completed",
      priority: "high",
      dueDate: "2023-09-30",
      assignees: [
        { id: "2", name: "Maria Garcia" },
      ],
    },
    {
      id: "3",
      title: "Create data models",
      description: "Develop statistical models for market trend analysis",
      status: "in-progress",
      priority: "high",
      dueDate: "2023-10-20",
      assignees: [
        { id: "2", name: "Maria Garcia" },
      ],
    },
    {
      id: "4",
      title: "Design UI wireframes",
      description: "Create initial wireframes for dashboard interface",
      status: "in-progress",
      priority: "medium",
      dueDate: "2023-10-15",
      assignees: [
        { id: "4", name: "Sarah Wilson" },
      ],
    },
    {
      id: "5",
      title: "Develop visualization components",
      description: "Implement charts and graphs for data visualization",
      status: "to-do",
      priority: "medium",
      dueDate: "2023-11-10",
      assignees: [
        { id: "4", name: "Sarah Wilson" },
        { id: "2", name: "Maria Garcia" },
      ],
    },
    {
      id: "6",
      title: "Integration testing",
      description: "Test all dashboard components and integrations",
      status: "to-do",
      priority: "medium",
      dueDate: "2023-11-25",
      assignees: [
        { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png" },
        { id: "2", name: "Maria Garcia" },
      ],
    },
    {
      id: "7",
      title: "Client review and feedback",
      description: "Present dashboard to client and gather feedback",
      status: "to-do",
      priority: "high",
      dueDate: "2023-12-05",
      assignees: [
        { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png" },
        { id: "3", name: "David Chen" },
      ],
    },
  ],
  meetings: [
    {
      id: "1",
      title: "Project Kickoff",
      date: "2023-09-07",
      time: "10:00 AM",
      duration: "1 hour",
      type: "remote",
      description: "Initial meeting to discuss project scope, goals, and timeline",
      attendees: [
        { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png" },
        { id: "2", name: "Maria Garcia" },
        { id: "3", name: "David Chen" },
        { id: "4", name: "Sarah Wilson" },
      ],
    },
    {
      id: "2",
      title: "Data Requirements Workshop",
      date: "2023-09-12",
      time: "2:00 PM",
      duration: "2 hours",
      type: "in-person",
      description: "Workshop to identify and document all data requirements",
      attendees: [
        { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png" },
        { id: "2", name: "Maria Garcia" },
        { id: "3", name: "David Chen" },
      ],
    },
    {
      id: "3",
      title: "UI Design Review",
      date: "2023-10-20",
      time: "11:00 AM",
      duration: "1 hour",
      type: "remote",
      description: "Review wireframes and design concepts",
      attendees: [
        { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png" },
        { id: "4", name: "Sarah Wilson" },
      ],
    },
    {
      id: "4",
      title: "Weekly Progress Update",
      date: "2023-12-01",
      time: "9:30 AM",
      duration: "30 minutes",
      type: "remote",
      description: "Regular progress update meeting",
      attendees: [
        { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png" },
        { id: "2", name: "Maria Garcia" },
        { id: "3", name: "David Chen" },
        { id: "4", name: "Sarah Wilson" },
      ],
    },
  ],
  documents: [
    {
      id: "1",
      name: "Project_Scope.docx",
      type: "Word Document",
      size: "245 KB",
      uploadedBy: "Alex Johnson",
      uploadedAt: "2023-09-06",
    },
    {
      id: "2",
      name: "Data_Requirements.xlsx",
      type: "Excel Spreadsheet",
      size: "1.2 MB",
      uploadedBy: "Maria Garcia",
      uploadedAt: "2023-09-15",
    },
    {
      id: "3",
      name: "Dashboard_Wireframes.pdf",
      type: "PDF Document",
      size: "3.5 MB",
      uploadedBy: "Sarah Wilson",
      uploadedAt: "2023-10-18",
    },
    {
      id: "4",
      name: "Competitor_Analysis.pptx",
      type: "PowerPoint Presentation",
      size: "4.8 MB",
      uploadedBy: "David Chen",
      uploadedAt: "2023-10-25",
    },
  ],
  activities: [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "https://github.com/shadcn.png",
      },
      action: "created the project",
      timestamp: "2023-09-05 09:15 AM",
    },
    {
      id: "2",
      user: {
        name: "Alex Johnson",
        avatar: "https://github.com/shadcn.png",
      },
      action: "added Maria Garcia, David Chen, and Sarah Wilson to the project",
      timestamp: "2023-09-05 10:30 AM",
    },
    {
      id: "3",
      user: {
        name: "Maria Garcia",
      },
      action: "completed task 'Define dashboard KPIs'",
      timestamp: "2023-09-15 03:45 PM",
    },
    {
      id: "4",
      user: {
        name: "Sarah Wilson",
      },
      action: "uploaded Dashboard_Wireframes.pdf",
      timestamp: "2023-10-18 11:20 AM",
    },
    {
      id: "5",
      user: {
        name: "David Chen",
      },
      action: "started task 'Create data models'",
      timestamp: "2023-10-05 10:15 AM",
    },
  ],
};

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-blue-500/20 text-blue-600 dark:text-blue-400";
    case "completed":
      return "bg-green-500/20 text-green-600 dark:text-green-400";
    case "on-hold":
      return "bg-amber-500/20 text-amber-600 dark:text-amber-400";
    case "archived":
      return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
    default:
      return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
  }
}

function getTaskStatusColor(status: Task["status"]) {
  switch (status) {
    case "to-do":
      return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
    case "in-progress":
      return "bg-blue-500/20 text-blue-600 dark:text-blue-400";
    case "review":
      return "bg-amber-500/20 text-amber-600 dark:text-amber-400";
    case "completed":
      return "bg-green-500/20 text-green-600 dark:text-green-400";
    default:
      return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
  }
}

function getTaskPriorityColor(priority: Task["priority"]) {
  switch (priority) {
    case "low":
      return "text-green-600 dark:text-green-400";
    case "medium":
      return "text-amber-600 dark:text-amber-400";
    case "high":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}

function getFileIcon(type: string) {
  if (type.includes("Word")) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
        <FileText className="h-5 w-5" />
      </div>
    );
  } else if (type.includes("Excel")) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
        <FileText className="h-5 w-5" />
      </div>
    );
  } else if (type.includes("PDF")) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
        <FileText className="h-5 w-5" />
      </div>
    );
  } else if (type.includes("PowerPoint")) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
        <FileText className="h-5 w-5" />
      </div>
    );
  } else {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400">
        <FileText className="h-5 w-5" />
      </div>
    );
  }
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Calculate task statistics
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(task => task.status === "completed").length;
  const inProgressTasks = project.tasks.filter(task => task.status === "in-progress").length;
  const todoTasks = project.tasks.filter(task => task.status === "to-do").length;
  
  return (
    <div className="flex h-full">
      <div 
        className={`border-r bg-background transition-all duration-300 ${
          sidebarOpen ? "w-80" : "w-0"
        }`}
      >
        {sidebarOpen && (
          <div className="h-full">
            <div className="border-b p-4">
              <h2 className="font-semibold">Project Details</h2>
            </div>
            <div className="p-4 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                <p>{project.client}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Dates</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p>{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p>{new Date(project.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Budget</h3>
                <p>{project.budget}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Progress</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Overall Completion</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {project.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-between border-b bg-background p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8"
            >
              {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Link href="/projects" className="hover:text-foreground">
                Projects
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">{project.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" /> Manage Team
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" /> Schedule Meeting
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Archive Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="mt-2 text-muted-foreground">{project.description}</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTasks}</div>
                <p className="text-xs text-muted-foreground">{completedTasks} completed, {inProgressTasks} in progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{project.members.length}</div>
                <p className="text-xs text-muted-foreground">Across {new Set(project.members.map(m => m.department)).size} departments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.max(0, Math.floor((new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                </div>
                <p className="text-xs text-muted-foreground">Due {new Date(project.dueDate).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="tasks" className="mt-6">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Project Tasks</h2>
                  <p className="text-sm text-muted-foreground">Manage and track tasks</p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-secondary/30 pb-2">
                    <CardTitle className="text-sm font-medium">To Do</CardTitle>
                    <CardDescription>{project.tasks.filter(t => t.status === "to-do").length} tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      {project.tasks
                        .filter(task => task.status === "to-do")
                        .map(task => (
                          <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                            <div className="flex items-center justify-between">
                              <Badge className={getTaskPriorityColor(task.priority)} variant="outline">
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <h3 className="mt-2 font-medium">{task.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                            <div className="mt-3 flex items-center justify-between text-sm">
                              <div className="flex -space-x-1">
                                {task.assignees.map((assignee) => (
                                  <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={assignee.avatar} />
                                    <AvatarFallback className="text-[10px]">
                                      {assignee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span className="text-xs">
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      {project.tasks.filter(t => t.status === "to-do").length === 0 && (
                        <div className="py-4 text-center text-sm text-muted-foreground">
                          No tasks in this status
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-blue-500/10 pb-2">
                    <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                    <CardDescription>{project.tasks.filter(t => t.status === "in-progress").length} tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      {project.tasks
                        .filter(task => task.status === "in-progress")
                        .map(task => (
                          <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                            <div className="flex items-center justify-between">
                              <Badge className={getTaskPriorityColor(task.priority)} variant="outline">
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <h3 className="mt-2 font-medium">{task.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                            <div className="mt-3 flex items-center justify-between text-sm">
                              <div className="flex -space-x-1">
                                {task.assignees.map((assignee) => (
                                  <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={assignee.avatar} />
                                    <AvatarFallback className="text-[10px]">
                                      {assignee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span className="text-xs">
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      {project.tasks.filter(t => t.status === "in-progress").length === 0 && (
                        <div className="py-4 text-center text-sm text-muted-foreground">
                          No tasks in this status
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-amber-500/10 pb-2">
                    <CardTitle className="text-sm font-medium">Review</CardTitle>
                    <CardDescription>{project.tasks.filter(t => t.status === "review").length} tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      {project.tasks
                        .filter(task => task.status === "review")
                        .map(task => (
                          <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                            <div className="flex items-center justify-between">
                              <Badge className={getTaskPriorityColor(task.priority)} variant="outline">
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <h3 className="mt-2 font-medium">{task.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                            <div className="mt-3 flex items-center justify-between text-sm">
                              <div className="flex -space-x-1">
                                {task.assignees.map((assignee) => (
                                  <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={assignee.avatar} />
                                    <AvatarFallback className="text-[10px]">
                                      {assignee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span className="text-xs">
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      {project.tasks.filter(t => t.status === "review").length === 0 && (
                        <div className="py-4 text-center text-sm text-muted-foreground">
                          No tasks in this status
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-green-500/10 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <CardDescription>{project.tasks.filter(t => t.status === "completed").length} tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      {project.tasks
                        .filter(task => task.status === "completed")
                        .map(task => (
                          <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                            <div className="flex items-center justify-between">
                              <Badge className={getTaskPriorityColor(task.priority)} variant="outline">
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <h3 className="mt-2 font-medium">{task.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                            <div className="mt-3 flex items-center justify-between text-sm">
                              <div className="flex -space-x-1">
                                {task.assignees.map((assignee) => (
                                  <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={assignee.avatar} />
                                    <AvatarFallback className="text-[10px]">
                                      {assignee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span className="text-xs">
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      {project.tasks.filter(t => t.status === "completed").length === 0 && (
                        <div className="py-4 text-center text-sm text-muted-foreground">
                          No tasks in this status
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="meetings" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Project Meetings</h2>
                  <p className="text-sm text-muted-foreground">Schedule and manage meetings</p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {project.meetings.map((meeting) => (
                      <div key={meeting.id} className="p-4 hover:bg-secondary/10">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{meeting.title}</h3>
                              <Badge variant="outline">
                                {meeting.type === "remote" ? "Remote" : "In-Person"}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{meeting.description}</p>
                          </div>
                          <div className="mt-2 flex flex-col items-start gap-1 sm:mt-0 sm:items-end">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(meeting.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{meeting.time} ({meeting.duration})</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Attendees:</span>
                            <div className="flex -space-x-2">
                              {meeting.attendees.slice(0, 3).map((attendee) => (
                                <Avatar key={attendee.id} className="h-6 w-6 border-2 border-background">
                                  <AvatarImage src={attendee.avatar} />
                                  <AvatarFallback className="text-[10px]">
                                    {attendee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {meeting.attendees.length > 3 && (
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs">
                                  +{meeting.attendees.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Minutes
                            </Button>
                            <Button variant="outline" size="sm">
                              <Video className="mr-2 h-4 w-4" />
                              Join
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Project Documents</h2>
                  <p className="text-sm text-muted-foreground">Manage project files and documentation</p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {project.documents.map((document) => (
                      <div key={document.id} className="flex items-center gap-4 p-4 hover:bg-secondary/10">
                        {getFileIcon(document.type)}
                        <div className="flex-1">
                          <h3 className="font-medium">{document.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{document.type}</span>
                            <span>•</span>
                            <span>{document.size}</span>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <p>Uploaded by {document.uploadedBy}</p>
                          <p className="text-muted-foreground">{new Date(document.uploadedAt).toLocaleDateString()}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Project Activity</h2>
                <p className="text-sm text-muted-foreground">Recent activity and updates</p>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-6">
                    {project.activities.map((activity, index) => (
                      <div key={activity.id} className="relative">
                        {index < project.activities.length - 1 && (
                          <span className="absolute left-4 top-6 bottom-0 w-px bg-border" />
                        )}
                        <div className="flex gap-4">
                          <Avatar className="h-8 w-8 border-4 border-background">
                            <AvatarImage src={activity.user.avatar} />
                            <AvatarFallback>
                              {activity.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{activity.user.name}</span>
                              <span className="text-sm text-muted-foreground">{activity.action}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}