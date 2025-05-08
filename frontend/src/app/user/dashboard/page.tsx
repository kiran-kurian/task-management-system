"use client";

import DashboardLayout from "@/components/Navbar";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Task, Status, Priority } from "@/types/task";
import { ENDPOINTS } from '@/config';

export default function UserHome() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dueDate: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated.");
        router.push("/login");
        return;
      }

      const response = await fetch(ENDPOINTS.TASKS.BASE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || `Failed to fetch tasks: ${response.statusText}`);
      }
    } catch (error) {
      setError("An error occurred while fetching tasks.");
    }
  }, [router]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const filtered = tasks.filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesPriority = !filters.priority || task.priority === filters.priority;
      const matchesDueDate = !filters.dueDate || 
        new Date(task.dueDate).toISOString().split('T')[0] === filters.dueDate;

      return matchesSearch && matchesStatus && matchesPriority && matchesDueDate;
    });

    const sortedTasks = [...filtered].sort((a, b) => {
      const aIsOverdue = new Date(a.dueDate) < new Date();
      const bIsOverdue = new Date(b.dueDate) < new Date();
      
      if (aIsOverdue && !bIsOverdue) return -1;
      if (!aIsOverdue && bIsOverdue) return 1;
      return 0;
    });

    setFilteredTasks(sortedTasks);
  }, [tasks, searchTerm, filters]);

  const updateTaskStatus = async (taskId: number, newStatus: Status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated.");
        router.push("/login");
        return;
      }

      const response = await fetch(ENDPOINTS.TASKS.BYID(taskId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update task status.");
      }
    } catch (err) {
      setError("An error occurred while updating the task.");
    }
  };

  return (
    <DashboardLayout role="User">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">My Tasks</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* Search and Filters */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Search Tasks</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                {Object.values(Status).map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Priorities</option>
                {Object.values(Priority).map((priority) => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No tasks found</p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                    new Date(task.dueDate) < new Date() ? 'border-red-500 bg-red-50 bg-opacity-90' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium">{task.title}</h4>
                      <p className="text-gray-600 mt-1">{task.description}</p>
                      <div className="mt-2 space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {task.priority}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {task.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created by: {task.createdBy?.name || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value as Status)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {Object.values(Status).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
