import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import {ArrowDropDownRounded, DeleteRounded} from "@material-ui/icons";
import Dropdown from "../../../../shared/templates/Dropdown";
import styles from '../../../styles/Dataset.module.css'
import NumericIcon from "../templates/NumericIcon";
import StringIcon from "../templates/StringIcon";

export default function Cell(props) {
    const [focused, setFocused] = useState(false)
    const [open, setOpen] = useState(null)
    const ref = useRef()
    useEffect(() => {
        ref.current.innerText = props.value !== undefined ? props.value : ''
    }, [])

    const getType = () => {
        let res = null
        switch (typeof props.sample) {
            case "number": {
                if (props.sample % 1 === 0)
                    res = <NumericIcon size={'1.1rem'}/>
                break
            }
            case "string":

                    res = <StringIcon size={'1.1rem'}/>
                break
            case "boolean":

                break

        }
        return res
    }

    return (
        <td onClick={() => setFocused(true)} className={styles.cell}
            style={{padding: props.asHeader ? '0 8px 0 0 ' : undefined}}
        >
            <div className={styles.cellContent}>
                {props.asHeader ?
                    <Dropdown
                        label={getType()}
                        buttons={[{
                            children: [
                                {
                                    label: 'Texto',
                                    icon: <StringIcon/>,
                                    onClick: () => {

                                    },
                                    active: typeof props.sample === 'string'
                                },
                                {
                                    label: 'Numérico',
                                    icon: <NumericIcon/>,
                                    onClick: () => {

                                    },
                                    active: typeof props.sample === 'number'&& props.sample % 1 === 0
                                },
                                {
                                    label: 'Decimal',
                                    icon: <NumericIcon/>,
                                    onClick: () => {

                                    },
                                    active: typeof props.sample === 'number' && props.sample % 1 !== 0
                                }
                            ],

                        },
                        ]}
                        open={open === 0}
                        handleOpen={() => setOpen(0)}
                        handleClose={() => setOpen(null)}
                    />
                    :
                    null
                }
                <div
                    contentEditable={focused}
                    onBlur={() => {
                        setFocused(false)
                        props.handleChange(ref.current.innerText)
                    }} ref={ref}
                    onInput={e => {
                        if (!props.asHeader)
                            props.handleChange(e.target.innerText)
                    }}
                    style={{
                        // display: props.value?.length === 0 ? 'none' : undefined,
                        fontWeight: props.asHeader ? 'bold' : undefined,
                        fontSize: props.asHeader ? '1rem' : undefined,
                        cursor: focused ? 'text' : 'pointer',
                        userSelect: focused ? undefined : 'none'
                    }} className={styles.cellInput}/>

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
                                }
                            ],

                        },
                        ]}
                        open={open === 1}
                        handleOpen={() => setOpen(1)}
                        handleClose={() => setOpen(null)}
                    />
                    :
                    null
                }
            </div>
        </td>
    )
}

Cell.propTypes = {
    handleChange: PropTypes.func,
    value: PropTypes.any,
    asHeader: PropTypes.bool,
    sample: PropTypes.any
}