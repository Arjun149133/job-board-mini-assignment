"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  DollarSign,
  Building,
  Upload,
  ArrowLeft,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";
import axios, { AxiosError } from "axios";
import { JobSchema } from "@repo/types/types";
import jwt from "jsonwebtoken";
import { useAppContext } from "@/lib/context/AppContext";
import { toast } from "sonner";
import Loader from "@/components/Loader";
// import { useToast } from "@/hooks/use-toast";

const JobDetails = () => {
  const { id } = useParams();
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    resumeFile: "",
  });
  const [job, setJob] = useState<JobSchema>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [jobNotFound, setJobNotFound] = useState(false);
  const { userId, token } = useAppContext();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios(`${API_BASE_URL}/jobs/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setJob(response.data);
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

    if (id) {
      fetchJobDetails();
    } else {
      console.error("Job ID is not provided");
    }
  }, [id, jobNotFound]);

  const validateApplication = () => {
    const newErrors: Record<string, string> = {};

    if (!applicationData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    }

    if (!applicationData.resumeFile) {
      newErrors.resume = "Resume is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitApplication = async () => {
    if (validateApplication()) {
      setLoader(true);
      try {
        const res = await axios.post(
          `${API_BASE_URL}/applications`,
          {
            jobPostingId: job?.id,
            coverLetter: applicationData.coverLetter,
            resume: applicationData.resumeFile,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Application submitted successfully:", res.data);
        if (res.status === 201) {
          toast.success("Application submitted successfully!");
          router.push(`/jobs/${id}`);
          setApplicationData({ coverLetter: "", resumeFile: "" });
          setErrors({});
        }
      } catch (error) {
        console.error("Error submitting application:", error);
        toast.error("Failed to submit application");
        if (error instanceof AxiosError && error.response?.data.error) {
          setErrors({ resume: error.response.data.error });
        } else {
          setErrors({ resume: "Failed to submit application" });
        }
      }
      setLoader(false);
    }
  };

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
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/jobs"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>

          {/* Job Header */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-3xl text-white mb-2">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="flex items-center text-gray-300 mb-2 text-lg">
                    <Building className="h-5 w-5 mr-2" />
                    {job.company}
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-600 text-white text-sm px-3 py-1"
                >
                  {job.type}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {new Date(job.createdAt!).toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
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

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      disabled={userId === job.postedById}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Apply for {job.title}</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Submit your application with a cover letter and resume.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="coverLetter">Cover Letter</Label>
                        <Textarea
                          id="coverLetter"
                          placeholder="Tell us why you're interested in this position..."
                          value={applicationData.coverLetter}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              coverLetter: e.target.value,
                            })
                          }
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-32"
                        />
                        {errors.coverLetter && (
                          <p className="text-red-400 text-sm">
                            {errors.coverLetter}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume (Drive Link)</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="resume"
                            type="text"
                            placeholder="Enter your resume link"
                            value={applicationData.resumeFile}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                resumeFile: e.target.value,
                              })
                            }
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 flex-1"
                          />
                        </div>
                        {errors.resume && (
                          <p className="text-red-400 text-sm">
                            {errors.resume}
                          </p>
                        )}
                      </div>

                      <Button
                        disabled={!token}
                        onClick={handleSubmitApplication}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {!token ? (
                          "Please login to apply"
                        ) : loader ? (
                          <div className=" w-full flex items-center justify-center">
                            <Loader />
                          </div>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    {job.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Key Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.responsibilities
                      ?.split(/\r?\n/)
                      .map((responsibility, index) => (
                        <li
                          key={index}
                          className="text-gray-300 flex items-start"
                        >
                          <span className="text-blue-400 mr-2">•</span>
                          {responsibility}
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements
                      ?.split(/\r?\n/)
                      .map((requirement, index) => (
                        <li
                          key={index}
                          className="text-gray-300 flex items-start"
                        >
                          <span className="text-blue-400 mr-2">•</span>
                          {requirement}
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    About {job.company}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    TechCorp Inc. is a leading technology company focused on
                    building innovative solutions that help businesses scale and
                    grow. We're committed to creating a diverse and inclusive
                    workplace where everyone can thrive.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Competitive salary and equity</li>
                    <li>• Health, dental, and vision insurance</li>
                    <li>• Flexible working hours</li>
                    <li>• Remote work options</li>
                    <li>• Professional development budget</li>
                    <li>• Team events and retreats</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
