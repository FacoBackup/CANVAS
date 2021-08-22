import PropTypes from "prop-types"
// import hmacSHA512  from 'crypto-js/hmac-sha512'

var CryptoJS = require("crypto-js");
export default function HandleDownload(props){
    let dataStr
    let downloadAnchorNode = document.createElement('a');
    if(!props.asJson){
        const ciphertext =  CryptoJS.AES.encrypt(JSON.stringify(props.data), 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((').toString();
        dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(ciphertext)
    }
    else
        dataStr =  "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(props.data))

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${props.data.subject}.${props.asJson ? 'json' : 'canvas'}`);
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
}
HandleDownload.propTypes={
    data: PropTypes.object,
    asJson: PropTypes.bool
}

