import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className='footer text-center text-md-start'>
        {/* <!-- Container Start --> */}
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-7 offset-md-1 offset-lg-0'>
              {/* <!-- About --> */}
              <div className='block about'>
                {/* <!-- footer logo --> */}
                <h3 className='text-light'>Comércio Moz</h3>
                {/* <!-- description --> */}
                <p className='alt-color'>
                  Encontre o que voçe precisa. Aqui voçê encontra produtos de
                  alta qualidade a preço acessível. Garantimos a segurança da
                  compra do seu produto.
                </p>
              </div>
            </div>
            {/* <!-- Link list --> */}
            <div className='col-lg-2 offset-lg-1 col-md-3'>
              <div className='block'>
                <h4 className='block-title'>Informe-se</h4>
                <ul className='block-list'>
                  <li>
                    <Link to='#'>Acerca de Nós</Link>
                  </li>
                  <li>
                    <Link to='#'>Como funciona</Link>
                  </li>
                  <li>
                    <Link to='#'>Políticas de Segurança</Link>
                  </li>
                  <li>
                    <Link to='#'>Termos e Condições</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- Link list --> */}
            <div className='col-lg-2 col-md-3 offset-md-1 offset-lg-0'>
              <div className='block'>
                <h4 className='block-title'>Serviços</h4>
                <ul className='block-list'>
                  <li>
                    <Link to='#'>Promoções</Link>
                  </li>
                  <li>
                    <Link to='#'>Atendimento</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- Promotion --> */}
            <div className='col-lg-4 col-md-7'>
              {/* <!-- App promotion --> */}
              <div className='block-2 app-promotion'>
                <div className='mobile d-flex'>
                  <a href=''>
                    {/* <!-- Icon --> */}
                    <i className='fas fa-mobile fa-3x text-light'></i>
                  </a>
                  <p>Aplicativo móvel em fase de desenvolvimento</p>
                </div>
                {/* <div class='download-btn d-flex my-3'>
                  <a href='#'>
                    <img
                      src='images/apps/google-play-store.png'
                      class='img-fluid'
                      alt=''
                    />
                  </a>
                  <a href='#' class=' ml-3'>
                    <img
                      src='images/apps/apple-app-store.png'
                      class='img-fluid'
                      alt=''
                    />
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Container End --> */}
      </footer>
      {/* <!-- Footer Bottom --> */}
      <footer className='footer-bottom'>
        {/* <!-- Container Start --> */}
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6 col-12'>
              {/* <!-- Copyright --> */}
              <div className='copyright'>
                <p>
                  Copyright © {new Date().getFullYear()}. Todos direitos
                  reservados por{' '}
                  <span className='text-info'>comercio-moz.co.mz</span>
                </p>
              </div>
            </div>
            <div className='col-sm-6 col-12'>
              {/* <!-- Social Icons --> */}
              <ul className='social-media-icons text-right'>
                <li>
                  <i
                    className='fab fa-lg fa-facebook'
                    onClick={() =>
                      window.open(
                        'https://www.facebook.com/ilan.parso',
                        '_blank'
                      )
                    }
                  ></i>
                </li>
                <li>
                  <i
                    className='fab fa-lg fa-whatsapp'
                    href='https://www.instagram.com/ilan_parsotamo'
                    target='_blank'
                  ></i>
                </li>
                <li>
                  <i
                    className='fab fa-lg fa-instagram'
                    onClick={() =>
                      window.open(
                        'https://www.instagram.com/ilan_parsotamo',
                        '_blank'
                      )
                    }
                  ></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- Container End --> */}
        {/* <!-- To Top --> */}
        <div className='top-to'>
          <a id='top' className='' href='#header'>
            <i className='fas fa-angle-up'></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
