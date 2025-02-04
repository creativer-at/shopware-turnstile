export default {
  semi: true,
  trailingComma: "none",
  singleQuote: false,
  printWidth: 90,
  endOfLine: "auto",
  tailwindFunctions: ["cva", "cx"],
  tabWidth: 2,
  useTabs: false,
  plugins: [
    "@prettier/plugin-php",
    "@zackad/prettier-plugin-twig",
    "@prettier/plugin-xml",
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  importOrder: ["^node:", "<THIRD_PARTY_MODULES>", "^\\."],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["typescript", "jsx", "explicitResourceManagement"]
};
