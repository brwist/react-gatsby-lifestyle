import React from 'react'
import gsap from 'gsap'

export default class SmoothScroll extends React.Component {
    
    state = {
        height: typeof window !== 'undefined' ? window.innerHeight : 1000
    }

    ro = new ResizeObserver(elements => {
        for (let elem of elements) {
            const crx = elem.contentRect
            this.setState({
                height: crx.height
            })
        }
    })

    componentDidMount() {
        typeof window !== 'undefined' && window.addEventListener('scroll', this.onScroll)
        this.ro.observe(this.viewport)
    }

    onScroll = () => {
        gsap.to(this.viewport, 1, {
            y: typeof window !== 'undefined' && -window.pageYOffset,
            ease: 'power4.easeOut'
        })
    }

    render() {
        return (
            <>
                <div className='viewport' ref={ref => (this.viewport = ref)}>
                    {this.props.children}
                </div>
                <div
                    ref={ref => (this.fake = ref)}
                    style={{
                        height: this.state.height
                    }}
                />
            </>
        )
      }
}
