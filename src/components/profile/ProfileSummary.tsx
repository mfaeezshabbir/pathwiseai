import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, Star, User } from "lucide-react";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";

export function ProfileSummary({
  user,
  stats,
  userProfile,
}: {
  user: any;
  stats: any;
  userProfile: any;
}) {
  return (
    <div className="relative flex w-full flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow dark:border-gray-800 dark:bg-[#18181b]">
      <Avatar className="h-24 w-24 border-4 border-indigo-300 shadow-lg dark:border-indigo-700">
        <AvatarImage src={user.avatarUrl} />
        <AvatarFallback>
          <User size={40} />
        </AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-sm text-muted-foreground">{user.email}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {user.skills.slice(0, 4).map((skill: string, i: number) => (
          <Badge key={i} variant="default">
            {skill}
          </Badge>
        ))}
      </div>
      <div className="mt-2 flex gap-4">
        <div className="flex flex-col items-center">
          <Book className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">{stats.roadmapsStarted}</span>
          <span className="text-xs text-muted-foreground">Roadmaps</span>
        </div>
        <div className="flex flex-col items-center">
          <Star className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">
            {stats.modulesCompleted}
          </span>
          <span className="text-xs text-muted-foreground">Modules</span>
        </div>
        <div className="flex flex-col items-center">
          <User className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">{user.rank}</span>
          <span className="text-xs text-muted-foreground">Rank</span>
        </div>
      </div>{" "}
      <EditProfileDialog user={userProfile} />
    </div>
  );
}
