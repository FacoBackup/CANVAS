import Elements from "./Elements";
import styles from "../styles/Options.module.css";
import {DescriptionRounded, PictureAsPdfRounded, PrintRounded, PublishRounded, SaveRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import HandleUpload from "../../../../methods/handles/HandleUpload";
import {useRef} from "react";
import HandleDownload from "../../../../methods/handles/HandleDownload";

export default function FileOptions(props) {
    const uploadRef = useRef()
    return (
        <>
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

            <button className={styles.primaryButton} onClick={() => uploadRef.current.click()}>
                <PublishRounded style={{fontSize: '1.2rem'}}/>
                Importar arquivo
            </button>

            <Elements {...props} label={'Salvar como'}>
                <div className={styles.buttons}>
                    <button className={styles.secondaryButton}
                            onClick={() => HandleDownload({data: props.data, asJson: false})}>
                        <SaveRounded style={{fontSize: '1.2rem'}}/>
                        Baixar cópia
                    </button>
                    <button className={styles.secondaryButton} onClick={() => props.handlePrint()}>
                        <PictureAsPdfRounded style={{fontSize: '1.2rem'}}/>
                        Baixar como PDF
                    </button>
                </div>
            </Elements>
            <Elements {...props} label={'Exportar'}>
                <div className={styles.buttons}>
                    <button className={styles.secondaryButton}
                            onClick={() => HandleDownload({data: props.data, asJson: true})}>
                        <DescriptionRounded style={{fontSize: '1.2rem'}}/>
                        Dados como JSON
                    </button>
                    <button className={styles.secondaryButton} onClick={() => props.handlePrint()}>
                        <PrintRounded style={{fontSize: '1.2rem'}}/>
                        Imprimir
                    </button>
                </div>
            </Elements>
            <Elements {...props} label={'Sobre'}>
            </Elements>

        </>
    )
}

FileOptions.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    handlePrint: PropTypes.func
}