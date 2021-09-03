import PropTypes from "prop-types"
// import hmacSHA512  from 'crypto-js/hmac-sha512'
import * as Papa from 'papaparse';

var CryptoJS = require("crypto-js");

function handleCanvas(up, setData) {
    let response = CryptoJS.AES.decrypt(up.target.result, 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((')
    response = response.toString(CryptoJS.enc.Utf8)
    setData(JSON.parse(response))
}

function handleJson(up, data, setData) {
    const uploaded = JSON.parse(up.target.result)
    setData({
        ...data,
        dataset: uploaded
    })
}

function handleCsv(up, data, setData) {
    const uploaded = Papa.parse(up.target.result, {header: true}).data
    setData({
        ...data,
        dataset: uploaded
    })
}

export default function HandleUpload(props) {
    try {
        let reader = new FileReader()
        reader.onload = newData => {
            switch (props.type) {
                case '.canvas': {
                    handleCanvas(newData, props.setData)
                    break
                }
                case '.json': {
                    handleJson(newData, props.data, props.setData)
                    break
                }
                case '.csv': {
                    handleCsv(newData, props.data, props.setData)
                    break
                }
                case '.excel': {
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

