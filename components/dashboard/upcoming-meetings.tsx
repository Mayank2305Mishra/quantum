"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Video } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  time: string;
  type: "remote" | "in-person";
  attendees: { id: string; name: string; avatar?: string }[];
}

const meetings: Meeting[] = [
  {
    id: "1",
    title: "Project Kickoff: Market Analysis",
    time: "Today, 2:00 PM",
    type: "remote",
    attendees: [
      { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png" },
      { id: "2", name: "Maria Garcia" },
      { id: "3", name: "David Chen" },
      { id: "4", name: "Sarah Wilson" },
    ],
  },
  {
    id: "2",
    title: "Weekly Sprint Review",
    time: "Tomorrow, 10:00 AM",
    type: "remote",
    attendees: [
      { id: "1", name: "Alex Johnson", avatar: "https://github.com/shadcn.png" },
      { id: "5", name: "James Wright" },
      { id: "6", name: "Emma Davis" },
    ],
  },
  {
    id: "3",
    title: "Client Presentation: Predictive Model",
    time: "Dec 15, 3:30 PM",
    type: "in-person",
    attendees: [
      { id: "2", name: "Maria Garcia" },
      { id: "3", name: "David Chen" },
      { id: "7", name: "Michael Brown" },
    ],
  },
];

export function UpcomingMeetings() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Meetings</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="flex items-start gap-4 rounded-lg border p-3 transition-all hover:bg-secondary/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{meeting.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {meeting.type === "remote" ? "Remote" : "In-Person"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{meeting.time}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {meeting.attendees.slice(0, 3).map((attendee) => (
                    <Avatar key={attendee.id} className="h-6 w-6">
                      <AvatarImage src={attendee.avatar} />
                      <AvatarFallback className="text-xs">
                        {attendee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {meeting.attendees.length > 3 && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs">
                      +{meeting.attendees.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}