import EventDispatcher from './../events/EventDispatcher'
import TrottlerModule from './TrottlerModule'

import { scrollPosition } from './../utils/helpers'

export const SCROLL_MODULE_EVENT_SCROLL = 'Scroll/Module/Event/Scroll'
export const SCROLL_MODULE_EVENT_SCROLL_ENDED = 'Scroll/Module/Event/Scroll/Ended'

/**
 *
 * Scroll events.
 * @author: Stan van Oers (blame him!)
 */
class ScrollModule extends EventDispatcher {
    constructor() {
        super();

        this._isEnabled = true;

        this._setPosition();
        this._setupTrottler();
        this._setupEventListeners();
    }

    disable() {
        this._savedPosition = scrollPosition();
        this._isEnabled = false;
    }

    enable() {
        this._isEnabled = true;

        window.scroll(this._position.x, this._position.y);
        this._position = this._savedPosition;
    }

    get position() {
        return this._position;
    }

    _setupEventListeners() {
        document.addEventListener('scroll', this._scrollHandler)
    }

    _setupTrottler() {
        this._trottler = new TrottlerModule();
    }

    _setPosition() {
        const position = scrollPosition();
        this._position = position;
    }

    _trottle() {
        // Clear previous
        this._trottler.clear();

        // Start trottle
        this._trottler.start(this._trottleCompleteHandler);
    }

    /**
     *
     * Handlers
     */
    _scrollHandler = (e) => {
        if (!this._isEnabled) return;

        this._trottle();
        this._setPosition();

        // Dispatch scroll event
        this.dispatchEvent(SCROLL_MODULE_EVENT_SCROLL, this._position);
    }

    _trottleCompleteHandler = () => {
        if (!this._isEnabled) return;

        this._setPosition();

       // Dispatch scroll ended event
       this.dispatchEvent(SCROLL_MODULE_EVENT_SCROLL_ENDED, this._position);
    }
}

export default ScrollModule;
export const scrollModule = new ScrollModule();
