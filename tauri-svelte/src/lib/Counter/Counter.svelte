<svelte:options runes={true}></svelte:options>

<script lang="ts">
    import { CCounter } from './logic.svelte';

    let { A = $bindable() } : { A: string } = $props();

    let counter = new CCounter();

    A = "3";
</script>

<!--
{#snippet but(name:string, onclick:()=>void)}
    <button {onclick}>
        {name}
    </button>
{/snippet} -->
<!-- {@render but(name,increment)} -->

<button onclick={counter.Increment}>
    {counter.Name}
</button>