export default function FontFamilyTemplates(props) {
    return [
        {

            children: [

                {
                    label: 'Roboto',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Roboto'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'Roboto'
                    }
                },
                {
                    label: 'Arial',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Arial'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'Arial, Helvetica, sans-serif'
                    }
                },
                {
                    label: 'Tahoma',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Tahoma'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'Tahoma, sans-serif'
                    }
                },
                {
                    label: 'Century Gothic',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Century Gothic'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'Century Gothic, sans-serif'
                    }
                },
                {
                    label: 'Geneva',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Geneva'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'Geneva, sans-serif'
                    }
                },
                {
                    label: 'Lucida',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Lucida'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'Lucida, sans-serif'
                    }
                },
                {
                    label: 'Lucida Sans',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Lucida Sans'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'Lucida Sans, sans-serif'
                    }
                },
                {
                    label: 'Courier',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Courier'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'courier, sans-serif'
                    }
                },
                {
                    label: 'Georgia',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Courier'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'Georgia, sans-serif'
                    }
                },
                {
                    label: 'Times New Roman',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'Times New Roman'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: ' "Times New Roman", Times, sans-serif'
                    }
                },
                {
                    label: 'MS Serif',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'MS Serif'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontFamily: 'ms serif, sans-serif'
                    }
                }
            ]
        },
        {
            children: [
                {
                    label: 'Monospace',
                    onClick: () => {
                        let newStyling = {...props.data.styling}
                        newStyling.fontFamily = 'monospace'

                        props.setData({
                            ...props.data,
                            styling: newStyling
                        })
                    },
                    styles: {
                        fontVariant: 'Snell Roundhand, cursive '
                    }
                }
            ]
        }

    ]
}