"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useParams } from "next/navigation";
import Link from "next/link";
import { ApplicationSchema } from "@repo/types/types";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<ApplicationSchema>();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/applications/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          setApplication(res.data);
        } else {
          console.error("Failed to fetch application details");
        }
      } catch (error) {
        console.error("Error fetching application details:", error);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

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

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading application details...</p>
      </div>
    );
  }

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
                  {application?.jobPosting?.title} at{" "}
                  {application?.jobPosting?.company}
                </p>
              </div>
              <Badge
                className={`${getStatusColor(application?.status!)} text-white transition-colors duration-200`}
              >
                {application?.status!}
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
                      <p className="text-white">{application.user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <p className="text-white">{application.user?.email}</p>
                    </div>
                    {/* <div>
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
                    </div> */}
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Applied Date
                      </label>
                      <p className="text-white">
                        {new Date(application.createdAt!).toLocaleDateString()}
                      </p>
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
                        <p className="text-gray-400">{application.createdAt}</p>
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
