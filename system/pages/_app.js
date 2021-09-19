import '../styles/globals.css'
import React from "react";

export default function _app({Component, pageProps}) {

    return (
        <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
            <Component {...pageProps}/>
        </div>
    )
}