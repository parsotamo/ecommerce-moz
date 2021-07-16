import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { cartSaveShippingAddress } from "../../actions";
import FormContainer from "../FormContainer";
import CheckOutSteps from "../CheckOutSteps";

const ShippingScreen = ({ history })=>{
    const dispatch = useDispatch();

    const { shippingAddress } = useSelector(state => state.cart);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const onSubmitHandler = (e)=>{
        e.preventDefault();
       dispatch(cartSaveShippingAddress({address, city, postalCode, country}));
       history.push("/payment");
    }
    return(
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <form onSubmit={onSubmitHandler}>
            <h1 className="text-uppercase my-5">Detalhes de Endereço de destino</h1>
            <div
            className="form-group mb-3">
            <label className="fs-5" htmlFor="address">Endereço</label>
            <input id="address" type="text" required value={address ? address : ""} className="form-control py-3" onChange={(e)=> setAddress(e.target.value)} />
            </div>

            <div className="form-group mb-3">
            <label className="fs-5" htmlFor="city">Cidade</label>
            <input id="city" type="text" required value={city ? city: ""} className="form-control py-3" onChange={(e)=> setCity(e.target.value)} />
            </div>

            <div className="form-group mb-3">
            <label className="fs-5" htmlFor="postalCode">Código Postal</label>
            <input id="postalCode" type="text" required value={postalCode ? postalCode: ""} className="form-control py-3" onChange={(e)=>setPostalCode(e.target.value)} />
            </div>

            <div className="form-group mb-3">
            <label className="fs-5" htmlFor="country">País</label>
            <input id="country" type="text" required value={country ? country: ""} className="form-control py-3" onChange={(e)=>setCountry(e.target.value)} />
            </div>

            <div className="d-grid">
            <button type="submit" className="btn btn-primary py-3">Continuar</button>
            </div>
            </form>
        </FormContainer>
    )
}

export default ShippingScreen;
