import Accordion from "../../shared/templates/tools/Accordion";
import styles from "../styles/Dataset.module.css";
import PropTypes from "prop-types";
import {AddRounded, ArrowDropDownRounded, CloseRounded} from "@material-ui/icons";
import Dropdown from "../../shared/templates/tools/Dropdown";
import {useState} from "react";

export default function NodeDatasetEditor(props) {
    const [openDropdown, setOpenDropdown] = useState(null)
    return (
        <>
            <div className={styles.fieldContainer}>
                <div>Título</div>
                <input
                    className={styles.basicInput}
                    onChange={event => props.dispatch({type: props.actions.TITLE, payload: event.target.value})}
                    value={props.node.title}
                    placeholder={'Título'}
                />
            </div>

            <Accordion label={'Eixo'}>
                <div style={{display: 'grid', gap: '4px', padding: '8px'}}>
                    <div className={styles.fieldContainer}>
                        <div>Título do eixo</div>
                        <input
                            className={styles.basicInput}
                            onChange={event => props.dispatch({type: props.actions.DATASET, payload: {...props.node.dataset, axisLabel: event.target.value}})}
                            // onChange={event => props.dispatch({type: 'dataset', {
                            //     ...props.node.dataset,
                            //     axisLabel: event.target.value
                            // })}
                            value={props.node.axisLabel}
                            placeholder={'Eixo'}
                        />
                    </div>
                    <div className={styles.dropDownWrapper}>
                        <div className={styles.field} id={'add-field-node-axis'}
                             onDragOver={e => e.preventDefault()}
                             onDrop={(e) => {
                                 e.preventDefault()
                                 props.dispatch({type: props.actions.DATASET, payload: {...props.node.dataset, axis: e.dataTransfer.getData('data')}})
                             }}
                             style={{textTransform: props.node.dataset === undefined || !props.node.dataset.axis ? 'capitalize' : undefined}}>
                            {props.node.dataset === undefined || !props.node.dataset.axis ?
                                <AddRounded style={{fontSize: '1.3rem'}}/> : null}
                            {props.node.dataset === undefined || !props.node.dataset.axis ? 'Adicionar campo de eixo' : props.node.dataset.axis}
                        </div>
                        {props.node.dataset === undefined || !props.node.dataset.axis ? null :
                            <Dropdown
                                label={<ArrowDropDownRounded/>} open={openDropdown === 0}
                                handleOpen={() => setOpenDropdown(0)}
                                justify={'left'} width={'175px'}
                                handleClose={() => setOpenDropdown(null)}
                                buttons={[
                                    {
                                        children: [
                                            {
                                                label: 'Remover campo',
                                                onClick: () => props.dispatch({type: props.actions.DATASET, payload: {...props.node.dataset, axis: null}}),
                                                icon: <CloseRounded/>,
                                                styles: {color: '#ff5555'}
                                            }
                                        ]
                                    }
                                ]}/>

                        }
                    </div>
                </div>
            </Accordion>
            <Accordion label={'Valores'}>
                <div style={{display: 'grid', gap: '4px', padding: '8px'}}>
                    <div className={styles.fieldContainer}>
                        <div>Título dos valores</div>
                        <input
                            className={styles.basicInput}
                            onChange={event => props.dispatch({type: props.actions.DATASET, payload: {...props.node.dataset, valueLabel: event.target.value}})}
                            value={props.node.dataset === undefined ? '' : props.node.dataset.valueLabel}
                            placeholder={'Valores'}
                        />
                    </div>
                    <div className={styles.dropDownWrapper}>
                        <div className={styles.field} id={'add-field-node-value'}
                             onDragOver={e => e.preventDefault()}
                             onDrop={(e) => {
                                 e.preventDefault()
                                 props.dispatch({type: props.actions.DATASET, payload: {...props.node.dataset, value: e.dataTransfer.getData('data')}})
                             }}
                             style={{textTransform: props.node.dataset === undefined || !props.node.dataset.value ? 'capitalize' : undefined}}>
                            {props.node.dataset === undefined || !props.node.dataset.value ?
                                <AddRounded style={{fontSize: '1.3rem'}}/> : null}
                            {props.node.dataset === undefined || !props.node.dataset.value ? 'Adicionar campo de valor' : props.node.dataset.value}

                        </div>
                        {props.node.dataset === undefined || !props.node.dataset.value ? null :
                            <Dropdown
                                label={<ArrowDropDownRounded/>} open={openDropdown === 0}
                                handleOpen={() => setOpenDropdown(0)}
                                justify={'left'} width={'175px'}
                                handleClose={() => setOpenDropdown(null)}

                                buttons={[
                                    {
                                        children: [
                                            {
                                                label: 'Remover campo',
                                                onClick: () => props.dispatch({type: props.actions.DATASET, payload: {...props.node.dataset, value: null}}),
                                                icon: <CloseRounded/>,
                                                styles: {color: '#ff5555'}
                                            }
                                        ]
                                    }
                                ]}/>

                        }
                    </div>
                </div>
            </Accordion>
        </>
    )
}

NodeDatasetEditor.propTypes = {

    node: PropTypes.object,
    dispatch: PropTypes.func,
    actions: PropTypes.object
}