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
                    onChange={event => props.handleChange('title', event.target.value)}
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
                            onChange={event => props.handleChange('dataset', {
                                ...props.node.dataset,
                                axisLabel: event.target.value
                            })}
                            value={props.node.axisLabel}
                            placeholder={'Eixo'}
                        />
                    </div>
                    <div className={styles.dropDownWrapper}>
                        <div className={styles.field} id={'add-field-node-axis'}
                             style={{textTransform: props.node.dataset === undefined || props.node.dataset.axis === null ? 'capitalize' : undefined}}>
                            {props.node.dataset === undefined || props.node.dataset.axis === null ?
                                <AddRounded style={{fontSize: '1.3rem'}}/> : null}
                            {props.node.dataset === undefined || props.node.dataset.axis === null ? 'Adicionar campo de eixo' : props.node.dataset.axis}
                        </div>
                        {props.node.dataset === undefined || props.node.dataset.axis === null ? null :
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
                                                onClick: () => props.handleChange('dataset', {
                                                    ...props.node.dataset,
                                                    axis: null
                                                }),
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
                            onChange={event => props.handleChange('dataset', {
                                ...props.node.dataset,
                                valueLabel: event.target.value
                            })}
                            value={props.node.dataset === undefined ? '' : props.node.dataset.valueLabel}
                            placeholder={'Valores'}
                        />
                    </div>
                    <div className={styles.dropDownWrapper}>
                        <div className={styles.field} id={'add-field-node-value'}
                             style={{textTransform: props.node.dataset === undefined || props.node.dataset.value === null ? 'capitalize' : undefined}}>
                            {props.node.dataset === undefined || props.node.dataset.value === null ?
                                <AddRounded style={{fontSize: '1.3rem'}}/> : null}
                            {props.node.dataset === undefined || props.node.dataset.value === null ? 'Adicionar campo de valor' : props.node.dataset.value}

                        </div>
                        {props.node.dataset === undefined || props.node.dataset.value === null ? null :
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
                                                onClick: () => props.handleChange('dataset', {
                                                    ...props.node.dataset,
                                                    value: null
                                                }),
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
    handleChange: PropTypes.func
}