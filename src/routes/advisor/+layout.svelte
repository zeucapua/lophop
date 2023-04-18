<script lang="ts">
  import { AuthorizerProvider } from "@authorizerdev/authorizer-svelte";
  import "@authorizerdev/authorizer-svelte/styles/default.css";
  import { PUBLIC_AUTHORIZER_URL, PUBLIC_AUTHORIZER_CLIENT_ID } from "$env/static/public";
</script>

<AuthorizerProvider config={{
  authorizerURL: PUBLIC_AUTHORIZER_URL,
  redirectURL: typeof window != "undefined" ? window.location.origin : "",
  client_id: PUBLIC_AUTHORIZER_CLIENT_ID
}}>
  <slot />
</AuthorizerProvider>
