import Accordion from "../tools/Accordion";
import styles from "../../styles/NodeOverview.module.css";
import PropTypes from "prop-types";

export default function DimensionPositionEditor(props){
    return(
        <>
            <Accordion label={'Posição'}>
                <div style={{display: 'grid', gap: '4px', padding: '8px'}}>

                    <div className={styles.fieldContainer}>
                        <div>Eixo X</div>
                        <input
                               className={styles.basicInput}
                               onChange={event => {
                                   let newPlacement = {...props.node.placement}
                                   newPlacement.y = props.node.placement.y
                                   newPlacement.x = event.target.value
                                   props.handleChange('placement', newPlacement)
                               }}
                               value={props.node.placement.x} placeholder={'X'} type={'number'}
                        />
                    </div>
                    <div className={styles.fieldContainer} style={{paddingBottom: 0}}>
                        <div>Eixo Y</div>
                        <input

                            className={styles.basicInput}
                            onChange={event => {
                                let newPlacement = {...props.node.placement}
                                newPlacement.x = props.node.placement.x
                                newPlacement.y = event.target.value
                                props.handleChange('placement', newPlacement)
                            }}
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
                                let newDimensions = {...props.node.dimensions}
                                newDimensions.width = parseInt(event.target.value)
                                if (event.target.value !== '0' && event.target.value.toString().length > 0)
                                    props.handleChange('dimensions', newDimensions)
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

                                let newDimensions = {...props.node.dimensions}
                                newDimensions.height = parseInt(event.target.value)
                                if (event.target.value !== '0' && event.target.value.toString().length > 0)
                                    props.handleChange('dimensions', newDimensions)
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
    handleChange: PropTypes.func
}