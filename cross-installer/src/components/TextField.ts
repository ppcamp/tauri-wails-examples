export class TextField extends HTMLElement {
    static observedAttributes = ["placeholder", "id"];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Create a shadow root
    }

    connectedCallback() {
        console.log("Custom element added to page.");

        const placeholder = this.getAttribute('placeholder') || '';
        const id = this.getAttribute('id') || '';

        const style = document.createElement("style");
        this.shadowRoot?.append(style);

        this.shadowRoot!.innerHTML = `
            <form id="${id}-form">
                <input id="${id}-input" placeholder="${placeholder}" />
                <button type="submit">
                    <slot></slot>
                </button>
            </form>
            <div class="row" id="${id}-msg"></div>
        `;
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback<T>(attr: string, oldValue: T, newValue: T) {
        console.log(
            `Attribute ${attr} has changed from ${oldValue} to ${newValue}.`,
        );
    }

    static Register() {
        customElements.define("text-field", TextField);
    }
}
