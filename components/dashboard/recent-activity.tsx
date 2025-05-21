"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarPlus, 
  CheckCircle2, 
  File, 
  MessageSquare, 
  PenLine, 
  Plus, 
  UserPlus 
} from "lucide-react";

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    role: string;
  };
  action: "created" | "updated" | "completed" | "commented" | "added" | "scheduled";
  target: {
    type: "project" | "task" | "meeting" | "comment" | "team" | "file";
    name: string;
  };
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      avatar: "https://github.com/shadcn.png",
      role: "Project Manager"
    },
    action: "created",
    target: {
      type: "project",
      name: "Market Analysis Dashboard"
    },
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    user: {
      name: "Maria Garcia",
      role: "Data Scientist"
    },
    action: "completed",
    target: {
      type: "task",
      name: "Data preprocessing for customer segmentation"
    },
    timestamp: "3 hours ago"
  },
  {
    id: "3",
    user: {
      name: "David Chen",
      role: "Strategy Consultant"
    },
    action: "commented",
    target: {
      type: "task",
      name: "Competitor analysis report"
    },
    timestamp: "5 hours ago"
  },
  {
    id: "4",
    user: {
      name: "Sarah Wilson",
      role: "UI/UX Designer"
    },
    action: "updated",
    target: {
      type: "project",
      name: "Supply Chain Optimization"
    },
    timestamp: "Yesterday"
  },
  {
    id: "5",
    user: {
      name: "James Wright",
      role: "Data Engineer"
    },
    action: "added",
    target: {
      type: "file",
      name: "Market_forecast_Q2.xlsx"
    },
    timestamp: "Yesterday"
  },
  {
    id: "6",
    user: {
      name: "Alex Johnson",
      avatar: "https://github.com/shadcn.png",
      role: "Project Manager"
    },
    action: "scheduled",
    target: {
      type: "meeting",
      name: "Project Kickoff: Market Analysis"
    },
    timestamp: "2 days ago"
  }
];

function getActivityIcon(activity: Activity) {
  const { action, target } = activity;
  
  switch (target.type) {
    case "project":
      return action === "created" ? 
        <Plus className="h-4 w-4" /> : 
        <PenLine className="h-4 w-4" />;
    case "task":
      return action === "completed" ? 
        <CheckCircle2 className="h-4 w-4" /> : 
        <PenLine className="h-4 w-4" />;
    case "meeting":
      return <CalendarPlus className="h-4 w-4" />;
    case "comment":
      return <MessageSquare className="h-4 w-4" />;
    case "team":
      return <UserPlus className="h-4 w-4" />;
    case "file":
      return <File className="h-4 w-4" />;
    default:
      return <PenLine className="h-4 w-4" />;
  }
}

function getActivityDescription(activity: Activity) {
  const { action, target } = activity;
  
  switch (action) {
    case "created":
      return `created ${target.type} "${target.name}"`;
    case "updated":
      return `updated ${target.type} "${target.name}"`;
    case "completed":
      return `completed ${target.type} "${target.name}"`;
    case "commented":
      return `commented on ${target.type} "${target.name}"`;
    case "added":
      return `added ${target.type} "${target.name}"`;
    case "scheduled":
      return `scheduled ${target.type} "${target.name}"`;
    default:
      return `interacted with ${target.type} "${target.name}"`;
  }
}

function getActivityColor(activity: Activity) {
  const { action, target } = activity;
  
  switch (target.type) {
    case "project":
      return "bg-blue-500/20 text-blue-600 dark:text-blue-400";
    case "task":
      return action === "completed" ? 
        "bg-green-500/20 text-green-600 dark:text-green-400" : 
        "bg-purple-500/20 text-purple-600 dark:text-purple-400";
    case "meeting":
      return "bg-orange-500/20 text-orange-600 dark:text-orange-400";
    case "comment":
      return "bg-teal-500/20 text-teal-600 dark:text-teal-400";
    case "team":
      return "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400";
    case "file":
      return "bg-amber-500/20 text-amber-600 dark:text-amber-400";
    default:
      return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback className="text-xs">
                  {activity.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium text-sm">
                    {activity.user.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {getActivityDescription(activity)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${getActivityColor(activity)}`}>
                    <span className="mr-1">{getActivityIcon(activity)}</span>
                    {activity.target.type.charAt(0).toUpperCase() + activity.target.type.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}