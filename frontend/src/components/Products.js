import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Rating from './Rating';
import Loading from './Loading';
import moment from 'moment';

const Products = ({ loading, products, error }) => {
  return (
    <div className='products-wrapper mx-auto'>
      {loading && <Loading />}
      {!error &&
        products &&
        products.map((product) => (
          <div key={product._id} className='card product-listing'>
            {/* <div className='card-header border-0'> */}
            <LinkContainer to={`/product/${product.slug}/${product._id}`}>
              <div className='img-wrapper'>
                <img
                  className='product-img img-fluid'
                  src={product.image}
                  alt='foto principal de produto'
                />
              </div>
            </LinkContainer>
            {/* </div> */}

            <div className='card-body pt-1'>
              <span className='product-price'>
                {new Intl.NumberFormat('pt-PT', {
                  style: 'currency',
                  currency: 'MZN',
                }).format(product.price)}
              </span>
              <div className='row'>
                <LinkContainer to={`/product/${product.slug}/${product._id}`}>
                  <span className='product-name text-capitalize'>
                    {product.name.length > 20
                      ? `${product.name.substring(0, 30)}...`
                      : product.name}
                  </span>
                </LinkContainer>
              </div>
              <div className='row justify-content-between py-2 text-secondary'>
                <div className='col-5'>
                  <Rating
                    star={product.avgRating}
                    reviews={product.numReviews}
                  />
                </div>
                <div className='col-7 text-end'>
                  <i className='fas fa-sm fa-building text-danger'></i>{' '}
                  <span>
                    {product.brand.length > 10
                      ? `${product.brand.substring(0, 10)}...`
                      : product.brand}
                  </span>
                </div>
              </div>

              <div className='row py-2 text-secondary'>
                <div className='col-6'>
                  <i className='fas fa-sm fa-th-large text-danger'></i>{' '}
                  {product.category.name}
                </div>
                <div className='col-6 text-end'>
                  <i className='far fa-sm fa-calendar-alt text-danger'></i>{' '}
                  {moment(product.createdAt).fromNow()}
                </div>
                <div className='col-12 py-2'>
                  <i className='fas fa-sm fa-map-marker-alt text-danger'></i>
                  &nbsp;
                  {product.address}, {product.city}
                </div>
              </div>
              <div className='row'>
                <div className='col-7'>
                  <i className='fas fa-sm fa-eye text-danger'></i>{' '}
                  {product.views}
                </div>
                <div className='col-5 text-end'>
                  <i className='fas fa-sm fa-check-square text-danger'></i>
                  &nbsp;
                  <span> {product.state}</span>
                  {/* <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={<Tooltip id='tooltip-top'>Curtir</Tooltip>}
                  >
                    <Button id='btn-like'>
                      <i className='far fa-sm fa-heart text-danger icon-like'></i>
                    </Button>
                  </OverlayTrigger> */}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
