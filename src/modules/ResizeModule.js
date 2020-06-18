import EventDispatcher from './../events/EventDispatcher';
import TrottlerModule from './TrottlerModule';

export const RESIZE_MODULE_EVENT_RESIZE = 'Resize/Module/Event/Resize';
export const RESIZE_MODULE_EVENT_RESIZE_COMPLETED = 'Resize/Module/Event/Resize/Completed';

/**
 *
 * Resize events.
 * @author: Stan van Oers (blame him!)
 */
class ResizeModule extends EventDispatcher {
    constructor() {
        super();

        this._setSize();
        this._setupTrottler();
        this._setupEventListeners();
    }

    get width() {
        return this._size.width;
    }

    get height() {
        return this._size.height;
    }

    _setupEventListeners() {
        window.addEventListener('resize', this._scrollHandler)
    }

    _setupTrottler() {
        this._trottler = new TrottlerModule();
    }

    _setSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this._size = { width, height };
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
    _scrollHandler = () => {
        this._trottle();
        this._setSize();

        // Dispatch scroll event
        this.dispatchEvent(RESIZE_MODULE_EVENT_RESIZE, this._size);
    }

    _trottleCompleteHandler = () => {
        this._setSize();

        // Dispatch scroll ended event
        this.dispatchEvent(RESIZE_MODULE_EVENT_RESIZE_COMPLETED, this._size);
    }
}

export default ResizeModule;
export const resizeModule = new ResizeModule();