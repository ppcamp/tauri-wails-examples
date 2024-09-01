import { Greeting } from "./state/greetings";
import { Context } from "./state/window";

window.addEventListener("DOMContentLoaded", main);


function main() {
    const listeners = [
        Greeting(document),
        Context(document)
    ];

    // Register elements
    listeners.forEach(v => v.Register())
}