import * as React from "react";
import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Account Login | You Scuff We Buff",
};

export default function LoginPage() {
  return (
    <Card hoverEffect className="border-border/80 bg-card/90 backdrop-blur-xl shadow-luxury-dark">
      <CardHeader className="space-y-2 text-center pb-4">
        <div className="flex justify-center">
          <Badge variant="electric" dot>
            Client & Staff Portal
          </Badge>
        </div>
        <CardTitle className="text-2xl font-black uppercase tracking-tight">
          Welcome Back
        </CardTitle>
        <CardDescription>
          Sign in to view your vehicle detailing history, active bookings, and inspection reports.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          type="email"
          label="Email Address"
          placeholder="client@example.co.uk"
          leftIcon={<Mail className="w-4 h-4" />}
        />
        <div className="space-y-1">
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
          />
          <div className="flex justify-end pt-1">
            <Link
              href="/forgot-password"
              className="text-xs text-electric hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Link href="/customer/dashboard" className="block w-full pt-2">
          <Button variant="glow" className="w-full gap-2 justify-center">
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-0 text-center text-xs text-muted-foreground border-t border-border/60 mt-4 py-4">
        <p>
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-electric font-semibold hover:underline">
            Create an Account
          </Link>
        </p>
        <div className="flex justify-center gap-3 text-[11px] text-muted-foreground/80">
          <Link href="/admin/dashboard" className="hover:text-foreground">
            Switch to Admin Demo →
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
