// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import vueJsAccessibility from "eslint-plugin-vuejs-accessibility";

export default withNuxt({
  rules: {
    "vue/html-self-closing": "off",
  },
})
  .prepend(vueJsAccessibility.configs["flat/recommended"])
  .overrideRules({
    "vuejs-accessibility/label-has-for": "off",
  });
// Your custom configs here
