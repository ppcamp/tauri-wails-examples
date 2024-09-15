
/*
Doesn't work
export const NewCounter = () => {
    let count = $state<number>(0);
    let name = $derived<string>(count > 0 ? `Clicked ${count} times` : "Click me");

    const increment = () => {
        // console.log("called", count)
        count += 1
    }

    return {
        count,
        increment,
        name,
    }
}
*/

/**
 * @example
 * let counter = new CCounter();
 *
 * <button onclick={counter.Increment}>
 *  {counter.Name}
 * </button>
 */
export class Counter {
    private m_count = $state<number>(0);
    private m_name = $derived<string>(this.m_count > 0 ? `Clicked ${this.m_count} times` : "Click me");

    public Increment = () => {
        // console.log("called", count)
        this.m_count += 1
    }

    public Reset = () => {
        // console.log("called", count)
        this.m_count = 0
    }

    get Name(): string {
        return this.m_name.toString();
    }
}
