import Accordion from "../../shared/templates/Accordion";
import styles from "../styles/Dataset.module.css";
import {DragIndicatorRounded} from "@material-ui/icons";
import PlaceNewField from "../utils/PlaceNewField";
import PropTypes from "prop-types";

export default function DatasetOptions(props) {
    const handleFieldLink = (field, as) => {
        let newPage = {...props.pages[props.defaultPage]}
        let newNodes = [...newPage.nodes]
        let newNode = {...newPage.nodes[props.selectedNode.index]}

        if(as === 'axis')
            newNode.dataset = {
                value: newNode.dataset !== undefined ? newNode.dataset.value : null,
                axis: field
            }
        else
            newNode.dataset = {
                axis: newNode.dataset !== undefined ? newNode.dataset.axis : null,
                value: field
            }
        newNodes[props.selectedNode.index] = newNode

        newPage.nodes = newNodes

        props.handlePageChange(newPage)
    }
    return (
        <>
            {/*<Accordion {...props} label={'Módulos'} >*/}
            {/*    <div className={styles.shapes}>*/}
            {/*        <div*/}
            {/*            className={styles.shapeContainer}*/}
            {/*            id={'bar-vertical-draggable'}*/}
            {/*            onMouseDown={event => drag(event, 'bar-vertical')}*/}
            {/*        >*/}
            {/*            <div>*/}
            {/*                <BarChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className={styles.shapeContainer}*/}
            {/*            id={'bar-horizontal-draggable'}*/}
            {/*            onMouseDown={event => drag(event, 'bar-horizontal')}*/}
            {/*        >*/}
            {/*            <div>*/}
            {/*                <BarChartRounded style={{transform: 'rotate(90deg)', fontSize: '2rem', color: '#0095ff'}}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className={styles.shapeContainer}*/}
            {/*            id={'line-draggable'}*/}
            {/*            onMouseDown={event => drag(event, 'line')}*/}
            {/*        >*/}
            {/*            <div>*/}
            {/*                <ShowChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className={styles.shapeContainer}*/}
            {/*            id={'pie-draggable'}*/}
            {/*            onMouseDown={event => drag(event, 'pie')}*/}
            {/*        >*/}
            {/*            <div>*/}
            {/*                <PieChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*</Accordion>*/}
            <Accordion {...props} label={'Data'}>
                <div className={styles.fields}>
                    {Object.keys(props.dataset[0]).map((d, i) => (
                        <div
                            className={styles.field}
                            key={d + '-field-' + i}
                            onMouseDown={(e) => {
                                PlaceNewField({element: e.target, event: e, handleFieldLink: (as) => handleFieldLink(d, as)})
                            }}
                        >
                            <DragIndicatorRounded style={{fontSize: '1.3rem'}}/>
                            {d}
                        </div>
                    ))}
                </div>
            </Accordion>
        </>
    )
}
DatasetOptions.propTypes = {
    pages: PropTypes.array,
    handlePageChange: PropTypes.func,
    defaultPage: PropTypes.number,
    selectedNode: PropTypes.object
}