import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../actions";
import Message from "../Message";
import Loading from "../Loading";
import FormContainer from "../FormContainer";

const LoginScreen = ({ history, Location }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useSelector((state) => state.userLogin);
  const redirect =
    Location && Location.search ? history.search.split("=")[1] : "/";
  const { loading, userInfo, error } = login;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };
  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmitHandler}>
          <h1 className="text-uppercase my-5">Entar</h1>
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
          <div className="d-grid">
            <button type="submit" className="btn btn-primary py-3">
              Entrar
            </button>
          </div>
        </form>
      )}
      <div className="row mt-5">
        <div className="col">
          <div className="btn text-uppercase fs-5">
            Não tem conta?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Cadastre-se Agora
            </Link>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
