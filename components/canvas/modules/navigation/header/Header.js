import PropTypes from 'prop-types'
import styles from './styles/Header.module.css'

import HandleUpload from "../../../methods/handles/HandleUpload";
import {
    GetAppRounded,
    ImageRounded,
    PictureAsPdfRounded,
    SaveRounded,
    ShareRounded,
    StorageRounded
} from "@material-ui/icons";
import Dropdown from "./modules/Dropdown";
import {useState} from "react";

export default function Header(props) {
    const [openMenu, setOpenMenu] = useState(null)
    return (
        <div className={styles.navigation}>
            <div className={styles.column}>
                <input className={styles.textField}
                       value={props.data.subject}
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
                <input type="file" id="upload_file_input" style={{display: 'none'}} multiple={false}
                       onChange={event => HandleUpload({
                           file: event,
                           setData: props.setData,
                       })}
                       accept={'.json'}/>


                <Dropdown
                    handleClose={() => setOpenMenu(null)}
                    open={openMenu === 1} handleOpen={ () => setOpenMenu(1)}
                    buttons={[
                        {
                            children: [
                                {
                                    label: 'Renomear projeto',
                                    onClick: () => null
                                },
                            ]
                        },
                        {
                            children: [
                                {
                                    label: 'Salvar',
                                    icon: <SaveRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => null
                                },
                                {
                                    label: 'Importar projeto',
                                    icon: <StorageRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => null
                                }
                            ]
                        }
                    ]}
                    label={'Arquivo'}/>


                <Dropdown
                    handleClose={() => setOpenMenu(null)}
                    open={openMenu === 2} handleOpen={ () => setOpenMenu(2)}
                    buttons={[
                        {
                            children: [
                                {
                                    label: 'Projeto',
                                    icon: <GetAppRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => null
                                }
                            ]
                        },
                        {
                            children: [
                                {
                                    label: 'PDF',
                                    icon: <PictureAsPdfRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => null
                                },
                                {
                                    label: 'PNG',
                                    icon: <ImageRounded style={{fontSize: '1.3rem'}}/>,
                                    onClick: () => null
                                }
                            ]
                        }
                    ]}
                    label={'Exportar'}
                />

                <Dropdown
                    handleClose={() => setOpenMenu(null)}
                    open={openMenu === 3} handleOpen={ () => setOpenMenu(3)}
                    buttons={[
                        {

                            children: [
                                {
                                    label: 'Aumentar',
                                    onClick: () => null
                                },
                                {
                                    label: 'Reduzir',
                                    onClick: () => null
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
    reduced: PropTypes.bool,
    setReduced: PropTypes.func
}