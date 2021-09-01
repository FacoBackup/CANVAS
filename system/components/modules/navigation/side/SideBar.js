import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {EditRounded} from "@material-ui/icons";
import Tabs from "./modules/Tabs";
import Overview from "../../../templates/misc/Overview";

export default function SideBar(props) {
    const [openButton, setOpenButton] = useState(0)
    const [nodeIndex, setNodeIndex] = useState(null)
    const [toBePushedTab,setToBePushedTab] = useState(null)
    useEffect(() => {

        if (props.selectedNode !== undefined && props.selectedNode !== null) {
            setToBePushedTab(1)
            props.data.pages[props.defaultPage].nodes.find((node, i) => {
                if (node.id === props.selectedNode.id)
                    setNodeIndex(i)
            })

        } else
            setOpenButton(0)
    }, [props.selectedNode])

    return (
        <Tabs
            buttons={[...  props.options, ...[
                {
                    icon: <EditRounded/>,
                    label: 'Editar módulo',
                    content: (
                        null
                        // props.selectedNode !== undefined && props.selectedNode !== null && nodeIndex !== null ? <Overview
                        //     data={props.data.pages[props.defaultPage]}
                        //     node={props.data.pages[props.defaultPage].nodes[nodeIndex]}
                        //     setState={setData}
                        //     nodeIndex={nodeIndex}
                        // /> : null
                    ),
                    toolTip: 'Editar módulo',
                    disabled: !(props.selectedNode !== undefined && props.selectedNode !== null && nodeIndex !== null)
                }
            ]]}
            openButton={openButton}
            setOpenButton={setOpenButton}
            toBePushedTab={toBePushedTab}
            setToBePushedTab={setToBePushedTab}
        />
    )
}
SideBar.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    defaultPage: PropTypes.number,
    selectedNode: PropTypes.object,
}