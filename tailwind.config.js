import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "light-blue": "#009efb",
                "dark-blue": "#0057b7",
                "light-gray": "#f8f9fa",
                "dark-gray": "#adb5bd",
                white: "#ffffff",
                black: "#000000",
                main: "#2881E2",
            },
            fontFamily: {
                sans: ["Nunito", "sans-serif"],
            },
            backgroundColor: {
                main: "#2881E2",
            },
        },
    },
    plugins: [],
});
