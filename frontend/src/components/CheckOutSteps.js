import { Link } from 'react-router-dom';

const CheckOutSteps = ({ step1, step2, step3, step4 })=>{
    const arrSize = [step1, step2, step3, step4].filter(item=> item).length;
    return (
        <ul className="list-unstyled fs-3 text-capitalize d-flex justify-content-center">
            {
                step1 ? <li className="list-item">
                    {arrSize === 1 ? <Link className="list-link text-primary current" to="/login">Autenticar</Link>: <Link className="list-link text-primary" to="/login">Autenticar</Link>
                    }
                    </li>:
                <li className="list-item">
                    <p className="text-muted">Autenticar</p></li>
            }
             {
                step2 ? <li className="list-item">
                    {arrSize === 2 ? <Link className="list-link text-primary current" to="/shipping">Detalhes de Entrega</Link>: <Link className="list-link text-primary" to="/shipping">Detalhes de Entrega</Link>}
                    </li>:
                <li className="list-item">
                    <p className="text-muted">Detalhes de Entrega</p></li>
            }
            {
                step3 ? <li className="list-item">
                    {arrSize === 3 ? <Link className="list-link text-primary current" to="/payment">Pagamento</Link>:
                    <Link className="list-link text-primary" to="/payment">Pagamento</Link>}
                  </li>:
                <li className="list-item">
                    <p className="text-muted">Pagamento</p></li>
            }
             {
                step4 ? <li className="list-item">
                    {arrSize === 4 ?  <Link className="list-link text-primary current" to="/order">Comprar</Link>:
                     <Link className="list-link text-primary" to="/order">Comprar</Link>}
                   </li>:
                <li className="list-item">
                    <p className="text-muted">Comprar</p></li>
            }
        </ul>
    );
}

export default CheckOutSteps;
