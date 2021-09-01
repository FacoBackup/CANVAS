import styles from "../styles/Options.module.css";
import {
    HelpRounded,
    InfoRounded,
    PictureAsPdfRounded,
    PrintRounded,
    PublishRounded,
    SaveRounded
} from "@material-ui/icons";
import PropTypes from "prop-types";
import HandleUpload from "../../../../utils/io/HandleUpload";
import React, {useRef, useState} from "react";
import HandleDownload from "../../../../utils/io/HandleDownload";
import Dropdown from "../../misc/Dropdown";
import Link from 'next/link'

export default function FileOptions(props) {
    const uploadRef = useRef()
    const [open, setOpen] = useState(null)
    return (
        <div className={styles.fileOptionsWrapper}>
         <Link href={'/'}>
             <button className={styles.homeButton}>
                 <img rel='icon' src={'/flow.svg'} style={{width: '27px', height: '30px', overflow: 'visible'}} alt={'logo'}/>
             </button>
         </Link>
            <input type="file" ref={uploadRef} style={{display: 'none'}} multiple={false}
                   onChange={event => HandleUpload({
                       file: event,
                       setData: props.setData,
                   })}
                   accept={'.canvas'}/>
            <input
                className={styles.textField}
                value={props.data.subject}
                onChange={event => props.setData({...props.data, subject: event.target.value})}/>

            <Dropdown
                label={'Arquivo'} open={open === 0}
                buttons={[
                    {
                        children: [
                            {
                                label: 'Importar arquivo',
                                icon: <PublishRounded style={{fontSize: '1.2rem'}}/>,
                                onClick: () => uploadRef.current.click(),
                                disabled: false
                            },
                            {
                                label: 'Baixar cópia',
                                icon: <SaveRounded style={{fontSize: '1.2rem'}}/>,
                                onClick: () => HandleDownload({data: props.data, asJson: false}),
                                disabled: false
                            }
                        ],
                    }
                ]}
                handleOpen={() => setOpen(0)}
                handleClose={() => setOpen(null)}
            />


            <Dropdown
                label={'Exportar'} open={open === 1}
                buttons={[
                    {
                        children: [
                            {
                                label: 'Exportar como PDF',
                                icon: <PictureAsPdfRounded style={{fontSize: '1.2rem'}}/>,
                                onClick: () => uploadRef.current.click(),
                                disabled: false
                            },
                            {
                                label: 'Imprimir',
                                icon: <PrintRounded style={{fontSize: '1.2rem'}}/>,
                                onClick: () => props.handlePrint(),
                                disabled: false
                            }
                        ],
                    }
                ]}
                handleOpen={() => setOpen(1)}
                handleClose={() => setOpen(null)}
            />
            <Dropdown
                label={'Sobre'} open={open === 2}
                buttons={[
                    {
                        children: [
                            {
                                label: 'Ajuda',
                                icon: <HelpRounded style={{fontSize: '1.2rem'}}/>,
                                onClick: () => null,
                                disabled: true
                            },
                            {
                                label: 'Informações adicionais',
                                icon: <InfoRounded  style={{fontSize: '1.2rem'}}/>,
                                onClick: () => null,
                                disabled: true
                            }
                        ],
                    }
                ]}
                handleOpen={() => setOpen(2)}
                handleClose={() => setOpen(null)}
            />

            {/*<button className={styles.secondaryButton}*/}
            {/*        onClick={() => HandleDownload({data: props.data, asJson: true})}>*/}
            {/*    <DescriptionRounded style={{fontSize: '1.2rem'}}/>*/}
            {/*    Dados como JSON*/}
            {/*</button>*/}
        </div>
    )
}

FileOptions.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    handlePrint: PropTypes.func
}