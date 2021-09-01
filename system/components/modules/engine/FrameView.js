import styles from '../../styles/Overview.module.css'
import {useEffect, useRef} from "react";

export default function FrameView(props) {
    const ref = useRef()
    useEffect(() => {
        // const frameClone = document.querySelector('#engine').cloneNode(true)
        // console.log(frameClone)
        // frameClone.style.transform = 'scale(1/10000)'
        // frameClone.style.border = 'none'
        // frameClone.style.height = '100%'
        //
        // console.log(frameClone)
        // ref.current.appendChild(frameClone)

    }, [])
    return (
        <div className={styles.frameOverview} ref={ref}/>
    )
}