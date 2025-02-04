import deDE from "./snippet/de-DE.json";
import enGB from "./snippet/en-GB.json";
import template from "./sw-settings-captcha-select-v2.html.twig";

const { Component, Locale } = Shopware;

Locale.extend("en-GB", enGB);
Locale.extend("de-DE", deDE);

Component.override("sw-settings-captcha-select-v2", {
  template
});
