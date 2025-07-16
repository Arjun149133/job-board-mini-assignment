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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Edit, Trash2, List } from "lucide-react";
import Link from "next/link";
import { ApplicationSchema, JobSchema } from "@repo/types/types";
import { useAppContext } from "@/lib/context/AppContext";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { toast } from "sonner";

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState<ApplicationSchema[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    ApplicationSchema[]
  >([]);
  const [jobs, setJobs] = useState<JobSchema[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobSchema[]>([]);
  const { token } = useAppContext();
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

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/applications/user`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          setApplications(res.data);
          setFilteredApplications(res.data);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to fetch applications");
      }
    };

    if (token) {
      fetchApplications();
    }
  }, [token]);

  useEffect(() => {
    const filteredApplications = applications.filter((app) =>
      app.jobPosting?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredApplications(filteredApplications);
  }, [searchTerm, applications]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/jobs/user`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          setJobs(res.data);
          setFilteredJobs(res.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs");
      }
    };

    if (token) {
      fetchJobs();
    }
  }, [token]);

  useEffect(() => {
    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredJobs(filteredJobs);
  }, [searchTerm, jobs]);

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
                My Applications
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
                          {application.user?.name || "Anonymous Applicant"}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Applied for:{" "}
                          {application.jobPosting?.title || "Unknown Job"}
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
                        {application.user?.email || "N/A"}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Applied:</span>{" "}
                        {new Date(
                          application.createdAt!
                        ).toLocaleDateString() || "N/A"}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Cover Letter:</span>
                        <p className="mt-1 text-gray-400">
                          {application.coverLetter}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={application.resume || "#"}>
                          <Button
                            size="sm"
                            className="border border-gray-600 text-white hover:bg-black/80 hover:border-gray-500 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Resume
                          </Button>
                        </Link>
                        <Link href={`/application/applied/${application.id}`}>
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
                        {job.applications?.length || 0}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Posted:</span>{" "}
                        {new Date(job.createdAt!).toLocaleDateString() || "N/A"}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Link href={`/job-applications/${job.id}`}>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 transform hover:scale-105"
                          >
                            <List className="h-4 w-4 mr-2" />
                            View Applications ({job.applications?.length || 0})
                          </Button>
                        </Link>
                        <Link href={`/jobs/${job.id}`}>
                          <Button
                            size="sm"
                            className="border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Job
                          </Button>
                        </Link>
                        {/* <Button
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
                        </Button> */}
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
