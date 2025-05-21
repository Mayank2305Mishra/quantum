"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Edit, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "active" | "completed" | "on-hold" | "archived";
  dueDate: string;
  createdAt: string;
  members: { id: string; avatar?: string; name: string; role: string }[];
  client?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "1",
    name: "Market Analysis Dashboard",
    description: "Create interactive dashboard for market trend analysis",
    progress: 75,
    status: "active",
    dueDate: "2023-12-15",
    createdAt: "2023-09-05",
    client: "Acme Corp",
    tags: ["dashboard", "analytics", "market-research"],
    members: [
      { id: "1", avatar: "https://github.com/shadcn.png", name: "Alex Johnson", role: "Project Manager" },
      { id: "2", avatar: "", name: "Maria Garcia", role: "Data Scientist" },
      { id: "3", avatar: "", name: "David Chen", role: "Strategy Consultant" },
    ],
  },
  {
    id: "2",
    name: "Predictive Customer Segmentation",
    description: "Machine learning model for customer segment prediction",
    progress: 45,
    status: "active",
    dueDate: "2023-12-30",
    createdAt: "2023-10-10",
    client: "TechCorp",
    tags: ["machine-learning", "data-science", "customer-analytics"],
    members: [
      { id: "1", avatar: "https://github.com/shadcn.png", name: "Alex Johnson", role: "Project Manager" },
      { id: "4", avatar: "", name: "Sarah Wilson", role: "UI/UX Designer" },
    ],
  },
  {
    id: "3",
    name: "Supply Chain Optimization",
    description: "Optimize logistics and inventory management",
    progress: 90,
    status: "active",
    dueDate: "2023-12-10",
    createdAt: "2023-08-15",
    client: "GlobalLogistics Inc",
    tags: ["optimization", "logistics", "analytics"],
    members: [
      { id: "3", avatar: "", name: "Anurag", role: "Strategy Consultant" },
      { id: "5", avatar: "", name: "Mayank", role: "Data Engineer" },
    ],
  },
  {
    id: "4",
    name: "Competitive Intelligence Analysis",
    description: "Research and analyze market competitors",
    progress: 100,
    status: "completed",
    dueDate: "2023-11-20",
    createdAt: "2023-09-01",
    client: "StartupX",
    tags: ["market-research", "competitive-analysis"],
    members: [
      { id: "6", avatar: "", name: "Tanushree", role: "Business Analyst" },
      { id: "7", avatar: "", name: "Vibha", role: "Research Specialist" },
    ],
  },
  {
    id: "5",
    name: "Pricing Strategy Optimization",
    description: "Develop data-driven pricing strategy",
    progress: 20,
    status: "on-hold",
    dueDate: "2024-02-15",
    createdAt: "2023-10-25",
    client: "RetailGiant",
    tags: ["pricing", "strategy", "analytics"],
    members: [
      { id: "1", avatar: "https://github.com/shadcn.png", name: "Mohit", role: "Project Manager" },
      { id: "8", avatar: "", name: "Tika", role: "Financial Analyst" },
    ],
  },
  {
    id: "6",
    name: "Customer Experience Redesign",
    description: "Overhaul digital customer experience",
    progress: 0,
    status: "archived",
    dueDate: "2023-12-01",
    createdAt: "2023-07-10",
    client: "ServiceFirst",
    tags: ["ux-design", "customer-journey", "digital"],
    members: [
      { id: "4", avatar: "", name: "Vishwas", role: "UI/UX Designer" },
      { id: "9", avatar: "", name: "Vade", role: "Customer Experience Specialist" },
    ],
  },
];

function getStatusColor(status: Project["status"]) {
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

export default function ProjectsPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewType, setViewType] = useState("grid");
  
  const filteredProjects = projects.filter(project => {
    // Filter by search text
    const matchesSearch = 
      project.name.toLowerCase().includes(searchText.toLowerCase()) ||
      project.description.toLowerCase().includes(searchText.toLowerCase()) ||
      project.client?.toLowerCase().includes(searchText.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and track your data science projects</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new project. You can add team members and set up
                tasks after creating the project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="project-name" className="text-sm font-medium">
                  Project Name
                </label>
                <Input
                  id="project-name"
                  placeholder="Enter project name"
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="project-description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="project-description"
                  placeholder="Enter project description"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="project-client" className="text-sm font-medium">
                    Client
                  </label>
                  <Input
                    id="project-client"
                    placeholder="Client name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="project-status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select defaultValue="active">
                    <SelectTrigger id="project-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="project-start-date" className="text-sm font-medium">
                    Start Date
                  </label>
                  <Input
                    id="project-start-date"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="project-due-date" className="text-sm font-medium">
                    Due Date
                  </label>
                  <Input
                    id="project-due-date"
                    type="date"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="project-tags" className="text-sm font-medium">
                  Tags
                </label>
                <Input
                  id="project-tags"
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search projects..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
            <Search className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setViewType("grid")}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" className={`${viewType === 'grid' ? 'fill-primary' : 'fill-muted-foreground'}`} />
                <rect x="14" y="3" width="7" height="7" rx="1" className={`${viewType === 'grid' ? 'fill-primary' : 'fill-muted-foreground'}`} />
                <rect x="3" y="14" width="7" height="7" rx="1" className={`${viewType === 'grid' ? 'fill-primary' : 'fill-muted-foreground'}`} />
                <rect x="14" y="14" width="7" height="7" rx="1" className={`${viewType === 'grid' ? 'fill-primary' : 'fill-muted-foreground'}`} />
              </svg>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setViewType("list")}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="4" rx="1" className={`${viewType === 'list' ? 'fill-primary' : 'fill-muted-foreground'}`} />
                <rect x="3" y="10" width="18" height="4" rx="1" className={`${viewType === 'list' ? 'fill-primary' : 'fill-muted-foreground'}`} />
                <rect x="3" y="17" width="18" height="4" rx="1" className={`${viewType === 'list' ? 'fill-primary' : 'fill-muted-foreground'}`} />
              </svg>
            </Button>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {viewType === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="block">
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        {project.client && `${project.client} • `}Created {new Date(project.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2 sm:flex-1">
                    <div className="flex items-center gap-2">
                      <Link href={`/projects/${project.id}`} className="hover:underline">
                        <h3 className="font-semibold">{project.name}</h3>
                      </Link>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    {project.client && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="font-medium">Client:</span>
                        <span>{project.client}</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{project.members.length} members</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/projects/${project.id}`} className="flex w-full items-center">
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" /> Manage Team
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Archive Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 4).map((member) => (
                      <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 4 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs">
                        +{project.members.length - 4}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Tasks
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart className="mr-2 h-4 w-4" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}