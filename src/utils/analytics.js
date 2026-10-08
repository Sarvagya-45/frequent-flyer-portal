export function trackPortalInteraction() {
  if (import.meta.env.DEV) {
    console.info("[Analytics] User interacted with Frequent Flyer Portal");
  }
}
