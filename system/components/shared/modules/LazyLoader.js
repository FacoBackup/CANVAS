import PropTypes from 'prop-types'
import {useEffect} from "react";

export default function LazyLoader(props) {
    // let lastElement = props.data.length > 15 ? 15 : 35
    let onRender = 15

    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop
        const height = e.target.offsetHeight

        const possiblePlacement = onRender * 30
        if (possiblePlacement >= scrollTop && possiblePlacement <= (scrollTop + height))
            console.log('IS VISIBLE')
        else
            console.log('NOT VISIBLE')

        console.log(possiblePlacement)
    }
    useEffect(() => {
        console.log('SCROLLABLE REF CHANGED')
        // props.scrollableRef?.addEventListener('scroll', handleScroll)
        // return () => {
        //     props.scrollableRef?.removeEventListener('scroll', handleScroll)
        // }
    }, [props.data, props.scrollableRef])
    return (
        props.children(onRender)
    )
}

LazyLoader.propTypes = {
    children: PropTypes.node,
    data: PropTypes.array,
    scrollableRef: PropTypes.object,
    renderer: PropTypes.func,
    scrollOrientation: PropTypes.oneOf(['horizontal', 'vertical']),
    elementDimension: PropTypes.number
}