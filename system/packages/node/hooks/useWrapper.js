import {useEffect, useMemo, useState} from "react";
import styles from "../styles/Node.module.css";

export default function useWrapper({nodeParam, reference, selected}){
    const [canRender, setCanRender] = useState(false)
    const handleMouseEnter = () => {
        console.log('TRUEEE')
        setCanRender(true)
    }
    const handleMouseLeave = () => {
        setCanRender(false)
    }
    const handleMouseDown = (event) => {
        if (event.target.closest('.' + styles.entityContainer) === null)
            setCanRender(false)
    }
    useEffect(() => {
        reference?.addEventListener('mouseenter', handleMouseEnter)
        reference?.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            reference?.removeEventListener('mouseenter', handleMouseEnter)
            reference?.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [reference])

    const [node, setNode] = useState(nodeParam)

    useEffect(() => {
        setNode(nodeParam)
    }, [selected])

    const getPlacement = () => {
        const wrapper = document.getElementById(nodeParam.id + '-node-wrapper')
        let parsedPlacement = wrapper.getAttribute('transform').replace('translate(', '').replace(')', '')
        parsedPlacement = parsedPlacement.split(', ')
        return {
            x: parseInt(parsedPlacement[0]),
            y: parseInt(parsedPlacement[1]),
        }
    }

    return {canRender,  getPlacement, node, setNode}
}