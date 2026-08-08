"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuthStore } from "../hooks/useAuthStore";
import { updateProfileAction } from "@/app/(dashboard)/profile-actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileEditDialog({ open, onOpenChange }: ProfileEditDialogProps) {
  const { userName, userEmail, userAvatarUrl, setProfile } = useAuthStore();
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [loading, setLoading] = useState(false);

  // Sync state with store values when dialog opens
  useEffect(() => {
    if (open) {
      setName(userName);
      setEmail(userEmail);
    }
  }, [open, userName, userEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const res = await updateProfileAction(name, email);
    setLoading(false);

    if (res.error) {
      toast.error(res.error);
      return;
    }

    if (res.success && res.user) {
      setProfile({
        name: res.user.name,
        email: res.user.email,
        avatarUrl: res.user.avatarUrl || "",
      });
      toast.success("Profile updated successfully");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-surface border border-hairline rounded-lg p-6 shadow-high">
        <DialogHeader>
          <DialogTitle className="text-xl font-sans font-semibold text-ink">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex flex-col items-center justify-center gap-2 pb-4">
            {userAvatarUrl ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-hairline bg-surface-inset">
                <Image
                  src={userAvatarUrl}
                  alt="User Avatar"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-sidebar-active border border-hairline animate-pulse" />
            )}
            <span className="text-[10px] font-mono text-ink-faint uppercase">Dicebear Avatar (Auto Generated)</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-name" className="text-body-sm font-medium text-ink">
              Full Name
            </Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-surface-inset border-hairline font-sans text-sm focus:border-primary focus:ring-1 focus:ring-primary h-11 rounded-sm transition-all shadow-sm"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email" className="text-body-sm font-medium text-ink">
              Email Address
            </Label>
            <Input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface-inset border-hairline font-sans text-sm focus:border-primary focus:ring-1 focus:ring-primary h-11 rounded-sm transition-all shadow-sm"
              placeholder="Email Address"
              required
            />
          </div>

          <DialogFooter className="pt-4 border-t border-hairline gap-3">
            <Button
              type="button"
              variant="ghost"
              disabled={loading}
              onClick={() => onOpenChange(false)}
              className="font-sans text-ink-muted hover:text-ink hover:bg-surface-inset rounded-full h-10 px-4 cursor-pointer transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-full h-10 px-6 shadow-md cursor-pointer transition-all"
            >
              {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
