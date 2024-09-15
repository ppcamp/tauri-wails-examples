<script lang="ts">
    import { Counter } from "../utils/Counter.svelte";

    let count = new Counter();
</script>

<button onclick={count.Increment}>
  count is {count.Name}
</button>
