"use client";

import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Upload, 
  UserPlus, 
  Video 
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: "remote" | "in-person";
  location?: string;
  description?: string;
  project?: {
    id: string;
    name: string;
  };
  attendees: { id: string; name: string; avatar?: string; confirmed?: boolean }[];
  agenda?: string[];
  minutes?: {
    notes: string;
    actionItems: {
      task: string;
      assignee: string;
      dueDate: string;
    }[];
  };
}

const meetings: Meeting[] = [
  {
    id: "1",
    title: "Project Kickoff: Market Analysis",
    date: "2023-12-07",
    time: "10:00 AM",
    duration: "1 hour",
    type: "remote",
    description: "Initial meeting to discuss project scope, goals, and timeline",
    project: {
      id: "1",
      name: "Market Analysis Dashboard"
    },
    attendees: [
      { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png", confirmed: true },
      { id: "2", name: "Maria Garcia", confirmed: true },
      { id: "3", name: "David Chen", confirmed: false },
      { id: "4", name: "Sarah Wilson", confirmed: true },
    ],
    agenda: [
      "Project overview and objectives",
      "Team introductions and roles",
      "Timeline and milestone discussion",
      "Initial requirements gathering",
      "Next steps and action items"
    ]
  },
  {
    id: "2",
    title: "Data Requirements Workshop",
    date: "2023-12-12",
    time: "2:00 PM",
    duration: "2 hours",
    type: "in-person",
    location: "Conference Room A",
    description: "Workshop to identify and document all data requirements",
    project: {
      id: "1",
      name: "Market Analysis Dashboard"
    },
    attendees: [
      { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png", confirmed: true },
      { id: "2", name: "Maria Garcia", confirmed: true },
      { id: "3", name: "David Chen", confirmed: true },
    ],
    agenda: [
      "Review of current data sources",
      "Identification of key metrics",
      "Data integration requirements",
      "Data quality considerations",
      "Reporting needs"
    ]
  },
  {
    id: "3",
    title: "Weekly Sprint Review",
    date: "2023-12-08",
    time: "10:00 AM",
    duration: "30 minutes",
    type: "remote",
    description: "Regular sprint review meeting",
    project: {
      id: "2",
      name: "Predictive Customer Segmentation"
    },
    attendees: [
      { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png", confirmed: true },
      { id: "5", name: "James Wright", confirmed: true },
      { id: "6", name: "Emma Davis", confirmed: false },
    ],
    agenda: [
      "Progress update on current sprint items",
      "Demo of completed work",
      "Blockers and issues discussion",
      "Next sprint planning preview"
    ]
  },
  {
    id: "4",
    title: "UI Design Review",
    date: "2023-12-20",
    time: "11:00 AM",
    duration: "1 hour",
    type: "remote",
    description: "Review wireframes and design concepts",
    project: {
      id: "1",
      name: "Market Analysis Dashboard"
    },
    attendees: [
      { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png", confirmed: true },
      { id: "4", name: "Sarah Wilson", confirmed: true },
    ],
    agenda: [
      "Review of wireframe drafts",
      "Discussion of user flow",
      "Visual design feedback",
      "Accessibility considerations",
      "Next iteration plan"
    ]
  },
  {
    id: "5",
    title: "Client Presentation",
    date: "2023-12-15",
    time: "3:30 PM",
    duration: "1.5 hours",
    type: "in-person",
    location: "Client HQ - 10th Floor Boardroom",
    description: "Final presentation of predictive model results",
    project: {
      id: "2",
      name: "Predictive Customer Segmentation"
    },
    attendees: [
      { id: "2", name: "Maria Garcia", confirmed: true },
      { id: "3", name: "David Chen", confirmed: true },
      { id: "7", name: "Michael Brown", confirmed: true },
    ],
    agenda: [
      "Project summary and objectives",
      "Methodology overview",
      "Model results and insights",
      "Implementation recommendations",
      "Q&A"
    ],
    minutes: {
      notes: "Client was impressed with the segmentation model accuracy. They requested additional analysis on Segment C for next quarter.",
      actionItems: [
        {
          task: "Provide detailed report on Segment C behavior",
          assignee: "Maria Garcia",
          dueDate: "2023-12-22"
        },
        {
          task: "Schedule follow-up meeting for implementation planning",
          assignee: "David Chen",
          dueDate: "2023-12-18"
        }
      ]
    }
  },
  {
    id: "6",
    title: "Supply Chain Analysis Kickoff",
    date: "2023-12-18",
    time: "9:00 AM",
    duration: "1 hour",
    type: "remote",
    description: "Initial planning for the supply chain optimization project",
    project: {
      id: "3",
      name: "Supply Chain Optimization"
    },
    attendees: [
      { id: "3", name: "David Chen", confirmed: true },
      { id: "5", name: "James Wright", confirmed: true },
      { id: "8", name: "Lisa Wong", confirmed: false },
    ],
    agenda: [
      "Project scope definition",
      "Current supply chain overview",
      "Key optimization areas",
      "Data requirements",
      "Timeline planning"
    ]
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export default function MeetingsPage() {
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"list" | "calendar">("list");
  
  // Get unique projects for filter
  const projects = Array.from(new Set(meetings.filter(m => m.project).map(m => m.project?.id))).map(
    projectId => {
      const project = meetings.find(m => m.project?.id === projectId)?.project;
      return { id: project?.id, name: project?.name };
    }
  );
  
  const filteredMeetings = meetings.filter(meeting => {
    // Filter by search text
    const matchesSearch = 
      meeting.title.toLowerCase().includes(searchText.toLowerCase()) ||
      (meeting.description || "").toLowerCase().includes(searchText.toLowerCase());
    
    // Filter by type
    const matchesType = typeFilter === "all" || meeting.type === typeFilter;
    
    // Filter by project
    const matchesProject = 
      projectFilter === "all" || 
      (meeting.project && meeting.project.id === projectFilter);
    
    // Filter by date (only if calendar view is active)
    let matchesDate = true;
    if (view === "calendar" && date) {
      const meetingDate = new Date(meeting.date);
      matchesDate = 
        meetingDate.getDate() === date.getDate() &&
        meetingDate.getMonth() === date.getMonth() &&
        meetingDate.getFullYear() === date.getFullYear();
    }
    
    return matchesSearch && matchesType && matchesProject && matchesDate;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">Schedule, manage, and track meetings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
              <DialogDescription>
                Fill in the details below to schedule a new meeting. You can invite team members and set the agenda.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="meeting-title" className="text-sm font-medium">
                  Meeting Title
                </label>
                <Input
                  id="meeting-title"
                  placeholder="Enter meeting title"
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="meeting-description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="meeting-description"
                  placeholder="Enter meeting description"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="meeting-project" className="text-sm font-medium">
                    Project
                  </label>
                  <Select>
                    <SelectTrigger id="meeting-project">
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
                  <label htmlFor="meeting-type" className="text-sm font-medium">
                    Meeting Type
                  </label>
                  <Select defaultValue="remote">
                    <SelectTrigger id="meeting-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="meeting-date" className="text-sm font-medium">
                    Date
                  </label>
                  <Input
                    id="meeting-date"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="meeting-time" className="text-sm font-medium">
                    Time
                  </label>
                  <Input
                    id="meeting-time"
                    type="time"
                    defaultValue="10:00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="meeting-duration" className="text-sm font-medium">
                    Duration
                  </label>
                  <Select defaultValue="60">
                    <SelectTrigger id="meeting-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="meeting-location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input
                    id="meeting-location"
                    placeholder="Virtual or physical location"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="meeting-attendees" className="text-sm font-medium">
                  Attendees
                </label>
                <Select>
                  <SelectTrigger id="meeting-attendees">
                    <SelectValue placeholder="Select attendees" />
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
              <div className="grid gap-2">
                <label htmlFor="meeting-agenda" className="text-sm font-medium">
                  Agenda
                </label>
                <textarea
                  id="meeting-agenda"
                  placeholder="Enter meeting agenda items (one per line)"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Schedule Meeting</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search meetings..."
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
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-9 w-[130px]">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Type:</span>
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="in-person">In-Person</SelectItem>
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
            value={view}
            onValueChange={(value) => setView(value as "list" | "calendar")}
            className="h-9"
          >
            <TabsList className="h-full">
              <TabsTrigger value="list" className="h-full">List</TabsTrigger>
              <TabsTrigger value="calendar" className="h-full">Calendar</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {view === "list" ? (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredMeetings.length > 0 ? (
                filteredMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-4 transition-colors hover:bg-secondary/10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{meeting.title}</h3>
                          <Badge variant="outline">
                            {meeting.type === "remote" ? "Remote" : "In-Person"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{meeting.description}</p>
                        {meeting.project && (
                          <Badge variant="secondary" className="text-xs">
                            {meeting.project.name}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col items-start gap-1 sm:items-end">
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(meeting.date)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{meeting.time} ({meeting.duration})</span>
                        </div>
                        {meeting.location && (
                          <span className="text-sm text-muted-foreground">{meeting.location}</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
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
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                          <UserPlus className="h-3 w-3" />
                          Add
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        {meeting.minutes ? (
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Minutes
                          </Button>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Upload className="mr-2 h-4 w-4" />
                                Add Minutes
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Meeting Minutes</DialogTitle>
                                <DialogDescription>
                                  Record notes and action items from the meeting.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <label htmlFor="meeting-notes" className="text-sm font-medium">
                                    Meeting Notes
                                  </label>
                                  <textarea
                                    id="meeting-notes"
                                    placeholder="Enter meeting notes"
                                    className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium">
                                    Action Items
                                  </label>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Input placeholder="Action item" className="flex-1" />
                                      <Select>
                                        <SelectTrigger className="w-[180px]">
                                          <SelectValue placeholder="Assignee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {meeting.attendees.map(attendee => (
                                            <SelectItem key={attendee.id} value={attendee.id}>
                                              {attendee.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <Input type="date" className="w-[140px]" />
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Action Item
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Minutes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Button variant="default" size="sm">
                          <Video className="mr-2 h-4 w-4" />
                          Join
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
                            <DropdownMenuItem>Edit Meeting</DropdownMenuItem>
                            <DropdownMenuItem>View Agenda</DropdownMenuItem>
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Cancel Meeting
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {meeting.agenda && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">Agenda</h4>
                        </div>
                        <ul className="mt-2 space-y-1 pl-5 text-sm text-muted-foreground list-disc">
                          {meeting.agenda.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {meeting.minutes && (
                      <div className="mt-4 rounded-md bg-secondary/20 p-3">
                        <h4 className="text-sm font-medium">Meeting Minutes</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{meeting.minutes.notes}</p>
                        {meeting.minutes.actionItems.length > 0 && (
                          <div className="mt-2">
                            <h5 className="text-xs font-medium">Action Items</h5>
                            <ul className="mt-1 space-y-1 pl-5 text-xs text-muted-foreground list-disc">
                              {meeting.minutes.actionItems.map((item, index) => (
                                <li key={index}>
                                  {item.task} - <span className="font-medium">{item.assignee}</span> (Due: {new Date(item.dueDate).toLocaleDateString()})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No meetings match your filters</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchText("");
                    setTypeFilter("all");
                    setProjectFilter("all");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-medium">Meeting Types</h3>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>Remote</span>
                  </div>
                  <span className="text-muted-foreground">
                    {meetings.filter(m => m.type === "remote").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>In-Person</span>
                  </div>
                  <span className="text-muted-foreground">
                    {meetings.filter(m => m.type === "in-person").length}
                  </span>
                </div>
                <div className="mt-6 rounded-md bg-secondary/20 p-3">
                  <h3 className="text-sm font-medium">
                    {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                  </h3>
                  {date && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {meetings.filter(m => m.date === date.toISOString().split("T")[0]).length} meetings scheduled
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {date ? format(date, "EEEE, MMMM d, yyyy") : "All Meetings"}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  if (date) {
                    const newDate = new Date(date);
                    newDate.setDate(newDate.getDate() - 1);
                    setDate(newDate);
                  }
                }}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  if (date) {
                    const newDate = new Date(date);
                    newDate.setDate(newDate.getDate() + 1);
                    setDate(newDate);
                  }
                }}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                  Today
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filteredMeetings.length > 0 ? (
                <div className="space-y-6">
                  {filteredMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center gap-4 rounded-md border p-4 transition-colors hover:bg-secondary/10">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{meeting.title}</h3>
                          <Badge variant="outline">
                            {meeting.type === "remote" ? "Remote" : "In-Person"}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{meeting.time} ({meeting.duration})</span>
                          </div>
                          {meeting.location && (
                            <span className="text-sm text-muted-foreground">{meeting.location}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
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
                        <Button variant="default" size="sm">
                          Join
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Meeting</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Cancel Meeting
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No meetings scheduled</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    There are no meetings scheduled for this day. Use the button below to schedule a new meeting.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Meeting
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Schedule New Meeting</DialogTitle>
                      </DialogHeader>
                      {/* Meeting form content here */}
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
