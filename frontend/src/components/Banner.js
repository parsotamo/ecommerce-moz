import { useLocation } from "react-router-dom";

const Banner = () => {
  const location = useLocation();
  const queryString = location.search;

  return (
    !queryString && (
      <div className="header-parent">
        <header className="header">
          <div className="text-light text-md-end text-center banner">
            {/* <h1 className="fw-lighter banner-heading">
            <span>Bem Vindo ao portal de vendas </span>
            <span className="text-uppercase banner-heading--photo">
              Comércio MOZ
            </span>
          </h1> */}
            {/* <p className="lead banner-text">
            Aqui você enconta produtos de vários tipos e qualidades. Aproveita
            os preços acessíveis e compre no conforto da sua casa.
          </p> */}
          </div>
        </header>
      </div>
    )
  );
};

export default Banner;
