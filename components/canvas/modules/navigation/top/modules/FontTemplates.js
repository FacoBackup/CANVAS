export default function  FontTemplates(props){
    return[
        {

            children: [
                {
                    label: 'Normal',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontSize = 'center'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontSize: '16px',
                        fontWeight: undefined,
                        color: '#333333'
                    }
                },
                {
                    label: 'Título',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.textAlign = 'left'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontSize: '27px',
                        color: 'black'
                    }
                },
                {
                    label: 'Subtítulo',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.textAlign = 'right'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontSize: '15px',
                        color: '#555555'
                    }
                },
                {
                    label: 'Cabeçalho 1',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.textAlign = 'right'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontSize: '20px',
                        color: '#333333'
                    }
                },
                {
                    label: 'Cabeçalho 2',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.textAlign = 'right'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontSize: '16px',
                        color: '#333333'
                    }
                },
                {
                    label: 'Cabeçalho 3',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.textAlign = 'right'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontSize: '14px',
                        color: '#333333'
                    }
                }
            ]
        }
    ]
}