<template>
  <div
    class="flex flex-col items-center justify-start h-screen p-8 bg-white bg-cover w-100"
    style="background-image: url('/red-bg.png')"
  >
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
    />
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="snowConfig"
    />
    <img src="./assets/top.png" class="w-48" alt="" />

    <h3
      class="text-3xl font-bold mb-20 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
    >
      Magical Santa Claus
    </h3>
    <div
      class="mb-10 text-lg text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
      v-if="timeLeft"
    >
      <span>{{ timeLeft.days }}</span> days,
      <span>{{ timeLeft.hours }}</span> hours,
      <span>{{ timeLeft.minutes }}</span> minutes,
      <span>{{ timeLeft.seconds }}</span> seconds
    </div>
    <div
      v-else
      class="mb-10 text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
    >
      Merry Christmas!
    </div>
    <button
      @click.prevent="scrollToTarget"
      class="text-2xl animate-bounce font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,100,0,0.8)]"
    >
      👉🏻 Touch it and see 👈🏻
    </button>
  </div>

  <div
    class="flex flex-col items-center justify-start h-screen p-10 bg-white bg-cover py-14 w-100"
    style="background-image: url('/bell.jpg')"
    id="secondDiv"
    ref="secondDiv"
  >
    <img src="./assets/gift.png" class="w-48 mb-20 animate-bounce" alt="" />
    <div v-if="!name || name === ''">
      <input
        type="text"
        v-model="nameInput"
        class="inline-block w-full p-4 mb-2 rounded-full focus:outline-none focus:shadow-none"
        placeholder="Write your name here"
      />
      <button
        @click="updateURL"
        class="w-full p-4 bg-white rounded-full shadow-sm"
      >
        See your wish
      </button>
    </div>
    <div class="bg-red-500">
      <GoogleAd />
      <!-- First ad -->
      <GoogleAdSecond />
      <!-- Second ad -->
    </div>
    <h3
      class="mb-20 text-2xl font-bold text-center drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,100)] text-white"
    >
      {{ name }}
    </h3>
    <p
      class="text-xl leading-10 text-center mb-20 tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,100)]"
    >
      Here comes what I was waiting for <br />
      Everyone say it together, my friend. <br />
      December brought the spring of Christmas <br />
      Merry Christmas to you my friend
    </p>
    <div v-if="name" class="flex items-center gap-5">
      <button
        @click.prevent="shareOnFb"
        class="inline-block p-2 px-4 font-normal text-white bg-green-500 rounded-md"
      >
        Share on Facebook
      </button>
      <button
        @click.prevent="copyToClipboard"
        class="inline-block p-2 px-4 font-normal text-white bg-red-500 rounded-md"
      >
        Copy Link to Share
      </button>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, nextTick, computed, onUnmounted } from "vue";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import snowConfig from "./assets/snow.json";
import GoogleAdOne from "./components/GoogleAdOne.vue";
import GoogleAdTwo from "./components/GoogleAdTwo.vue";

const christmasDate = new Date("Dec 25, 2023 00:00:00").getTime();
const timeLeft = ref(null);
const name = ref("");
const nameInput = ref("");
const baseUrl = computed(() => window.location.origin);

const adContainer1 = ref(null);

// Define your share options
const facebookShareOptions = ref({
  url: "",
  quote: "",
  hashtag: "#MerryChristmas",
});

const particlesInit = async (engine) => {
  //await loadFull(engine);
  await loadSlim(engine);
};
const adElement = ref(null);

const particlesLoaded = async (container) => {};

const updateURL = () => {
  const newURL = new URL(window.location.href);
  newURL.searchParams.set("name", nameInput.value); // 'param' is the name of the query parameter
  window.history.pushState({}, "", newURL);

  var audio = new Audio("/jingle.mp3"); // path to file
  audio.play();

  const urlParams = new URLSearchParams(window.location.search);
  name.value = urlParams.get("name");
  facebookShareOptions.value.url =
    baseUrl.value + "?name=" + name.value + "#secondDiv";
  facebookShareOptions.value.quote = "Merry Christmas to " + name.value;
};

const secondDiv = ref(null);

const scrollToTarget = async () => {
  await nextTick();
  if (secondDiv.value) {
    if (!audio.paused) {
      var audio = new Audio("./jingle.mp3"); // path to file
      audio.play();
    }
    secondDiv.value.scrollIntoView({ behavior: "smooth" });
  }
};

const updateTime = () => {
  const now = new Date().getTime();
  const distance = christmasDate - now;

  if (distance < 0) {
    timeLeft.value = null;
  } else {
    timeLeft.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }
};

const shareOnFb = () => {
  var fbpopup = window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" +
      facebookShareOptions.value.url,
    "pop",
    "width=600, height=400, scrollbars=no"
  );
  return false;
};

const copyToClipboard = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    name.value = urlParams.get("name");
    await navigator.clipboard.writeText(
      baseUrl.value + "?name=" + name.value + "#secondDiv"
    );
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  updateTime();

  const interval = setInterval(updateTime, 1000);
  const urlParams = new URLSearchParams(window.location.search);
  name.value = urlParams.get("name");
  if (name.value) {
    scrollToTarget();
  }

  if (adContainer1.value) {
    // First, load the AdSense library
    const libScript = document.createElement("script");
    libScript.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    libScript.async = true;
    document.head.appendChild(libScript);

    // Then, configure and load the ad
    const adScript = document.createElement("script");
    adScript.type = "text/javascript";
    adScript.text = `
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-8191678358595448",
        enable_page_level_ads: true,
        google_ad_slot : "info1",
        google_ad_width : 480,
        google_ad_height : 320,
      });
    `;
    adContainer1.value.appendChild(adScript);
  }

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<style scoped>
</style>
