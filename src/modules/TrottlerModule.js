const TROTTLER_DEFAULT_DELAY = 200;

/**
 *
 * Trottler.
 * @author: Stan van Oers (blame him!)
 */
class TrottlerModule {
    constructor(options = {}) {
        this._delay = options.delay || TROTTLER_DEFAULT_DELAY;
        this._timer = null;
    }

    /**
     * Start trottling
     * @param complete
     */
    start(complete) {
        this._timer = setTimeout(complete, this._delay);
    }

    /**
     * Clear trottle process.
     */
    clear() {
        if (this._timer) clearTimeout(this._timer);
    }
}

export default TrottlerModule;
