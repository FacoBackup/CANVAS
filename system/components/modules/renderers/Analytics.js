import CanvasTemplate from "../../templates/props/CanvasPropsTemplate";
import styles from '../../styles/Canvas.module.css'
import React, {useEffect, useState} from "react";
import {useReactToPrint} from "react-to-print";
import NewProjectTemplate from "../../templates/props/NewProjectTemplate";
import SideBar from "../navigation/side/SideBar";
import ContextMenu from "../ContextMenu";
import Pages from "../navigation/pages/Pages";
import FontVisualsBar from "../navigation/FontVisualsBar";
import nodeStyles from '../../styles/Node.module.css'
import FrameView from "../engine/FrameView";
import tabsStyles from '../navigation/side/styles/Tabs.module.css'
import keyboardControl from "../../utils/control/KeyboardControl";

export default function Flowchart(props) {
    const [data, setData] = useState(NewProjectTemplate)
    const [defaultPage, setDefaultPage] = useState(0)
    const [toBeLinked, setToBeLinked] = useState(null)
    const [selectedNode, setSelectedNode] = useState(undefined)
    const [scale, setScale] = useState(1)
    const [copiedNode, setCopiedNode] = useState(null)
    const handlePrint = useReactToPrint({
        content: () => document.getElementById('engine-content')
    });
    const handleKeyDown = (e) => {
        keyboardControl({
            event: e
        })
    }

    useEffect(() => {
        document.addEventListener('keydown',handleKeyDown )
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    return (
        <div
            className={styles.wrapper}
            onMouseDown={event => {
                if (selectedNode && event.target.closest('.' + nodeStyles.entityContainer) === null && event.target.closest('.' + tabsStyles.container) === null)
                    setSelectedNode(undefined)
                if (toBeLinked !== null && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                    setToBeLinked(null)
            }}>
            <FrameView/>
            <ContextMenu
                data={data.pages[defaultPage]}
                setData={(event) => {
                    let newPages = [...data.pages]
                    newPages[defaultPage] = event
                    setData({...data, pages: newPages})
                }}
                scale={scale} setScale={setScale} copiedNode={copiedNode}
                setCopiedNode={setCopiedNode} setSelectedNode={setSelectedNode}/>
            <SideBar
                data={data}
                defaultPage={defaultPage} handlePrint={handlePrint}
                scale={scale} selectedNode={selectedNode}
                setData={setData}
            />
            <div className={styles.content}>
                <FontVisualsBar scale={scale} setScale={setScale} data={data} setData={setData}/>
                <div className={styles.contentWrapper}>
                    <Pages
                        scale={scale} setScale={setScale}
                        data={data} setData={setData}
                        setDefaultPage={setDefaultPage}
                        defaultPage={defaultPage}
                    />
                    {/*<Engine*/}
                    {/*    {...props} toBeLinked={toBeLinked} scale={scale}*/}
                    {/*    data={data.pages[defaultPage]}*/}
                    {/*    dimensions={data.dimensions}*/}
                    {/*    nodeOnOverview={nodeOnOverview}*/}
                    {/*    setData={(event) => {*/}
                    {/*        let newPages = [...data.pages]*/}
                    {/*        newPages[defaultPage] = event*/}
                    {/*        setData({...data, pages: newPages})*/}
                    {/*    }} styling={{connectionType: data.connectionType}}*/}
                    {/*    setNodeOnOverview={setNodeOnOverview} setToBeLinked={setToBeLinked}*/}
                    {/*    selectedNode={selectedNode}*/}
                    {/*    setSelectedNode={setSelectedNode}*/}
                    {/*/>*/}
                    {props.children}
                </div>
            </div>


        </div>
    )
}
Flowchart.propTypes = CanvasTemplate