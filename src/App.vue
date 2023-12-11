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
    <a
      href="#secondDiv"
      class="text-2xl animate-bounce font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,100,0,0.8)]"
    >
      👉🏻 Touch it and see 👈🏻
    </a>
  </div>

  <div
    class="flex flex-col items-center justify-start h-screen p-10 bg-white bg-cover w-100"
    style="background-image: url('/bell.jpg')"
    id="secondDiv"
  >
    <img src="./assets/gift.png" class="w-48 mb-20" alt="" />
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
    <div>
      <button @click.prevent="shareOnFb">share on facebook</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { SFacebook } from "vue-social-sharing";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import snowConfig from "./assets/snow.json";

const christmasDate = new Date("Dec 25, 2023 00:00:00").getTime();
const timeLeft = ref(null);
const name = ref("");
const nameInput = ref("");
const baseUrl = computed(() => window.location.origin);

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

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

const updateURL = () => {
  const newURL = new URL(window.location.href);
  newURL.searchParams.set("name", nameInput.value); // 'param' is the name of the query parameter
  window.history.pushState({}, "", newURL);

  const urlParams = new URLSearchParams(window.location.search);
  console.log("🚀 ~ file: App.vue:130 ~ onMounted ~ urlParams:", urlParams);
  name.value = urlParams.get("name");
  facebookShareOptions.value.url =
    baseUrl.value + "?name=" + name.value + "#secondDiv";
  facebookShareOptions.value.quote = "Merry Christmas to " + name.value;
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
  alert(facebookShareOptions.value.url);
  var fbpopup = window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" +
      facebookShareOptions.value.url,
    "pop",
    "width=600, height=400, scrollbars=no"
  );
  return false;
};
onMounted(() => {
  updateTime();
  const interval = setInterval(updateTime, 1000);

  const urlParams = new URLSearchParams(window.location.search);
  console.log("🚀 ~ file: App.vue:130 ~ onMounted ~ urlParams:", urlParams);
  name.value = urlParams.get("name");

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<style scoped>
</style>
