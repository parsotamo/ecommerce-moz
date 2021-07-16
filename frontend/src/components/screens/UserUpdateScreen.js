import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate, getUser } from "../../actions";
import Message from "../Message";
import Loading from "../Loading";
import FormContainer from "../FormContainer";

const UserUpdateScreen = ({ history, match }) => {
  const userId = match.params.id;

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const { loading, user, error } = useSelector((state) => state.user);

  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.userUpdate);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && userInfo.role === "admin") {
      if (!user) {
        dispatch(getUser(userId));
      } else {
        if (user._id !== userId) {
          dispatch(getUser(userId));
        }
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.role);
      }
    } else if (userInfo.role !== "admin") {
      history.push("/");
    }
    if (successUpdate) {
      dispatch({ type: "USER_UPDATE_RESET" });
      history.push("/admin/users");
    }
  }, [user, history, userId, successUpdate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdate(userId, name, email, isAdmin));
  };
  return (
    <FormContainer>
      {loading && <Loading />};
      {error && <Message variant="danger">{error}</Message>}
      {!loading && !error && (
        <form className="u-padding-bottom-huge" onSubmit={onSubmitHandler}>
          <h1 className="text-uppercase my-5">Actualizar Usuário</h1>
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
            <label className="fs-5" htmlFor="isAdmin">
              É Administrador?
            </label>
            <input
              id="isAdmin"
              type="checkbox"
              checked={isAdmin === "admin" ? true : false}
              className="ms-3 mt-3 p-0"
              onChange={(e) => {
                isAdmin === "admin" ? setIsAdmin("user") : setIsAdmin("admin");
              }}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary py-3">
              Actualizar
            </button>
          </div>
        </form>
      )}
    </FormContainer>
  );
};

export default UserUpdateScreen;
