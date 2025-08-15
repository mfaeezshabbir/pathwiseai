"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) setError("Invalid credentials");
    else router.push("/profile");
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
            Sign In
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Please enter your credentials.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
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
          <Button type="submit" className="mt-2 w-full">
            Sign In
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </Card>
    </div>
  );
}
