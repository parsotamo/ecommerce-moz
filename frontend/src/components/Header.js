import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logout } from '../actions';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
// import { toast } from 'react-toastify';
import NewCategory from './screens/NewCategory';
// import SocketContext from '../context/SocketContext';

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { user } = useSelector((state) => state.userDetails);
  // const [newUserMsg, setNewUserMsg] = useState('');
  // const [newMsg, setNewMsg] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  // const socket = useContext(SocketContext);

  useEffect(() => {
    if (userInfo) {
      if (!user) {
        dispatch(getUserProfile());
      }
      //   socket.emit("join-user", userInfo, (cbData) => {});
      // }
      // socket.on("auth", (data) => {
      //   if (data.action === "new-user") {
      //     setNewUserMsg(data.msg);
      //   }

      //   setNewUserMsg("");
      // });
      // socket.on("receive-msg", (data) => {
      //   if (data) {
      //     setNewMsg(data);
      //   }
      //   setNewMsg("");
      // });
    }
  }, [dispatch, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <header id='header'>
        <div className='topbar'>
          <NewCategory modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 d-flex justify-content-between me-5'>
                <ul className='d-flex m-0 py-1'>
                  <small className='nav-link text-light d-flex  align-items-center fst-small'>
                    <i className='fas fa-map-marker-alt fa-lg text-danger me-2'></i>
                    <span>Moçambique</span>
                  </small>
                  <small className='nav-link text-light d-flex  align-items-center  fst-small'>
                    <i className='fas fa-at fa-lg text-danger me-2'></i>
                    <span>glakert@gmail.com</span>
                  </small>
                  <small className='nav-link text-light d-flex  align-items-center  fst-small'>
                    <i className='fas fa-phone-alt fa-lg text-danger me-2'></i>
                    <span>(+258)82 45 61 157</span>
                  </small>
                </ul>
                <ul className='d-flex justify-content-sm-end justify-content-center align-items-center m-0 py-1'>
                  <Link
                    to='/cart'
                    className='nav-link user text-light d-flex  align-items-center'
                  >
                    <i className='fas fa-shopping-cart me-2'></i>
                    <span>Carrinho</span>
                  </Link>

                  <li className='nav-item'>
                    {user && (
                      <>
                        <div className='nav-user-box--1'>
                          <Link to='/profile' className='nav-link text-light'>
                            {user.name}
                          </Link>

                          <Link to='/profile'>
                            <img
                              alt='profile'
                              src={user.photo}
                              className='img-fluid rounded-circle'
                              height='30'
                              width='30'
                              onError={(e) => {
                                if (user.photo) {
                                  e.target.src = user.photo;
                                } else {
                                  e.target.src =
                                    'https://comercio-moz.s3.us-east-2.amazonaws.com/default/default.jpg';
                                }
                              }}
                            />
                          </Link>
                        </div>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Navbar variant='dark' expand='sm' sticky='top' id='navigation'>
          <div className='col-nav-logo'>
            <LinkContainer to='/' className='navbar-brand text-light'>
              <Navbar.Brand>
                <span className='nav-logo'>Comércio Moz</span>
              </Navbar.Brand>
            </LinkContainer>
          </div>

          <Navbar.Toggle aria-controls='navbar' className='ms-auto' />
          <div className='container-fluid'>
            <div className='row w-100'>
              <Navbar.Collapse id='navbar'>
                <Nav className='justify-content-center flex-sm-row flex-column align-items-center'>
                  <div className='col-nav-content d-flex flex-sm-row flex-column justify-content-center align-items-center ms-sm-auto'>
                    <Link
                      to='/cart'
                      className='nav-link user text-light d-flex  align-items-center d-sm-none d-inline-block'
                    >
                      <i className='fas fa-shopping-cart me-2'></i>
                      <span>Carrinho</span>
                    </Link>
                    {user ? (
                      <NavDropdown
                        title={user.name.split(' ')[0]}
                        id='username'
                      >
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item variant='light'>
                            {user.name.split(' ')[0]}
                          </NavDropdown.Item>
                        </LinkContainer>
                        {(user.role === 'manager' || user.role === 'admin') && (
                          <LinkContainer to='/userAds'>
                            <NavDropdown.Item variant='light'>
                              Meus Anúncios
                            </NavDropdown.Item>
                          </LinkContainer>
                        )}
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
                          to='/login'
                          className='nav-link user text-light d-flex justify-content-center align-items-center'
                        >
                          <i className='fas fa-sign-in-alt me-3'></i>
                          <span>Entrar</span>
                        </Link>
                        <Link
                          to='/register'
                          className='nav-link user text-light d-flex justify-content-center align-items-center'
                        >
                          <i className='fas fa-user me-3'></i>
                          <span>Cadastre-se</span>
                        </Link>
                      </React.Fragment>
                    )}
                    {user &&
                      (userInfo.role === 'admin' ||
                        userInfo.role === 'manager') && (
                        <>
                          <NavDropdown title='Admin' id='username'>
                            {userInfo.role === 'admin' && (
                              <LinkContainer to='/admin/users'>
                                <NavDropdown.Item variant='light'>
                                  Usuários
                                </NavDropdown.Item>
                              </LinkContainer>
                            )}
                            <LinkContainer to='/admin/products'>
                              <NavDropdown.Item variant='light'>
                                Produtos
                              </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orders'>
                              <NavDropdown.Item variant='light'>
                                Compras
                              </NavDropdown.Item>
                            </LinkContainer>
                          </NavDropdown>
                          <span
                            className='btn-gradient btn-gradient--primary btn-gradient--sm me-3 mb-4 mb-sm-0'
                            onClick={(e) => openModal()}
                          >
                            Adicionar Categoria &nbsp;
                            <i className='fas fa-plus-circle'></i>
                          </span>
                          <Link
                            className='glow-on-hover glow-on-hover--sm'
                            to='/admin/products/new/'
                          >
                            Postar Anúncio &nbsp;
                            <i className='fas fa-plus-circle'></i>
                          </Link>
                        </>
                      )}
                  </div>
                </Nav>
              </Navbar.Collapse>
            </div>
          </div>
        </Navbar>
      </header>
      {/* {user &&
        userInfo.role === 'admin' &&
        newUserMsg &&
        toast.dark(newUserMsg)}
      {user &&
        newMsg.message &&
        toast.dark(`${newMsg.name}: ${newMsg.message}`, {
          autoClose: 5000,
        })} */}
    </>
  );
};

export default Header;
