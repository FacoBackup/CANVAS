import Accordion from "../../shared/templates/tools/Accordion";
import styles from "../../shared/styles/Shapes.module.css";
import PropTypes from "prop-types";

export default function Lines(props){
    return(
        <Accordion {...props} label={'Linhas'}>
            <div className={styles.shapes}>

                <div
                    className={styles.shapeContainer}
                    style={{background: props.data.connectionType === 'strong-path' ? 'white' : undefined, cursor: 'pointer'}}
                    onClick={() => props.setData({...props.data, ...{connectionType: 'strong-path'}})}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 100 100'}>
                        <path d="M 0, 0 C0,50 100,50 100,100" fill={'none'} stroke={'#0095ff'} strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    Bezier strong
                </div>



                <div
                    className={styles.shapeContainer}
                    style={{background: props.data.connectionType === 'dashed-path' ? 'white' : undefined, cursor: 'pointer'}}
                    onClick={() => props.setData({...props.data, ...{connectionType: 'dashed-path'}})}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 100 100'}>
                        <path d="M 0, 0 C0,50 100,50 100,100" fill={'none'} stroke={'#0095ff'} strokeWidth={2} strokeDasharray={'5,5'} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    Bezier dashed
                </div>

                <div
                    className={styles.shapeContainer}
                    style={{background: props.data.connectionType === 'strong-line' ? 'white' : undefined, cursor: 'pointer'}}
                    onClick={() => props.setData({...props.data, ...{connectionType: 'strong-line'}})}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 100 100'}>
                        <line x1={0} y1={0} x2={100} y2={100}  fill={'none'} stroke={'#0095ff'} strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    Line strong
                </div>

                <div
                    className={styles.shapeContainer}
                    style={{background: props.data.connectionType === 'dashed-line' ? 'white' : undefined, cursor: 'pointer'}}
                    onClick={() => props.setData({...props.data, ...{connectionType: 'dashed-line'}})}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 100 100'}>
                        <line x1={0} y1={0} x2={100} y2={100}  fill={'none'} stroke={'#0095ff'} strokeWidth={2} strokeDasharray={'5,5'} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    Line dashed
                </div>
            </div>
        </Accordion>

    )
}
Lines.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
}