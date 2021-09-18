import styles from "../styles/Dataset.module.css";
import {DragIndicatorRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

export default function DatasetOptions(props) {

    return (
        <div className={styles.fields}>
            {Object.keys(props.dataset[0]).map((d, i) => (
                <div
                    className={styles.field}
                    key={d + '-field-' + i}
                    onDragStart={(e) =>{
                        e.dataTransfer.setData("data", d);
                    }}
                    draggable={true}
                >
                    <DragIndicatorRounded style={{fontSize: '1.3rem'}}/>
                    {d}
                </div>
            ))}
        </div>
    )
}
DatasetOptions.propTypes = {
    dataset: PropTypes.array
}