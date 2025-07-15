"use client";
import { useState } from "react";
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import Link from "next/link";
// import { useToast } from "@/hooks/use-toast";

// Mock job data (in a real app, this would come from an API)
const mockJob = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120,000 - $150,000",
  description:
    "We're looking for a Senior Frontend Developer to join our growing team and help build the next generation of web applications. You'll work with cutting-edge technologies and collaborate with a talented team of engineers, designers, and product managers.",
  requirements: [
    "5+ years of experience with React and modern JavaScript",
    "Strong knowledge of TypeScript and modern build tools",
    "Experience with responsive design and CSS frameworks",
    "Familiarity with testing frameworks (Jest, React Testing Library)",
    "Strong problem-solving skills and attention to detail",
  ],
  responsibilities: [
    "Develop and maintain high-quality React applications",
    "Collaborate with design and backend teams",
    "Write clean, maintainable, and well-tested code",
    "Participate in code reviews and technical discussions",
    "Mentor junior developers and contribute to team growth",
  ],
  postedAt: "2 days ago",
  skills: ["React", "TypeScript", "Tailwind CSS", "Jest", "Git"],
};

const JobDetails = () => {
  const { id } = useParams();
  //   const { toast } = useToast();
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    resumeFile: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type.includes("document")) {
        setApplicationData({ ...applicationData, resumeFile: file });
        setErrors({ ...errors, resume: "" });
      } else {
        setErrors({
          ...errors,
          resume: "Please upload a PDF or Word document",
        });
      }
    }
  };

  const handleSubmitApplication = () => {
    if (validateApplication()) {
      //   toast({
      //     title: "Application Submitted!",
      //     description:
      //       "Your application has been sent successfully. We'll be in touch soon!",
      //   });
      setApplicationData({ coverLetter: "", resumeFile: null });
    }
  };

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
                    {mockJob.title}
                  </CardTitle>
                  <CardDescription className="flex items-center text-gray-300 mb-2 text-lg">
                    <Building className="h-5 w-5 mr-2" />
                    {mockJob.company}
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-600 text-white text-sm px-3 py-1"
                >
                  {mockJob.type}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {mockJob.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  {mockJob.salary}
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {mockJob.postedAt}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {mockJob.skills.map((skill, index) => (
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
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Apply for {mockJob.title}</DialogTitle>
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
                        <Label htmlFor="resume">Resume</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="bg-gray-700 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-0"
                          />
                          <Upload className="h-5 w-5 text-gray-400" />
                        </div>
                        {applicationData.resumeFile && (
                          <p className="text-green-400 text-sm">
                            ✓ {applicationData.resumeFile.name}
                          </p>
                        )}
                        {errors.resume && (
                          <p className="text-red-400 text-sm">
                            {errors.resume}
                          </p>
                        )}
                      </div>

                      <Button
                        onClick={handleSubmitApplication}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Submit Application
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
                    {mockJob.description}
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
                    {mockJob.responsibilities.map((responsibility, index) => (
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
                    {mockJob.requirements.map((requirement, index) => (
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
                    About {mockJob.company}
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
