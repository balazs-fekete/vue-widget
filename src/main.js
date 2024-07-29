import { bootstrap } from './bootstrap.js';

customElements.define('vue-widget', class extends HTMLElement {
  async connectedCallback() {
    const attributes = {
      'title': this.getAttribute('title'),
      'description': this.getAttribute('description'),
      'width': this.getAttribute('width'),
    }
    
    bootstrap(this, attributes);
  }
});