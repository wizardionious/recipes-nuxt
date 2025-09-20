/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    tabWidth: 4,
    bracketSameLine: false,
    useTabs: false,
    printWidth: 80,
    semi: true,
    singleAttributePerLine: true,
    trailingComma: "all",
    overrides: [
        {
            files: "*.vue",
            options: {
                parser: "vue",
            },
        },
    ],
};

export default config;
