import {v4 as uuid4} from "uuid";

export default function getNewNode(dimensions, shape, placement){

    const getDimensions = () => {
        let res = {}
        switch (true) {

            case shape.includes('rect') || shape.includes('parallelogram') || shape.includes('trapezoid') || shape.includes('ellipse') || shape.includes('relationship'): {
                res = {
                    width: 160,
                    height: 80
                }
                break
            }
            case shape.includes('square') || shape.includes('triangle') || shape.includes('circle') : {
                res = {
                    width: 80,
                    height: 80,
                }
                break
            }
            default:
                break
        }
        return res
    }
    const getVariant = () => {
        let res
        switch (true) {
            case shape.includes('ellipse') || shape.includes('circle'): {
                res = 'ellipse'
                break
            }
            case shape.includes('rect') || shape.includes('square'): {
                res = 'rect'
                break
            }
            case shape.includes('relationship') || shape.includes('triangle') || shape.includes('parallelogram') || shape.includes('trapezoid'): {
                res = 'polygon'
                break
            }
            default:
                break
        }
        return res
    }

    const variant = getVariant()
    let d = dimensions === undefined ? getDimensions() : dimensions
    let p = {...placement}

    p.x = p.x - d.width / 2
    p.y = p.y - d.height / 2

    return {
        id: uuid4().toString(),
        title: '',
        placement: p,
        shapeVariant: variant,
        creationDate: (new Date()).getTime(),
        links: [],
        dimensions: d,
        styling: {
            shape: shape,
            borderRadius: 0,
            strokeWidth: 2,
            color: '#0095ff',

        }
    }
}