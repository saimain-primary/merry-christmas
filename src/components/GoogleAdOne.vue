<template>
  <div ref="adElementOne" class="google-ad-one"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const adElementOne = ref(null);

const loadAdScript = () => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "//pagead2.googlesyndication.com/pagead/show_ads.js";
  script.async = true;

  // Append the script to the ad container
  adElementOne.value.appendChild(script);

  // Set global ad variables
  window.google_ad_client = "ca-pub-8191678358595448"; // Your ad client
  window.google_ad_slot = "Info"; // Your ad slot
  window.google_ad_width = 300; // Your ad width
  window.google_ad_height = 250; // Your ad height
};

onMounted(() => {
  loadAdScript();
});
</script>


<style>
.google-ad-one {
  width: 300 !important;
  height: 250 !important;
}
</style>