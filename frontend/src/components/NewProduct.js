import React from "react";
import Carousel from "./Carousel";
import Loading from "./Loading";
import Message from "./Message";
import NotFound from "./NotFound";
import { useLocation } from "react-router-dom";

const NewProduct = ({ products, loading, error }) => {
  const location = useLocation();
  const queryString = location.search;
  return (
    <section className="recent-product py-5">
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <NotFound variant="bg-light" size="fa-8x"></NotFound>
        ) : (
          !queryString && (
            <React.Fragment>
              <div className="row">
                <Carousel products={products} />
              </div>
            </React.Fragment>
          )
        )}
      </div>
    </section>
  );
};

export default NewProduct;
