import Accordion from "../tools/Accordion";
import styles from "../../styles/NodeOverview.module.css";
import PropTypes from "prop-types";
import {CirclePicker} from "react-color";

export default function BorderEditor(props) {

    return (
        <>
            <Accordion label={'Cor de destaque'}>
                <div style={{display: 'grid', gap: '4px', padding: '0 8px'}}>
                    <CirclePicker
                        width={'100%'}
                        color={{hex: props.node.styling.color}}
                        onChangeComplete={event => props.dispatch({
                            type: props.actions.VISUALS,
                            payload: {...props.node.styling, color: event.hex}
                        })}
                    />
                </div>
            </Accordion>
            <Accordion label={'Borda'}>
                <div style={{display: 'grid', gap: '4px', padding: '8px'}}>
                    <div className={styles.fieldContainer}
                         style={{display: props.node.shapeVariant === 'polygon' ? 'none' : undefined}}>
                        <div className={styles.fieldTitle}>
                            Raio borda
                            <div className={styles.valueContainer}>
                                {props.node.styling.borderRadius}
                            </div>
                        </div>
                        <input
                            className={styles.basicInput}
                            style={{transition: 'none', cursor: "pointer", height: '20px'}}
                            onChange={event => props.dispatch({
                                type: props.actions.VISUALS,
                                payload: {...props.node.styling, borderRadius: event.target.value}
                            })}
                            value={props.node.styling.borderRadius}
                            type={'range'}
                            max={10} min={0}
                        />
                    </div>
                    <div className={styles.fieldContainer}>

                        <div className={styles.fieldTitle}>
                            Largura borda
                            <div className={styles.valueContainer}>
                                {props.node.styling.strokeWidth}
                            </div>
                        </div>
                        <input
                            className={styles.basicInput}
                            style={{transition: 'none', cursor: "pointer", height: '20px'}}
                            onChange={event => props.dispatch({
                                type: props.actions.VISUALS,
                                payload: {...props.node.styling, strokeWidth: event.target.value}
                            })}
                            value={props.node.styling.strokeWidth}
                            type={'range'}
                            max={10} min={0}
                        />
                    </div>
                    <div className={styles.fieldContainer} style={{paddingBottom: 0}}>
                        <div className={styles.fieldTitle}>
                            Frequência dos traços
                            <div className={styles.valueContainer}>
                                {props.node.styling.strokeDasharray}
                            </div>
                        </div>
                        <input
                            className={styles.basicInput}
                            style={{transition: 'none', cursor: "pointer", height: '20px'}}
                            onChange={event => props.dispatch({
                                type: props.actions.VISUALS,
                                payload: {...props.node.styling, strokeDasharray: event.target.value}
                            })}
                            value={props.node.styling.strokeDasharray === undefined ? 0 : props.node.styling.strokeDasharray.split(',')[0]}
                            type={'range'}
                            max={10} min={0}
                        />
                    </div>
                </div>
            </Accordion>
        </>
    )
}

BorderEditor.propTypes = {
    node: PropTypes.object,
    dispatch: PropTypes.func,
    actions: PropTypes.object
}