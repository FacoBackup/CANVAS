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
import FileOptions from "../navigation/side/modules/FileOptions";
import Head from "next/head";
import Connections from "../navigation/side/modules/Connections";
import Lines from "../navigation/side/modules/Lines";
import FlowchartShapes from "../navigation/side/modules/FlowchartShapes";
import {CategoryRounded} from "@material-ui/icons";

export default function Flowchart(props) {
    const [data, setData] = useState(NewProjectTemplate)
    const [defaultPage, setDefaultPage] = useState(0)
    const [toBeLinked, setToBeLinked] = useState(null)
    const [selectedNode, setSelectedNode] = useState(undefined)
    const [scale, setScale] = useState(1)
    const [copiedNode, setCopiedNode] = useState(null)
    const handlePrint = useReactToPrint({
        content: () => document.getElementById('engine-content')
    })
    const handleKeyDown = (e) => {
        keyboardControl({
            event: e
        })
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })
    return (
        <>
            <Head>
                <title>{data.subject} - Flowchart</title>
                <link rel='icon' href={'/flow.svg'} type='image/x-icon'/>
            </Head>

            <div
                className={styles.wrapper}
                onMouseDown={event => {
                    if (selectedNode && event.target.closest('.' + nodeStyles.entityContainer) === null && event.target.closest('.' + tabsStyles.container) === null)
                        setSelectedNode(undefined)
                    if (toBeLinked !== null && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                        setToBeLinked(null)
                }}
            >

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
                <FileOptions setData={setData} data={data} handlePrint={handlePrint}/>
                <div style={{width: '100%', height: 'calc(100% - 40px)', display: 'flex'}}>
                    <SideBar
                        data={data}
                        defaultPage={defaultPage}
                        selectedNode={selectedNode}
                        setData={setData}
                        options={[
                            {
                                icon: <CategoryRounded/>,
                                label: 'Dados e configurações',
                                content: (
                                    <>
                                        <FlowchartShapes
                                            data={data.pages[defaultPage]}
                                            setData={(e) => {
                                                let newPages = [...data.pages]
                                                newPages[defaultPage] = e
                                                setData({...data, pages: newPages})
                                            }}
                                            scale={scale}
                                        />
                                        <Lines
                                            data={data}
                                            setData={setData}
                                        />

                                        <Connections
                                            data={data} setData={setData}
                                        />
                                    </>
                                ),
                                toolTip: 'Módulos e opções'
                            },
                        ]}
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
                            {props.children({
                                data: data.pages[defaultPage],
                                setData: (event) => {
                                    console.log(event)
                                    let newPages = [...data.pages]
                                    newPages[defaultPage] = event
                                    console.log(newPages[defaultPage])
                                    setData({...data, pages: newPages})
                                },
                                styling: {connectionType: data.connectionType},
                                toBeLinked: toBeLinked,
                                setToBeLinked: setToBeLinked,
                                scale: scale,
                                setScale: setScale,
                                dimensions: data.dimensions,
                                selectedNode: selectedNode,
                                setSelectedNode: setSelectedNode,

                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}