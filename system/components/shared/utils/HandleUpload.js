import PropTypes from "prop-types"
// import hmacSHA512  from 'crypto-js/hmac-sha512'
import * as Papa from 'papaparse';

var CryptoJS = require("crypto-js");

function handleCanvas(up, setData) {
    let response = CryptoJS.AES.decrypt(up.target.result, 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((')
    response = response.toString(CryptoJS.enc.Utf8)
    setData(JSON.parse(response))
}

function handleJson(up) {
    return new Promise((resolve) => {
        const uploaded = JSON.parse(up.target.result)

        let obj = uploaded.reduce((res, item) => ({...res, ...item}));

        let keys = Object.keys(obj);

        let def = keys.reduce((result, key) => {
            result[key] = undefined
            return result;
        }, {});

        let result = uploaded.map((item) => ({...def, ...item}));
        let parsedData = []
        result.forEach(e => {
            const keys = Object.keys(e)
            let parsedObject = {}
            keys.forEach(k => {
                if (!isNaN(parseInt(e[k])))
                    parsedObject[k] = parseInt(e[k])
                else
                    parsedObject[k] = e[k]


            })
            parsedData.push(parsedObject)
        })
        resolve(parsedData)

    })
}

async function handleCsv(up, setData) {
    await Papa.parse(
        up.target.result,
        {
            header: true, encoding: 'ISO-8859-1',
            worker: true,
            complete: e => {
                let obj = e.data.reduce((res, item) => ({...res, ...item}));
                let keys = Object.keys(obj);

                let def = keys.reduce((result, key) => {
                    result[key] = undefined
                    return result;
                }, {});


                let result = e.data.map((item) => ({...def, ...item}));
                let parsedData = []

                result.forEach(e => {
                    const keys = Object.keys(e)
                    let parsedObject = {}
                    keys.forEach(k => {
                        if (!isNaN(parseInt(e[k])))
                            parsedObject[k] = parseInt(e[k])
                        else
                            parsedObject[k] = e[k]
                    })

                    parsedData.push(parsedObject)
                })

                setData(parsedData)
            }
        })


}

export default async function HandleUpload(props) {
    let name = props.file.target.files[0].name.split('.')[0]
    let data
    try {
        let reader = new FileReader()
        reader.onload = async newData => {
            switch (props.type) {
                case 'canvas': {
                    handleCanvas(newData, props.setData)
                    break
                }
                case 'json': {
                    data = await handleJson(newData)
                    props.setDataset(data)
                    props.setDatasetName(name)
                    break
                }
                case 'csv': {
                    data = await handleCsv(newData, (e) => {
                        console.log('THIS IS OBJECT => ' + JSON.stringify(e))
                        props.setDataset(e)
                        props.setDatasetName(name)
                    })
                    break
                }
                default:
                    break
            }
        }
        reader.readAsText(props.file.target.files[0]);
    } catch (error) {
    }
    return data
}
HandleUpload.propTypes = {
    file: PropTypes.object,
    setData: PropTypes.func,
    setDataset: PropTypes.func,
    setDatasetName: PropTypes.func,
    data: PropTypes.object,
    type: PropTypes.oneOf(['.canvas', '.json', '.csv', '.excel'])
}

