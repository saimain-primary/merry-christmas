<template>
  <div ref="adElementTwo" class="google-ad-second"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const adElementTwo = ref(null);

const loadAdScript = () => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "//pagead2.googlesyndication.com/pagead/show_ads.js";
  script.async = true;

  // Append the script to the ad container
  adElementTwo.value.appendChild(script);

  // Set global ad variables
  window.google_ad_client = "ca-pub-8191678358595448"; // Your ad client
  window.google_ad_slot = "info1"; // Your ad slot
  window.google_ad_width = 480; // Your ad width
  window.google_ad_height = 320; // Your ad height
};

onMounted(() => {
  loadAdScript();
});
</script>

<style>
.google-ad-second {
  width: 480 !important;
  height: 320 !important;
}
</style>
