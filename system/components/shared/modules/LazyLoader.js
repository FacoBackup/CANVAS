import PropTypes from 'prop-types'
import {useEffect} from "react";

export default function LazyLoader(props) {

    // const [onRender, setOnRender] = useState(0)
    // let onRenderRef = 0
    // let quantityPerPage = 0
    // const handleScroll = (e) => {
    //     if (props.scrollableRef.childNodes.length > 0) {
    //         let lastElement = props.scrollableRef.childNodes[props.scrollableRef.childNodes.length - 1]
    //         const scrollTop = e.target.scrollTop
    //         const height = e.target.offsetHeight
    //         console.log(lastElement.offsetTop)
    //         console.log('PLACEMENT ' + lastElement.getBoundingClientRect().top + ' -SCROLL-' + scrollTop)
    //         const possiblePlacement = lastElement.getBoundingClientRect().top
    //         if (possiblePlacement <= scrollTop) {
    //             setOnRender(onRenderRef + quantityPerPage)
    //             onRenderRef = onRenderRef + quantityPerPage
    //             console.log('ADDING TO RENDER ' + onRender + ' - ' + onRenderRef)
    //         }
    //
    //     }
    // }
    //
    // const getQuantityPerPage = () => {
    //     console.log(props.scrollableRef.childNodes)
    //     console.log(quantityPerPage)
    //     console.log(onRender)
    //
    //     const clientRect = props.scrollableRef.firstChild.getBoundingClientRect()
    //     if (props.scrollOrientation === 'vertical') {
    //         quantityPerPage = Math.ceil(props.scrollableRef.offsetHeight / clientRect.height) * 10
    //     } else
    //         quantityPerPage = Math.ceil(props.scrollableRef.offsetWidth / clientRect.width) * 10
    //
    //     console.log(quantityPerPage)
    //     onRenderRef = quantityPerPage
    //     setOnRender(quantityPerPage)
    // }

    useEffect(() => {
        // if (props.scrollableRef !== undefined)
        //     getQuantityPerPage()
        // props.scrollableRef?.addEventListener('scroll', handleScroll)
        // return () => {
        //     props.scrollableRef?.removeEventListener('scroll', handleScroll)
        // }
    }, [props.data, props.scrollableRef])
    return (
        props.children()
    )
}

LazyLoader.propTypes = {
    children: PropTypes.node,
    dataLength: PropTypes.number,
    scrollableRef: PropTypes.object,
    renderer: PropTypes.func,
    scrollOrientation: PropTypes.oneOf(['horizontal', 'vertical']),
    elementDimension: PropTypes.number
}