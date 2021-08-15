import CanvasTemplate from "./templates/CanvasPropsTemplate";
import styles from './styles/Canvas.module.css'
import React, {useEffect, useState} from "react";
import {useReactToPrint} from "react-to-print";
import NewProjectTemplate from "./templates/NewProjectTemplate";
import Header from "./modules/navigation/header/Header";
import SideBar from "./modules/navigation/side/SideBar";
import Overview from "./modules/misc/Overview";
import Context from "./modules/misc/Context";
import Pages from "./modules/navigation/pages/Pages";
import Scale from "./modules/navigation/misc/Scale";
import TopBar from "./modules/navigation/top/TopBar";
import Frame from "./modules/frame/Frame";


export default function Canvas(props) {
    const [data, setData] = useState(NewProjectTemplate)
    const [defaultPage, setDefaultPage] = useState(0)
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


            if (toBeLinked !== null) {
                if (event.target.closest('circle') === null)
                    setToBeLinked(null)
            }
        }, {once: true})

        return () => {
            document.removeEventListener('mouseup', () => null)
            document.removeEventListener('keydown', () => null)
        }
    }, [toBeLinked, selectedNode])

    const renderOverview = () => {
        let i = -1
        if (nodeOnOverview !== undefined)
            data.pages[defaultPage].nodes.find((node, index) => {
                if (node.id === nodeOnOverview.id)
                    i = index
            })

        console.log(i)
        let response = null

        if (i !== -1 && i !== undefined)
            response = (
                <Overview
                    data={data.pages[defaultPage]}
                    node={data.pages[defaultPage].nodes[i]}
                    setState={(event) => {
                        let newPages = [...data.pages]
                        newPages[defaultPage] = event
                        setData({...data, pages: newPages})
                    }}
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
            <Context
                data={data.pages[defaultPage]}
                setData={(event) => {
                    let newPages = [...data.pages]
                    newPages[defaultPage] = event
                    setData({...data, pages: newPages})
                }}
                scale={scale} setScale={setScale} copiedNode={copiedNode}
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
                        data={data.pages[defaultPage]}
                        scale={scale}
                        setState={(event) => {
                            let newPages = [...data.pages]
                            newPages[defaultPage] = event
                            setData({...data, pages: newPages})
                        }}
                    />
                    <div className={styles.contentWrapper}>
                        <Pages
                            scale={scale} setScale={setScale}
                            data={data} setData={setData}
                            setDefaultPage={setDefaultPage}
                            defaultPage={defaultPage}
                        />
                        <Frame
                            {...props} toBeLinked={toBeLinked} scale={scale}
                            data={data.pages[defaultPage]}
                            dimensions={data.dimensions}
                            nodeOnOverview={nodeOnOverview}
                            setData={(event) => {
                                let newPages = [...data.pages]
                                newPages[defaultPage] = event
                                setData({...data, pages: newPages})
                            }}
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