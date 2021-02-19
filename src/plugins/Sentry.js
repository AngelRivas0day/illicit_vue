import Vue from "vue";
import * as Sentry from "@sentry/vue";

Sentry.init({
  Vue: Vue,
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
});