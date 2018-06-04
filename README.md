# lightbox
A simple lightbox script we use on our projects

## Installation

### NPM
`npm i whitecube-lightbox`

### Yarn
`yarn add whitecube-lightbox`

and then in your code simply import it:

```js
import Lightbox from 'whitecube-lightbox';
```

## Usage
Simply create an instance of the class and give it a config object, for example :

```js
let lightbox = new Lightbox({
    elements: '.lightbox__item',
    hiddenClass: 'screen-readers-only',
    close: 'Close the lightbox',
    prev: 'See the previous image',
    next: 'See the next image'
});
```

Here's what each key corresponds to:
- `elements`: a query selector for your initial clickable items you want to show in the lightbox
- `hiddenClass`: a class name that will be applied on `<span>` elements around text that you potentially want to hide (in the prev/next buttons for example)
- `close`: The text to place inside the close button
- `prev`: The text to place inside the previous button
- `next`: The text to place inside the next button

Please note: the elements retrieved by your `elements` selector must have a `data-image` attribute with the URL of the image to display in the lightbox.


Here's a super quick code example:

```html
<a href="#" class="gallery__item" data-image="https://unsplash.com/photos/UA741brUQng"></a>
<a href="#" class="gallery__item" data-image="https://unsplash.com/photos/Ytfv6cLvsIU"></a>
```

```js
let lightbox = new Lightbox({
    elements: '.gallery__item',
    hiddenClass: 'screen-readers-only',
    close: 'Close the lightbox',
    prev: 'See the previous image',
    next: 'See the next image'
});
```

Generated markup (placed before the closing body tag):

```html
<div class="lightbox">
  <div class="lightbox__overlay" aria-hidden="true"></div>
  <div class="lightbox__item" data-ref="0">
    <img class="lightbox__image" src="https://unsplash.com/photos/UA741brUQng">
  </div>
  <div class="lightbox__item" data-ref="1">
    <img class="lightbox__image" src="https://unsplash.com/photos/Ytfv6cLvsIU">
  </div>
  <div class="lightbox__toolbar">
    <a class="lightbox__control lightbox__control--prev">
      <span class="screen-readers-only">See the previous image</span>
    </a>
    <a class="lightbox__control lightbox__control--next">
      <span class="screen-readers-only">See the next image</span>
    </a>
    <a class="lightbox__close">
      <span class="screen-readers-only">Close the lightbox</span>
    </a>
  </div>
</div>
```

You are then free to style it as needed.