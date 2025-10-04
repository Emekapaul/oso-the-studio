"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Users,
  Calendar,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Upload,
  FolderOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Share2,
} from "lucide-react";
import { clientAuth } from "@/lib/auth";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    if (!clientAuth.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    clientAuth.logout();
  };

  // Mock data for demonstration
  const stats = [
    {
      icon: Camera,
      label: "Total Uploads",
      value: "2,847",
      change: "+127 this month",
      color: "bg-blue-500",
      trend: "up",
    },
    {
      icon: Users,
      label: "Active Clients",
      value: "89",
      change: "+8 this week",
      color: "bg-green-500",
      trend: "up",
    },
    {
      icon: Calendar,
      label: "Bookings This Month",
      value: "23",
      change: "+15% vs last month",
      color: "bg-purple-500",
      trend: "up",
    },
    {
      icon: Mail,
      label: "Pending Inquiries",
      value: "7",
      change: "3 urgent",
      color: "bg-orange-500",
      trend: "neutral",
    },
  ];

  const quickActions = [
    {
      icon: Upload,
      title: "Upload Media",
      description: "Add new photos and videos to gallery",
      color: "bg-warm-brown",
      href: "/admin/upload",
    },
    {
      icon: FolderOpen,
      title: "Media Manager",
      description: "Organize and manage your media library",
      color: "bg-blue-600",
      href: "/admin/media",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-brown mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Camera className="h-8 w-8 text-warm-brown" />
              <div>
                <h1 className="text-xl font-bold text-neutral-900">
                  OsoTheStudio
                </h1>
                <p className="text-sm text-neutral-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-900">
                  Welcome back!
                </p>
                <p className="text-xs text-neutral-600">
                  Last login: Today, 9:30 AM
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-neutral-600 hover:text-warm-brown transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-neutral-100"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Dashboard Overview
          </h2>
          <p className="text-neutral-600">
            Manage your photography business from one central location
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${stat.color
                    .replace("bg-", "bg-")
                    .replace("-500", "-100")}`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${stat.color.replace("bg-", "text-")}`}
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp
                    className={`h-4 w-4 ${
                      stat.trend === "up"
                        ? "text-green-500"
                        : "text-neutral-400"
                    }`}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-neutral-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-500">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-neutral-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => router.push(action.href)}
                className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-200 text-left group hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-200`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-neutral-900 group-hover:text-warm-brown transition-colors duration-200">
                      {action.title}
                    </h4>
                    <p className="text-sm text-neutral-600 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
