import { Dom, DomCollection } from 'whitecube-dom';

/*
    Example config object: {
        elements: '.my__elements', → query selector of the initial clickable elements,
        close: 'Close the lightbox' → The hidden text inside the close button,
        prev: 'See previous item', → The hidden text inside the prev button
        next: 'See next item', → The hidden text inside the next button
        hiddenClass: 'sro' → The class name used to hide text
    }
*/

export default class Lightbox {

    constructor(config) {
        this.config = config;
        this.createElements();
        this.setEvents();
        this.current = 0;
    }

    /**
     * Create the elements needed for the
     * lightbox to function
     */
    createElements() {
        this.elements = Dom.qsa(this.config.elements);
        this.ui = {};
        this.ui.container = Dom.element('div', ['lightbox']);
        this.ui.overlay = Dom.element('div', ['lightbox__overlay'], null, {
            'aria-hidden': 'true'
        })
            .insertInto(this.ui.container);
        this.createItems();
        this.createToolbar();
        this.ui.container.insertInto(document.body);
    }

    createItems() {
        this.ui.items = new DomCollection;
        this.elements.each((el, index) => {
            el.setAttribute('data-ref', index);
            let item = Dom.element('div', ['lightbox__item'], null, {
                'data-ref': index
            });
            let image = Dom.element('img', ['lightbox__image'], null, {
                src: el.attributes['data-image']
            });
            image.insertInto(item);
            this.ui.items.add(item);
        });
        this.ui.items.insertInto(this.ui.container);
    }

    createToolbar() {
        this.ui.toolbar = Dom.element('div', ['lightbox__toolbar']);
        this.ui.prev = Dom.element('a', ['lightbox__control', 'lightbox__control--prev']);
        this.ui.prev.text = Dom.element('span', [this.config.hiddenClass], this.config.prev);
        this.ui.prev.text.insertInto(this.ui.prev);
        this.ui.next = Dom.element('a', ['lightbox__control', 'lightbox__control--next']);
        this.ui.next.text = Dom.element('span', [this.config.hiddenClass], this.config.next);
        this.ui.next.text.insertInto(this.ui.next);
        this.ui.close = Dom.element('a', ['lightbox__close']);
        this.ui.close.text = Dom.element('span', [this.config.hiddenClass], this.config.close);
        this.ui.close.text.insertInto(this.ui.close);
        this.ui.prev.insertInto(this.ui.toolbar);
        this.ui.next.insertInto(this.ui.toolbar);
        this.ui.close.insertInto(this.ui.toolbar);
        this.ui.toolbar.insertInto(this.ui.container);
    }

    setEvents() {
        this.elements.on('click', (e) => this.show(e));
        this.ui.overlay.on('click', (e) => this.hide(e));
        this.ui.close.on('click', (e) => this.hide(e));
        this.ui.prev.on('click', (e) => this.prev(e));
        this.ui.next.on('click', (e) => this.next(e));
        document.addEventListener('keyup', (e) => {
            let key = e.key || e.keyCode;
            if (key == 'Escape' || key == 'Esc' || key == 27) return this.hide(e);
            if (key == 'ArrowLeft' || key == 37) return this.prev(e);
            if (key == 'ArrowRight' || key == 39) return this.next(e);
        });
    }

    show(e) {
        if (e) e.preventDefault();
        let ref = parseInt(e.currentTarget.getAttribute('data-ref'));
        this.setCurrent(ref);
        this.fadeIn();
    }

    hide(e) {
        if (e) e.preventDefault();
        this.fadeOut();
    }

    fadeIn() {
        this.ui.container.addClass('lightbox--show');
    }

    fadeOut() {
        this.ui.container.removeClass('lightbox--show');
    }

    prev(e) {
        if (e) e.preventDefault();
        let ref = this.getPreviousRef();
        this.setCurrent(ref);
    }

    next(e) {
        if (e) e.preventDefault();
        let ref = this.getNextRef();
        this.setCurrent(ref);
    }

    getPreviousRef() {
        let previousRef = this.current - 1;
        if (previousRef < 0) return this.ui.items.count() - 1;
        return previousRef;
    }

    getNextRef() {
        let nextRef = this.current + 1;
        if (nextRef >= this.ui.items.count()) return 0;
        return nextRef;
    }

    setCurrent(ref) {
        this.ui.items.each(el => {
            el.removeClass('lightbox__item--current');
            if (el.attributes['data-ref'] == ref) {
                this.current = ref;
                let image = el.qs('.lightbox__image');
                if (image.height() > image.width()) el.addClass('lightbox__item--vertical');
                else el.addClass('lightbox__item--horizontal');
                el.addClass('lightbox__item--current');
            }
        });
    }

}