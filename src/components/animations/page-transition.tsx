"use client";

import * as React from "react";

/** Keep layout stable — full page motion was contributing to visual jumpiness. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
