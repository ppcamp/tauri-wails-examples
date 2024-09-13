import { invoke } from "@tauri-apps/api/tauri";
import { Listeners } from "./common";
import { notification } from "@tauri-apps/api";

export function Greeting(d: Document): Listeners {
    let greetInputEl: HTMLInputElement | null;
    let greetMsgEl: HTMLElement | null;
    let form: HTMLFormElement | null;

    return {
        async greet(e: Event) {
            e.preventDefault();

            if (greetMsgEl && greetInputEl) {
                // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
                greetMsgEl.textContent = await invoke("greet", {
                    name: greetInputEl.value,
                });


                const permission = await notification.requestPermission();
                const permissionGranted = permission === 'granted';

                if (permissionGranted) {
                    notification.sendNotification('Tauri is awesome!');
                    notification.sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
                }
            }
        },

        Register() {
            greetInputEl = d.querySelector("#greet-input");
            greetMsgEl = d.querySelector("#greet-msg");
            form = d.querySelector("#greet-form");

            form?.addEventListener("submit", this.greet);
        },

        Unregister() {
            form?.removeEventListener("submit", this.greet);
        },
    }
}
