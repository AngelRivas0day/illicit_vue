import Vue from "vue";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Vue.prototype.$sentry = Sentry

Sentry.init({
	Vue,
	dsn: "https://b81fe3fc71114413aec43dc3e5401530@o553083.ingest.sentry.io/5679838",
	integrations: [new Integrations.BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
});