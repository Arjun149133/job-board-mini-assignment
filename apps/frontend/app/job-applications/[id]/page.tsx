"use client";
import { useEffect, useState } from "react";
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
import { useParams } from "next/navigation";
import Link from "next/link";
import { ApplicationSchema, JobSchema } from "@repo/types/types";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/lib/config";

enum ApplicationStatus {
  Applied = "applied",
  Interviewed = "interviewed",
  Hired = "hired",
  Rejected = "rejected",
  All = "all",
}

const JobApplications = () => {
  const { id: jobId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus>(
    ApplicationStatus.All
  );
  const [job, setJob] = useState<JobSchema>();
  const [jobNotFound, setJobNotFound] = useState(false);
  const [applications, setApplications] = useState<ApplicationSchema[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    ApplicationSchema[]
  >([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios(`${API_BASE_URL}/jobs/${jobId}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setJob(response.data);
          setApplications(response.data.applications || []);
          setFilteredApplications(response.data.applications || []);
          setJobNotFound(false);
        } else {
          console.error("Failed to fetch job details");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        if (error instanceof AxiosError && error.response?.data.error) {
          console.log("Job not found");
          setJobNotFound(true);
        }
      }
    };

    if (jobId) {
      fetchJobDetails();
    } else {
      console.error("Job ID is not provided");
    }
  }, [jobId, jobNotFound]);

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

  const getStatusCounts = () => {
    return {
      all: applications.length,
      applied: applications.filter(
        (app) => app.status.toLocaleLowerCase() === "applied"
      ).length,
      interviewed: applications.filter(
        (app) => app.status.toLocaleLowerCase() === "interviewed"
      ).length,
      hired: applications.filter(
        (app) => app.status.toLocaleLowerCase() === "hired"
      ).length,
      rejected: applications.filter(
        (app) => app.status.toLocaleLowerCase() === "rejected"
      ).length,
    };
  };

  const statusCounts = getStatusCounts();

  useEffect(() => {
    const filterApplications = () => {
      let filtered = applications;

      if (searchTerm) {
        filtered = filtered.filter((app) =>
          app.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (statusFilter !== "all") {
        filtered = filtered.filter(
          (app) => app.status.toLocaleLowerCase() === statusFilter
        );
      }

      console.log(statusFilter);
      setFilteredApplications(filtered);
    };

    filterApplications();
  }, [applications, statusFilter, searchTerm]);

  if (!job && !jobNotFound) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white">Loading job details...</p>
      </div>
    );
  }

  if (jobNotFound) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-red-500">Job not found</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-red-500">Job not found</p>
      </div>
    );
  }

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
                  {job.title} at {job.company}
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
                    <p className="text-white">{job.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <p className="text-white">{job.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Salary:</span>
                    <p className="text-white">{job.salary}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Posted:</span>
                    <p className="text-white">
                      {new Date(job.createdAt!).toLocaleDateString()}
                    </p>
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
                  Applied Reviews
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {statusCounts.applied}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Interviewed
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {statusCounts.interviewed}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Hired
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {statusCounts.hired}
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
            //@ts-ignore
            onValueChange={setStatusFilter}
            className="space-y-6"
          >
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger
                value={ApplicationStatus.All}
                className="data-[state=active]:bg-gray-700 text-white"
              >
                All ({statusCounts.all})
              </TabsTrigger>
              <TabsTrigger
                value={ApplicationStatus.Applied}
                className="data-[state=active]:bg-gray-700 text-white"
              >
                Pending ({statusCounts.applied})
              </TabsTrigger>
              <TabsTrigger
                value={ApplicationStatus.Interviewed}
                className="data-[state=active]:bg-gray-700 text-white"
              >
                Reviewed ({statusCounts.interviewed})
              </TabsTrigger>
              <TabsTrigger
                value={ApplicationStatus.Hired}
                className="data-[state=active]:bg-gray-700 text-white"
              >
                Approved ({statusCounts.hired})
              </TabsTrigger>
              <TabsTrigger
                value={ApplicationStatus.Rejected}
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
                            {application.user?.name || "Unknown Applicant"}
                          </CardTitle>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={`${getStatusColor(application.status)} text-white`}
                            >
                              {application.status}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-gray-300">
                          {application.user?.email}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Applied:</span>{" "}
                        {application.createdAt
                          ? new Date(application.createdAt).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">
                          Cover Letter Preview:
                        </span>
                        <p className="mt-1 text-gray-400 line-clamp-2">
                          {application.coverLetter ||
                            "No cover letter provided."}
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
