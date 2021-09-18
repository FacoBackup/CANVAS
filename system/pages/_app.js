import '../styles/globals.css'
import React, {useEffect} from "react";
import ReactDOM from 'react-dom'

export default function _app({Component, pageProps}) {

    return (

        <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
            {/*<React.StrictMode>*/}
            <Component {...pageProps}/>
            {/*</React.StrictMode>*/}
        </div>
    )
}