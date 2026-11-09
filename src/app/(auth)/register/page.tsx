import * as React from "react";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Create Client Account | You Scuff We Buff",
};

export default function RegisterPage() {
  return (
    <Card hoverEffect className="border-border/80 bg-card/90 backdrop-blur-xl shadow-luxury-dark">
      <CardHeader className="space-y-2 text-center pb-4">
        <div className="flex justify-center">
          <Badge variant="electric" dot>
            New Client Registration
          </Badge>
        </div>
        <CardTitle className="text-2xl font-black uppercase tracking-tight">
          Create Account
        </CardTitle>
        <CardDescription>
          Join You Scuff We Buff for priority booking, vehicle maintenance logs, and exclusive promotions.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3.5">
        <Input
          label="Full Name"
          placeholder="Marcus Bennett"
          leftIcon={<User className="w-4 h-4" />}
        />
        <Input
          type="email"
          label="Email Address"
          placeholder="marcus@example.co.uk"
          leftIcon={<Mail className="w-4 h-4" />}
        />
        <Input
          type="tel"
          label="Phone Number"
          placeholder="+44 7000 000000"
          leftIcon={<Phone className="w-4 h-4" />}
        />
        <Input
          type="password"
          label="Password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
        />

        <Link href="/customer/dashboard" className="block w-full pt-2">
          <Button variant="glow" className="w-full gap-2 justify-center">
            <span>Register & Go to Garage</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-0 text-center text-xs text-muted-foreground border-t border-border/60 mt-4 py-4">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-electric font-semibold hover:underline">
            Sign In Instead
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
