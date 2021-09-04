import Accordion from "./Accordion";
import styles from "../styles/NodeOverview.module.css";
import PropTypes from "prop-types";

export default function DimensionPositionEditor(props){
    return(
        <>
            <Accordion label={'Posição'}>
                <div style={{display: 'grid', gap: '4px', padding: '2%'}}>

                    <div className={styles.fieldContainer}>
                        <label htmlFor={'x-placement'}>X</label>
                        <input id={'x-placement'}
                               className={styles.input}
                               onChange={event => {
                                   let newPlacement = {...props.node.placement}
                                   newPlacement.y = props.node.placement.y
                                   newPlacement.x = event.target.value
                                   props.handleChange('placement', newPlacement)
                               }}
                               value={props.node.placement.x} placeholder={'X'} type={'number'}
                        />
                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor={'y-placement'}>Y</label>
                        <input
                            id={'y-placement'}
                            className={styles.input}
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
                <div style={{display: 'grid', gap: '4px', padding: '2%'}}>
                    <div className={styles.fieldContainer}>
                        <label htmlFor={'width-placement'}>Largura</label>
                        <input
                            id={'width-placement'}
                            className={styles.input}
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
                    <div className={styles.fieldContainer}>
                        <label htmlFor={'height-placement'}>Altura</label>
                        <input
                            id={'height-placement'}
                            className={styles.input}
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