import PropTypes from "prop-types";
import getPercentage from "../../shared/getPercentage";

export default function getPath(props) {
    let path = ''
    const columnWidth = 20
    const height = (props.height - 5)

    props.data.forEach((e, i) => {
        let percent = getPercentage(e[props.valueKey], props.biggest, height)
        console.log(`e ${ columnWidth * i + props.offset} i ${i} ${percent} var: ${e[props.valueKey]}`)
        if(!isNaN(percent)) {
            path = path + ` ${columnWidth * i + props.offset},${height - percent +5}`
        }
    })

    return path
}

getPath.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    valueKey: PropTypes.string,
    width: PropTypes.number,
    offset: PropTypes.number,
    biggest: PropTypes.number,
    height: PropTypes.number
}

