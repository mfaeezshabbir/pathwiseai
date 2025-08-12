import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon, User } from "lucide-react";

export function EditProfileDialog({ user }: { user: any }) {
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile saved:", { name, email, avatarUrl });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="absolute right-4 top-4 w-min"
          aria-label="Edit Profile"
        >
          <PencilIcon className="h-5 w-5" />
          <span className="hidden md:flex">Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[96vw] max-w-md rounded-xl p-6 md:w-full">
        <DialogHeader>
          <DialogTitle className="mb-1 text-2xl font-bold">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="mb-4 text-gray-500">
            Update your personal information and save changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-8 flex flex-col items-center space-y-3">
            <Avatar className="h-24 w-24 border-2 border-primary/70 shadow">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                <User size={40} />
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handlePhotoChange}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handlePhotoClick}
              className="w-36"
            >
              Change Photo
            </Button>
          </div>
          <div className="mb-8 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
        </form>
        <DialogClose asChild>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleSubmit} type="submit">
              Save Changes
            </Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
