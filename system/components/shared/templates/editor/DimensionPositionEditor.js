import Accordion from "../tools/Accordion";
import styles from "../../styles/NodeOverview.module.css";
import PropTypes from "prop-types";

export default function DimensionPositionEditor(props) {
    return (
        <>
            <Accordion label={'Posição'}>
                <div style={{display: 'grid', gap: '4px', padding: '8px'}}>

                    <div className={styles.fieldContainer}>
                        <div>Eixo X</div>
                        <input
                            className={styles.basicInput}
                            onChange={event => props.dispatch({
                                type: props.actions.PLACEMENT,
                                payload: {...props.node.placement, x: event.target.value}
                            })}
                            value={props.node.placement.x} placeholder={'X'} type={'number'}
                        />
                    </div>
                    <div className={styles.fieldContainer} style={{paddingBottom: 0}}>
                        <div>Eixo Y</div>
                        <input

                            className={styles.basicInput}
                            onChange={event => props.dispatch({
                                type: props.actions.PLACEMENT,
                                payload: {...props.node.placement, y: event.target.value}
                            })}
                            value={props.node.placement.y} placeholder={'Y'} type={'number'}
                        />
                    </div>
                </div>
            </Accordion>
            <Accordion label={'Tamanho'}>
                <div style={{display: 'grid', gap: '4px', padding: '8px'}}>
                    <div className={styles.fieldContainer}>
                        <div>Largura</div>
                        <input

                            className={styles.basicInput}
                            min={'50'} max={'999'}
                            onChange={event => {
                                const value = parseInt(event.target.value)
                                if (!isNaN(value) && value > 0)
                                    props.dispatch({
                                        type: props.actions.DIMENSIONS,
                                        payload: {...props.node.dimensions, width: value}
                                    })
                            }}

                            value={props.node.dimensions.width} placeholder={'Largura'} type={'number'}
                        />
                    </div>
                    <div className={styles.fieldContainer} style={{paddingBottom: 0}}>
                        <div>Altura</div>
                        <input
                            className={styles.basicInput}
                            min={'50'} max={'999'}
                            onChange={event => {
                                const value = parseInt(event.target.value)
                                if (!isNaN(value) && value > 0)
                                    props.dispatch({
                                        type: props.actions.DIMENSIONS,
                                        payload: {...props.node.dimensions, height: value}
                                    })
                            }}
                            value={props.node.dimensions.height} placeholder={'Altura'} type={'number'}
                        />

                    </div>
                </div>
            </Accordion>
        </>
    )
}

DimensionPositionEditor.propTypes = {
    node: PropTypes.object,
    dispatch: PropTypes.func,
    actions: PropTypes.object
}