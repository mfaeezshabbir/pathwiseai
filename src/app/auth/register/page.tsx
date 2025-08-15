"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Registration failed");
    else {
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => router.push("/profile"), 1200);
    }
  };

  return (
    <div className="flex h-[70vh] items-center justify-center">
      <Card className="flex w-full max-w-md flex-col items-center border border-white/30 p-8 hover:translate-y-0 dark:border-indigo-900/40">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="/assets/pathwiseai_logo.png"
            alt="PathwiseAI Logo"
            className="mb-2 h-12"
          />
          <h2 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
            Register
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create your account to get started.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-center text-sm text-red-500">{error}</div>
          )}
          {success && (
            <div className="text-center text-sm text-green-600">{success}</div>
          )}
          <Button type="submit" className="mt-2 w-full">
            Register
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </div>
      </Card>
    </div>
  );
}
