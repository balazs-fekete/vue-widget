import { bootstrap } from './bootstrap.js';

customElements.define('vue-widget', class extends HTMLElement {
  async connectedCallback() {
    const attributes = {
      'title': this.getAttribute('title'),
      'description': this.getAttribute('description'),
      'buttonText': this.getAttribute('buttonText'),
      'width': this.getAttribute('width'),
      'height': this.getAttribute('height'),
      'orderType': this.getAttribute('orderType'),
      'siteId': this.getAttribute('siteId'),
      'isBorderNeeded': this.getAttribute('isBorderNeeded'),
      'isHeaderNeeded': this.getAttribute('isHeaderNeeded'),
    }

    bootstrap(this, attributes);
  }
});
