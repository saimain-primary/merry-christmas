<template>
  <div ref="adElement" class="google-ad"></div>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";

const adElement = ref(null);

onMounted(() => {
  loadGoogleAdScript();
  initializeAd();
});

function loadGoogleAdScript() {
  const script = document.createElement("script");
  script.src = "//pagead2.googlesyndication.com/pagead/show_ads.js";
  script.async = true;
  document.head.appendChild(script);
}

function initializeAd() {
  window.google_ad_client = "ca-pub-8191678358595448";
  window.google_ad_slot = "info1";
  window.google_ad_width = 480;
  window.google_ad_height = 320;
  // Attach the ad to the adElement div
  adElement.value.appendChild(document.createElement("ins"));
}
</script>
  
  <style>
.google-ad {
  width: 480px;
  height: 320px;
}
</style>
  