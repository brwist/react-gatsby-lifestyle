/**
 *
 * Event dispatcher.
 * @author: Stan van Oers (blame him!)
 */
class EventDispatcher {
    constructor() {
        this._listeners = {};
    }

    /**
     *
     * Dispatch event.
     * @param {String} type
     * @param {Any} payload
     */
    dispatchEvent(type, payload) {

        // No listeners for type group, abort
        if (!this._listeners[type]) return;

        const listeners = this._listeners[type];
        const limit = listeners.length;

        // Execute listeners of type group
        let index, listener;

        for (index = 0; index < limit; index++) {
            listener = listeners[index];
            listener.call(this, payload);
        }

    }

    /**
     *
     * Add event listener.
     * @param {String} type
     * @param {Function} listener
     */
    addEventListener(type, listener) {

        // No type group yet, create
        if (!this._listeners[type]) {
            this._listeners[type] = [];
        }

        const listeners = this._listeners[type];

        // Listener already in type group yet, abort
        if (listeners.indexOf(listener) !== -1) return;

        // Add listener to type group
        listeners.push(listener);

    }

    /**
     *
     * Add event listener once.
     * @param {String} type
     * @param {Function} listener
     */
    addEventListenerOnce(type, listener) {
        // // Create new callback
        const once = function(payload) {
            listener.call(this, payload);
            this.removeEventListener(type, once);
        }.bind(this);

        // Add to listeners
        this.addEventListener(type, once);

    }

    /**
     *
     * Remove event listener.
     * @param {String} type
     * @param {Function} listener
     */
    removeEventListener(type, listener) {
        // No listeners for type group, abort
        if (!this._listeners[type]) return;

        const listeners = this._listeners[type];
        const index = listeners.indexOf(listener);

        // Listener not in type group yet, abort
        if (index === -1) return;

        // Remove from type group
        listeners.splice(index, 1);
    }

    /**
     *
     * Check if listener exists.
     * @param {String} type
     * @param {Function} listener
     */
    hasEventListener(type, listener) {
        // Nothing for that type, return false
        if (!this._listeners[type]) return false;

        const listeners = this._listeners[type];

        // Check if listener is in listeners
        return listeners.indexOf(listener) !== -1;
    }

}

export default EventDispatcher;
