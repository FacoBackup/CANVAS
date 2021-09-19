import PropTypes from 'prop-types'
import {CategoryRounded, FilterListRounded, StorageRounded} from "@material-ui/icons";
import AnalyticsShapes from "./AnalyticsShapes";
import DatasetOptions from "./DatasetOptions";
import styles from "../../../packages/engine/styles/Canvas.module.css";
import Pages from "../../shared/modules/Pages";
import React, {useEffect, useState} from "react";
import VerticalTabs from "../../../packages/tabs/VerticalTabs";
import ChartNodeEditor from "./ChartNodeEditor";

export default function ChartContent(props) {
    const [openButton, setOpenButton] = useState(0)
    useEffect(() => {
        console.log('ccccccccccccc', props.pages)
    }, [props.pages])
    return (
        <div style={{width: '100%', height: 'calc(100% - 70px)', display: 'flex'}}>
            <VerticalTabs
                tabsKey={'chart-content'}
                buttons={[
                    {
                        icon: <CategoryRounded/>,
                        label: 'Visuais',
                        content: (

                            <AnalyticsShapes
                                openPage={props.openPage}
                                dispatchPage={props.dispatchPage}
                                actions={props.actions}

                                selectedNodes={props.selectedNodes}
                            />

                        )
                    },
                    {
                        icon: <StorageRounded/>,
                        label: 'Dados',
                        content: props.dataset === undefined || props.dataset === null || props.dataset.length === 0 ? null : (

                            <DatasetOptions
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
                    openPage: props.openPage,
                    dispatchPage: props.dispatchPage,
                    actions: props.actions,
                    pages: props.pages,
                    dataset: props.dataset,
                    dimensions: props.metadata.dimensions,
                    selectedNodes: props.selectedNodes,
                    selectNode: props.selectNode,
                    unselectNode: props.unselectNode
                })}
                <Pages
                    pages={props.pages}
                    defaultPage={props.defaultPage}
                    setDefaultPage={props.setDefaultPage}
                    openPage={props.openPage}
                    dispatchPage={props.dispatchPage}
                    actions={props.actions}
                />
            </div>
            <ChartNodeEditor
                openPage={props.openPage}
                dispatchPage={props.dispatchPage}
                actions={props.actions}
                selectedNodes={props.selectedNodes}
                unselectNode={props.unselectNode}
            />
        </div>
    )
}

ChartContent.propTypes = {
    dataset: PropTypes.array,

    pages: PropTypes.array,
    openPage: PropTypes.object,
    dispatchPage: PropTypes.func,
    actions: PropTypes.object,

    metadata: PropTypes.object,
    setMetadata: PropTypes.func,
    selectedNodes: PropTypes.array,
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    defaultPage: PropTypes.number,
    setDefaultPage: PropTypes.func,
    children: PropTypes.func,
    openDataset: PropTypes.bool
}