import CanvasTemplate from "./templates/CanvasPropsTemplate";
import styles from './styles/Canvas.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import ReactDOM from "react-dom";
import ScrollCanvas from "./methods/misc/ScrollCanvas";
import RenderNodes from "./methods/render/RenderNodes";
import RenderLinks from "./methods/render/RenderLinks";
import NewProjectTemplate from "./templates/NewProjectTemplate";
import LinkIndicator from "./modules/link/LinkIndicator";
import Header from "./modules/navigation/header/Header";
import SideBar from "./modules/navigation/side/SideBar";
import Overview from "./modules/node/misc/Overview";
import Context from "./modules/misc/Context";
import Pages from "./modules/navigation/pages/Pages";
import Scale from "./modules/navigation/misc/Scale";
import TopBar from "./modules/navigation/top/TopBar";
import Frame from "./modules/frame/Frame";


export default function Canvas(props) {
    const [data, setData] = useState(NewProjectTemplate)
    const [toBeLinked, setToBeLinked] = useState(null)
    const [nodeOnOverview, setNodeOnOverview] = useState(undefined)
    const [selectedNode, setSelectedNode] = useState(undefined)
    const [scale, setScale] = useState(1)
    const [copiedNode, setCopiedNode] = useState(null)
    const handlePrint = useReactToPrint({
        content: () => document.getElementById('frame-content')
    });

    useEffect(() => {

        if (selectedNode !== undefined) {
            let listen = true
            document.addEventListener('keydown', function keyDown(event) {
                if (listen && event.key === 'Delete') {
                    // let index
                    // data.nodes.find((node, i) => {
                    //     if (node.id === selectedNode)
                    //         index = i
                    // })
                    // console.log(index)
                    // let newNodes = [...data.nodes]
                    // newNodes.splice(index, 1)
                    // setData({
                    //     ...data,
                    //     nodes: newNodes
                    // })
                    listen = false
                } else
                    event.currentTarget.removeEventListener('keydown', keyDown);
            })
        }

        document.addEventListener('mouseup', event => {

            const closest = event.target.closest('circle')
            if (toBeLinked !== null && closest === null)
                setToBeLinked(null)
        }, {once: true})

        return () => {
            document.removeEventListener('mouseup', () => null)
            document.removeEventListener('keydown', () => null)
        }
    }, [toBeLinked, selectedNode])

    const renderOverview = () => {
        let i = -1
        if (nodeOnOverview !== undefined)
            data.nodes.find((node, index) => {
                if (node.id === nodeOnOverview.id)
                    i = index
            })
        let response = null

        if (i !== -1)
            response = (
                <Overview
                    data={data}
                    node={data.nodes[i]}
                    setState={setData}
                    nodeIndex={i}
                    handleClose={() => setNodeOnOverview(undefined)}/>
            )

        return response
    }

    return (
        <div
            className={styles.wrapper}
            id={'frame'}
            onMouseDown={event => {
                if (selectedNode && (typeof event.target.className !== 'string' || event.target.id === undefined || !event.target.className.includes('Node')))
                    setSelectedNode(undefined)
                if (toBeLinked !== null && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                    setToBeLinked(null)
            }}>
            <Context data={data} setData={setData} scale={scale} setScale={setScale} copiedNode={copiedNode}
                     setCopiedNode={setCopiedNode} setNodeOnOverview={setNodeOnOverview}/>
            <div className={styles.content}>
                <Header

                    data={data}
                    setData={setData}
                    onSave={props.onSave}
                    handlePrint={handlePrint}
                />
                <TopBar/>
                <div className={styles.middleWrapper}>
                    <SideBar
                        data={data} scale={scale}
                        setState={setData}
                    />
                    <div className={styles.contentWrapper}>
                        <Pages
                            scale={scale} setScale={setScale}
                            data={data} setData={setData}
                        />
                        <Frame
                            {...props} toBeLinked={toBeLinked} scale={scale}
                            data={data} nodeOnOverview={nodeOnOverview} setData={setData}
                            setNodeOnOverview={setNodeOnOverview} setToBeLinked={setToBeLinked}
                            selectedNode={selectedNode} setSelectedNode={setSelectedNode}
                        />
                    </div>
                    {renderOverview()}
                </div>
            </div>
            <Scale scale={scale} setScale={setScale}/>
        </div>
    )
}
Canvas.propTypes = CanvasTemplate