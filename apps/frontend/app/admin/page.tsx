"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Users,
  Briefcase,
  FileText,
  List,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

// Mock data
const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    applicantName: "John Doe",
    applicantEmail: "john.doe@example.com",
    status: "pending",
    appliedAt: "2024-01-15",
    coverLetter: "I am excited to apply for this position...",
    resumeUrl: "#",
  },
  {
    id: 2,
    jobTitle: "Product Designer",
    applicantName: "Jane Smith",
    applicantEmail: "jane.smith@example.com",
    status: "reviewed",
    appliedAt: "2024-01-14",
    coverLetter: "With 5 years of design experience...",
    resumeUrl: "#",
  },
  {
    id: 3,
    jobTitle: "Backend Engineer",
    applicantName: "Mike Johnson",
    applicantEmail: "mike.johnson@example.com",
    status: "rejected",
    appliedAt: "2024-01-13",
    coverLetter: "I have extensive backend development experience...",
    resumeUrl: "#",
  },
];

const mockPostedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    applicationsCount: 15,
    status: "active",
    postedAt: "2024-01-10",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Design Studio",
    applicationsCount: 8,
    status: "active",
    postedAt: "2024-01-12",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "StartupXYZ",
    applicationsCount: 12,
    status: "paused",
    postedAt: "2024-01-08",
  },
];

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600";
      case "reviewed":
        return "bg-blue-600";
      case "rejected":
        return "bg-red-600";
      case "active":
        return "bg-green-600";
      case "paused":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const filteredApplications = mockApplications.filter(
    (app) =>
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = mockPostedJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-300">
              Manage your job postings and applications
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Total Applications
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">35</div>
                <p className="text-xs text-gray-400">+20% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Active Jobs
                </CardTitle>
                <Briefcase className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12</div>
                <p className="text-xs text-gray-400">+2 new this week</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Total Applicants
                </CardTitle>
                <Users className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">248</div>
                <p className="text-xs text-gray-400">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search applications or jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="applications" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger
                value="applications"
                className="data-[state=active]:bg-gray-700 text-white"
              >
                Applications
              </TabsTrigger>
              <TabsTrigger
                value="jobs"
                className="data-[state=active]:bg-gray-700 text-white"
              >
                Posted Jobs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="space-y-4">
              {filteredApplications.map((application) => (
                <Card
                  key={application.id}
                  className="bg-gray-800/50 backdrop-blur-sm border-gray-700"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-white">
                          {application.applicantName}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Applied for: {application.jobTitle}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${getStatusColor(application.status)} text-white`}
                      >
                        {application.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Email:</span>{" "}
                        {application.applicantEmail}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Applied:</span>{" "}
                        {application.appliedAt}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Cover Letter:</span>
                        <p className="mt-1 text-gray-400">
                          {application.coverLetter}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="border border-gray-600 text-white hover:bg-black/80 hover:border-gray-500 transition-all duration-200"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Resume
                        </Button>
                        <Link href={`/application/${application.id}`}>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 transform hover:scale-105"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="bg-gray-800/50 backdrop-blur-sm border-gray-700"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-white">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${getStatusColor(job.status)} text-white`}
                      >
                        {job.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Applications:</span>{" "}
                        {job.applicationsCount}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Posted:</span>{" "}
                        {job.postedAt}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Link href={`/job-applications/${job.id}`}>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 transform hover:scale-105"
                          >
                            <List className="h-4 w-4 mr-2" />
                            View Applications ({job.applicationsCount})
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Job
                        </Button>
                        <Button
                          size="sm"
                          className="border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600/20 hover:border-red-500 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
