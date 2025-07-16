"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { JobSchema } from "@repo/types/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const CreateJobPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "REMOTE",
    category: "FULL_TIME",
    salary: "",
    description: "",
    requirements: "",
    responsibilities: "",
    skills: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loader, setLoader] = useState(false);

  const validateForm = () => {
    const parsedData = JobSchema.safeParse(formData);

    let errors;
    if (!parsedData.success) {
      errors = JSON.parse(parsedData.error.message);
    }

    if (!errors) {
      setErrors({});
      return true;
    }

    const newErrors: Record<string, string> = {};

    errors.forEach((error: { path: string[]; message: string }) => {
      const field = error.path[0];
      newErrors[field] = error.message;
    });

    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoader(true);
      try {
        const res = await axios.post(`${API_BASE_URL}/jobs`, formData, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        console.log(res.data);
        if (res.status === 201) {
          toast.success("Job posted successfully!");
          router.push("/jobs");
        }
        setFormData({
          title: "",
          company: "",
          location: "",
          type: "",
          salary: "",
          description: "",
          requirements: "",
          category: "",
          responsibilities: "",
          skills: "",
        });
      } catch (error) {
        console.error("Error posting job:", error);
        toast.error("Failed to post job. Please try again.");
      }
      setLoader(false);
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

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Plus className="h-6 w-6 mr-2" />
                Post a New Job
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Job Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g. Senior Frontend Developer"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">
                      Company
                    </Label>
                    <Input
                      id="company"
                      placeholder="e.g. TechCorp Inc."
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                    {errors.company && (
                      <p className="text-red-400 text-sm">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g. San Francisco, CA"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                    {errors.location && (
                      <p className="text-red-400 text-sm">{errors.location}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-white">
                      Job Type
                    </Label>
                    <Select
                      defaultValue="REMOTE"
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="REMOTE">Remote</SelectItem>
                        <SelectItem value="ONSITE">Onsite</SelectItem>
                        <SelectItem value="HYBRID">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-red-400 text-sm">{errors.type}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-white">
                      Job Category
                    </Label>
                    <Select
                      defaultValue="FULL_TIME"
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="FULL_TIME">Full_Time</SelectItem>
                        <SelectItem value="PART_TIME">Part_Time</SelectItem>
                        <SelectItem value="FREELANCE">FreeLance</SelectItem>
                        <SelectItem value="INTERNSHIP">Internship</SelectItem>
                        <SelectItem value="TEMPORARY">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-red-400 text-sm">{errors.category}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-white">
                      Salary Range
                    </Label>
                    <Input
                      id="salary"
                      placeholder="e.g. $120,000 - $150,000"
                      value={formData.salary}
                      onChange={(e) =>
                        setFormData({ ...formData, salary: e.target.value })
                      }
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                    {errors.salary && (
                      <p className="text-red-400 text-sm">{errors.salary}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Job Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role, company culture, and what makes this opportunity special..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-32"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-white">
                    Requirements
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the key requirements and qualifications (one per line)..."
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({ ...formData, requirements: e.target.value })
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities" className="text-white">
                    Key Responsibilities
                  </Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="List the main responsibilities for this role (one per line)..."
                    value={formData.responsibilities}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        responsibilities: e.target.value,
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-white">
                    Required Skills
                  </Label>
                  <Input
                    id="skills"
                    placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loader ? (
                      <div className="w-full flex items-center justify-center">
                        <Loader />
                      </div>
                    ) : (
                      "Post Job"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
