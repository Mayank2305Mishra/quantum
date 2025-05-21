// Update the teamMembers array in app/team/page.tsx
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Anurag",
    avatar: "https://github.com/shadcn.png",
    role: "Project Manager",
    department: "Management",
    email: "anurag@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "2021-03-15",
    status: "active",
    projects: [
      { id: "1", name: "Market Analysis Dashboard" },
      { id: "2", name: "Predictive Customer Segmentation" }
    ],
    skills: ["Project Management", "Data Analysis", "Agile", "Client Relations"],
    completedTasks: 124,
    activeTasks: 8,
    performanceRating: 92,
    availability: 85,
    access: "admin"
  },
  {
    id: "2",
    name: "Mayank",
    role: "Data Scientist",
    department: "Analytics",
    email: "mayank@example.com",
    phone: "+1 (555) 234-5678",
    location: "Boston, MA",
    joinDate: "2022-01-10",
    status: "active",
    projects: [
      { id: "1", name: "Market Analysis Dashboard" },
      { id: "2", name: "Predictive Customer Segmentation" }
    ],
    skills: ["Machine Learning", "Python", "Statistical Analysis", "Data Visualization"],
    completedTasks: 78,
    activeTasks: 5,
    performanceRating: 95,
    availability: 90,
    access: "member"
  },
  {
    id: "3",
    name: "Kiran",
    role: "Strategy Consultant",
    department: "Consulting",
    email: "kiran@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    joinDate: "2021-08-20",
    status: "away",
    projects: [
      { id: "1", name: "Market Analysis Dashboard" },
      { id: "3", name: "Supply Chain Optimization" }
    ],
    skills: ["Strategic Planning", "Market Research", "Business Development", "Presentations"],
    completedTasks: 56,
    activeTasks: 3,
    performanceRating: 88,
    availability: 70,
    access: "project-manager"
  },
  {
    id: "4",
    name: "Tanushree",
    role: "UI/UX Designer",
    department: "Design",
    email: "tanushree@example.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    joinDate: "2022-02-15",
    status: "active",
    projects: [
      { id: "1", name: "Market Analysis Dashboard" },
      { id: "2", name: "Predictive Customer Segmentation" }
    ],
    skills: ["UI Design", "UX Research", "Wireframing", "Figma", "Visual Design"],
    completedTasks: 42,
    activeTasks: 2,
    performanceRating: 91,
    availability: 95,
    access: "member"
  },
  {
    id: "5",
    name: "Vibha",
    role: "Data Engineer",
    department: "Engineering",
    email: "vibha@example.com",
    phone: "+1 (555) 567-8901",
    location: "Austin, TX",
    joinDate: "2021-05-10",
    status: "offline",
    projects: [
      { id: "2", name: "Predictive Customer Segmentation" },
      { id: "3", name: "Supply Chain Optimization" }
    ],
    skills: ["ETL Pipelines", "SQL", "Python", "Data Modeling", "Cloud Infrastructure"],
    completedTasks: 67,
    activeTasks: 4,
    performanceRating: 89,
    availability: 80,
    access: "member"
  },
  {
    id: "6",
    name: "Amruthesh",
    role: "Business Analyst",
    department: "Analytics",
    email: "amruthesh@example.com",
    phone: "+1 (555) 678-9012",
    location: "San Francisco, CA",
    joinDate: "2022-04-01",
    status: "active",
    projects: [
      { id: "1", name: "Market Analysis Dashboard" }
    ],
    skills: ["Requirements Analysis", "Process Modeling", "SQL", "Tableau", "Excel"],
    completedTasks: 38,
    activeTasks: 6,
    performanceRating: 86,
    availability: 85,
    access: "member"
  }
];
