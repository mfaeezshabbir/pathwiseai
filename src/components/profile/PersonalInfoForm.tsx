import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

export function PersonalInfoForm({ user }: { user: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 border-2 border-primary/50">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>
              <User size={36} />
            </AvatarFallback>
          </Avatar>
          <Button variant="outline">Change Photo</Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue={user.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue={user.email} />
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
