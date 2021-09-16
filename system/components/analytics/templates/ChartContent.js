import PropTypes from 'prop-types'
import {CategoryRounded, FilterListRounded, FilterRounded, StorageRounded} from "@material-ui/icons";
import AnalyticsShapes from "./AnalyticsShapes";
import DatasetOptions from "./DatasetOptions";
import styles from "../../shared/styles/Canvas.module.css";
import Pages from "../../shared/modules/engine/Pages";
import React, {useState} from "react";
import VerticalTabs from "../../../packages/tabs/VerticalTabs";
import ChartNodeEditor from "./ChartNodeEditor";

export default function ChartContent(props) {
    const [openButton, setOpenButton] = useState(0)

    return (
        <div style={{width: '100%', height: 'calc(100% - 70px)', display: 'flex'}}>
            <VerticalTabs
                buttons={[
                    {
                        icon: <CategoryRounded/>,
                        label: 'Visuais',
                        content: (

                            <AnalyticsShapes
                                data={props.pages[props.defaultPage]}
                                selectedNodes={props.selectedNodes}
                                setData={(e) => props.handlePageChange(e)}
                            />

                        )
                    },
                    {
                        icon: <StorageRounded/>,
                        label: 'Dados',
                        content: props.dataset === undefined || props.dataset === null || props.dataset.length === 0 ? null : (

                            <DatasetOptions
                                pages={props.pages}
                                handlePageChange={props.handlePageChange}
                                defaultPage={props.defaultPage}
                                selectedNodes={props.selectedNodes}
                                dataset={props.dataset}
                            />
                        ),
                        disabled: props.dataset === undefined || props.dataset === null || props.dataset.length === 0
                    }, {
                        icon: <FilterListRounded/>,
                        label: 'Filtros',
                        content: null,
                        disabled: true
                    },
                ]}
                openButton={openButton}
                setOpenButton={setOpenButton}
            />
            <div className={styles.contentWrapper}>

                {props.children({
                    data: props.pages[props.defaultPage],
                    setData: (event) => props.handlePageChange(event),
                    dataset: props.dataset,
                    dimensions: props.metadata.dimensions,
                    selectedNodes: props.selectedNodes,
                    selectNode: props.selectNode,
                    unselectNode: props.unselectNode
                })}
                <Pages pages={props.pages} handlePageChange={props.handlePageChange} defaultPage={props.defaultPage}
                       setDefaultPage={props.setDefaultPage} setPages={props.setPages}/>
            </div>
            <ChartNodeEditor
                data={props.pages[props.defaultPage]}
                setData={props.handlePageChange}
                selectedNodes={props.selectedNodes}
                unselectNode={props.unselectNode}
            />
        </div>
    )
}

ChartContent.propTypes = {
    dataset: PropTypes.array,
    pages: PropTypes.array,
    handlePageChange: PropTypes.func,
    setPages: PropTypes.func,
    metadata: PropTypes.object,
    setMetadata: PropTypes.func,
    selectedNodes: PropTypes.array,
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    defaultPage: PropTypes.number,
    setDefaultPage: PropTypes.func,
    children: PropTypes.node,
    openDataset: PropTypes.bool
}