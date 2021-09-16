import Accordion from "../../../packages/accordion/Accordion";
import styles from '../../shared/styles/Shapes.module.css'

export default function Connections(props) {
    return (
        <Accordion {...props} label={'Conexões'}>
            <div className={styles.shapes}>
                <div
                    className={styles.shapeContainer}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100">
                        <circle cx={'50'} cy={'50'} r={'20'} fill={'#0095ff'}/>
                    </svg>
                    <div className={styles.overflowEllipsis}>
                        Dot
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100">
                        <polygon points={'25,25 75,50 25,75'} x={50} y={50} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke"
                                 fill={'#0095ff'}/>
                    </svg>
                    <div className={styles.overflowEllipsis}>
                        Arrow
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100"
                         transform={'scale(.5)'}>
                        <circle cx={'0'} cy={'50'} r={'15'} fill={'white'} stroke={'#0095ff'} strokeWidth={'2px'}
                                vectorEffect="non-scaling-stroke"/>
                        <line x1={15} y1={50} x2={100} y2={0} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={10} y1={50} x2={100} y2={100} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={15} y1={50} x2={100} y2={50} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <div className={styles.overflowEllipsis}>
                        0 to many
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100"
                         transform={'scale(.5)'}>

                        <line x1={5} y1={50} x2={100} y2={0} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={0} y1={50} x2={100} y2={100} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={5} y1={50} x2={100} y2={50} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <div className={styles.overflowEllipsis}>
                        many
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100"
                         transform={'scale(.5)'}>

                        <line x1={0} y1={100} x2={0} y2={0} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={10} y1={50} x2={100} y2={0} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={5} y1={50} x2={100} y2={100} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={10} y1={50} x2={100} y2={50} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <div className={styles.overflowEllipsis}>
                        many to many
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100"
                         transform={'scale(.5)'}>

                        <line x1={50} y1={100} x2={50} y2={0} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={75} y1={100} x2={75} y2={0} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={0} y1={50} x2={100} y2={50} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <div className={styles.overflowEllipsis}>
                        1 to 1
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100"
                         transform={'scale(.5)'}>

                        <line x1={50} y1={100} x2={50} y2={0} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={75} y1={100} x2={75} y2={0} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={0} y1={50} x2={100} y2={50} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <div className={styles.overflowEllipsis}>
                        1
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100"
                         transform={'scale(.5)'}>


                        <line x1={75} y1={100} x2={75} y2={0} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <line x1={0} y1={50} x2={100} y2={50} stroke={'#0095ff'} strokeWidth={'2px'}
                              vectorEffect="non-scaling-stroke"/>
                        <circle cx={'50'} cy={'50'} r={'15'} fill={'white'} stroke={'#0095ff'} strokeWidth={'2px'}
                                vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <div className={styles.overflowEllipsis}>
                        0 to 1
                    </div>
                </div>
            </div>
        </Accordion>
    )
}
