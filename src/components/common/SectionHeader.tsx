import React from "react";

export function SectionHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {icon && (
        <span className="text-primary h-8 w-8 flex items-center">{icon}</span>
      )}
      <div>
        <h2 className="text-xl font-bold leading-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
