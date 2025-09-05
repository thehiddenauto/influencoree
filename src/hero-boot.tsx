import React from "react";
import ReactDOM from "react-dom/client";
import HeroFeaturesPricing from "./components/HeroFeaturesPricing";

const el = document.getElementById("hero-root");
if (el) {
  try {
    ReactDOM.createRoot(el).render(<HeroFeaturesPricing />);
  } catch (e) {
    // if something fails, log to console
    // tslint:disable-next-line:no-console
    console.warn("Hero boot failed", e);
  }
}
