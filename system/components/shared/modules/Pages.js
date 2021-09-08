import PropTypes from 'prop-types'
import styles from "../styles/Pages.module.css";
import {AddRounded} from "@material-ui/icons";
import PageField from "../templates/PageField";
import React, {useState} from 'react'

export default function Pages(props) {
    const [openInput, setOpenInput] = useState(null)
    return (
        <div className={styles.pagesContainer}>

            {props.pages.map((page, index) => (
                <React.Fragment key={'page-' + index}>
                    <PageField
                        page={{...page, ...{default: props.defaultPage === index}}}
                        renamePage={event => {
                            let d = {...props.pages[props.defaultPage]}
                            d.title = event
                            props.handlePageChange(d)
                        }} handleOpen={() => setOpenInput(index)} open={openInput === index}
                        handleClose={() => setOpenInput(null)}
                        length={props.pages.length}
                        index={index}
                        removePage={() => {
                            let newPages = [...props.pages]
                            if (index !== props.defaultPage && props.defaultPage !== 0 && props.defaultPage > index)
                                props.setDefaultPage(props.defaultPage - 1)

                            if (index === props.defaultPage) {
                                if (index > 1)
                                    props.setDefaultPage(props.defaultPage - 1)
                                else
                                    props.setDefaultPage(0)
                            }

                            newPages.splice(index, 1)
                            props.setPages(newPages)
                        }}
                        setAsDefault={() => {
                            props.setDefaultPage(index)
                        }}
                    />
                </React.Fragment>
            ))}
            <button
                className={styles.newPageButton}
                style={{display: props.pages.length < 5 ? undefined : 'none'}}
                onClick={() => {
                    let newPages = [...props.pages]
                    newPages.push({
                        title: 'Página ' + (props.pages.length + 1),
                        nodes: [],
                        links: [],
                        default: false
                    })
                    props.setPages(newPages)
                }}>
                <AddRounded style={{fontSize: '1.5rem'}}/>
            </button>
        </div>
    )
}

Pages.propTypes = {
    setPages: PropTypes.func,
    pages: PropTypes.array,
    handlePageChange: PropTypes.func,
    setDefaultPage: PropTypes.func,
    defaultPage: PropTypes.number
}