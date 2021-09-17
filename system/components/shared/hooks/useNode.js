import {useEffect, useReducer} from "react";
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
    const reducer = (nodeState, action) => {
        let newNode = {...nodeState}
        let newNodes = [...props.data.nodes]
        switch (action.type) {
            case ACTIONS.PLACEMENT: {
                newNode = {
                    ...nodeState,
                    placement: action.payload
                }
                break
            }
            case ACTIONS.DIMENSIONS: {
                newNode = {
                    ...nodeState,
                    dimensions: action.payload
                }
                break
            }
            case ACTIONS.DATASET: {
                newNode = {
                    ...nodeState,
                    dataset: action.payload
                }
                break
            }
            case ACTIONS.TITLE: {
                newNode = {
                    ...nodeState,
                    title: action.payload
                }
                break
            }
            case ACTIONS.VISUALS: {

                newNode = {
                    ...nodeState,
                    styling: action.payload
                }
                break
            }
            case SET: {
                newNode = action.payload
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

        return newNode
    }

    const [nodeState, dispatch] = useReducer(reducer, props.node)

    // const move = (event) => {
    //     PlaceNode({
    //         scale: props.scale,
    //         node: nodeState,
    //         event: event,
    //         selectNode: props.selectNode,
    //         unselectNode: props.unselectNode,
    //         dispatch: dispatch,
    //         actions: ACTIONS,
    //         noPlacementIndicator: props.noPlacementIndicator
    //     })
    // }

    useEffect(() => {
        dispatch({type: SET, payload: props.node})
    }, [props.node])

    return {ACTIONS, nodeState, dispatch}
}

useNode.propTypes = {
    scale: PropTypes.number,
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    noPlacementIndicator: PropTypes.bool,
    data: PropTypes.object, setData: PropTypes.func,
    node: PropTypes.object
}