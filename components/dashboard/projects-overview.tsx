"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Clock, 
  MoreHorizontal, 
  Plus, 
  Users 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "active" | "completed" | "on-hold";
  dueDate: string;
  members: { id: string; avatar: string; name: string }[];
}

const projects: Project[] = [
  {
    id: "1",
    name: "Market Analysis Dashboard",
    description: "Create interactive dashboard for market trend analysis",
    progress: 75,
    status: "active",
    dueDate: "2023-12-15",
    members: [
      { id: "1", avatar: "https://github.com/shadcn.png", name: "Alex Johnson" },
      { id: "2", avatar: "", name: "Maria Garcia" },
      { id: "3", avatar: "", name: "David Chen" },
    ],
  },
  {
    id: "2",
    name: "Predictive Customer Segmentation",
    description: "Machine learning model for customer segment prediction",
    progress: 45,
    status: "active",
    dueDate: "2023-12-30",
    members: [
      { id: "1", avatar: "https://github.com/shadcn.png", name: "Alex Johnson" },
      { id: "4", avatar: "", name: "Sarah Wilson" },
    ],
  },
  {
    id: "3",
    name: "Supply Chain Optimization",
    description: "Optimize logistics and inventory management",
    progress: 90,
    status: "active",
    dueDate: "2023-12-10",
    members: [
      { id: "3", avatar: "", name: "David Chen" },
      { id: "5", avatar: "", name: "James Wright" },
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
    default:
      return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
  }
}

export function ProjectsOverview() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Projects Overview</CardTitle>
          <CardDescription>Track your ongoing projects and their progress</CardDescription>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-4 rounded-lg border p-4 transition-all hover:bg-secondary/10"
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{project.name}</h3>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
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
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>Add Members</DropdownMenuItem>
                    <DropdownMenuItem>View Tasks</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Archive Project</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}