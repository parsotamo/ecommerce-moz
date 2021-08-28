import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../../actions";
import CheckOutSteps from "../CheckOutSteps";
import Message from "../Message";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, order, success, error } = useSelector(
    (state) => state.orderCreate
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: "CREATE_ORDER_RESET" });
    }
  }, [history, success]);

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const itemsPrice = cartItems
    .reduce((acc, item) => item.price * item.qty + acc, 0)
    .toFixed(1);
  const shippingPrice = itemsPrice > 7000 ? 0 : 100;
  const taxPrice = (0.015 * itemsPrice).toFixed(1);
  const totalPrice = Number(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  ).toFixed(1);

  const placeOrder = () => {
    dispatch(
      createOrder({
        user: userInfo._id,
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <div className='container'>
      <CheckOutSteps step1 step2 step3 step4 />
      <div className='row mt-5'>
        <div className='col-md-8'>
          <ul className='list-group list-group-flush'>
            <h1 className='text-uppercase'>Detalhes de Entrega</h1>
            <li className='list-group-item my-4 fs-3'>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </li>

            <h1 className='text-uppercase'>Método de pagamento</h1>
            <li className='list-group-item my-4 fs-3'>
              Método: {paymentMethod}
            </li>

            <h1 className='text-uppercase'>
              Item(s) selecionados <i className='fas fa-shopping-cart'></i>
            </h1>
            {cartItems.length === 0 ? (
              <Message variant='info'>Carrinho vazio</Message>
            ) : (
              cartItems.map((item, key) => {
                return (
                  <li className='list-group-item my-4 fs-3' key={key}>
                    <div className='row align-items-center'>
                      <div className='col-1'>
                        <img
                          alt='Imagem de Item'
                          src={item.image}
                          className='img-fluid rounded'
                        />
                      </div>

                      <div className='col'>
                        <Link
                          className='btn text-secondary fs-4'
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className='col'>
                        <h4>
                          {item.qty}X{item.price}MTS=
                          {(item.qty * item.price).toFixed(1)}MTS
                        </h4>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className='col-md-4'>
          <div className='card py-3'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item mb-4'>
                <h1 className='text-uppercase'>Sumário da ordem</h1>
              </li>
              <li className='list-group-item mb-3'>
                <div className='row'>
                  <div className='col'>
                    <h4>Item(s): </h4>
                  </div>
                  <div className='col'>
                    <h4>{itemsPrice}MTS</h4>
                  </div>
                </div>
              </li>
              <li className='list-group-item mb-3'>
                <div className='row'>
                  <div className='col'>
                    <h4>Transporte: </h4>
                  </div>
                  <div className='col'>
                    <h4>{itemsPrice == 0 ? 0 : shippingPrice}MTS</h4>
                  </div>
                </div>
              </li>
              <li className='list-group-item mb-3'>
                <div className='row'>
                  <div className='col'>
                    <h4>Imposto (IVA): </h4>
                  </div>
                  <div className='col'>
                    <h4>{taxPrice}MTS</h4>
                  </div>
                </div>
              </li>
              <li className='list-group-item mb-3'>
                <div className='row'>
                  <div className='col'>
                    <h4>Total: </h4>
                  </div>
                  <div className='col'>
                    <h4 className='fw-bolder fs-3'>
                      {itemsPrice == 0 ? 0 : totalPrice}MTS
                    </h4>
                  </div>
                </div>
              </li>
              <li className='list-group-item d-grid'>
                <button
                  type='button'
                  className='btn btn-dark py-4 fs-4'
                  onClick={placeOrder}
                  disabled={itemsPrice == 0 ? true : false}
                >
                  Comprar
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
