import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUserProfile,
  userUpdateProfile,
  getUserOrders,
} from "../../actions";
import Message from "../Message";
import Loading from "../Loading";
import axios from "axios";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [uploadPhoto, setUploadPhoto] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, user, error } = useSelector((state) => state.userDetails);
  const { orders, loading: userOrderLoading, error: errorOrder } = useSelector(
    (state) => state.userOrders
  );
  const { success } = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
        dispatch(getUserProfile());
      } else if (userInfo._id !== user._id) {
        dispatch(getUserProfile());
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhoto(user.photo);
      }
    }
  }, [user]);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("_id", user._id);
    formData.append("photo", file);
    setUploadPhoto(true);
    try {
      const { data: response } = await axios.patch(
        "/api/users/updateMe/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setPhoto(response.data);
      setUploadPhoto(false);
      dispatch(getUserProfile());
    } catch (error) {
      setUploadPhoto(false);
    }
  };

  useEffect(() => {
    if (!orders) {
      dispatch(getUserOrders());
    }
  }, [orders]);

  useEffect(() => {
    if (success) {
      dispatch(getUserProfile());
    }
  }, [success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdateProfile(name, email, password, passwordConfirm));
    dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 mb-5">
          {loading && <Loading />}
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          <form onSubmit={onSubmitHandler}>
            <h1 className="text-uppercase text-center my-5">
              Detalhes de Conta
            </h1>

            <div className="form-group text-center mb-3">
              <img
                src={`images/users/${photo}`}
                className="img-fluid img-thumbnail rounded-circle mb-5"
                width="200"
                height="200"
                onChange={(e) => setPhoto(e.target.value)}
              />

              <input
                id="photo"
                type="file"
                className="form-control py-3"
                onChange={uploadImageHandler}
              />
              <label htmlFor="photo">Mudar foto</label>
            </div>

            <div className="form-group mb-3">
              <label className="fs-5" htmlFor="name">
                Nome Completo
              </label>
              <input
                id="name"
                type="name"
                value={name}
                className="form-control py-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="fs-5" htmlFor="email">
                Endereço de Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                className="form-control py-3"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="fs-5" htmlFor="pass">
                Senha
              </label>
              <input
                id="pass"
                type="password"
                value={password}
                className="form-control py-3"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="fs-5" htmlFor="pass2">
                Confirmar Senha
              </label>
              <input
                id="pass2"
                type="password"
                value={passwordConfirm}
                className="form-control py-3"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary py-3">
                Entrar
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-9">
          {userOrderLoading ? (
            <Loading />
          ) : errorOrder ? (
            <Message variant="danger">{error}</Message>
          ) : orders && orders.length > 0 ? (
            <table className="table table-striped responsive fs-4 text-center mx-5 mt-5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Preço Total</th>
                  <th>Pago</th>
                  <th>Entregue</th>
                  <th>Data de Pagamento</th>
                  <th>Data de Entrega</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice} MTS</td>
                    <td>
                      {order.isPaid ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td>
                      {order.paidAt ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td>
                      {order.deliveredAt ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td>
                      <Link
                        className="btn btn-danger badge bg-danger rounded-pill p-2"
                        to={`/order/${order._id}`}
                      >
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className="text-center text-muted">
              Nenhum pedido de compra efectuado
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
