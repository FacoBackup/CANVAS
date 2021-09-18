import styles from './styles/FrameOverview.module.css'
import {useEffect, useRef} from "react";
import PropTypes from 'prop-types'

export default function FrameView(props) {
    const ref = useRef()
    useEffect(() => {
        // if (ref.current.childNodes.length > 0)
        //     ref.current.removeChild(ref.current.firstChild)
        // const frameClone = document.getElementById('canvas-content').cloneNode(true)
        // console.log(frameClone)
        // frameClone.setAttribute('id', 'canvas-clone')
        //
        // console.log(frameClone)
        // frameClone.style.transform = 'scale(.1)'
        // frameClone.style.border = 'none'
        // frameClone.style.height = '100%'
        //
        // ref.current.appendChild(frameClone)

    }, [props.data.nodes])
    return (
        <div className={styles.frameOverview} >
            <svg ref={ref} overflow='visible'/>
        </div>
    )
}

FrameView.propTypes = {
    data: PropTypes.object
}