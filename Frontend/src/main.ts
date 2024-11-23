import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

import App from "./App.vue";
import "./assets/style.css";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".app-dark",
    },
  },
});

// bilaltaybi36;
// mDoNxPQpQeSIbOvM;

// mDoNxPQpQeSIbOvM;
// mongodb+srv://bilaltaybi36:<db_password>@cluster0.wltpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.mount("#app");
