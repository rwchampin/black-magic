"use client";
import React, { FC, HTMLAttributes, ReactNode } from 'react';
import './safe-area.css';

interface SafeAreaProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  className?: string;
  children: ReactNode;
}

 

export const SafeArea: FC<SafeAreaProps> = ({ id, className, children, ...props }) => {
  return (
    <div className={`safe-area w-full h-full`} {...props}>
      {children}
    </div>
  );
};
