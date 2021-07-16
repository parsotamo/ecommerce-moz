import React from 'react';

const Loading = ()=>{

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
        <div className="spinner-border text-dark" style={{width: "10rem", height: "10rem"}} role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
    )
}

export default Loading;
