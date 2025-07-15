import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Briefcase className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">JobBoard</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 JobBoard. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
