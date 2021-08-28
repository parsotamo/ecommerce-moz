import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { deliverOrder, getOrderDetails, payOrder } from "../../actions";
import Message from "../Message";
import Loading from "../Loading";
import axios from "axios";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);

  if (!userInfo) {
    history.push("/login");
  }
  const { loading, order, success, error } = useSelector(
    (state) => state.orderDetails
  );

  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  const addPaypalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;

    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay || successDeliver || order._id != orderId) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch({ type: "ORDER_DELIVER_RESET" });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const successDeliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  if (success) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => item.price * item.qty + acc, 0)
      .toFixed(1);
  }
  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div className='container u-padding-bottom-huge'>
      <div className='row mt-5'>
        <div className='col-md-8'>
          <ul className='list-group list-group-flush'>
            <h1 className='display-2 fw-light text-uppercase mb-5'>
              Pedido {match.params.id}
            </h1>
            <h1 className='text-uppercase'>Detalhes de Entrega</h1>
            <p className='fs-3'>
              <strong>Nome: </strong>
              {order.user.name}
            </p>
            <p className='fs-3'>
              <strong>Email: </strong>

              {order.user.email}
            </p>
            <p className='fs-3'>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <li className='list-group-item my-4 fs-3 px-0'>
              {order.isDelivered ? (
                <Message variant='success'>
                  Entregue em {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='warning'>Não entregue</Message>
              )}
            </li>

            <h1 className='text-uppercase'>Método de pagamento</h1>
            <p className='my-4 fs-3'>Método: {order.paymentMethod}</p>
            <li className='list-group-item my-4 fs-3 px-0'>
              {order.isPaid ? (
                <Message variant='success'>Pago em {order.paidAt}</Message>
              ) : (
                <Message variant='warning'>Pagamento pendente</Message>
              )}
            </li>

            <h1 className='text-uppercase'>
              Item(s) Ordenados <i className='fas fa-shopping-cart'></i>
            </h1>
            {order.orderItems.length === 0 ? (
              <Message variant='info'>Carrinho vazio</Message>
            ) : (
              order.orderItems.map((item, key) => {
                return (
                  <li className='list-group-item my-4 fs-3' key={key}>
                    <div className='row align-items-center'>
                      <div className='col-1'>
                        <img
                          alt='Item'
                          src={item.image}
                          className='img-fluid rounded'
                        />
                      </div>
                      <div className='col'>
                        <Link
                          className='btn text-secondary fs-4'
                          to={item.product}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className='col'>
                        <h4>
                          {item.qty}X{item.price} MTS=
                          {(item.qty * item.price).toFixed(1)} MTS
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
                    <h4>{order.itemsPrice} MTS</h4>
                  </div>
                </div>
              </li>
              <li className='list-group-item mb-3'>
                <div className='row'>
                  <div className='col'>
                    <h4>Transporte: </h4>
                  </div>
                  <div className='col'>
                    <h4>{order.shippingPrice} MTS</h4>
                  </div>
                </div>
              </li>
              <li className='list-group-item mb-3'>
                <div className='row'>
                  <div className='col'>
                    <h4>Imposto (IVA): </h4>
                  </div>
                  <div className='col'>
                    <h4>{order.taxPrice} MTS</h4>
                  </div>
                </div>
              </li>
              <li className='list-group-item mb-3'>
                <div className='row'>
                  <div className='col'>
                    <h4>Total:</h4>
                  </div>
                  <div className='col'>
                    <h4 className='fw-bolder fs-3'>{order.totalPrice} MTS</h4>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li className='list-group-item'>
                  {loadingPay && <Loading />}
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </li>
              )}
              {userInfo.role === "admin" && !order.isDelivered && (
                <button
                  type='button'
                  className='btn btn-dark fs-5 py-4'
                  onClick={successDeliverHandler}
                >
                  Marcar Entregue
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
