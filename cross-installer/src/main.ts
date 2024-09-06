import { TextField } from "./components";
import { Greeting } from "./state/greetings";
import { Context } from "./state/window";

window.addEventListener("DOMContentLoaded", main);


function main() {
    const registers = [
        Greeting(document),
        Context(document),
        TextField
    ];

    // Register elements
    registers.forEach(v => v.Register())
}