import PropTypes from 'prop-types'
import styles from "../styles/Pages.module.css";
import {AddRounded} from "@material-ui/icons";
import PageField from "../templates/editor/PageField";
import React, {useState} from 'react'

export default function Pages(props) {
    const [openInput, setOpenInput] = useState(null)
    return (
        <div className={styles.pagesContainer}>

            {props.pages.map((page, index) => (
                <React.Fragment key={page.id + '-page'}>
                    <PageField
                        page={{...page, ...{default: props.defaultPage === index}}}
                        renamePage={event => props.dispatchPage({
                            action: props.actions.RENAME,
                            payload: {id: page.id, data: event}
                        })}
                        handleOpen={() => setOpenInput(index)}
                        open={openInput === index}
                        handleClose={() => setOpenInput(null)}
                        length={props.pages.length}
                        index={index}
                        removePage={() => {
                            if (index !== props.defaultPage && props.defaultPage !== 0 && props.defaultPage > index)
                                props.setDefaultPage(props.defaultPage - 1)

                            if (index === props.defaultPage) {
                                if (index > 1)
                                    props.setDefaultPage(props.defaultPage - 1)
                                else
                                    props.setDefaultPage(0)
                            }

                            props.dispatchPage({action: props.actions.DELETE, payload: {id: props.page.id}})

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
                onClick={() => props.dispatchPage({action: props.actions.CREATE})}>
                <AddRounded style={{fontSize: '1.5rem'}}/>
            </button>
        </div>
    )
}

Pages.propTypes = {
    pages: PropTypes.array,
    openPage: PropTypes.object,
    dispatchPage: PropTypes.func,
    actions: PropTypes.object,

    setDefaultPage: PropTypes.func,
    defaultPage: PropTypes.number
}