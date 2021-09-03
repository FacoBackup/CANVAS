import Elements from "../../modules/navigation/side/modules/Elements";
import styles from "../../styles/Dataset.module.css";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";

export default function NodeDatasetEditor(props){
    return(
        <>
            <Elements label={'Posição'}>
                <div style={{display: 'grid', gap: '4px', paddingBottom: '4px'}}>

                    <div className={styles.field} id={'add-field-node-axis'}>
                        {props.node.dataset === undefined || props.node.dataset.axis === null ? <AddRounded style={{fontSize: '1.3rem'}}/> : null}
                        {props.node.dataset === undefined || props.node.dataset.axis === null ? 'Adicionar campo de eixo' : props.node.dataset.axis}

                    </div>
                    <div className={styles.field} id={'add-field-node-value'}>
                        {props.node.dataset === undefined || props.node.dataset.value === null ? <AddRounded style={{fontSize: '1.3rem'}}/> : null}
                        {props.node.dataset === undefined || props.node.dataset.value === null ? 'Adicionar campo de valor' : props.node.dataset.value}

                    </div>
                </div>
            </Elements>
        </>
    )
}

NodeDatasetEditor.propTypes = {

    node: PropTypes.object,
    handleChange: PropTypes.func
}