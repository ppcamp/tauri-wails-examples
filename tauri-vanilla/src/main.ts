import { TextField } from "./components";
import { Greeting, Context } from "./state";


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