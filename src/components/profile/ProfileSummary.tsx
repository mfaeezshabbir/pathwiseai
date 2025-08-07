import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, Star, User } from "lucide-react";

export function ProfileSummary({ user, stats }: { user: any; stats: any }) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-[#18181b] rounded-2xl shadow border border-gray-200 dark:border-gray-800">
      <Avatar className="h-24 w-24 border-4 border-indigo-300 dark:border-indigo-700 shadow-lg">
        <AvatarImage src={user.avatarUrl} />
        <AvatarFallback>
          <User size={40} />
        </AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-muted-foreground text-sm">{user.email}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {user.skills.slice(0, 4).map((skill: string, i: number) => (
          <Badge key={i} variant="default">
            {skill}
          </Badge>
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        <div className="flex flex-col items-center">
          <Book className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg">{stats.roadmapsStarted}</span>
          <span className="text-xs text-muted-foreground">Roadmaps</span>
        </div>
        <div className="flex flex-col items-center">
          <Star className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg">
            {stats.modulesCompleted}
          </span>
          <span className="text-xs text-muted-foreground">Modules</span>
        </div>
        <div className="flex flex-col items-center">
          <User className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg">{user.rank}</span>
          <span className="text-xs text-muted-foreground">Rank</span>
        </div>
      </div>
      <Button variant="outline" size="sm" className="mt-4">
        Edit Profile
      </Button>
    </div>
  );
}
