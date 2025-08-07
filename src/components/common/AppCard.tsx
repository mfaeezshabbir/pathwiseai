import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import React from 'react';

export function AppCard({
  title,
  description,
  children,
  className = '',
  headerClass = '',
  contentClass = '',
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerClass?: string;
  contentClass?: string;
}) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader className={headerClass}>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={contentClass}>{children}</CardContent>
    </Card>
  );
}
