import Link from "./link/Link";
import React from "react";
import PropTypes from "prop-types";
import {v4 as uuid4} from 'uuid';

export default function RenderLinks(props) {

    const handleStepCreation = (event, link) => {
        let newSteps = {
            id: uuid4().toString(),
            description: '',
            placement: {x: event.clientX - props.root.offsetLeft, y: event.clientY - props.root.offsetTop - 80}
        }
        let newLinks = [...props.data.links]
        newLinks[newLinks.indexOf(link)] = {
            ...newLinks[newLinks.indexOf(link)],
            ...{
                step: newSteps
            }
        }

        props.setData({
            ...props.data,
            links: newLinks
        })
    }

    return props.data !== undefined ? (
        props.data.links.map((link, index) => (
            <g key={`${link.child.id}-link-${link.parent.id}`}>
                <Link
                    target={link.parent}
                    source={link.child}
                    type={link.type}
                    color={() => {
                        const color = props.data.nodes.find(node => node.id === link.parent.id)
                        if (color !== undefined)
                            return color.styling.color
                        else return 'transparent'
                    }}
                    setSelected={props.setSelectedLink}
                    selectedLink={props.selectedLink}
                    handleChange={event => {
                        let newLink = {...link}
                        newLink[event.name] = event.value
                        let newLinks = [...props.data.links]

                        newLinks[index] = newLink
                        props.setData({...props.data, links: newLinks})
                    }}
                    handleStepCreation={event => handleStepCreation(event, link)}
                    deleteLink={() => {
                        let newLinks = [...props.data.links]
                        const index = newLinks.indexOf(link)
                        let newNodes = [...props.data.nodes]

                        newNodes[link.child.index].links.splice(newNodes[link.child.index].links.find((l, index) => l === link), 1)
                        newNodes[link.parent.index].links.splice(newNodes[link.parent.index].links.find((l, index) => l === link), 1)
                        if (index > -1) {
                            newLinks.splice(index, 1)
                            props.setData({
                                ...props.data,
                                links: newLinks,
                                nodes: newNodes
                            })
                        }
                    }}
                    description={link.description}
                />
            </g>
        ))
    ) : null
}
RenderLinks.propTypes = {

    contextMenuRef: PropTypes.object,
    root: PropTypes.object,
    setData: PropTypes.func,
    data: PropTypes.object,
    selectedLink: PropTypes.string,
    setSelectedLink: PropTypes.func,
    handleContextClose: PropTypes.func
}