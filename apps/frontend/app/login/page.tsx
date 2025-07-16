"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Briefcase } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/lib/context/AppContext";
import jwt from "jsonwebtoken";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setToken, setUserId } = useAppContext();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: formData.email,
          password: formData.password,
        });

        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          const decoded: any = jwt.decode(res.data.token);
          setUserId(decoded?.userId || null);

          toast.success("Login successful!");
          router.push("/jobs");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(
          "Failed to log in. Please check your credentials and try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">JobBoard</span>
          </div>
          <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-400 hover:text-blue-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
