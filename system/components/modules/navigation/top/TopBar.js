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
    const [currentStyles, setCurrentStyles] = useState({
        fontSize: 16,
        fontFamily: 'Roboto',
        bold: false,
        underline: false,
        italic: false,
        textAlign: 'center'
    })
    return (
        <div className={styles.container}>
            <Scale scale={props.scale} setScale={props.setScale}/>
            <div className={styles.divider}/>
            <button
                className={[styles.button, currentStyles.bold ? styles.activeButton : undefined].join(' ')}
                onClick={e => {
                    document.execCommand('bold', false, null);
                    setCurrentStyles({
                        ...currentStyles,
                        bold: !currentStyles.bold
                    })
                }}>
                <FormatBoldRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <button
                className={[styles.button, currentStyles.italic ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    document.execCommand('italic', false, null);
                    setCurrentStyles({
                        ...currentStyles,
                        italic: !currentStyles.italic
                    })

                }}>
                <FormatItalicRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <button
                className={[styles.button, currentStyles.underline ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    document.execCommand('underline', false, null);
                    setCurrentStyles({
                        ...currentStyles,
                        underline: !currentStyles.underline
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
                label={currentStyles.fontFamily}
            />
            <button
                className={[styles.button, currentStyles.textAlign === 'left' ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    document.execCommand('justifyLeft', false, null);
                    setCurrentStyles({
                        ...currentStyles,
                        textAlign: 'left'
                    })
                }}>
                <FormatAlignLeftRounded style={{fontSize: '1.3rem'}}/>
            </button>

            <button
                className={[styles.button, currentStyles.textAlign === 'center' ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    document.execCommand('justifyCenter', false, null);
                    setCurrentStyles({
                        ...currentStyles,
                        textAlign: 'center'
                    })
                }}>
                <FormatAlignCenterRounded style={{fontSize: '1.3rem'}}/>
            </button>

            <button
                className={[styles.button, currentStyles.textAlign === 'right' ? styles.activeButton : undefined].join(' ')}
                onClick={() => {
                    document.execCommand('justifyRight', false, null);
                    setCurrentStyles({
                        ...currentStyles,
                        textAlign: 'right'
                    })
                }}>
                <FormatAlignRightRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <div className={styles.divider}/>
            <div className={styles.fontSize}>
                <button
                    className={styles.button} disabled={currentStyles.fontSize === 50}
                    style={{
                        borderRadius: '5px  0  0  5px',
                        borderRight: '#ecedf2 1px solid'
                    }}
                    onClick={() => {
                        document.execCommand('fontSize', false, currentStyles.fontSize);
                        setCurrentStyles({
                            ...currentStyles,
                            fontSize: currentStyles.fontSize + 1
                        })
                    }}
                >
                    <AddRounded style={{fontSize: '1.1rem'}}/>
                </button>
                <input
                    className={styles.fontInput} type={'number'}
                    onChange={event => {
                        document.execCommand('fontSize', false, currentStyles.fontSize);
                        setCurrentStyles({
                            ...currentStyles,
                            fontSize: parseInt(event.target.value)
                        })
                    }} value={currentStyles.fontSize}/>
                <button
                    style={{
                        borderRadius: '0 5px 5px 0 ',
                        borderLeft: '#ecedf2 1px solid'
                    }}
                    className={styles.button} disabled={currentStyles.fontSize === 10}
                    onClick={() => {
                        document.execCommand('fontSize', false, currentStyles.fontSize);
                        setCurrentStyles({
                            ...currentStyles,
                            fontSize: currentStyles.fontSize - 1
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