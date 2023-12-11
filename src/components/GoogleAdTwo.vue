<template>
  <div
    ref="adElement"
    class="google-ad-second max-w-[300px] h-[250px] mx-auto"
  ></div>
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
  window.google_ad_slot = "Info";
  window.google_ad_width = 300;
  window.google_ad_height = 250;
  adElement.value.appendChild(document.createElement("ins"));
}
</script>

<style>
.google-ad-second {
  width: 300px;
  height: 250px;
}
</style>
