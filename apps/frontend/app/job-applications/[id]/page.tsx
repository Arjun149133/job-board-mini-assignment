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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Eye,
  ArrowLeft,
  Users,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import Link from "next/link";

// Mock data
const mockJobDetails = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$90,000 - $120,000",
  postedAt: "2024-01-10",
};

const mockApplications = [
  {
    id: 1,
    applicantName: "John Doe",
    applicantEmail: "john.doe@example.com",
    status: "pending",
    appliedAt: "2024-01-15",
    experience: "5+ years",
    coverLetterPreview: "I am excited to apply for this position...",
    score: 85,
  },
  {
    id: 2,
    applicantName: "Jane Smith",
    applicantEmail: "jane.smith@example.com",
    status: "reviewed",
    appliedAt: "2024-01-14",
    experience: "3+ years",
    coverLetterPreview: "With my extensive experience in React...",
    score: 92,
  },
  {
    id: 3,
    applicantName: "Mike Johnson",
    applicantEmail: "mike.johnson@example.com",
    status: "approved",
    appliedAt: "2024-01-13",
    experience: "7+ years",
    coverLetterPreview: "I have been following your company...",
    score: 88,
  },
  {
    id: 4,
    applicantName: "Sarah Wilson",
    applicantEmail: "sarah.wilson@example.com",
    status: "rejected",
    appliedAt: "2024-01-12",
    experience: "2+ years",
    coverLetterPreview: "I am passionate about frontend development...",
    score: 76,
  },
];

const JobApplications = () => {
  const { jobId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600";
      case "reviewed":
        return "bg-blue-600";
      case "approved":
        return "bg-green-600";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      all: mockApplications.length,
      pending: mockApplications.filter((app) => app.status === "pending")
        .length,
      reviewed: mockApplications.filter((app) => app.status === "reviewed")
        .length,
      approved: mockApplications.filter((app) => app.status === "approved")
        .length,
      rejected: mockApplications.filter((app) => app.status === "rejected")
        .length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href={"/admin"}>
              <Button className="mb-4 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Applications
                </h1>
                <p className="text-xl text-gray-300">
                  {mockJobDetails.title} at {mockJobDetails.company}
                </p>
              </div>
            </div>

            {/* Job Summary */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Location:</span>
                    <p className="text-white">{mockJobDetails.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <p className="text-white">{mockJobDetails.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Salary:</span>
                    <p className="text-white">{mockJobDetails.salary}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Posted:</span>
                    <p className="text-white">{mockJobDetails.postedAt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Total Applications
                </CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {statusCounts.all}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Pending Review
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {statusCounts.pending}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Reviewed
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {statusCounts.reviewed}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Approved
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {statusCounts.approved}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search applicants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Applications List with Status Tabs */}
          <Tabs
            value={statusFilter}
            onValueChange={setStatusFilter}
            className="space-y-6"
          >
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gray-700 text-white"
              >
                All ({statusCounts.all})
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-gray-700 text-white"
              >
                Pending ({statusCounts.pending})
              </TabsTrigger>
              <TabsTrigger
                value="reviewed"
                className="data-[state=active]:bg-gray-700 text-white"
              >
                Reviewed ({statusCounts.reviewed})
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                className="data-[state=active]:bg-gray-700 text-white"
              >
                Approved ({statusCounts.approved})
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="data-[state=active]:bg-gray-700 text-white"
              >
                Rejected ({statusCounts.rejected})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={statusFilter} className="space-y-4">
              {filteredApplications.map((application) => (
                <Card
                  key={application.id}
                  className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-200"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-lg text-white">
                            {application.applicantName}
                          </CardTitle>
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-sm font-bold ${getScoreColor(application.score)}`}
                            >
                              Score: {application.score}%
                            </span>
                            <Badge
                              className={`${getStatusColor(application.status)} text-white`}
                            >
                              {application.status}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-gray-300">
                          {application.applicantEmail} •{" "}
                          {application.experience} experience
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Applied:</span>{" "}
                        {application.appliedAt}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">
                          Cover Letter Preview:
                        </span>
                        <p className="mt-1 text-gray-400 line-clamp-2">
                          {application.coverLetterPreview}
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Link href={`/application/${application.id}`}>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 transform hover:scale-105"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
                        >
                          Quick Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredApplications.length === 0 && (
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardContent className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No applications found
                    </h3>
                    <p className="text-gray-400">
                      No applications match your current filters.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default JobApplications;
