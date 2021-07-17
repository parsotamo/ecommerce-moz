import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logout } from "../actions";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { toast } from "react-toastify";
import SocketContext from "../context/SocketContext";

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { user } = useSelector((state) => state.userDetails);
  const [newUserMsg, setNewUserMsg] = useState("");
  const [newMsg, setNewMsg] = useState({});

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (userInfo) {
      if (!user) {
        dispatch(getUserProfile());
      }
      socket.emit("join-user", userInfo, (cbData) => {});
    }
    socket.on("auth", (data) => {
      if (data.action === "new-user") {
        setNewUserMsg(data.msg);
      }

      setNewUserMsg("");
    });
    socket.on("receive-msg", (data) => {
      if (data) {
        setNewMsg(data);
      }
      setNewMsg("");
    });
  }, [userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <header>
        <div className="topbar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 ms-md-auto me-5">
                <ul className="d-flex justify-content-sm-end justify-content-center align-items-center m-0 py-1">
                  <Link
                    to="/cart"
                    className="nav-link user text-light d-flex  align-items-center"
                  >
                    <i className="fas fa-shopping-cart fa-lg me-2"></i>
                    <span>Carrinho</span>
                  </Link>

                  {user ? (
                    <NavDropdown title={user.name.split(" ")[0]} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item variant="light">
                          {user.name.split(" ")[0]}
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Sair
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <React.Fragment>
                      <Link
                        to="/login"
                        className="nav-link user text-light d-flex align-items-baseline"
                      >
                        <i className="fas fa-sign-in-alt fa-lg me-2"></i>
                        <span>Entrar</span>
                      </Link>
                      <Link
                        to="/register"
                        className="nav-link user text-light d-flex align-items-baseline"
                      >
                        <i className="fas fa-user fa-lg me-2"></i>
                        <span>Cadastre-se</span>
                      </Link>
                    </React.Fragment>
                  )}
                  {user && userInfo.role === "admin" && (
                    <NavDropdown title="ADMIN" id="username">
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item variant="light">
                          Usuários
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item variant="light">
                          Produtos
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item variant="light">
                          Compras
                        </NavDropdown.Item>
                      </LinkContainer>
                      {/* <LinkContainer to="/admin/chat">
                        <NavDropdown.Item variant="light">
                          Chat
                        </NavDropdown.Item>
                      </LinkContainer> */}
                    </NavDropdown>
                  )}
                  <li className="nav-item">
                    {user && (
                      <LinkContainer to="/profile">
                        <div className="nav-user-box--1">
                          <span className="nav-link text-light">
                            {user.name}
                          </span>
                          <img
                            src={`/images/users/${user.photo}`}
                            className="img-fluid rounded-circle"
                            height="30"
                            width="30"
                          />
                        </div>
                      </LinkContainer>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Navbar variant="dark" expand="sm" sticky="top" id="navigation">
          <div className="col-nav-logo">
            <LinkContainer to="/" className="navbar-brand text-light">
              <Navbar.Brand>
                {" "}
                <p className="nav-logo">Comércio</p>
                <p className="nav-logo nav-logo--variant"> Moz</p>
              </Navbar.Brand>
            </LinkContainer>
          </div>
          <div className="col-nav-search col-nav-search--sticky">
            <SearchBar />
          </div>
          <Navbar.Toggle aria-controls="navbar" className="ms-auto" />
          <div className="container-fluid">
            <div className="row w-100">
              <Navbar.Collapse id="navbar">
                <Nav className="ms-auto">
                  <div className="col-nav-search">
                    <SearchBar />
                  </div>
                  <div className="col-nav-content d-flex justify-content-center flex-sm-row justify-content-center align-items-center">
                    <Link
                      to="/cart"
                      className="nav-link user text-light d-flex justify-content-center align-items-center"
                    >
                      <i className="fas fa-shopping-cart fa-lg py-4 me-3"></i>
                      <span>Carrinho</span>
                    </Link>
                    {user ? (
                      <NavDropdown
                        title={user.name.split(" ")[0]}
                        id="username"
                      >
                        <LinkContainer to="/profile">
                          <NavDropdown.Item variant="light">
                            {user.name.split(" ")[0]}
                          </NavDropdown.Item>
                        </LinkContainer>
                        {/* <LinkContainer to="/admin/chat">
                          <NavDropdown.Item variant="light">
                            Chat
                          </NavDropdown.Item>
                        </LinkContainer> */}
                        <NavDropdown.Item onClick={logoutHandler}>
                          Sair
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <React.Fragment>
                        <Link
                          to="/login"
                          className="nav-link user text-light d-flex justify-content-center align-items-center"
                        >
                          <i className="fas fa-sign-in-alt fa-lg py-4 me-3"></i>
                          <span>Entrar</span>
                        </Link>
                        <Link
                          to="/register"
                          className="nav-link user text-light d-flex justify-content-center align-items-center"
                        >
                          <i className="fas fa-user fa-lg py-4 me-3"></i>
                          <span>Cadastre-se</span>
                        </Link>
                      </React.Fragment>
                    )}
                    {user && userInfo.role === "admin" && (
                      <NavDropdown title="ADMIN" id="username">
                        <LinkContainer to="/admin/users">
                          <NavDropdown.Item variant="light">
                            Usuários
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/products">
                          <NavDropdown.Item variant="light">
                            Produtos
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/orders">
                          <NavDropdown.Item variant="light">
                            Compras
                          </NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                    {user && (
                      <LinkContainer to="/profile">
                        <div className="nav-user-box">
                          <img
                            src={`/images/users/${user.photo}`}
                            className="img-fluid rounded-circle user-img"
                            height="50"
                            width="50"
                          />
                          <span className="nav-link text-light">
                            {user.name.split(" ")[0]}
                          </span>
                        </div>
                      </LinkContainer>
                    )}
                  </div>
                </Nav>
              </Navbar.Collapse>
            </div>
          </div>
        </Navbar>
      </header>
      {user &&
        userInfo.role === "admin" &&
        newUserMsg &&
        toast.dark(newUserMsg)}
      {user &&
        newMsg.message &&
        toast.dark(`${newMsg.name}: ${newMsg.message}`, {
          autoClose: 5000,
        })}
    </>
  );
};

export default Header;
