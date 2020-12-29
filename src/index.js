import './assets/sass/main.scss';
import "./assets/sass/mycustom.scss";
import "./assets/sass/noscript.scss";

import "./assets/js/jquery.min.js";
import "./assets/js/jquery.scrolly.min.js";
import "./assets/js/jquery.scrollex.min.js";
import "./assets/js/browser.min.js";
import "./assets/js/breakpoints.min.js";
import "./assets/js/util.js";
import "./assets/js/main.js";

import "./flipdown/src/flipdown.css";
import {FlipDown} from "./flipdown/src/flipdown";


const convert = (date) => {
    return (date.getTime() / 1000) + 1;
}

const goalDate = convert(new Date("2021-01-03T00:00"));

new FlipDown(goalDate, {
    theme: "light",
}).start();