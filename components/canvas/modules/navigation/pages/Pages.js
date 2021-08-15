import PropTypes from 'prop-types'
import styles from "./styles/Pages.module.css";
import {AddRounded} from "@material-ui/icons";
import PageField from "./PageField";
import React from 'react'

export default function Pages(props) {

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
                        }}
                        length={props.data.pages.length}
                        removePage={() => {
                            let newPages = [...props.data.pages]
                            if (page.default) {
                                if (index === (props.data.pages.length - 1))
                                    newPages[index - 1].default = true
                                else if (index === 0)
                                    newPages[1].default = true
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