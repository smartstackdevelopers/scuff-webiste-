import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

export interface RoutePlaceholderProps {
  title: string;
  category: "Public Website" | "Customer Portal" | "Admin Suite" | "Authentication";
  description: string;
  moduleBadge: string;
  icon?: React.ReactNode;
  breadcrumbs?: { title: string; href?: string }[];
}

export function RoutePlaceholder({
  title,
  category,
  description,
  moduleBadge,
  icon,
  breadcrumbs = [],
}: RoutePlaceholderProps) {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((b, i) => (
                  <React.Fragment key={i}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {b.href ? (
                        <BreadcrumbLink href={b.href}>{b.title}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{b.title}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {/* Main Card */}
          <Card hoverEffect className="border-border/80 bg-card/85 backdrop-blur-md shadow-lg">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="electric" dot>
                  {category}
                </Badge>
                <Badge variant="pending" dot>
                  {moduleBadge}
                </Badge>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {icon && (
                  <div className="p-3 rounded-2xl bg-secondary/80 border border-border text-electric shrink-0">
                    {icon}
                  </div>
                )}
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                    {title}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 text-xs text-muted-foreground flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  Navigation and layout verified. Route convention connected to Main Layout system.
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/">
                  <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                    Return to Home
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="glow" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View Detailing Packages
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
