import React from 'react';

const Message = ({variant, children})=>{

    return (
        <div className={`alert alert-${variant} fs-4 text-uppercase fw-bold text-dark ps-5 m-0`}>
            {children}
        </div>
    )
}

export default Message;
