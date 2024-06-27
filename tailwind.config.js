const { plugins } = require("./postcss.config");

module.exports = {
    mode: "jit", 
    content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
    darkMode: "class",
    theme: {
        screens: { md: { max: "1050px" }, sm: { max: "550px" } },
        extend: {
            colors: {
                black: { 900: "#000000" },
                blue: { 800: "#255abb" },
                blue_gray: { 900: "#26413c", "700_01": "#3e505b", "900_01": "#194730", "900_02": "#323743" }, 
                deep_purple: { a700: "#2100ff" },
                gray: {
                    50: "#fafafb",
                    300: "#dee1e6",
                    900: "#1a1d1a",
                    "100_01": "#f7f8f7", "100_02": "#f4fbf7",
                    "900_01": "#171a1f",
                    "900_1e": "#120f281e",
                    "900_26": "#171a1f26",
                },
                green: { 300: "#70c29e", 400: "#48bf84", 600: "#369b68" },
                red: { 800: "#c12126" },
                white: { a700: "#ffffff" },
            },
            boxShadow: { xs: "0 3px 6px 0 #120f281e", sm: "0 0 1px 0 #171a1f26" }, 
            fontFamily: { cabin: "Cabin", inter: "Inter" },
        },
    },
    plugins: [require("@tailwindcc/forms")],
};