import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions";

const CartScreen = ({ match, location, history }) => {
  const id = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = cart;

  const cartRemoveItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    if (userInfo) {
      history.push("/shipping");
    } else {
      history.push("/login?redirect=shipping");
    }
  };

  return (
    <div className="container u-padding-bottom-huge">
      <div className="row my-5">
        <div className="col">
          <h1 className="display-3 text-uppercase">Itens Selecionados</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          {cartItems ? (
            <ul className="list-group list-group-flush">
              {cartItems.map((item) => {
                return (
                  <li
                    className="list-group-item  text-muted mb-3"
                    key={item.product}
                  >
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={`/images/products/${item.image}`}
                          className="img-fluid"
                          alt="new product"
                        />
                      </div>
                      <div className="col-3">
                        <h3 className="">{item.name}</h3>
                      </div>
                      <div className="col-3 text-center">
                        <h3>{item.price} MTS</h3>
                      </div>

                      <div className="col-2">
                        <select
                          className="py-3 form-select bg-light"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((el) => (
                            <option key={el + 1} value={el + 1}>
                              {el + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-1 mx-auto">
                        <i
                          onClick={() => cartRemoveItemHandler(item.product)}
                          className="fas fa-trash fa-lg text-danger mt-3 icon-remove-cart"
                        ></i>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h1>Nenhum item selecionado</h1>
          )}
        </div>
        <div className="col-4">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-muted">
                <h1 className="text-uppercase">
                  Subtotal (
                  {cartItems.reduce((total, item) => total + item.qty, 0)})
                  item(s)
                </h1>

                <h1>
                  Preço total:{" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}{" "}
                  MTS
                </h1>
              </li>

              <li className="list-group-item">
                <div className="d-grid">
                  <button
                    type="button"
                    onClick={checkOutHandler}
                    className="btn btn-dark py-4 fs-4 text-uppercase"
                    disabled={cartItems.length === 0 ? true : false}
                  >
                    Proceder a compra
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
