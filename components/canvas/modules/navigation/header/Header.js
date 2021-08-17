import PropTypes from 'prop-types'
import styles from './styles/Header.module.css'

import HandleUpload from "../../../methods/handles/HandleUpload";
import {
    DescriptionRounded,
    GetAppRounded,
    ImageRounded,
    PictureAsPdfRounded,
    SaveRounded,
    ShareRounded,
    StorageRounded, ZoomInRounded, ZoomOutRounded
} from "@material-ui/icons";
import Dropdown from "./modules/Dropdown";
import {useRef, useState} from "react";
import HandleDownload from "../../../methods/handles/HandleDownload";

export default function Header(props) {
    const [openMenu, setOpenMenu] = useState(null)
    const inputRef = useRef()
    const uploadRef = useRef()

    return (
        <div className={styles.navigation}>
            <div className={styles.column}>
                <input
                    className={styles.textField}
                    value={props.data.subject} ref={inputRef}
                    onChange={event => props.setData({...props.data, subject: event.target.value})}/>
                {/*<button*/}
                {/*    className={styles.buttonContainer}*/}
                {/*    onClick={() => {*/}
                {/*        HandleDownload({*/}
                {/*            handleDownload: props.onSave,*/}
                {/*            data: props.data,*/}
                {/*            root: props.root,*/}
                {/*            asJson: true*/}
                {/*        })*/}
                {/*    }} disabled={props.data.nodes.length === 0}>*/}
                {/*    <SaveAltRounded/>*/}
                {/*    Baixar modelo*/}

                {/*</button>*/}
                <input type="file" ref={uploadRef} style={{display: 'none'}} multiple={false}
                       onChange={event => HandleUpload({
                           file: event,
                           setData: props.setData,
                       })}
                       accept={'.canvas'}/>


                <Dropdown
                    handleClose={() => setOpenMenu(null)}
                    open={openMenu === 1} handleOpen={() => setOpenMenu(1)}
                    buttons={[
                        {
                            children: [
                                {
                                    label: 'Renomear projeto',
                                    onClick: () => inputRef.current.focus()
                                },
                            ]
                        },
                        {
                            children: [
                                {
                                    label: 'Salvar',
                                    icon: <SaveRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => HandleDownload({data: props.data, asJson: false})
                                },
                                {
                                    label: 'Importar projeto',
                                    icon: <StorageRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => {

                                        uploadRef.current.click()
                                    }
                                }
                            ]
                        }
                    ]}
                    label={'Arquivo'}/>


                <Dropdown
                    handleClose={() => setOpenMenu(null)}
                    open={openMenu === 2} handleOpen={() => setOpenMenu(2)}
                    buttons={[
                        {
                            children: [
                                {
                                    label: 'JSON',
                                    icon: <DescriptionRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => HandleDownload({data: props.data, asJson: true})
                                }
                            ]
                        },
                        {
                            children: [
                                {
                                    label: 'PDF',
                                    icon: <PictureAsPdfRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => props.handlePrint()
                                },
                                {
                                    label: 'PNG',
                                    icon: <ImageRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => null,
                                    disabled: true
                                }
                            ]
                        }
                    ]}
                    label={'Exportar'}
                />

                <Dropdown
                    handleClose={() => setOpenMenu(null)}
                    open={openMenu === 3} handleOpen={() => setOpenMenu(3)}
                    buttons={[
                        {

                            children: [
                                {
                                    label: 'Aumentar',
                                    onClick: () => props.setScale(props.scale + .25),
                                    icon: <ZoomInRounded style={{fontSize: '1.3rem'}}/>,
                                    disabled: props.scale === 2
                                },
                                {
                                    label: 'Reduzir',
                                    onClick: () => props.setScale(props.scale - .25),
                                    icon: <ZoomOutRounded style={{fontSize: '1.3rem'}}/>,
                                disabled: props.scale === .5
                                }
                            ]
                        }
                    ]}
                    label={'Exibir'}/>
            </div>

        </div>
    )
}
Header.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,

    root: PropTypes.object,
    onSave: PropTypes.func,
    handlePrint: PropTypes.func,

    setScale: PropTypes.func,
    scale: PropTypes.number
}