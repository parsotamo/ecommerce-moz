import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions";
import Message from "../Message";
import Loading from "../Loading";
import FormContainer from "../FormContainer";

const RegisterScreen = ({ history, Location }) =>{
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    const login = useSelector(state => state.userLogin);
    const { error: errorRegister } = useSelector(state => state.userRegister);
    const redirect = Location && Location.search ? history.search.split("=")[1]: "/";
    const { loading, userInfo } = login;
    useEffect(()=> {
        if (userInfo){
          history.push(redirect);
        }
    }, [history, redirect, userInfo]);

    const onSubmitHandler = (e)=>{
        e.preventDefault();
            dispatch(register(name, email, password, passwordConfirm));
    }
    if (loading) return <Loading />;
        return(
            <FormContainer>
                {message && <Message variant="danger">{message}</Message>}
                {
                    errorRegister && <Message variant="danger">{ errorRegister }</Message>
                }
                <form onSubmit={onSubmitHandler}>
                <h1 className="text-uppercase my-5">Cadastre-se</h1>
                <div className="form-group mb-3">
                <label className="fs-5" htmlFor="name">Nome Completo</label>
                <input id="name" type="name" value={name} className="form-control py-3" onChange={(e)=> setName(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                <label className="fs-5" htmlFor="email">Endereço de Email</label>
                <input id="email" type="email" value={email} className="form-control py-3" onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                <label className="fs-5" htmlFor="pass">Senha</label>
                <input id="pass" type="password" value={password} className="form-control py-3" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                <label className="fs-5" htmlFor="pass2">Confirmar Senha</label>
                <input id="pass2" type="password" value={passwordConfirm} className="form-control py-3" onChange={(e)=>setPasswordConfirm(e.target.value)} />
                </div>
                <div className="d-grid">
                <button type="submit" className="btn btn-primary py-3">Entrar</button>
                </div>
                </form>
                <div className="row mt-5">
                    <div className="col">
                        <div  className="btn text-uppercase fs-5">Já possuí conta? <Link to={redirect ? `/login?redirect=${redirect}`: "/login"}>Entrar Agora</Link></div>
                    </div>
                </div>
            </FormContainer>
        )


}

export default RegisterScreen;
