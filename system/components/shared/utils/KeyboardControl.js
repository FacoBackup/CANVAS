import PropTypes from "prop-types";

export default function keyboardControl(props) {
    switch (props.event.key) {
        case 'Delete': {
            // let index
            // data.analytics.find((node, i) => {
            //     if (node.id === selectedNode)
            //         index = i
            // })
            // console.log(index)
            // let newNodes = [...data.analytics]
            // newNodes.splice(index, 1)
            // setData({
            //     ...data,
            //     analytics: newNodes
            // })
            break
        }
        default: {
            break
        }
    }

}

keyboardControl.propTypes={
    event: PropTypes.object
}