import Elements from "../../modules/navigation/side/modules/Elements";
import styles from "../../styles/NodeOverview.module.css";
import PropTypes from "prop-types";
import {CirclePicker} from "react-color";

export default function BorderEditor(props) {
    console.log(props.node.styling)
    return (
        <>
            <Elements label={'Cor de destaque'}>
                <CirclePicker
                    width={'100%'}
                    color={{hex: props.node.styling.color}}
                    onChangeComplete={event => {
                        props.handleChange('styling',
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

                                   props.handleChange('styling',
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
                                props.handleChange('styling',
                                    {
                                        ...props.node.styling, ...{
                                            strokeWidth: event.target.value
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
                                props.handleChange('styling',
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
        </>
    )
}

BorderEditor.propTypes = {
    node: PropTypes.object,
    handleChange: PropTypes.func
}