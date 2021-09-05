import PropTypes from 'prop-types'
import SideBar from "../../shared/templates/SideBar";
import {CategoryRounded, StorageRounded} from "@material-ui/icons";
import AnalyticsShapes from "../templates/AnalyticsShapes";
import DatasetOptions from "../templates/DatasetOptions";
import styles from "../../shared/styles/Canvas.module.css";
import Pages from "../../shared/modules/Pages";
import React from "react";

export default function ChartContent(props) {
    return (
        <div style={{width: '100%', height: 'calc(100% - 70px)', display: 'flex'}}>
            <SideBar
                data={props.data}
                defaultPage={props.defaultPage} handlePrint={props.handlePrint}
                setData={props.setData}
                options={[
                    {
                        icon: <CategoryRounded/>,
                        label: 'Visuais',
                        content: (

                            <AnalyticsShapes
                                data={props.data.pages[props.defaultPage]}
                                setData={(e) => {
                                    let newPages = [...props.data.pages]
                                    newPages[props.defaultPage] = e
                                    props.setData({...props.data, pages: newPages})
                                }}
                            />

                        )
                    },
                    {
                        icon: <StorageRounded/>,
                        label: 'Dados',
                        content: props.data.dataset === undefined || props.data.dataset === null || props.data.dataset.length === 0 ? null : (

                            <DatasetOptions
                                data={props.data}
                                setData={props.setData}
                                defaultPage={props.defaultPage}
                                selectedNode={props.selectedNode}
                            />
                        ),
                        disabled: props.data.dataset === undefined || props.data.dataset === null || props.data.dataset.length === 0
                    },
                ]}
            />
            <div className={styles.contentWrapper}>
                <Pages
                    data={props.data} setData={props.setData}
                    setDefaultPage={props.setDefaultPage}
                    defaultPage={props.defaultPage}
                />
                {props.children({
                    data: props.data.pages[props.defaultPage],
                    setData: (event) => {
                        let newPages = [...props.data.pages]
                        newPages[props.defaultPage] = event
                        props.setData({...props.data, pages: newPages})
                    },
                    dataset: props.data.dataset ? props.data.dataset : [],
                    dimensions: props.data.dimensions,
                    selectedNode: props.selectedNode !== undefined ? props.selectedNode.node : props.selectedNode,
                    setSelectedNode: props.setSelectedNode,

                })}
            </div>
        </div>
    )
}

ChartContent.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    selectedNode: PropTypes.object,
    setSelectedNode: PropTypes.func,
    defaultPage: PropTypes.number,
    setDefaultPage: PropTypes.func,
    children: PropTypes.node,
    openDataset: PropTypes.bool
}