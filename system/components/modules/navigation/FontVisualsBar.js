import PropTypes from 'prop-types'
import styles from '../../styles/Top.module.css'
import {
    AddRounded,
    FormatAlignCenterRounded,
    FormatAlignLeftRounded,
    FormatAlignRightRounded,
    FormatBoldRounded,
    FormatItalicRounded,
    FormatUnderlinedRounded,
    RemoveRounded
} from "@material-ui/icons";
import Scale from "./misc/Scale";
import React, {useState} from "react";
import Dropdown from "./misc/Dropdown";
import FontTemplates from "../../templates/font/FontTemplates";
import FontFamilyTemplates from "../../templates/font/FontFamilyTemplates";

export default function FontVisualsBar(props) {
    const [openDropdown, setOpenDropdown] = useState(null)

    return (
        <div className={styles.container}>
            <Scale scale={props.scale} setScale={props.setScale}/>
            <div className={styles.divider}/>
            <button
                className={styles.button}
                onClick={e => {
                    document.execCommand('bold', false, null);

                }}>
                <FormatBoldRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <button
                className={styles.button}
                onClick={() => {
                    document.execCommand('italic', false, null);


                }}>
                <FormatItalicRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <button
                className={styles.button}
                onClick={() => {
                    document.execCommand('underline', false, null);

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
                label={'Fonte'}
            />
            <button
                className={styles.button}
                onClick={() => {
                    document.execCommand('justifyLeft', false, null);

                }}>
                <FormatAlignLeftRounded style={{fontSize: '1.3rem'}}/>
            </button>

            <button
                className={styles.button}
                onClick={() => {
                    document.execCommand('justifyCenter', false, null);

                }}>
                <FormatAlignCenterRounded style={{fontSize: '1.3rem'}}/>
            </button>

            <button
                className={styles.button}
                onClick={() => {
                    document.execCommand('justifyRight', false, null);

                }}>
                <FormatAlignRightRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <div className={styles.divider}/>
            <div className={styles.fontSize}>
                <button
                    className={styles.button} disabled={true}
                    style={{
                        borderRadius: '5px  0  0  5px',
                        borderRight: '#ecedf2 1px solid'
                    }}
                    onClick={() => {
                        document.execCommand('fontSize', false, 16);

                    }}
                >
                    <AddRounded style={{fontSize: '1.1rem'}}/>
                </button>
                <input
                    className={styles.fontInput} type={'number'} disabled={true}
                    onChange={event => {
                        document.execCommand('fontSize', false, 16);

                    }} value={10}/>
                <button
                    style={{
                        borderRadius: '0 5px 5px 0 ',
                        borderLeft: '#ecedf2 1px solid'
                    }}
                    className={styles.button} disabled={true}
                    onClick={() => {
                        document.execCommand('fontSize', false, 12);

                    }}
                >
                    <RemoveRounded style={{fontSize: '1.1rem'}}/>
                </button>
            </div>
        </div>
    )
}

FontVisualsBar.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    scale: PropTypes.number,
    setScale: PropTypes.func
}