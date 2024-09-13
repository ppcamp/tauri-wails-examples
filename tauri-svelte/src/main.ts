import './app.css'
import App from './App.svelte'
import { mount } from 'svelte'; // Assuming 'svelte' has a 'mount' function

const app = mount(App, {
    target: document.getElementById('app')!,
});

export default app
