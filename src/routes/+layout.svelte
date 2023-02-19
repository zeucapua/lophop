<script lang="ts">
  import "../app.css";
  import "@authorizerdev/authorizer-svelte/styles/default.css";

  import { AuthorizerProvider } from "@authorizerdev/authorizer-svelte";
  import { PUBLIC_AUTHORIZER_CLIENT_ID } from "$env/static/public";

</script>

<AuthorizerProvider
  config={{
    authorizerURL: "https://authorizer-production-01f7.up.railway.app/",
    redirectURL: typeof window != "undefined" ? window.location.origin : "",
    client_id: PUBLIC_AUTHORIZER_CLIENT_ID
  }}
>
  <slot />
</AuthorizerProvider>
