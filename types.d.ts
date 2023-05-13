import type { 
  Session as OGSession,
  DefaultSession,
} from "@auth/sveltekit/node_modules/@auth/core/types";

declare module "@auth/sveltekit/node_modules/@auth/core/types" {
  interface Session extends OGSession {
    user?: {
      id : string,
    } & DefaultSession["user"],
  }
}
