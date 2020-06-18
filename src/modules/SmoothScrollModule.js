import EventDispatcher from './../events/EventDispatcher'
import { scrollModule } from './ScrollModule'
import gsap from 'gsap'
import { lerp } from './../utils/helpers'

export const SMOOTH_SCROLL_MODULE_EVENT_OFFSET = 'Smooth/Scroll/Module/Event/Offset'

class SmoothScrollModule extends EventDispatcher {
    constructor() {
        super();

        this.damping = 0.05;
        this._offset = scrollModule.position.y

        this._setOffset();
        this._setupEventListeners();
    }

    set damping(damping) {
        this._damping = damping;
    }

    get offset() {
        return this._offset;
    }

    _setupEventListeners() {
        gsap.ticker.add(this._tickHandler);
    }

    _setOffset() {
        const target = scrollModule.position.y;
        this._offset = this._damping > 0.0 ? lerp(this._offset, target, this._damping) : target;
    }

    _tickHandler = () => {
        this._setOffset();

        this.dispatchEvent(SMOOTH_SCROLL_MODULE_EVENT_OFFSET, this._offset);
    }
}

export default SmoothScrollModule;
export const smoothScrollModule = new SmoothScrollModule();
