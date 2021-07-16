import React from 'react';

const FormContainer = ({ children })=>{

    return (
        <div className="container">
            <div className="row justify-content-center my-4">
                <div className="col-md-6 col-10">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default FormContainer;
