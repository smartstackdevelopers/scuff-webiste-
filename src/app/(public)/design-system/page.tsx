"use client";

import * as React from "react";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Palette,
  Layers,
  ArrowRight,
  Car,
  Calendar,
  Wrench,
  Search,
  Mail,
  Lock,
  User,
  Sliders,
} from "lucide-react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  AvatarFallback,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Tooltip,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Skeleton,
  Separator,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  EmptyState,
  Alert,
  AlertTitle,
  AlertDescription,
  Container,
} from "@/components/ui";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { SlideUp, FadeIn } from "@/components/animations";

export default function DesignSystemShowcase() {
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState("");
  const [selectedService, setSelectedService] = React.useState("scuff-repair");
  const [vehicleType, setVehicleType] = React.useState("sedan");
  const [agreeTerms, setAgreeTerms] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertDismissed, setAlertDismissed] = React.useState(false);

  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-electric/10 via-electric/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="max-w-6xl mx-auto space-y-16">
          <SlideUp className="text-center space-y-4">
            <div className="flex flex-wrap justify-center items-center gap-2">
              <Badge variant="electric" dot>
                Design System Showcase
              </Badge>
              <Badge variant="success">All 18 UI Components Active</Badge>
              <Badge variant="neutral">UK Automotive Standard</Badge>
            </div>

            <h1 className="text-display">
              <span className="text-foreground">Design </span>
              <span className="text-gradient-electric">Tokens & UI Library</span>
            </h1>

            <p className="text-subheading max-w-2xl mx-auto">
              Luxury automotive detailing visual identity & component library.
            </p>

            <div className="pt-2 flex justify-center items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Theme Engine:
              </span>
              <ThemeToggle variant="segmented" />
            </div>
          </SlideUp>

          <FadeIn>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Design System & UI Library</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </FadeIn>

          {!alertDismissed && (
            <SlideUp delay={0.05}>
              <Alert variant="electric" onClose={() => setAlertDismissed(true)}>
                <AlertTitle className="text-foreground font-bold">
                  Design Token Infrastructure Initialized
                </AlertTitle>
                <AlertDescription>
                  Centralized semantic tokens for dark charcoal surfaces, clean light backgrounds,
                  electric blue accents, and typography scale are loaded.
                </AlertDescription>
              </Alert>
            </SlideUp>
          )}

          <Tabs defaultValue="components" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="bg-card/80 p-1.5 border border-border/80">
                <TabsTrigger value="components" icon={<Layers className="w-4 h-4" />}>
                  UI Components (18)
                </TabsTrigger>
                <TabsTrigger value="colors" icon={<Palette className="w-4 h-4" />}>
                  Color & Tokens
                </TabsTrigger>
                <TabsTrigger value="typography" icon={<Sparkles className="w-4 h-4" />}>
                  Typography Scale
                </TabsTrigger>
                <TabsTrigger value="overlays" icon={<Sliders className="w-4 h-4" />}>
                  Dialogs & Feedback
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="components" className="space-y-12">
              <div className="space-y-6">
                <div className="border-b border-border/80 pb-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Zap className="w-5 h-5 text-electric" />
                    1. Buttons & Badges
                  </h2>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setBtnLoading(!btnLoading)}
                  >
                    Toggle Loading: {btnLoading ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card hoverEffect>
                    <CardHeader>
                      <CardTitle className="text-base">Button Variants</CardTitle>
                      <CardDescription>Micro-interactions and luxury feedback</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-3">
                      <Button variant="default" isLoading={btnLoading}>Primary</Button>
                      <Button variant="glow" isLoading={btnLoading}>Electric Glow</Button>
                      <Button variant="secondary" isLoading={btnLoading}>Secondary</Button>
                      <Button variant="outline" isLoading={btnLoading}>Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="link">Text Link</Button>
                    </CardContent>
                  </Card>

                  <Card hoverEffect>
                    <CardHeader>
                      <CardTitle className="text-base">Sizes & Icon Slots</CardTitle>
                      <CardDescription>Responsive sizes from micro badges to hero callouts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Button size="xs" variant="secondary">Size XS</Button>
                        <Button size="sm">Size SM</Button>
                        <Button size="default">Size Default</Button>
                        <Button size="lg" variant="glow">Size LG</Button>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Button
                          leftIcon={<Calendar className="w-4 h-4" />}
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                          Book Service Slot
                        </Button>
                        <Button variant="secondary" size="icon" aria-label="Search">
                          <Search className="w-4 h-4" />
                        </Button>
                        <Button disabled>Disabled Action</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card hoverEffect className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-base">Automotive Status Badges</CardTitle>
                      <CardDescription>Precision tags with optional status indicators</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-3">
                      <Badge variant="default" dot>Primary</Badge>
                      <Badge variant="electric" dot>Ceramic Coating</Badge>
                      <Badge variant="success" dot>Fully Insured</Badge>
                      <Badge variant="pending" dot>Slot Pending</Badge>
                      <Badge variant="warning" dot>Limited Slots</Badge>
                      <Badge variant="error" dot>Paint Flaw Detected</Badge>
                      <Badge variant="neutral">Workshop Studio</Badge>
                      <Badge variant="outline">Mobile Detailing Van</Badge>
                      <Badge size="lg" variant="electric">Large VIP Badge</Badge>
                      <Badge size="sm" variant="success">Compact</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-border/80 pb-3">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-electric" />
                    2. Form & Booking Controls
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card hoverEffect>
                    <CardHeader>
                      <CardTitle className="text-base">Text, Email & Password Inputs</CardTitle>
                      <CardDescription>Floating boundaries & clear error states</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        label="Full Name"
                        placeholder="John Smith"
                        leftIcon={<User className="w-4 h-4" />}
                        helperText="Required for booking confirmation."
                      />
                      <Input
                        type="email"
                        label="Email Address"
                        placeholder="john@example.co.uk"
                        leftIcon={<Mail className="w-4 h-4" />}
                        success
                      />
                      <Input
                        type="password"
                        label="Client Password"
                        placeholder="••••••••"
                        leftIcon={<Lock className="w-4 h-4" />}
                        helperText="Toggle show/hide eye icon included."
                      />
                      <Input
                        type="search"
                        label="Search Services"
                        placeholder="Search scratches, ceramic, alloys..."
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        clearable
                        onClear={() => setSearchVal("")}
                      />
                    </CardContent>
                  </Card>

                  <Card hoverEffect>
                    <CardHeader>
                      <CardTitle className="text-base">Dropdowns & Textarea</CardTitle>
                      <CardDescription>Custom accessible select list and textarea</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select
                        label="Service Required"
                        value={selectedService}
                        onChange={setSelectedService}
                        options={[
                          { value: "scuff-repair", label: "SMART Scuff & Scratch Repair" },
                          { value: "paint-correction", label: "Multi-Stage Paint Correction" },
                          { value: "ceramic-coating", label: "9H Ceramic & Graphene Coating" },
                        ]}
                      />
                      <Textarea
                        label="Specific Damage Details"
                        placeholder="Describe scratches, paint depth, or specific areas..."
                        maxLength={250}
                        showCount
                      />
                      <div className="pt-2">
                        <Switch
                          checked={notificationsEnabled}
                          onChange={setNotificationsEnabled}
                          label="Instant SMS Notifications"
                          description="Receive live progress photos during detailing."
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card hoverEffect className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-base">Vehicle Category Selection (Radio Cards)</CardTitle>
                      <CardDescription>Accessible selectable cards with active electric borders</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <RadioGroup
                        value={vehicleType}
                        onChange={setVehicleType}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                      >
                        <RadioGroupItem
                          variant="card"
                          value="hatchback"
                          label="Compact / Hatchback"
                          description="e.g. Golf, A3, Mini Cooper"
                          icon={<Car className="w-5 h-5" />}
                        />
                        <RadioGroupItem
                          variant="card"
                          value="sedan"
                          label="Executive Saloon"
                          description="e.g. BMW 3/5 Series, C-Class"
                          icon={<Car className="w-5 h-5" />}
                        />
                        <RadioGroupItem
                          variant="card"
                          value="suv"
                          label="SUV / 4x4 / Supercar"
                          description="e.g. Range Rover, Porsche 911"
                          icon={<Car className="w-5 h-5" />}
                        />
                      </RadioGroup>

                      <Separator label="TERMS & CONFIRMATION" />

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <Checkbox
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          label="I confirm the vehicle is accessible for a mobile detailing van."
                          description="Includes access to water and electrical hookup."
                        />
                        <Checkbox
                          defaultChecked
                          label="Send invoice via WhatsApp"
                          description="Fast paperless billing"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-border/80 pb-3">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-electric" />
                    3. Avatars, Skeletons & Empty States
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card hoverEffect>
                    <CardHeader>
                      <CardTitle className="text-base">Technician Avatars</CardTitle>
                      <CardDescription>Status indicators: online, verified, busy</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar size="xl" status="online">
                          <AvatarFallback>MB</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold text-foreground">Marcus Bennett</p>
                          <p className="text-xs text-muted-foreground">Lead Master Polisher</p>
                          <Badge size="sm" variant="success" className="mt-1">Available Today</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card hoverEffect>
                    <CardHeader>
                      <CardTitle className="text-base">Luxury Shimmer Loaders</CardTitle>
                      <CardDescription>Fluid shimmer effect during async fetches</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                      <Skeleton className="h-24 w-full rounded-xl" />
                    </CardContent>
                  </Card>

                  <Card hoverEffect>
                    <CardHeader>
                      <CardTitle className="text-base">Interactive Tooltips</CardTitle>
                      <CardDescription>Hover over badges to view micro-tooltips</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 justify-center items-center py-6">
                      <Tooltip content="9H ceramic hardness creates a permanent glass shield">
                        <Button variant="outline" size="sm">Hover for Ceramic Tooltip</Button>
                      </Tooltip>
                      <Tooltip content="Mobile vans equipped with 500L pure water tanks" side="bottom">
                        <Badge variant="electric" className="cursor-pointer">Mobile Van Info</Badge>
                      </Tooltip>
                    </CardContent>
                  </Card>

                  <div className="md:col-span-3">
                    <EmptyState
                      icon={<Calendar className="w-6 h-6 text-electric" />}
                      title="No Detailing Appointments Booked"
                      description="You currently have no scheduled mobile or studio sessions. Choose a service tier to secure your booking."
                      action={
                        <Button
                          variant="glow"
                          onClick={() => setDialogOpen(true)}
                          leftIcon={<Sparkles className="w-4 h-4" />}
                        >
                          Book Initial Session
                        </Button>
                      }
                      secondaryAction={<Button variant="secondary">View Pricing Guide</Button>}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Centralized Color Tokens & CSS Variables</CardTitle>
                  <CardDescription>Controlled via variables in globals.css.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Automotive Dark Palette (Default)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-4 rounded-xl bg-[#080A0E] text-white border border-white/10 space-y-1">
                        <p className="text-xs font-bold">Deep Charcoal</p>
                        <p className="text-[11px] text-gray-400">#080A0E</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0E1118] text-white border border-white/10 space-y-1">
                        <p className="text-xs font-bold">Dark Card</p>
                        <p className="text-[11px] text-gray-400">#0E1118</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0066FF] text-white space-y-1 shadow-glow-sm">
                        <p className="text-xs font-bold">Electric Blue</p>
                        <p className="text-[11px] text-blue-100">#0066FF</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#00D2FF] text-black space-y-1 shadow-glow-cyan">
                        <p className="text-xs font-bold">Cyan Glow</p>
                        <p className="text-[11px] text-slate-800">#00D2FF</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Typography System & Hierarchy</CardTitle>
                  <CardDescription>Inter variable font with strict letter tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 divide-y divide-border/60">
                  <div className="pt-2 space-y-1">
                    <p className="text-xs text-muted-foreground font-mono">.text-display (4xl to 7xl)</p>
                    <h1 className="text-display">MASTER VEHICLE DETAILING</h1>
                  </div>
                  <div className="pt-4 space-y-1">
                    <p className="text-xs text-muted-foreground font-mono">.text-page-title (3xl to 5xl)</p>
                    <h2 className="text-page-title">CERAMIC PAINT CORRECTION</h2>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overlays" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Modal Dialog & Alert Feedback</CardTitle>
                  <CardDescription>Accessible modal overlays with scroll locking and backdrop blur</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 rounded-xl border border-dashed border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-foreground">Interactive Dialog Demo</h4>
                      <p className="text-sm text-muted-foreground">Click below to open the animated modal.</p>
                    </div>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger>
                        <Button variant="glow" leftIcon={<Sparkles className="w-4 h-4" />}>
                          Open Booking Modal
                        </Button>
                      </DialogTrigger>
                      <DialogContent size="default">
                        <DialogHeader>
                          <DialogTitle>Book Precision Vehicle Inspection</DialogTitle>
                          <DialogDescription>
                            Enter your vehicle registration to schedule a slot.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-2">
                          <Input
                            label="UK Vehicle Registration"
                            placeholder="e.g. BD21 YWB"
                            leftIcon={<Car className="w-4 h-4 text-electric" />}
                          />
                        </div>

                        <DialogFooter>
                          <DialogClose>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button variant="glow" onClick={() => setDialogOpen(false)}>
                            Confirm Booking Slot
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-3">
                    <Alert variant="info">
                      <AlertTitle>Information Notice</AlertTitle>
                      <AlertDescription>
                        Paint inspection requires clean, dry conditions for accurate digital depth readings.
                      </AlertDescription>
                    </Alert>

                    <Alert variant="success">
                      <AlertTitle>Ceramic Warranty Active</AlertTitle>
                      <AlertDescription>
                        Your 5-Year Graphene coating has been registered in the national vehicle database.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  );
}
