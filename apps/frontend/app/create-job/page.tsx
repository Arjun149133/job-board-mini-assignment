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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const CreateJobPage = () => {
  // const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
    responsibilities: "",
    skills: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.type) {
      newErrors.type = "Job type is required";
    }

    if (!formData.salary.trim()) {
      newErrors.salary = "Salary range is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // toast({
      //   title: "Job Posted Successfully!",
      //   description: "Your job posting has been created and is now live.",
      // });
      // Reset form
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "",
        salary: "",
        description: "",
        requirements: "",
        responsibilities: "",
        skills: "",
      });
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
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-red-400 text-sm">{errors.type}</p>
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
                    Post Job
                  </Button>
                  <Button
                    type="button"
                    className="border border-white/50 text-white hover:bg-black/80"
                  >
                    Save as Draft
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
