import PropTypes from 'prop-types'
import SideBar from "../../shared/templates/tools/SideBar";
import {CategoryRounded, StorageRounded} from "@material-ui/icons";
import AnalyticsShapes from "../templates/AnalyticsShapes";
import DatasetOptions from "../templates/DatasetOptions";
import styles from "../../shared/styles/Canvas.module.css";
import Pages from "../../shared/modules/engine/Pages";
import React from "react";

export default function ChartContent(props) {
    return (
        <div style={{width: '100%', height: 'calc(100% - 70px)', display: 'flex'}}>
            <SideBar
                options={[
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
                    },
                ]}
            />
            <div className={styles.contentWrapper}>
                <Pages pages={props.pages} handlePageChange={props.handlePageChange} defaultPage={props.defaultPage}
                       setDefaultPage={props.setDefaultPage} setPages={props.setPages}/>
                {props.children({
                    data: props.pages[props.defaultPage],
                    setData: (event) => props.handlePageChange(event),
                    dataset: props.dataset,
                    dimensions: props.metadata.dimensions,
                    selectedNodes: props.selectedNodes,
                    selectNode: props.selectNode,
                    unselectNode: props.unselectNode
                })}
            </div>
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