import styles from '../../styles/Tabs.module.css'
import PropTypes from 'prop-types'
import {useEffect, useMemo, useRef} from "react";
import ToolTip from "../../../../chart/tooltip/ToolTip";
import {ArrowBackIosRounded} from "@material-ui/icons";

export default function VerticalTabs(props) {
    const contentRef = useRef()
    const content = useMemo(() => {
        return (
            <div className={styles.content} ref={contentRef}
                 style={{display: props.openButton === undefined || props.openButton === null ? 'none' : null,
                     borderRight:props.contentOrientation !== 'left' ? null :'#ecedf2 1px solid',
                     borderLeft: props.contentOrientation === 'left' ? null : '#ecedf2 1px solid'
                 }}>

                {props.buttons.map((button, i) => i === props.openButton && button !== null ? (
                    <span className={styles.enterAnimation} style={{
                        display: 'grid',
                        gap: '4px'
                    }}>
                        <div className={styles.header}>
                            {button.label}
                        </div>
                        {button.content}
                    </span>

                ) : null)}
            </div>
        )
    }, [props.buttons])

    useEffect(() => {
        if (props.toBePushedTab !== undefined && props.toBePushedTab !== null)
            handleTabChange(props.toBePushedTab)
    }, [props.toBePushedTab])
    const handleTabChange = (newTab) => {
        contentRef.current.firstChild.classList.add(styles.exitAnimation)
        contentRef.current.firstChild.addEventListener('animationend', () => {
            props.setOpenButton(newTab)
            if (props.toBePushedTab !== undefined && props.toBePushedTab !== null)
                props.setToBePushedTab(null)
        }, {once: true})
    }


    return (
      <span style={{
          padding: '5px',
          paddingLeft: props.contentOrientation !== 'left' ? 0 : undefined,
          paddingRight: props.contentOrientation === 'left' ? 0 : undefined,
          height: 'calc(100% - 39px)'}}>
            <div className={styles.container}>
            {props.contentOrientation === 'left' &&( props.open === true || props.open === undefined )? content : null}
                <div className={styles.buttons}>
                {props.open !== undefined ?
                    <span>
                        <ToolTip content={'Extender'} align={'middle'}
                                 justify={props.contentOrientation === 'left' ? 'start' : 'end'}/>
                        <button
                            className={[styles.button, props.open ? styles.activeButton : ''].join(' ')}
                            onClick={() => props.setOpen(!props.open)} disabled={!props.canExtend}
                        >
                                <ArrowBackIosRounded
                                    style={{fontSize: '1.1rem', transform: props.open ? 'rotate(180deg)' : undefined}}/>
                        </button>
                    </span>
                    :
                    null
                }
                    {props.buttons.map((button, i) => button !== null ? (
                        <span key={i + '-tab-button'}>
                        <ToolTip content={button.label} align={'middle'}
                                 justify={props.contentOrientation === 'left' ? 'start' : 'end'}/>
                        <button
                            className={[styles.button, props.openButton === i ? styles.activeButton : ''].join(' ')}
                            onClick={() => handleTabChange(i)} disabled={button.disabled}
                        >
                                {button.icon}
                        </button>
                    </span>

                    ) : null)}
            </div>
                {props.contentOrientation !== 'left' && (props.open === true || props.open === undefined)? content : null}
        </div>
      </span>
    )
}

VerticalTabs.propTypes = {
    canExtend: PropTypes.bool,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.object,
        disabled: PropTypes.bool,
        content: PropTypes.node
    })),
    openButton: PropTypes.number, setOpenButton: PropTypes.func,
    toBePushedTab: PropTypes.number,
    setToBePushedTab: PropTypes.func,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    contentOrientation: PropTypes.oneOf(['left', 'right'])
}