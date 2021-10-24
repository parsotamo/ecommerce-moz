import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import { register } from '../../actions';
import Message from '../Message';
import Loading from '../Loading';
import FormContainer from '../FormContainer';

const RegisterScreen = ({ history, Location }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const login = useSelector((state) => state.userLogin);
  const { loading, error: errorRegister } = useSelector(
    (state) => state.userRegister
  );
  const redirect =
    Location && Location.search ? history.search.split('=')[1] : '/';
  const { userInfo } = login;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      register({
        name,
        email,
        phoneNumber,
        whatsAppNumber,
        password,
        passwordConfirm,
      })
    );
  };
  return (
    <FormContainer>
      {message && <Message variant='danger'>{message}</Message>}
      {errorRegister && <Message variant='danger'>{errorRegister}</Message>}
      <form onSubmit={onSubmitHandler}>
        <h1 className='text-uppercase my-5'>Cadastre-se</h1>
        <div className='form-group mb-3'>
          <label className='fs-5' htmlFor='name'>
            Nome Completo
          </label>
          <input
            id='name'
            type='name'
            value={name}
            required
            className='form-control py-3'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group mb-3'>
          <label className='fs-5' htmlFor='email'>
            Endereço de Email
          </label>
          <input
            id='email'
            type='email'
            value={email}
            required
            className='form-control py-3'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group mb-3'>
          <Form.Label className='fs-5' htmlFor='phoneNumber'>
            Contacto
          </Form.Label>
          <FormControl
            value={phoneNumber || ''}
            id='phoneNumber'
            type='tel'
            minLength='9'
            maxLength='12'
            required
            pattern='(82|84|85|86|87)[0-9]{7}'
            className='form-control py-3'
            placeholder='9 digitos máximo (Obrigatório)'
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>

        <div className='form-group mb-3'>
          <Form.Label className='fs-5' htmlFor='whatsapp'>
            Contacto Whatsapp
          </Form.Label>
          <FormControl
            value={whatsAppNumber || ''}
            id='whatsapp'
            type='tel'
            minLength='9'
            maxLength='12'
            pattern='(82|84|85|86|87)[0-9]{7}'
            className='form-control py-3'
            placeholder='9 digitos máximo (Opcional)'
            onChange={(e) => {
              setWhatsAppNumber(e.target.value);
            }}
          />
        </div>
        <div className='form-group mb-3'>
          <label className='fs-5' htmlFor='pass'>
            Senha
          </label>
          <input
            id='pass'
            type='password'
            value={password}
            required
            className='form-control py-3'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group mb-3'>
          <label className='fs-5' htmlFor='pass2'>
            Confirmar Senha
          </label>
          <input
            id='pass2'
            type='password'
            value={passwordConfirm}
            required
            className='form-control py-3'
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className='d-grid'>
          <button
            disabled={loading ? true : false}
            type='submit'
            className='btn btn-primary py-3'
          >
            {loading ? (
              <span>
                Cadastrando&nbsp;<i className='fas fa-sync fa-spin'></i>
              </span>
            ) : (
              'Cadastrar'
            )}
          </button>
        </div>
      </form>
      <div className='row mt-5'>
        <div className='col'>
          <div className='btn text-uppercase fs-5'>
            Já possuí conta?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Entrar Agora
            </Link>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
