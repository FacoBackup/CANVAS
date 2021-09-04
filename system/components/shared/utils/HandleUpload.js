import PropTypes from "prop-types"
// import hmacSHA512  from 'crypto-js/hmac-sha512'
import * as Papa from 'papaparse';

var CryptoJS = require("crypto-js");

function handleCanvas(up, setData) {
    let response = CryptoJS.AES.decrypt(up.target.result, 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((')
    response = response.toString(CryptoJS.enc.Utf8)
    setData(JSON.parse(response))
}

function handleJson(up, data, setData, fileName) {
    const uploaded = JSON.parse(up.target.result)

    let obj = uploaded.reduce((res, item) => ({...res, ...item}));

    let keys = Object.keys(obj);

    let def = keys.reduce((result, key) => {
        result[key] = undefined
        return result;
    }, {});

    let result = uploaded.map((item) => ({...def, ...item}));

    setData({
        ...data,
        dataset: result,
        fileName: fileName
    })
}

function handleCsv(up, data, setData, fileName) {
    const uploaded = Papa.parse(up.target.result, {header: true, encoding: 'ISO-8859-1'}).data
    let obj = uploaded.reduce((res, item) => ({...res, ...item}));
    let keys = Object.keys(obj);

    let def = keys.reduce((result, key) => {
        result[key] = undefined
        return result;
    }, {});

    let result = uploaded.map((item) => ({...def, ...item}));

    setData({
        ...data,
        dataset: result,
        fileName: fileName
    })
}

export default function HandleUpload(props) {
    let name = props.file.target.files[0].name.split('.')[0]
    try {
        let reader = new FileReader()
        console.log(props.type)
        reader.onload = newData => {
            switch (props.type) {
                case 'canvas': {
                    handleCanvas(newData, props.setData)
                    break
                }
                case 'json': {
                    handleJson(newData, props.data, props.setData, name)
                    break
                }
                case 'csv': {
                    handleCsv(newData, props.data, props.setData, name)
                    break
                }
                default:
                    break
            }

        };
        reader.readAsText(props.file.target.files[0]);
    } catch (error) {
        console.log(error)
    }
}
HandleUpload.propTypes = {
    file: PropTypes.object,
    setData: PropTypes.func,
    data: PropTypes.object,
    type: PropTypes.oneOf(['.canvas', '.json', '.csv', '.excel'])
}

