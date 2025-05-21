"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, X } from "lucide-react";

export function WelcomeBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-background p-6 shadow-md transition-all">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => setVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="rounded-full bg-primary/20 p-3">
          <FileSpreadsheet className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Welcome to Quantum</h2>
          <p className="mt-1 text-muted-foreground">
            Your comprehensive project management platform for data science and strategy consulting projects.
          </p>
        </div>
        <Button size="sm" className="shrink-0">
          Take the tour
        </Button>
      </div>
    </div>
  );
}