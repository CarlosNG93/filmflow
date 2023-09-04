// types/next-auth.d.ts

import "next-auth/react";

declare module "next-auth/react" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}
