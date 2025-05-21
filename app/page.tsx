import { CardDashboard } from "@/components/dashboard/card-dashboard";
import { ProjectsOverview } from "@/components/dashboard/projects-overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";

export default function Home() {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <CardDashboard />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectsOverview />
        </div>
        <div className="space-y-6">
          <UpcomingMeetings />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}