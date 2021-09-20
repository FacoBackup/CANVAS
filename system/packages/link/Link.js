import PropTypes from "prop-types";
import React, {useEffect, useMemo, useRef, useState} from "react";
import getCurve from "../../components/flowchart/utils/getCurve";
import AdjustLink from "../../components/flowchart/utils/AdjustLink";
import Step from "./modules/Step";
import useLink from "../../components/shared/hooks/useLink";

export default function Link(props) {
    const {
        selected, setSelected,
        curve, color
    } = useLink(props.pages, props.link, props.openPage, props.placements)
    // const [showForm, setShowForm] = useState(false)
    // const pathRef = useRef()
    // const [onMove, setOnMove] = useState(false)


    //
    // const handleMouseDown = (t, s, isSource) => {
    //
    //     AdjustLink({
    //         pathRef: pathRef.current,
    //         source: props.source,
    //         target: props.target,
    //         setColor: setColor,
    //         connectionType: props.type,
    //         setOnMove: setOnMove
    //     })
    // }

    const renderRemove = () => {
        if (selected) {
            let target = {}
            const t = document.getElementById(props.source.id + '-node').getBBox()
            switch (props.source.connectionPoint) {
                case 'a': {
                    target = {
                        x: t.x + t.width / 2,
                        y: t.y - 12
                    }
                    break
                }
                case 'b': {
                    target = {
                        x: t.x + t.width + 12,
                        y: t.y + t.height / 2
                    }
                    break
                }
                case 'c': {
                    target = {
                        x: t.x + t.width / 2,
                        y: t.y + t.height + 12
                    }
                    break
                }
                case 'd': {
                    target = {
                        x: t.x - 12,
                        y: t.y + t.height / 2
                    }
                    break
                }
                default:
                    break
            }

            return (
                <image
                    width={'20'} height={'20'}
                    x={target.x - 10} y={target.y - 10}
                    onClick={() => props.deleteLink()}
                    href={'./remove.svg'} fill={'white'}
                />
                // <circle r={10} cx={target.x} cy={target.y} fill={'red'} onClick={() => props.deleteLink()}/>
            )
        } else return null

    }

    return (
        <g
            style={{cursor: "pointer"}}
            onClick={() => setSelected(!selected)}
            // onDoubleClick={() => setShowForm(true)}
        >

            <path
                stroke={
                    color === 'transparent' || !color ? '#e0e0e0' : color
                } strokeWidth={'2'} style={{transition: 'stroke 150ms linear'}}
                fill={'none'}
                strokeDasharray={props.type.includes('dashed') ? '5,5' : undefined}
                d={curve}
                markerStart={selected ? null : `url(#${props.link.id}-end)`}
                markerEnd={`url(#${props.link.id}-start)`}
            />

            <path
                stroke={
                    'transparent'
                } strokeWidth={'20'}
                fill={'none'}
                d={curve}
            />
            {/*<Step*/}
            {/*    description={props.description}*/}
            {/*    handleChange={event => {*/}
            {/*        props.handleChange(event)*/}
            {/*    }}*/}
            {/*    pathRef={pathRef.current} onMove={onMove} setShow={setShowForm} show={showForm}/>*/}

            <defs>
                {selected ? null :
                    <marker
                        id={`${props.link.id}-end`}
                        viewBox="0 0 20 20" refX="10" refY="10"
                        markerWidth="10" markerHeight="10"
                    >
                        <circle cx="10" cy="10" r="10" fill={color === 'transparent' || !color ? '#e0e0e0' : color}
                                style={{transition: 'fill 150ms linear'}}
                        />
                    </marker>
                }
                <marker
                    id={`${props.link.id}-start`}
                    viewBox="0 0 10 10" refX={'5'} refY={'5'}
                    markerWidth="5" markerHeight="5"
                >

                    <circle cx="5" cy="5" r="5" fill={color === 'transparent' || !color ? '#e0e0e0' : color}
                            style={{transition: 'fill 150ms linear'}}/>
                </marker>
            </defs>

            {/*{renderRemove()}*/}

        </g>
    )
}

Link.propTypes = {
    openPage: PropTypes.object,
    pages: PropTypes.array,
    link: PropTypes.object,
    deleteLink: PropTypes.func,
    placements: PropTypes.array,
}