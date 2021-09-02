import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {EditRounded} from "@material-ui/icons";
import Tabs from "./modules/Tabs";

export default function SideBar(props) {
    const [openButton, setOpenButton] = useState(0)
    const [toBePushedTab, setToBePushedTab] = useState(null)

    return (
        <Tabs
            buttons={props.options}
            openButton={openButton}
            setOpenButton={setOpenButton}
            toBePushedTab={toBePushedTab}
            setToBePushedTab={setToBePushedTab}
        />
    )
}
SideBar.propTypes = {
    options: PropTypes.array,
    data: PropTypes.object,
    setData: PropTypes.func,
    defaultPage: PropTypes.number,
    selectedNode: PropTypes.object,
}