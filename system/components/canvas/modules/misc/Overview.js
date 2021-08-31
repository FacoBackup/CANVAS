import PropTypes from 'prop-types'
import NodeTemplate from "../../../templates/props/NodeTemplate";
import styles from '../../../styles/NodeOverview.module.css'
import {AttachFileRounded, CloseRounded, DeleteForeverRounded} from "@material-ui/icons";
import {useEffect, useRef, useState} from "react";
import Tabs from "../../../modules/navigation/misc/Tabs";
import {CirclePicker} from "react-color";
import Elements from "../../../modules/navigation/side/modules/Elements";

export default function Overview(props) {
    const [openTab, setOpenTab] = useState(0)

    const nodeRef = document.getElementById(props.node.id + '-node')
    const ref = useRef()

    const handleChange = (name, value) => {
        const newNodes = [...props.data.nodes]
        const newNode = {...props.node}

        newNode[name] = value
        newNodes[props.nodeIndex] = newNode
        props.setState(({
            ...props.data,
            nodes: newNodes
        }))
    }

    return (
        <>
            <Elements label={'Cor de destaque'}>
                <CirclePicker
                    width={'100%'}
                    color={{hex: props.node.styling.color}}
                    onChangeComplete={event => {
                        handleChange('styling',
                            {
                                ...props.node.styling, ...{
                                    color: event.hex
                                }
                            }
                        )
                    }
                    }/>
            </Elements>
            <Elements label={'Borda'}>
                <div style={{display: 'grid', gap: '4px', paddingBottom: '4px'}}>
                    <div className={styles.fieldContainer}
                         style={{display: props.node.shapeVariant === 'polygon' ? 'none' : undefined}}>
                        <label htmlFor={'border-radius'}>Raio borda (px):</label>
                        <input id={'border-radius'}
                               className={styles.input}
                               onChange={event => {

                                   handleChange('styling',
                                       {
                                           ...props.node.styling, ...{
                                               border: event.target.value,
                                           }
                                       })
                               }}
                               value={props.node.styling.border}
                               placeholder={'Borda'} type={'number'}
                        />
                    </div>
                    <div className={styles.fieldContainer}>
                        <div>width</div>
                        <input
                            className={styles.input}
                            style={{transition: 'none', cursor: "pointer"}}
                            onChange={event => {
                                handleChange('styling',
                                    {
                                        ...props.node.styling, ...{
                                            strokeWidth:event.target.value
                                        }
                                    })
                            }}
                            value={props.node.styling.strokeWidth}
                            type={'range'}
                            max={10} min={0}
                        />
                    </div>
                    <div className={styles.fieldContainer}>
                        <div>Dasharray</div>
                        <input
                            className={styles.input}
                            style={{transition: 'none', cursor: "pointer"}}
                            onChange={event => {
                                handleChange('styling',
                                    {
                                        ...props.node.styling, ...{
                                            strokeDasharray: `${event.target.value}, ${event.target.value}`
                                        }
                                    })
                            }}
                            value={props.node.styling.strokeDasharray === undefined ? 0 : props.node.styling.strokeDasharray.split(',')[0]}
                            type={'range'}
                            max={10} min={0}
                        />
                    </div>
                </div>
            </Elements>
            <Elements label={'Posição'}>
                <div style={{display: 'grid', gap: '4px', paddingBottom: '4px'}}>

                    <div className={styles.fieldContainer}>
                        <label htmlFor={'x-placement'}>X</label>
                        <input id={'x-placement'}
                               className={styles.input}
                               onChange={event => {
                                   let newPlacement = {...props.node.placement}
                                   newPlacement.y = props.node.placement.y
                                   newPlacement.x = event.target.value
                                   handleChange('placement', newPlacement)
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
                                handleChange('placement', newPlacement)
                            }}
                            value={props.node.placement.y} placeholder={'Y'} type={'number'}
                        />
                    </div>
                </div>
            </Elements>
            <Elements label={'Tamanho'}>
                <div style={{display: 'grid', gap: '4px', paddingBottom: '4px'}}>
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
                                    handleChange('dimensions', newDimensions)
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
                                    handleChange('dimensions', newDimensions)
                            }}
                            value={props.node.dimensions.height} placeholder={'Altura'} type={'number'}
                        />

                    </div>
                </div>
            </Elements>
        </>
    )
}

Overview.propTypes = {
    node: NodeTemplate,
    setState: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func,
    nodeIndex: PropTypes.number
}