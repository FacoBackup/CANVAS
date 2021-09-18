import {useCallback, useEffect, useReducer} from "react";
import PropTypes from 'prop-types'

export default function useNode(props) {
    const SET = 'SET'
    const ACTIONS = {
        PLACEMENT: 'PLACEMENT',
        DIMENSIONS: 'DIMENSIONS',
        DATASET: 'DATASET',
        TITLE: 'TITLE',
        VISUALS: 'VISUALS'
    }
    const dispatch = useCallback( (p) => {

            let newNode = {...props.node}
            let newNodes = [...props.data.nodes]
            switch (p.type) {
                case ACTIONS.PLACEMENT: {
                    newNode = {
                        ...props.node,
                        placement: p.payload
                    }
                    break
                }
                case ACTIONS.DIMENSIONS: {
                    newNode = {
                        ...props.node,
                        dimensions: p.payload
                    }
                    break
                }
                case ACTIONS.DATASET: {
                    newNode = {
                        ...props.node,
                        dataset: p.payload
                    }
                    break
                }
                case ACTIONS.TITLE: {
                    newNode = {
                        ...props.node,
                        title: p.payload
                    }
                    break
                }
                case ACTIONS.VISUALS: {

                    newNode = {
                        ...props.node,
                        styling: p.payload
                    }
                    break
                }
                case SET: {
                    newNode = p.payload
                    break
                }
                default:
                    break
            }
            if (props.node !== undefined) {
                newNodes[newNodes.findIndex(e => props.node.id === e.id)] = newNode
                props.setData({
                    ...props.data,
                    nodes: newNodes
                })
            }

    }, [props.node, props.data])

    return {ACTIONS,  dispatch}
}

useNode.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    node: PropTypes.object
}