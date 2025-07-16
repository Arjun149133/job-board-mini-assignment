"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, DollarSign, Building } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { JobSchema } from "@repo/types/types";

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description:
      "We're looking for a Senior Frontend Developer to join our growing team...",
    postedAt: "2 days ago",
    skills: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    description:
      "Join our design team and help create beautiful user experiences...",
    postedAt: "1 day ago",
    skills: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Part-time",
    salary: "$80,000 - $100,000",
    description: "Looking for a backend engineer to help scale our platform...",
    postedAt: "3 days ago",
    skills: ["Node.js", "Python", "PostgreSQL"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Austin, TX",
    type: "Contract",
    salary: "$110,000 - $140,000",
    description: "Help us build and maintain our cloud infrastructure...",
    postedAt: "1 week ago",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
];

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const [jobCategory, setJobCategory] = useState("all");
  const [jobs, setJobs] = useState<JobSchema[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobSchema[]>([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/jobs`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setJobs(res.data);
        setFilteredJobs(res.data);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        jobType === "all" || job.type.toLowerCase() === jobType.toLowerCase();
      const matchesCategory =
        jobCategory === "all" ||
        job.category.toLowerCase() === jobCategory.toLowerCase();

      return matchesSearch && matchesType && matchesCategory;
    });

    setFilteredJobs(filtered);
  }, [searchTerm, jobType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Find Your Next Opportunity
            </h1>
            <p className="text-xl text-gray-300">
              Discover jobs that match your skills and interests
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search jobs or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={jobCategory} onValueChange={setJobCategory}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Job Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="FULL_TIME">Full-time</SelectItem>
                  <SelectItem value="PART_TIME">Part-time</SelectItem>
                  <SelectItem value="INTERNSHIP">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Results */}
          <div className="grid gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-white mb-2">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="flex items-center text-gray-300 mb-2">
                          <Building className="h-4 w-4 mr-2" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <div className="gap-2 flex items-center justify-center">
                        <Badge
                          variant="secondary"
                          className={`${
                            job.type === "REMOTE"
                              ? "bg-green-600"
                              : job.type === "ONSITE"
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                          } text-white`}
                        >
                          {job.type}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`${
                            job.category === "FULL_TIME"
                              ? "bg-green-600"
                              : job.category === "INTERNSHIP"
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                          } text-white`}
                        >
                          {job.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.createdAt}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills?.split(",").map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/jobs/${job.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No jobs found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
