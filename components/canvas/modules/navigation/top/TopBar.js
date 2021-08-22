import PropTypes from 'prop-types'
import styles from './styles/Top.module.css'
import {
    AddRounded,
    FormatAlignCenterRounded, FormatAlignLeftRounded, FormatAlignRightRounded,
    FormatBoldRounded,
    FormatItalicRounded,
    FormatUnderlinedRounded,
    RemoveRounded, ZoomInRounded, ZoomOutRounded
} from "@material-ui/icons";
import Scale from "../misc/Scale";
import React, {useState} from "react";
import Dropdown from "../misc/Dropdown";
import FontTemplates from "./modules/FontTemplates";
import FontFamilyTemplates from "./modules/FontFamilyTemplates";

export default function TopBar(props) {
    const [openDropdown, setOpenDropdown] = useState(null)

    return (
        <div className={styles.container}>
            <Scale scale={props.scale} setScale={props.setScale}/>
            <div className={styles.divider}/>
            <button
                className={[styles.button, props.data.styling.fontWeight ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    let newStyling = {...props.data.styling}
                    newStyling.fontWeight = props.data.styling.fontWeight ? undefined : 'bold'

                    props.setData({
                        ...props.data,
                        styling: newStyling
                    })
                }}>
                <FormatBoldRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <button
                className={[styles.button, props.data.styling.fontStyle ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    let newStyling = {...props.data.styling}
                    newStyling.fontStyle = props.data.styling.fontStyle ? undefined : 'italic'

                    props.setData({
                        ...props.data,
                        styling: newStyling
                    })
                }}>
                <FormatItalicRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <button
                className={[styles.button, props.data.styling.textDecoration ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    let newStyling = {...props.data.styling}
                    newStyling.textDecoration = props.data.styling.textDecoration ? undefined : 'underline'

                    props.setData({
                        ...props.data,
                        styling: newStyling
                    })
                }}>
                <FormatUnderlinedRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <div className={styles.divider}/>
            <Dropdown
                handleClose={() => setOpenDropdown(null)}
                open={openDropdown === 0} handleOpen={() => setOpenDropdown(0)}
                buttons={FontTemplates(props)}
                label={'Fontsize'}
            />
            <Dropdown
                handleClose={() => setOpenDropdown(null)}
                open={openDropdown === 1} handleOpen={() => setOpenDropdown(1)}
                buttons={FontFamilyTemplates(props)}
                label={props.data.styling.fontFamily}
            />
            <button
                className={[styles.button, props.data.styling.textAlign === 'left' ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    let newStyling = {...props.data.styling}
                    newStyling.textAlign = 'left'

                    props.setData({
                        ...props.data,
                        styling: newStyling
                    })
                }}>
                <FormatAlignLeftRounded style={{fontSize: '1.3rem'}}/>
            </button>

            <button
                className={[styles.button, props.data.styling.textAlign === 'center' ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    let newStyling = {...props.data.styling}
                    newStyling.textAlign = 'center'

                    props.setData({
                        ...props.data,
                        styling: newStyling
                    })
                }}>
                <FormatAlignCenterRounded style={{fontSize: '1.3rem'}}/>
            </button>

            <button
                className={[styles.button, props.data.styling.textAlign === 'right' ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    let newStyling = {...props.data.styling}
                    newStyling.textAlign = 'right'

                    props.setData({
                        ...props.data,
                        styling: newStyling
                    })
                }}>
                <FormatAlignRightRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <div className={styles.divider}/>
            <div className={styles.fontSize}>
                <button
                    className={styles.button} disabled={props.data.styling.fontSize === 50}
                    style={{
                        borderRadius: '5px  0  0  5px',
                        borderRight: '#ecedf2 1px solid'
                    }}
                    onClick={() => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontSize = props.data.styling.fontSize + 1

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    }}
                >
                    <AddRounded style={{fontSize: '1.1rem'}}/>
                </button>
                <input
                    className={styles.fontInput} type={'number'}
                    onChange={event => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontSize = event.target.value

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    }} value={props.data.styling.fontSize}/>
                <button
                    style={{
                        borderRadius: '0 5px 5px 0 ',
                        borderLeft: '#ecedf2 1px solid'
                    }}
                    className={styles.button} disabled={props.data.styling.fontSize === 10}
                    onClick={() => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontSize = props.data.styling.fontSize - 1

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    }}
                >
                    <RemoveRounded style={{fontSize: '1.1rem'}}/>
                </button>
            </div>
        </div>
    )
}

TopBar.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    scale: PropTypes.number,
    setScale: PropTypes.func
}