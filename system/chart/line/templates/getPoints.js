import PropTypes from "prop-types";
import getPercentage from "../../shared/getPercentage";
import React from "react";

export default function GetPoints(props) {
    const columnWidth = props.noScroll ? ((props.width - 4) / props.data.length) + props.data.length - 1 : 20
    const height = (props.height - 4)
    let points = []
    let data = [...props.data]
    if (props.smallest < 0) {
        data.forEach(e => {
            e[props.valueKey] = e[props.valueKey] + Math.abs(props.smallest)
        })
    }

    data.forEach((e, i) => {
        let percent = getPercentage(e[props.valueKey], props.biggest, height)
        console.log(percent)
        if (!isNaN(percent)) {
            points.push({x: (columnWidth * i) , y: (height - percent)})
        }
    })

    return points
}

GetPoints.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    valueKey: PropTypes.string,
    width: PropTypes.number,
    offset: PropTypes.number,
    biggest: PropTypes.number,
    height: PropTypes.number,
    smallest: PropTypes.number
}

