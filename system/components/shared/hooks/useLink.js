import {useMemo, useState} from "react";
import getCurve from "../../flowchart/utils/getCurve";

export default function useLink(pages, link, openPage, placements){
    const target = useMemo(() => {
        return openPage.nodes.find(node => node.id === link.target.id)
    }, [pages, placements])
    const source = useMemo(() => {
        return openPage.nodes.find(node => node.id === link.source.id)
    }, [pages, placements])
    const color = useMemo(() => {
        return openPage.nodes.find(node => node.id === link.target.id).color
    }, [target])

    const curve = useMemo(() => {
        return getCurve({
            target: {
                id: link.target.id,
                connectionPoint: link.target.connectionPoint
            },
            source: {
                id: link.source.id,
                connectionPoint: link.source.connectionPoint
            },
            connectionType: link.type
        })
    }, [target, source])
    const [selected, setSelected] = useState(false)


    return{
        selected, setSelected,
        curve, color
    }
}