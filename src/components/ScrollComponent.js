import React, { Component, createRef } from 'react'
import { smoothScrollModule } from './../modules/SmoothScrollModule'
import { resizeModule, RESIZE_MODULE_EVENT_RESIZE, RESIZE_MODULE_EVENT_RESIZE_COMPLETED } from './../modules/ResizeModule'
import gsap from 'gsap'

class ScrollComponent extends Component {
    state = {
        contentOffset: smoothScrollModule.offset,
        contentHeight: 0
    }

    constructor() {
        super();

        this._refs = {};
        this._refs.container = createRef();
        this._refs.content = createRef();
    }

    componentDidMount() {
        this._setContentHeight();
        this._setContentOffset();

        // Add event listeners
        resizeModule.addEventListener(RESIZE_MODULE_EVENT_RESIZE, this._resizeHandler);
        resizeModule.addEventListener(RESIZE_MODULE_EVENT_RESIZE_COMPLETED, this._resizeHandler);

        gsap.ticker.add(this._tickHandler);
    }

    componentWillUnmount() {
        resizeModule.removeEventListener(RESIZE_MODULE_EVENT_RESIZE, this._resizeHandler);
        resizeModule.removeEventListener(RESIZE_MODULE_EVENT_RESIZE_COMPLETED, this._resizeHandler);

        gsap.ticker.remove(this._tickHandler);
    }

    render() {
        return (
            <div ref={ this._refs.container } style={ this._getContainerStyles() }>
                <div className={ this.props.className } ref={ this._refs.content } style={ this._getContentStyles() }>
                    { this.props.children }
                </div>
            </div>
        )
    }

    _setContentHeight() {
        const contentHeight = this._refs.content.current.clientHeight;

        // document.body.style.height = `${contentHeight}px`;
        this.setState({ contentHeight });
    }

    _setContentOffset() {
        const contentOffset = smoothScrollModule.offset;

        this.setState({ contentOffset });
    }

    _getContainerStyles() {
        return {
            height: `${ this.state.contentHeight }px`
        }
    }

    _getContentStyles() {
        return {
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${ resizeModule.width }px`,
            transform: `matrix(1.00, 0.00, 0.00, 1.00, 0, ${ -1 * this.state.contentOffset })`,
            willChange: 'transform'
        }
    }

    _resizeHandler = () => {
        this._setContentHeight();
        this._setContentOffset();
    }

    _tickHandler = () => {
        this._setContentOffset();
    }
}

export default ScrollComponent;
