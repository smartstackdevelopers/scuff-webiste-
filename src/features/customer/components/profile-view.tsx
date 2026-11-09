"use client";

import * as React from "react";
import { useCustomer } from "../hooks/use-customer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Camera,
} from "lucide-react";

export function ProfileView() {
  const { profile, updateProfile } = useCustomer();

  const [fullName, setFullName] = React.useState(profile.fullName);
  const [email, setEmail] = React.useState(profile.email);
  const [phone, setPhone] = React.useState(profile.phone);
  const [address, setAddress] = React.useState(profile.address || "");
  const [preferredContact, setPreferredContact] = React.useState(
    profile.preferredContact
  );
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      phone,
      address,
      preferredContact,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar size="lg">
              <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-electric text-black shadow-md hover:scale-105 transition-transform"
              title="Change avatar photo"
              onClick={() => alert("Avatar upload: file chooser simulated.")}
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">
                {profile.fullName}
              </h2>
              <Badge variant="electric" className="text-xs">
                Private Client VIP
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Member since {profile.memberSince} • Verified Account
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile saved successfully</span>
          </div>
        )}
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-electric" />
            <span>Personal & Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                UK Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Preferred Contact Method
              </label>
              <select
                value={preferredContact}
                onChange={(e) =>
                  setPreferredContact(
                    e.target.value as "phone" | "email" | "whatsapp"
                  )
                }
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
              >
                <option value="whatsapp">WhatsApp (Direct Technician Photos & Live Updates)</option>
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
              Service Address (Used for Mobile Detailing)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, Town, Postcode"
                className="pl-9"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="default" size="sm" className="font-bold">
              Save Profile Changes
            </Button>
          </div>
        </div>

        {/* Security & Access Section */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-electric" />
            <span>Security & Authentication</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <span>Password Protected</span>
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Last changed 3 months ago
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => alert("Password reset link sent to registered email.")}
              >
                Change
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Two-Factor Authentication</span>
                </div>
                <p className="text-muted-foreground mt-0.5">
                  SMS verification enabled
                </p>
              </div>
              <Badge variant="success" className="text-[10px]">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
