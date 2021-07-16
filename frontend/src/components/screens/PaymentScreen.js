import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { cartSavePaymentMethod } from "../../actions";
import CheckOutSteps from "../CheckOutSteps";
import FormContainer from "../FormContainer";

const PaymentScreen = ({ history })=>{
    const dispatch = useDispatch();
    const [payment, setPayment] = useState("paypal");
    const { shippingAddress } = useSelector(state => state.cart);

    if(!shippingAddress.address){
        history.push("/shipping");
    }
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        dispatch(cartSavePaymentMethod(payment));
        history.push("/placeOrder");
    }
    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
                <form onSubmit={onSubmitHandler}>
                <h1 className="text-uppercase my-5">Forma de Pagamento</h1>
                <div className="form-group mb-3">
                <input id="payment" type="radio" checked value={payment} className="py-3 me-3" onChange={(e)=> setPayment(e.target.value)} />
                <label className="fs-5" htmlFor="payment">Paypal ou Cartão de Crédito</label>
                </div>
                <button type="submit" className="btn btn-primary py-3">Continuar</button>
                </form>
            </FormContainer>
    )
}
export default PaymentScreen;
