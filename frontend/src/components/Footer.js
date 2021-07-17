import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer_area">
      <div className="container">
        <div className="row footer_inner">
          <div className="col-sm-4 mb-5 mb-sm-0">
            <aside className="f_widget ab_widget">
              <div className="f_title">
                <h3>Acerca de Mim</h3>
              </div>
              <p>
                Eu sou Ilan Parsotamo, sou desenvolvedor de aplicativos webs.
                Este projecto é apenas um demo de ecommerce.
              </p>
              <p>
                Todos Direitos Reservados &copy; por Ilan Parsotamo{" "}
                <i className="fas fa-heart text-danger" aria-hidden="true"></i>
              </p>
            </aside>
          </div>
          <div className="col-6 col-sm-5  mt-5 mt-sm-0 owner">
            <div className="f_title">
              <h3 className="">Desenvolvedor</h3>
              <div className="owner-box-photo">
                <img
                  src="/images/users/Ilan_Parso.jpg"
                  alt=""
                  className="owner-photo"
                />
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-5 mt-sm-0">
            <div className="f_title">
              <h3>Segue-me</h3>
            </div>
            <h3 className="text-light mb-5">Vamos ser sociais</h3>
            <ul className="social-icons">
              <li className="social-icons-item">
                <a
                  target="_blank"
                  to="https://instagram.com/ilan_parsotamo"
                  className="social-icons-link"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="social-icons-item">
                <a
                  target="_blank"
                  to="https://facebook.com/ilan.parso"
                  className="social-icons-link"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
