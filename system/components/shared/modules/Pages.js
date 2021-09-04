import PropTypes from 'prop-types'
import styles from "../styles/Pages.module.css";
import {AddRounded} from "@material-ui/icons";
import PageField from "../templates/PageField";
import React, {useState} from 'react'

export default function Pages(props) {
    const [openInput, setOpenInput] = useState(null)
    return (
        <div className={styles.pagesContainer}>

            {props.data.pages.map((page, index) => (
                <React.Fragment key={'page-' + index}>
                    <PageField
                        page={{...page, ...{default: props.defaultPage === index}}}
                        renamePage={event => {
                            let newPages = [...props.data.pages]
                            newPages[index].title = event
                            props.setData({
                                ...props.data,
                                pages: newPages
                            })
                        }} handleOpen={() => setOpenInput(index)} open={openInput === index}
                        handleClose={() => setOpenInput(null)}
                        length={props.data.pages.length}
                        index={index}
                        removePage={() => {
                            let newPages = [...props.data.pages]
                            if (index !== props.defaultPage && props.defaultPage !== 0 && props.defaultPage > index)
                                props.setDefaultPage(props.defaultPage - 1)

                            if (index === props.defaultPage) {
                                if (index > 1)
                                    props.setDefaultPage(props.defaultPage - 1)
                                else
                                    props.setDefaultPage(0)
                            }

                            newPages.splice(index, 1)
                            props.setData({
                                ...props.data,
                                pages: newPages
                            })
                        }}
                        setAsDefault={() => {
                            props.setDefaultPage(index)
                        }}
                    />
                </React.Fragment>
            ))}
            <button
                className={styles.newPageButton}
                style={{display: props.data.pages.length < 5 ? undefined : 'none'}}
                onClick={() => {
                    let newPages = [...props.data.pages]
                    newPages.push({
                        title: 'Página ' + (props.data.pages.length + 1),
                        nodes: [],
                        links: [],
                        default: false
                    })
                    props.setData({
                        ...props.data,
                        pages: newPages
                    })
                }}>
                <AddRounded style={{fontSize: '1.5rem'}}/>
            </button>
        </div>
    )
}

Pages.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    contextMenuRef: PropTypes.object,
    setDefaultPage: PropTypes.func,
    defaultPage: PropTypes.number
}