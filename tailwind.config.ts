import type {Config} from "tailwindcss";
export default {content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],
theme:{extend:{colors:{ink:"#0a0a0a",card:"#111",line:"#242424",mu:"#8b8985",paper:"#f4f2ee",ac:"#e8553d"},
fontFamily:{sans:['"Helvetica Neue"','"Hiragino Sans"','"Yu Gothic"','"PingFang SC"','system-ui','sans-serif']}}},plugins:[]} satisfies Config;
