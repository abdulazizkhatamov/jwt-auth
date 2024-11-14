import { useState } from "react";
import { postRegister } from "@/api/auth-api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function RegisterForm() {
  // Step 1: State for form values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Step 2: Mutation for register
  const { mutate, isPending, error } = useMutation({
    mutationFn: postRegister,
    onSuccess: (response) => {
      console.log(response);
      // Handle success, like saving the token in Redux or redirecting
    },
    onError: (err) => {
      console.error("Error during register:", err);
    },
  });

  // Step 3: Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      mutate({ username, password });
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your username and password to register to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating account..." : "Register"}
            </Button>
          </div>
        </form>
        {error && (
          <div className="mt-2 text-center text-sm text-red-600">
            Registration failed. Please try again.
          </div>
        )}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
