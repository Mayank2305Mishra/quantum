"use client";

import { 
  BarChart, 
  CalendarClock, 
  CheckCircle, 
  Clock, 
  FileClock, 
  Layers, 
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`mt-1 text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function CardDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Active Projects" 
        value="12" 
        description="2 pending approval"
        icon={<Layers className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: "3 more than last month", positive: true }}
      />
      <StatCard 
        title="Team Members" 
        value="24" 
        description="8 online now"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard 
        title="Tasks Completed" 
        value="78%" 
        description="32 tasks remaining"
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: "12% higher than target", positive: true }}
      />
      <StatCard 
        title="Upcoming Meetings" 
        value="8" 
        description="Next in 2 hours"
        icon={<CalendarClock className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}