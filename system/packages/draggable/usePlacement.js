import PropTypes from "prop-types";
import getInitialState from "./utils/getInitialState";
import {useReducer, useState} from "react";

const ACTIONS = {
    UPDATE_LISTENER: 'update',
    REMOVE_LISTENER: 'remove',
    ADD_LISTENER: 'add'
}

const reducer = (state, action) => {
    let r
    switch (action.action) {
        case ACTIONS.UPDATE_LISTENER: {
            let value = [...state]
            let event = value[state.findIndex(e => e.id === action.payload.nodeID)]
            event.x = action.payload.x
            event.y = action.payload.y
            r = value
            break
        }
        case ACTIONS.ADD_LISTENER: {
            let value = [...state]
            value.push({
                id: action.payload.nodeID,
                x: action.payload.x,
                y: action.payload.y
            })
            r = value
            break
        }
        case ACTIONS.REMOVE_LISTENER: {
            let value = [...state]
            value.splice(state.findIndex(e => e.id === action.payload.nodeID), 1)
            r = value
            break
        }
        default: {
            break
        }
    }

    return r
}
export default function usePlacement() {
    const [placements, dispatchPlacement] = useReducer(reducer, [])

    return {placements, dispatchPlacement, actions: ACTIONS}
}
