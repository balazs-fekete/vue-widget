import { bootstrap } from './bootstrap.js';
customElements.define('vue-widget', class extends HTMLElement {
 
  async connectedCallback() {

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const attributes = {
      'title': this.getAttribute('title'),
      'description': this.getAttribute('description'),
    }
    
    bootstrap(shadowRoot, attributes);
  }
});