import { bootstrap } from './bootstrap.js';
customElements.define('vue-widget', class extends HTMLElement {
 
  async connectedCallback() {

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const attributes = {
      'date': this.getAttribute('date'),
      'title': this.getAttribute('title'),
      'end': this.getAttribute('end'),
      'color': this.getAttribute('color')
    }
    
    bootstrap(shadowRoot, attributes);
  }
});