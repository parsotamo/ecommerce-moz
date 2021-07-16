import React from 'react';

const NotFound = ({variant, size})=>{

    return (
        <div className={`fs-4 ${variant} ps-5 text-center py-5`}>
            <i className={`fas fa-frown ${size} text-warning`}></i>
            <h1>Não Encontrado</h1>
        </div>
    )
}

export default NotFound;
