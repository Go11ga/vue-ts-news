module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    collectCoverageFrom: [
        "**/src/**/*.{ts,vue}",
        "!**/node_modules/**",
        "!**src/main.js**",
        "!**src/router.js**"
    ],
    transformIgnorePatterns: ["node_modules/(?!axios)/"]
}
