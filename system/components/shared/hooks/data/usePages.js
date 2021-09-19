import {useCallback, useMemo, useState} from "react";
import useHistory from "./useHistory";
import {v4 as uuid4} from "uuid";


export default function usePages() {
    const {getPrevious, pushChange, getFollowing, hasFuture, hasPast} = useHistory()

    const ACTIONS = {
        // ARRAY LEVEL
        DELETE: '0-0',
        CREATE: '0-1',
        REPOSITION: '0-2',

        // OBJECT LEVEL
        RENAME: '1-0',
        ADD_NODE: '1-1',
        UPDATE_NODE: '1-2',
        REMOVE_NODE: '1-3',
        ADD_LINK: '1-4',
        REMOVE_LINK: '1-5',

        // VERSION CONTROL
        REWIND: '3-0',
        FORWARD: '3-1',
    }

    const reducer = (state, action) => {
        switch (action.action) {
            case ACTIONS.DELETE: {
                let value = [...state]
                value.splice(state.findIndex(e => e.id === action.payload.id))
                return value
            }
            case ACTIONS.CREATE: {
                let value = [...state]
                value.push(getNewPage(state))

                return value
            }
            case ACTIONS.REPOSITION: {
                let value = [...state]
                let element = value[action.payload.oldIndex]

                value.splice(action.payload.oldIndex, 1);
                value.splice(action.payload.newIndex, 0, element)

                return value
            }
            case ACTIONS.RENAME: {
                let value = [...state]
                let page = value[state.findIndex(e => e.id === action.payload.id)]
                page.title = action.payload.data
                pushChange({
                    id: action.payload.id,
                    data: action.payload.data
                }, ACTIONS.RENAME)
                return value
            }
            case ACTIONS.ADD_NODE: {
                let value = [...state]
                let page = value[state.findIndex(e => e.id === action.payload.id)]
                page.nodes.push(action.payload.node)
                pushChange({
                    id: action.payload.id,
                    data: action.payload.node
                }, ACTIONS.ADD_NODE)
                return value
            }
            case ACTIONS.UPDATE_NODE: {
                let value = [...state]
                const pageIndex = state.findIndex(e => e.id === action.payload.id)
                let page = value[pageIndex]
                const nodeIndex = page.nodes.findIndex(e => e.id === action.payload.data.id)
                page.nodes[nodeIndex] = action.payload.data
                pushChange({
                    id: action.payload.id,
                    data: state[pageIndex].nodes[nodeIndex]
                }, ACTIONS.UPDATE_NODE)
                return value
            }
            case ACTIONS.REMOVE_NODE: {
                let value = [...state]
                const pageIndex = state.findIndex(e => e.id === action.payload.id)
                let page = value[pageIndex]
                const nodeIndex = page.nodes.findIndex(e => e.id === action.payload.nodeID)
                page.nodes[nodeIndex] = {}
                pushChange({
                    id: action.payload.id,
                    data: state[pageIndex].nodes[nodeIndex]
                }, ACTIONS.REMOVE_NODE)
                return value
            }
            case ACTIONS.ADD_LINK: {
                let value = [...state]
                let page = value[state.findIndex(e => e.id === action.payload.id)]
                page.links.push(action.payload.link)
                pushChange({
                    id: action.payload.id
                }, ACTIONS.ADD_LINK)
                return value
            }
            case ACTIONS.REMOVE_LINK: {
                let value = [...state]
                const pageIndex = state.findIndex(e => e.id === action.payload.id)
                let page = value[pageIndex]
                const linkIndex = page.links.findIndex(e => e.id === action.payload.linkID)
                page.links[linkIndex] = {}
                pushChange({
                    id: action.payload.id,
                    data: state[pageIndex].links[linkIndex]
                }, ACTIONS.REMOVE_LINK)
                return value
            }
            case ACTIONS.REWIND: {
                const previousAction = getPrevious()
                let value = [...state]
                if (previousAction !== null)
                    switch (previousAction.action) {

                        case ACTIONS.REMOVE_LINK: {
                            const pageIndex = state.findIndex(e => e.id === previousAction.change.id)
                            value[pageIndex].links.push(previousAction.change.data)

                            break
                        }
                        case ACTIONS.ADD_LINK: {
                            const pageIndex = state.findIndex(e => e.id === previousAction.change.id)
                            value[pageIndex].links.pop()
                            break
                        }
                        case ACTIONS.UPDATE_NODE: {
                            const pageIndex = state.findIndex(e => e.id === previousAction.change.id)
                            const nodeIndex = state[pageIndex].nodes.findIndex(e => e.id === previousAction.change.data.id)
                            value[pageIndex].nodes[nodeIndex] = previousAction.change.data
                            break
                        }
                        case ACTIONS.REMOVE_NODE: {
                            const pageIndex = state.findIndex(e => e.id === previousAction.change.id)
                            value[pageIndex].nodes.push(previousAction.change.data)
                            break
                        }
                        case ACTIONS.ADD_NODE: {
                            const pageIndex = state.findIndex(e => e.id === previousAction.change.id)
                            value[pageIndex].nodes.pop()
                            break
                        }
                        default:
                            break
                    }
                return value
            }
            case ACTIONS.FORWARD: {
                const followingAction = getFollowing()
                let value = [...state]
                if (followingAction !== null)
                    switch (followingAction.action) {

                        case ACTIONS.REMOVE_LINK: {
                            const pageIndex = state.findIndex(e => e.id === followingAction.change.id)
                            const linkIndex = state[pageIndex].links.findIndex(e => e.id === followingAction.change.data.id)
                            value[pageIndex].links[linkIndex] = {}

                            break
                        }
                        case ACTIONS.ADD_LINK: {
                            const pageIndex = state.findIndex(e => e.id === followingAction.change.id)
                            value[pageIndex].links.push(followingAction.change.data)
                            break
                        }
                        case ACTIONS.UPDATE_NODE: {
                            const pageIndex = state.findIndex(e => e.id === followingAction.change.id)
                            const nodeIndex = state[pageIndex].nodes.findIndex(e => e.id === followingAction.change.data.id)
                            value[pageIndex].nodes[nodeIndex] = followingAction.change.data
                            break
                        }
                        case ACTIONS.REMOVE_NODE: {
                            const pageIndex = state.findIndex(e => e.id === followingAction.change.id)
                            const nodeIndex = state[pageIndex].nodes.findIndex(e => e.id === followingAction.change.data.id)
                            value[pageIndex].nodes[nodeIndex] = {}
                            break
                        }
                        case ACTIONS.ADD_NODE: {
                            const pageIndex = state.findIndex(e => e.id === followingAction.change.id)
                            value[pageIndex].nodes.push(followingAction.change.data)
                            break
                        }
                        default:
                            break
                    }
                return value
            }
            default:
                return state
        }

    }
    const getNewPage = (pages) => {
        return {id: uuid4().toString(), title: pages.length + 1, nodes: [], links: []}
    }
    const [currentPage, setCurrentPage] = useState(0)

    const [pages, setPages] = useState([getNewPage([])])

    const dispatchPage = useCallback((action) => {
        setPages(reducer(pages, action))
    }, [pages])

    const openPage = useMemo(() => {
        return pages[currentPage]
    }, [currentPage, pages])


    return {openPage, pages, dispatchPage, ACTIONS, setCurrentPage, hasFuture, hasPast, currentPage}
}