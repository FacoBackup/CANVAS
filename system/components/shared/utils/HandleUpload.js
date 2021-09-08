import PropTypes from "prop-types"
// import hmacSHA512  from 'crypto-js/hmac-sha512'
import * as Papa from 'papaparse';

var CryptoJS = require("crypto-js");

function handleCanvas(up, setData) {
    let response = CryptoJS.AES.decrypt(up.target.result, 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((')
    response = response.toString(CryptoJS.enc.Utf8)
    setData(JSON.parse(response))
}

function handleJson(up, setData) {
    const uploaded = JSON.parse(up.target.result)

    let obj = uploaded.reduce((res, item) => ({...res, ...item}));

    let keys = Object.keys(obj);

    let def = keys.reduce((result, key) => {
        result[key] = undefined
        return result;
    }, {});

    let result = uploaded.map((item) => ({...def, ...item}));
    setData(result)
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

                setData(result)
            }
        })


}

export default async function HandleUpload(props) {
    let name = props.file.target.files[0].name.split('.')[0]
    let data
    try {
        let reader = new FileReader()
        console.log(props.type)
        reader.onload = async newData => {
            switch (props.type) {
                case 'canvas': {
                    handleCanvas(newData, props.setData)
                    break
                }
                case 'json': {
                    handleJson(newData, (e) => {
                        props.setDataset(e)
                        props.setDatasetName(name)
                    })
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
        console.log(error)
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

