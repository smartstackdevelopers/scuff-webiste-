import * as React from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Reset Password | You Scuff We Buff",
};

export default function ForgotPasswordPage() {
  return (
    <Card hoverEffect className="border-border/80 bg-card/90 backdrop-blur-xl shadow-luxury-dark">
      <CardHeader className="space-y-2 text-center pb-4">
        <div className="flex justify-center">
          <Badge variant="electric" dot>
            Account Security
          </Badge>
        </div>
        <CardTitle className="text-2xl font-black uppercase tracking-tight">
          Reset Password
        </CardTitle>
        <CardDescription>
          Enter your registered email and we&apos;ll send an encrypted password reset link.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          type="email"
          label="Email Address"
          placeholder="client@example.co.uk"
          leftIcon={<Mail className="w-4 h-4" />}
        />

        <Button variant="glow" className="w-full gap-2 justify-center">
          <span>Send Password Reset Link</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center pt-0 text-center text-xs text-muted-foreground border-t border-border/60 mt-4 py-4">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-electric font-semibold hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
