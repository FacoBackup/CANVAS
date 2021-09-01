import CanvasTemplate from "../../templates/props/CanvasPropsTemplate";
import styles from '../../styles/Canvas.module.css'
import React, {useEffect, useState} from "react";
import {useReactToPrint} from "react-to-print";
import NewProjectTemplate from "../../templates/props/NewProjectTemplate";
import SideBar from "../navigation/side/SideBar";
import ContextMenu from "../ContextMenu";
import Pages from "../navigation/pages/Pages";
import nodeStyles from '../../styles/Node.module.css'
import FrameView from "../engine/FrameView";
import tabsStyles from '../navigation/side/styles/Tabs.module.css'
import keyboardControl from "../../utils/control/KeyboardControl";
import {CategoryRounded} from "@material-ui/icons";
import AnalyticsShapes from "../navigation/side/modules/AnalyticsShapes";

export default function Analytics(props) {
    const [data, setData] = useState(NewProjectTemplate)
    const [defaultPage, setDefaultPage] = useState(0)

    const [selectedNode, setSelectedNode] = useState(undefined)

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
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    return (
        <div
            className={styles.wrapper} style={{display: 'flex'}}
            onMouseDown={event => {

                if (selectedNode !== undefined && !document.elementsFromPoint(event.clientX, event.clientY).includes(document.getElementById(selectedNode.id + '-node-foreign-object'))) {
                    console.log(document.elementsFromPoint(event.clientX, event.clientY).includes(document.getElementById(selectedNode.id + '-node-foreign-object')))
                    setSelectedNode(undefined)
                }
            }}>
            <FrameView/>
            <ContextMenu
                data={data.pages[defaultPage]}
                setData={(event) => {
                    let newPages = [...data.pages]
                    newPages[defaultPage] = event
                    setData({...data, pages: newPages})
                }}
                copiedNode={copiedNode}
                setCopiedNode={setCopiedNode} setSelectedNode={setSelectedNode}/>
            <SideBar
                data={data}
                defaultPage={defaultPage} handlePrint={handlePrint}
                selectedNode={selectedNode}
                setData={setData}
                options={[
                    {
                        icon: <CategoryRounded/>,
                        label: 'Dados e configurações',
                        content: (
                            <>
                                <AnalyticsShapes
                                    data={data.pages[defaultPage]}
                                    setData={(e) => {
                                        let newPages = [...data.pages]
                                        newPages[defaultPage] = e
                                        setData({...data, pages: newPages})
                                    }}
                                />
                            </>
                        )
                    },
                ]}
            />

            <div className={styles.contentWrapper}>
                <Pages
                    data={data} setData={setData}
                    setDefaultPage={setDefaultPage}
                    defaultPage={defaultPage}
                />
                {props.children({
                    data: data.pages[defaultPage],
                    setData: (event) => {
                        let newPages = [...data.pages]
                        newPages[defaultPage] = event
                        console.log(newPages[defaultPage])
                        setData({...data, pages: newPages})
                    },
                    dimensions: data.dimensions,
                    selectedNode: selectedNode,
                    setSelectedNode: setSelectedNode,

                })}
            </div>


        </div>
    )
}
Analytics.propTypes = CanvasTemplate