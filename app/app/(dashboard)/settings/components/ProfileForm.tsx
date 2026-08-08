"use client";

import { useState, useTransition } from "react";
import { User, Mail, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { updateUserProfile } from "../actions";
import { toast } from "sonner";

interface ProfileFormProps {
  initialUser: {
    name: string;
    email: string;
    avatarUrl?: string | null;
  };
}

export function ProfileForm({ initialUser }: ProfileFormProps) {
  const [name, setName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [avatarUrl, setAvatarUrl] = useState(initialUser.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(initialUser.name)}`);
  const [isPending, startTransition] = useTransition();

  const hasChanges = name !== initialUser.name || email !== initialUser.email;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    startTransition(async () => {
      const res = await updateUserProfile(name, email);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Profile updated successfully");
        if (res.avatarUrl) {
          setAvatarUrl(res.avatarUrl);
        }
      }
    });
  };

  const regenerateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const newAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(randomSeed)}`;
    setAvatarUrl(newAvatar);
  };

  return (
    <div className="bg-surface border border-hairline rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="border-b border-hairline pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-sans font-semibold text-ink">User Profile Settings</h2>
          <p className="text-xs text-ink-muted mt-1">Manage your account information and avatar.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-2">
          {/* Avatar Preview */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 rounded-full border-2 border-primary bg-surface-inset overflow-hidden flex items-center justify-center p-2">
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-contain" />
            </div>
            <button
              type="button"
              onClick={regenerateAvatar}
              className="absolute -bottom-1 -right-1 bg-primary hover:bg-primary-hover text-on-primary rounded-full p-2 cursor-pointer shadow-md transition-colors"
              title="Regenerate avatar"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-sans font-medium text-ink text-sm">Profile Avatar</h3>
            <p className="text-[11px] text-ink-muted">Generates a bot avatar seed based on your profile inputs.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5 relative">
            <Label htmlFor="profile-name" className="text-xs font-medium text-ink">Full Name</Label>
            <div className="relative">
              <User className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="profile-name"
                type="text"
                placeholder="Full name"
                value={name}
                disabled={isPending}
                onChange={(e) => setName(e.target.value)}
                className="bg-surface border-hairline font-sans text-xs focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary pl-9 h-10 rounded-md w-full"
              />
            </div>
          </div>

          <div className="space-y-1.5 relative">
            <Label htmlFor="profile-email" className="text-xs font-medium text-ink">Email Address</Label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="profile-email"
                type="email"
                placeholder="Email address"
                value={email}
                disabled={isPending}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface border-hairline font-sans text-xs focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary pl-9 h-10 rounded-md w-full"
              />
            </div>
          </div>
        </div>

        {hasChanges && (
          <div className="pt-4 border-t border-hairline flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium h-10 px-6 rounded-md cursor-pointer transition-colors"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
