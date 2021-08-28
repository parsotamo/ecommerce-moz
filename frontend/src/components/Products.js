import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "./Rating";
import Loading from "./Loading";
import Paginate from "./Paginate";
import { fetchProducts } from "../actions";

const Products = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  const queryArr = location.search.split("&");
  let currentPage, keyword, category, price, avgRating;

  queryArr.forEach((el) => {
    if (el.split("page=")[1]) {
      currentPage = el.split("page=")[1];
    } else if (el.split("keyword=")[1]) {
      keyword = el.split("keyword=")[1];
    } else if (el.split("category=")[1]) {
      category = el.split("category=")[1];
    } else if (el.split("price=")[1]) {
      price = el.split("price=")[1];
    } else if (el.split("avgRating=")[1]) {
      avgRating = el.split("avgRating=")[1];
    }
  });

  const { loading, products, error, page, pages } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchProducts(currentPage, keyword, category, price, avgRating));
  }, [dispatch, currentPage, keyword, category, price, avgRating]);
  return (
    <div className='container'>
      <div className='row'>
        {loading && <Loading />}
        {!error && (
          <React.Fragment>
            {products.map((product) => (
              <div key={product._id} className='col-md-6 col-lg-4 mb-4'>
                <div className='card listing-preview'>
                  <LinkContainer to={`/product/${product._id}`}>
                    <img
                      className='card-img-top'
                      src={product.image}
                      alt='foto principal de produto'
                    />
                  </LinkContainer>
                  <h2>
                    <span className='badge badge-secondary text-dark'>
                      {product.price} MZN
                    </span>
                  </h2>
                  <div className='card-body fs-4'>
                    <div className='listing-heading text-center'>
                      <LinkContainer to={`/product/${product._id}`}>
                        <h4 className='text-primary'>{product.name}</h4>
                      </LinkContainer>
                      <Rating
                        star={product.avgRating}
                        reviews={product.numReviews}
                      />
                    </div>
                    <hr />
                    <div className='row py-2 text-secondary'>
                      <div className='col-6'>
                        <i className='fas fa-th-large'></i> {product.category}
                      </div>
                      <div className='col-6'>
                        <i className='fas fa-building'></i> {product.brand}
                      </div>
                    </div>
                    <div className='row py-2 text-secondary'>
                      <div className='col-6'>
                        <i className='fas fa-warehouse'></i>{" "}
                        {product.countInStock}
                      </div>
                      <div className='col-6'>
                        <i className='fas fa-money-bill'></i> {product.price}{" "}
                        MZN
                      </div>
                    </div>
                    <hr />
                    <div className='row py-2 text-secondary'>
                      <div className='col-12'>
                        <i className='fas fa-comments'></i> {product.numReviews}
                      </div>
                    </div>
                    <div className='row text-secondary pb-2'>
                      <div className='col-6'>
                        <i className='fas fa-clock'></i>{" "}
                        {product.createdAt.substring(0, 10)}
                      </div>
                    </div>
                    <hr />
                    <div className='d-grid'>
                      <Link
                        to={`product/${product._id}`}
                        className='btn btn-dark fs-4 py-3'
                      >
                        Mais detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword}
              category={category}
              avgRating={avgRating}
              price={price}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Products;
