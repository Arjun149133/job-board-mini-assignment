"use client";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/context/AppContext";
import { Briefcase, User, UserIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const path = usePathname();
  const [isActive, setIsActive] = useState<
    "jobs" | "create-job" | "admin" | "landing"
  >("landing");
  const { token, setToken } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (path.startsWith("/jobs")) {
      setIsActive("jobs");
    } else if (path.startsWith("/create-job")) {
      setIsActive("create-job");
    } else if (path.startsWith("/admin")) {
      setIsActive("admin");
    } else {
      setIsActive("landing");
    }
  }, [path]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold text-white">JobBoard</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/jobs"
            className={`text-sm font-medium transition-colors ${
              isActive === "jobs"
                ? "text-blue-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Jobs
          </Link>
          {token && (
            <Link
              href="/create-job"
              className={`text-sm font-medium transition-colors ${
                isActive === "create-job"
                  ? "text-blue-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Post Job
            </Link>
          )}
          {token && (
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors ${
                isActive === "admin"
                  ? "text-blue-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Admin
            </Link>
          )}
        </div>

        <div>
          {!token ? (
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button
                  size={"sm"}
                  className="border-white/50 text-white hover:bg-gray-800 border"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size={"sm"}
                  className="bg-blue-600 text-sm hover:bg-blue-700"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className=" flex items-center space-x-4">
              <Link href={"/admin"}>
                <UserIcon className=" w-5 h-5 cursor-pointer text-white" />
              </Link>
              <LogOut
                onClick={() => {
                  localStorage.removeItem("token");
                  setToken(null);
                  router.push("/login");
                }}
                className=" w-5 h-5 cursor-pointer text-white"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
