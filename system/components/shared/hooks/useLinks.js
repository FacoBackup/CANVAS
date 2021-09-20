import {useCallback, useEffect, useReducer} from "react";
import {v4 as uuid4} from "uuid";

const ACTIONS = {
    ADD_LINK: '1-1',
    REMOVE_LINK: '1-2',
    UPDATE: '1-3',
}



export default function useLinks({dispatchPages, actions, openPage, pages}){


    const reducer = (state, action) => {
        switch (action.type){

            case ACTIONS.ADD_LINK:{
                const newLink = {
                    id: uuid4().toString(),
                    target: action.payload.target,
                    source: action.payload.source
                }

                return [...state, ...[newLink]]
            }
            case ACTIONS.REMOVE_LINK:{
                const index = state.findIndex(e => e.id === action.payload.linkID)
                return [...state].splice(index, 1)
            }
            default:
                return state
        }
    }
    const dispatch = useCallback((action) => {
        dispatchPages({action: actions.LINKS, payload: {id: openPage.id, data:reducer(openPage.links, action)}})
    }, [pages])


    return {ACTIONS, dispatch}
}