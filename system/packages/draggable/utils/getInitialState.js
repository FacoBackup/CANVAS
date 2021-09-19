export default function getInitialState(){
    return {
        toBeDragged: null,
        root: null,
        canDrag: false,
        onDrag: false,
        lastPlacement: {x: undefined, y: undefined},
        currentPlacement: {x: undefined, y: undefined},
        offset: {x: undefined, y: undefined}
    }

}