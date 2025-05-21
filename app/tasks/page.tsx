"use client";

import { useState } from "react";
import { 
  CalendarRange, 
  Clock, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Tag 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Task {
  id: string;
  title: string;
  description: string;
  project: {
    id: string;
    name: string;
  };
  status: "to-do" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignees: { id: string; name: string; avatar?: string }[];
  tags: string[];
  progress?: number;
  createdAt: string;
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Define dashboard KPIs",
    description: "Identify and define key performance indicators for the dashboard based on client requirements",
    project: {
      id: "1",
      name: "Market Analysis Dashboard"
    },
    status: "completed",
    priority: "high",
    dueDate: "2023-09-15",
    createdAt: "2023-09-05",
    progress: 100,
    tags: ["planning", "requirements"],
    assignees: [
      { id: "1", name: "Anurag", avatar: "https://github.com/shadcn.png" },
      { id: "3", name: "Mayank" },
    ],
  },
  {
    id: "2",
    title: "Data collection and cleaning",
    description: "Gather data from client sources and prepare it for analysis",
    project: {
      id: "1",
      name: "Market Analysis Dashboard"
    },
    status: "completed",
    priority: "high",
    dueDate: "2023-09-30",
    createdAt: "2023-09-10",
    progress: 100,
    tags: ["data", "research"],
    assignees: [
      { id: "2", name: "Tanushree" },
    ],
  },
  {
    id: "3",
    title: "Create data models",
    description: "Develop statistical models for market trend analysis",
    project: {
      id: "1",
      name: "Market Analysis Dashboard"
    },
    status: "in-progress",
    priority: "high",
    dueDate: "2023-10-20",
    createdAt: "2023-10-01",
    progress: 65,
    tags: ["analytics", "modeling"],
    assignees: [
      { id: "2", name: "Vibha" },
    ],
  },
  {
    id: "4",
    title: "Design UI wireframes",
    description: "Create initial wireframes for dashboard interface",
    project: {
      id: "1",
      name: "Market Analysis Dashboard"
    },
    status: "in-progress",
    priority: "medium",
    dueDate: "2023-10-15",
    createdAt: "2023-10-05",
    progress: 80,
    tags: ["design", "ui"],
    assignees: [
      { id: "4", name: "Kiran" },
    ],
  },
  {
    id: "5",
    title: "Customer segmentation model",
    description: "Develop initial clustering algorithm for customer segmentation",
    project: {
      id: "2",
      name: "Predictive Customer Segmentation"
    },
    status: "review",
    priority: "high",
    dueDate: "2023-10-30",
    createdAt: "2023-10-10",
    progress: 90,
    tags: ["machine-learning", "clustering"],
    assignees: [
      { id: "2", name: "Amruthesh" },
      { id: "5", name: "Deemant" },
    ],
  },
  {
    id: "6",
    title: "Supply chain analysis report",
    description: "Create detailed analysis of current supply chain inefficiencies",
    project: {
      id: "3",
      name: "Supply Chain Optimization"
    },
    status: "to-do",
    priority: "medium",
    dueDate: "2023-11-15",
    createdAt: "2023-10-25",
    progress: 0,
    tags: ["analysis", "reporting"],
    assignees: [
      { id: "3", name: "Anurag" },
    ],
  },
  {
    id: "7",
    title: "Develop visualization components",
    description: "Implement charts and graphs for data visualization",
    project: {
      id: "1",
      name: "Market Analysis Dashboard"
    },
    status: "to-do",
    priority: "medium",
    dueDate: "2023-11-10",
    createdAt: "2023-10-20",
    progress: 0,
    tags: ["development", "visualization"],
    assignees: [
      { id: "4", name: "Kiran" },
      { id: "2", name: "Anurag" },
    ],
  },
  {
    id: "8",
    title: "Predictive model validation",
    description: "Validate and fine-tune customer segmentation model against test data",
    project: {
      id: "2",
      name: "Predictive Customer Segmentation"
    },
    status: "to-do",
    priority: "high",
    dueDate: "2023-11-20",
    createdAt: "2023-10-30",
    progress: 0,
    tags: ["testing", "validation", "machine-learning"],
    assignees: [
      { id: "2", name: "Tanushree" },
    ],
  },
];

function getStatusColor(status: Task["status"]) {
  switch (status) {
    case "to-do":
      return "bg-secondary text-secondary-foreground";
    case "in-progress":
      return "bg-blue-500/20 text-blue-600 dark:text-blue-400";
    case "review":
      return "bg-amber-500/20 text-amber-600 dark:text-amber-400";
    case "completed":
      return "bg-green-500/20 text-green-600 dark:text-green-400";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

function getPriorityColor(priority: Task["priority"]) {
  switch (priority) {
    case "low":
      return "text-green-600 dark:text-green-400";
    case "medium":
      return "text-amber-600 dark:text-amber-400";
    case "high":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-muted-foreground";
  }
}

export default function TasksPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [viewType, setViewType] = useState<string>("board"); // "board" or "list"
  
  // Get unique projects for filter
  const projects = Array.from(new Set(tasks.map(task => task.project.id))).map(
    projectId => {
      const project = tasks.find(task => task.project.id === projectId)?.project;
      return { id: project?.id, name: project?.name };
    }
  );
  
  const filteredTasks = tasks.filter(task => {
    // Filter by search text
    const matchesSearch = 
      task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    
    // Filter by priority
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    
    // Filter by project
    const matchesProject = projectFilter === "all" || task.project.id === projectFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });
  
  const todoTasks = filteredTasks.filter(task => task.status === "to-do");
  const inProgressTasks = filteredTasks.filter(task => task.status === "in-progress");
  const reviewTasks = filteredTasks.filter(task => task.status === "review");
  const completedTasks = filteredTasks.filter(task => task.status === "completed");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your tasks across all projects</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new task. You can assign it to team members and set due dates.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="task-title" className="text-sm font-medium">
                  Task Title
                </label>
                <Input
                  id="task-title"
                  placeholder="Enter task title"
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="task-description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="task-description"
                  placeholder="Enter task description"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="task-project" className="text-sm font-medium">
                    Project
                  </label>
                  <Select>
                    <SelectTrigger id="task-project">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id || ""}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="task-status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select defaultValue="to-do">
                    <SelectTrigger id="task-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-do">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="task-priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="task-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="task-due-date" className="text-sm font-medium">
                    Due Date
                  </label>
                  <Input
                    id="task-due-date"
                    type="date"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="task-tags" className="text-sm font-medium">
                  Tags
                </label>
                <Input
                  id="task-tags"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="task-assignees" className="text-sm font-medium">
                  Assignees
                </label>
                <Select>
                  <SelectTrigger id="task-assignees">
                    <SelectValue placeholder="Select assignees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Alex Johnson</SelectItem>
                    <SelectItem value="2">Maria Garcia</SelectItem>
                    <SelectItem value="3">David Chen</SelectItem>
                    <SelectItem value="4">Sarah Wilson</SelectItem>
                    <SelectItem value="5">James Wright</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
            <Search className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Search</span>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-[130px]">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Status:</span>
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="to-do">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="h-9 w-[130px]">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Priority:</span>
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="h-9 w-[150px]">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Project:</span>
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.id || ""}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Tabs
            value={viewType}
            onValueChange={setViewType}
            className="h-9"
          >
            <TabsList className="h-full">
              <TabsTrigger value="board" className="h-full">Board</TabsTrigger>
              <TabsTrigger value="list" className="h-full">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {viewType === "board" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <CardHeader className="bg-secondary/30 pb-2">
              <CardTitle className="text-sm font-medium">To Do</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-3">
                {todoTasks.length > 0 ? (
                  todoTasks.map(task => (
                    <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Mark as In Progress</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="mt-2 font-medium">{task.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {task.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
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
                  ))
                ) : (
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
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-3">
                {inProgressTasks.length > 0 ? (
                  inProgressTasks.map(task => (
                    <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Move to To Do</DropdownMenuItem>
                            <DropdownMenuItem>Move to Review</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="mt-2 font-medium">{task.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1" />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {task.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
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
                  ))
                ) : (
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
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-3">
                {reviewTasks.length > 0 ? (
                  reviewTasks.map(task => (
                    <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Move to In Progress</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="mt-2 font-medium">{task.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1" />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {task.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
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
                  ))
                ) : (
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
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-3">
                {completedTasks.length > 0 ? (
                  completedTasks.map(task => (
                    <div key={task.id} className="rounded-md border bg-card p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Task</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Move to Review</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="mt-2 font-medium">{task.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {task.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
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
                  ))
                ) : (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    No tasks in this status
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <div key={task.id} className="p-4 transition-colors hover:bg-secondary/10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status === "to-do" ? "To Do" : 
                             task.status === "in-progress" ? "In Progress" : 
                             task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </Badge>
                          <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                            <Tag className="h-3 w-3" />
                            {task.project.name}
                          </Badge>
                          {task.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="ml-auto flex items-center gap-4">
                        <div className="flex flex-col items-end gap-1 text-sm">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarRange className="h-3.5 w-3.5" />
                            <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
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
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuItem>Assign to</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {task.progress !== undefined && task.status !== "completed" && task.status !== "to-do" && (
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1" />
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Assigned to:</span>
                        <div className="flex -space-x-2">
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
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No tasks match your filters</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchText("");
                    setStatusFilter("all");
                    setPriorityFilter("all");
                    setProjectFilter("all");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}