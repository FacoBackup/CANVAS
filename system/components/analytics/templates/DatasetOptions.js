import Accordion from "../../shared/templates/tools/Accordion";
import styles from "../styles/Dataset.module.css";
import {DragIndicatorRounded} from "@material-ui/icons";
import PlaceNewField from "../utils/PlaceNewField";
import PropTypes from "prop-types";

export default function DatasetOptions(props) {
    const handleFieldLink = (field, as) => {
        let newPage = {...props.pages[props.defaultPage]}
        let newNodes = [...newPage.nodes]
        let openEditor = props.selectedNodes.find(e => e.openEdit)

        let newNode = {...newPage.nodes[openEditor.index]}

        if (as === 'axis')
            newNode.dataset = {
                value: newNode.dataset !== undefined ? newNode.dataset.value : null,
                axis: field
            }
        else
            newNode.dataset = {
                axis: newNode.dataset !== undefined ? newNode.dataset.axis : null,
                value: field
            }
        newNodes[openEditor.index] = newNode

        newPage.nodes = newNodes

        props.handlePageChange(newPage)
    }
    return (
        <div className={styles.fields}>
            {Object.keys(props.dataset[0]).map((d, i) => (
                <div
                    className={styles.field}
                    key={d + '-field-' + i}
                    onMouseDown={(e) => {
                        PlaceNewField({
                            element: e.target,
                            event: e,
                            handleFieldLink: (as) => handleFieldLink(d, as)
                        })
                    }}
                >
                    <DragIndicatorRounded style={{fontSize: '1.3rem'}}/>
                    {d}
                </div>
            ))}
        </div>
    )
}
DatasetOptions.propTypes = {
    pages: PropTypes.array,
    handlePageChange: PropTypes.func,
    defaultPage: PropTypes.number,
    selectedNodes: PropTypes.array
}