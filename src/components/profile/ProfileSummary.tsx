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
    <div className="relative mx-auto w-full rounded-3xl border border-gray-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-8 shadow-xl dark:border-gray-800 dark:bg-gradient-to-br dark:from-[#18181b] dark:via-[#232336] dark:to-[#18181b]">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Avatar className="h-28 w-28 border-4 border-indigo-400 shadow-xl dark:border-indigo-700">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>
              <User size={44} />
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-400 ring-2 ring-white dark:ring-[#18181b]" />
        </div>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {user.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {user.skills.slice(0, 4).map((skill: string, i: number) => (
            <Badge
              key={i}
              variant="secondary"
              className="bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center rounded-xl bg-white/70 p-4 shadow-sm dark:bg-[#232336]">
          <Book className="mb-1 h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          <span className="text-xl font-bold">{stats.roadmapsStarted}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Roadmaps
          </span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-white/70 p-4 shadow-sm dark:bg-[#232336]">
          <Star className="mb-1 h-6 w-6 text-yellow-500 dark:text-yellow-400" />
          <span className="text-xl font-bold">{stats.modulesCompleted}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Modules
          </span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-white/70 p-4 shadow-sm dark:bg-[#232336]">
          <User className="mb-1 h-6 w-6 text-pink-500 dark:text-pink-400" />
          <span className="text-xl font-bold">{user.rank}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Rank</span>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <EditProfileDialog user={userProfile} />
      </div>
    </div>
  );
}
