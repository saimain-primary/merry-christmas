import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Particles from "vue3-particles";
import VueSocialSharing from "vue-social-sharing";

createApp(App).use(Particles).use(VueSocialSharing).mount("#app");
