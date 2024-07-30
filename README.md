# Vue Custom Widget for Product Pricing

A customizable Vue.js widget that can be easily embedded into any web application. This widget provides an interface for product, quantity and service based price calculation and order initiation with the selected values.

## Installation and usage

To use the Vue Custom Widget in your application, you can include it as follows:

1. step: Add the CDN to your index.html

```bash
<script src="https://vue-custom-widget.netlify.app/widget.js" defer></script>
```

2. step: Include the Vue Custom Widget html element in your source code

```bash
<vue-widget
    ref="vueCustomWidget"
    id="custom-vue-widget"
    class="custom-vue-widget"
    title="Custom Widget Title"
    description="Custom Widget Description"
    buttonText="Start my order"
    orderType="eddm"
    siteId="-LGjZtGpLePH-61Rp662"
    width="350px"
    height="500px"
    @product-selected="onProductSelected"
/>
```

## Widget configuration

Props

| Prop name   | Description                                     | Type   | R/O        | Default value             |
| ----------- | ----------------------------------------------- | ------ | ---------- | ------------------------- |
| title       | The title of the widget.                        | String | `Optional` | Product Pricing Estimator |
| description | The description text.                           | String | `Optional` | ""                        |
| buttonText  | The text for the action button.                 | String | `Optional` | Start my order            |
| width       | The width of the widget.                        | String | `Optional` | 350px                     |
| height      | The height of the widget.                       | String | `Optional` | 500px                     |
| orderType   | The type of order: targeted / eddm / saturation | String | `Required` | -                         |
| siteId.     | The firebase id of your site                    | String | `Required` | -                         |

Events

@product-selected event

```bash
window.addEventListener('product-selected', (event) => {
  console.log('Selected product:', event.detail);
});
```
