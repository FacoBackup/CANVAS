import PropTypes from "prop-types";
import React, {useState} from "react";
import VerticalTabs from "./VerticalTabs";

export default function SideBar(props) {
    const [openButton, setOpenButton] = useState(0)
    const [toBePushedTab, setToBePushedTab] = useState(null)

    return (
        <VerticalTabs
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
}