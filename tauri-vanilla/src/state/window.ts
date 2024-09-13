import { availableMonitors, getCurrent } from "@tauri-apps/api/window";
import { Listeners } from "./common";


// Must be the last element to be initialized to avoid any keyboard issues
export function Context(d: Document): Listeners {
    return {
        async GetMonitorSize() {
            const monitors = await availableMonitors();
            const a = getCurrent();

            console.log(monitors, a);
        },

        async context(e: Event) {
            e.preventDefault();
        },

        // Tauri already disable keyboard keys on release
        async disableKeys(e: KeyboardEvent) {
            // Check if Ctrl (or Cmd on Mac) and Shift are pressed along with 'I'
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                console.error('Ctrl + Shift + I is disabled.');
            } else if (/F\d+/.test(e.key)) { // disable F keys
                e.preventDefault();
                console.error('Ctrl + Shift + I is disabled.');
            }
        },

        Register() {
            d.addEventListener('contextmenu', this.context);
            //d.addEventListener('keydown', this.disableKeys);
        },
        Unregister() {
            d.removeEventListener('contextmenu', this.context);
            //d.removeEventListener('keydown', this.disableKeys);
        },
    };
}
