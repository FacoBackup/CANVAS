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
                props.dispatchPage({action: props.actions.UPDATE_NODE, payload: {
                    id: props.openPage.id,
                    data: newNode
                }})
            }

    }, [props.node, props.openPage])

    return {ACTIONS,  dispatch}
}

useNode.propTypes = {
    openPage: PropTypes.object,
    dispatchPage: PropTypes.func,
    actions: PropTypes.object,

    node: PropTypes.object
}