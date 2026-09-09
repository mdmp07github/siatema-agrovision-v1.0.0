import React, { type HTMLAttributes, type ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const CardLayout: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-3 w-full ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardLayoutHeader: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`h-20 w-full rounded-lg bg-muted flex items-center justify-between px-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardLayoutBody: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`flex gap-3 w-full rounded-lg bg-muted items-center p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};