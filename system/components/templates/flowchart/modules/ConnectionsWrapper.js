import PropTypes from 'prop-types'
import {useEffect, useState} from "react";
import NodePropsTemplate from "../../props/NodePropsTemplate";
import ConnectionIndicator from "./ConnectionIndicator";
import styles from '../../../styles/Node.module.css'

export default function ConnectionsWrapper(props) {

    const [canRender, setCanRender] = useState(false)

    const handleMouseEnter = () => {
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
        const nodeRef = document.getElementById(props.node.id + '-node')

        nodeRef?.addEventListener('mouseenter', handleMouseEnter)
        nodeRef?.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            nodeRef?.removeEventListener('mouseenter', handleMouseEnter)
            nodeRef?.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [props.node.styling])

    return (
        <svg width={props.node.dimensions.width + 20} height={props.node.dimensions.height + 20} x={-10} y={-10}
             visibility={props.selected !== props.node.id && canRender && !props.onMove? 'visible' : 'hidden'}
             opacity={props.selected !== props.node.id && canRender && !props.onMove ? '1' : '0'}
             style={{transition: 'opacity 150ms linear, visibility 150ms linear'}}
             overflow={'visible'}>

            <ConnectionIndicator
                node={props.node}
                viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                placement={'w'} handleLink={props.handleLink}
            />
            <ConnectionIndicator
                node={props.node}
                viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                placement={'e'} handleLink={props.handleLink}
            />

            <ConnectionIndicator
                node={props.node}
                viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                placement={'s'} handleLink={props.handleLink}
            />
            <ConnectionIndicator
                node={props.node} handleLink={props.handleLink}
                viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                placement={'n'}
            />

        </svg>
    )
}

ConnectionsWrapper.propTypes = {...NodePropsTemplate, ...{onMove: PropTypes.bool}}