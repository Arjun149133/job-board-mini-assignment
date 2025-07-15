"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Eye,
  Download,
  Mail,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import Link from "next/link";

// Mock data - in a real app this would come from an API
const mockApplication = {
  id: 1,
  jobTitle: "Senior Frontend Developer",
  jobId: 1,
  company: "TechCorp Inc.",
  applicantName: "John Doe",
  applicantEmail: "john.doe@example.com",
  applicantPhone: "+1 (555) 123-4567",
  status: "pending",
  appliedAt: "2024-01-15",
  coverLetter:
    "I am excited to apply for the Senior Frontend Developer position at TechCorp Inc. With over 5 years of experience in React, TypeScript, and modern web development, I am confident that I can contribute significantly to your team.\n\nIn my previous role at WebSolutions Inc., I led a team of 4 developers and successfully delivered 15+ projects on time. I have extensive experience with:\n\n• React.js and Next.js\n• TypeScript and JavaScript (ES6+)\n• Tailwind CSS and responsive design\n• API integration and state management\n• Agile development methodologies\n\nI am particularly excited about this opportunity because of TechCorp's reputation for innovation and commitment to clean, maintainable code. I would love to discuss how my skills and experience can help drive your projects forward.\n\nThank you for considering my application. I look forward to hearing from you.",
  resumeUrl: "#",
  experience: "5+ years",
  expectedSalary: "$95,000 - $110,000",
};

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(mockApplication);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "reviewed":
        return "bg-blue-600 hover:bg-blue-700";
      case "approved":
        return "bg-green-600 hover:bg-green-700";
      case "rejected":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setApplication({ ...application, status: newStatus });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href={"/jobs"}>
              <Button className="mb-4 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>

            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Application Details
                </h1>
                <p className="text-xl text-gray-300">
                  {application.jobTitle} at {application.company}
                </p>
              </div>
              <Badge
                className={`${getStatusColor(application.status)} text-white transition-colors duration-200`}
              >
                {application.status}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Applicant Info */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-400" />
                    Applicant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Full Name
                      </label>
                      <p className="text-white">{application.applicantName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <p className="text-white">{application.applicantEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Phone
                      </label>
                      <p className="text-white">{application.applicantPhone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Experience
                      </label>
                      <p className="text-white">{application.experience}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Expected Salary
                      </label>
                      <p className="text-white">{application.expectedSalary}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Applied Date
                      </label>
                      <p className="text-white">{application.appliedAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cover Letter */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-400" />
                    Cover Letter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {application.coverLetter}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 transform hover:scale-105">
                    <Eye className="h-4 w-4 mr-2" />
                    View Resume
                  </Button>
                  <Button className="w-full border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                  <Button className="w-full border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Applicant
                  </Button>
                </CardContent>
              </Card>

              {/* Status Management */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Update Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["pending", "reviewed", "approved", "rejected"].map(
                    (status) => (
                      <Button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`w-full transition-all duration-200 transform hover:scale-105 ${
                          application.status === status
                            ? `${getStatusColor(status)} text-white`
                            : "border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    )
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-white">Application Submitted</p>
                        <p className="text-gray-400">{application.appliedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-white">Under Review</p>
                        <p className="text-gray-400">Pending</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
