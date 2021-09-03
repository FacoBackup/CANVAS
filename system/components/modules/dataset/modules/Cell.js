import PropTypes from "prop-types";
import React, {useState} from "react";
import {
    ArrowDropDownRounded, DeleteRounded,
    FileCopyRounded,
    PictureAsPdfRounded,
    PrintRounded,
    PublishRounded,
    SaveRounded
} from "@material-ui/icons";
import HandleDownload from "../../../utils/io/HandleDownload";
import Dropdown from "../../navigation/misc/Dropdown";
import styles from '../../../styles/Dataset.module.css'

export default function Cell(props) {
    const [focused, setFocused] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <td onDoubleClick={() => setFocused(true)} className={styles.cell}>
            <div className={styles.cellContent} style={{justifyContent: props.asHeader ? undefined : 'flex-start'}}>
                <div contentEditable={focused} onBlur={() => setFocused(false)} style={{display: props.value.length === 0 ? 'none' : undefined}}>
                    {props.value}
                </div>

                {props.asHeader ?
                    <Dropdown
                        label={<ArrowDropDownRounded/>}
                        buttons={[{
                            children: [
                                {
                                    label: 'Remover coluna',
                                    icon: <DeleteRounded/>,
                                    onClick: () => {

                                    }
                                },
                                {
                                    label: 'Alterar tipo',
                                    icon: <DeleteRounded/>,
                                    onClick: () => {

                                    }
                                }
                            ]
                        }]}
                        open={open}
                        handleOpen={() => setOpen(true)}
                        handleClose={() => setOpen(false)}
                    />
                    :
                    null
                }
            </div>
        </td>
    )
}

Cell.propTypes = {
    value: PropTypes.any,
    asHeader: PropTypes.bool
}