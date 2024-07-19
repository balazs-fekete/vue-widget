import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import vueCustomElement from "vue-custom-element";

Vue.use(vueCustomElement);
Vue.customElement("vue-widget", App);
