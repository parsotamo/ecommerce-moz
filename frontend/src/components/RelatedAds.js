import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-multi-carousel';
import { LinkContainer } from 'react-router-bootstrap';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import moment from 'moment';
import { fetchRelatedProducts } from '../actions';

import Rating from './Rating';
import Loading from './Loading';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 2001 },
    items: 6,
    slidesToSlide: 6,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1201 },
    items: 6,
    slidesToSlide: 6,
  },
  tablet: {
    breakpoint: { max: 1200, min: 901 },
    items: 5,
    slidesToSlide: 5,
  },
  midTablet: {
    breakpoint: { max: 701, min: 900 },
    items: 4,
    slidesToSlide: 4,
  },
  miniTablet: {
    breakpoint: { max: 700, min: 465 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 291 },
    items: 2,
    slidesToSlide: 2,
  },
  miniMobile: {
    breakpoint: { max: 290, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const RelatedAds = ({ productId, categoryId, categoryName }) => {
  const dispatch = useDispatch();
  const {
    loading: loadingRelatedProducts,
    relatedProducts,
    success: successRelatedProducts,
    error: errorRelatedProducts,
  } = useSelector((state) => state.relatedProducts);
  useEffect(() => {
    dispatch(fetchRelatedProducts({ productId, categoryId, categoryName }));
  }, []);

  return loadingRelatedProducts ? (
    <Loading />
  ) : successRelatedProducts && relatedProducts.length > 0 ? (
    <section className='mt-5'>
      <div className='container'>
        <div className=''>
          <div className='row'>
            <h4 className='mb-4'>Anúncios Relacionados</h4>
            <Slider
              containerClass=''
              itemClass=''
              responsive={responsive}
              swipeable={true}
              draggable={true}
              infinite={false}
              autoPlay={false}
              // autoPlaySpeed={4000}
              ssr={true}
              showDots={false}
              partialVisible={false}
            >
              {relatedProducts.map((product) => (
                <div key={product._id} className='card product-listing me-3'>
                  <LinkContainer to={`/product/${product.slug}/${product._id}`}>
                    <div className='img-wrapper'>
                      <img
                        className='product-img img-fluid'
                        src={product.image}
                        alt='foto principal de produto'
                      />
                    </div>
                  </LinkContainer>

                  <div className='card-body pt-1'>
                    <span className='product-price'>
                      {new Intl.NumberFormat('pt-PT', {
                        style: 'currency',
                        currency: 'MZN',
                      }).format(product.price)}
                    </span>
                    <div className='row pt-5'>
                      <LinkContainer
                        to={`/product/${product.slug}/${product._id}`}
                      >
                        <span className='product-name text-capitalize'>
                          {product.name.length > 20
                            ? `${product.name.substring(0, 30)}...`
                            : product.name}
                        </span>
                      </LinkContainer>
                    </div>
                    <div className='d-flex justify-content-between py-2 text-secondary'>
                      <div className=''>
                        <Rating
                          star={product.avgRating}
                          reviews={product.numReviews}
                        />
                      </div>
                      <div className=''>
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
                      <div className='col-6 px-0'>
                        <i className='far fa-sm fa-calendar-alt text-danger'></i>{' '}
                        {moment(product.createdAt).fromNow()}
                      </div>
                      <div className='col-12 py-2'>
                        <i className='fas fa-sm fa-map-marker-alt text-danger'></i>{' '}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-10'>
                        <i className='fas fa-sm fa-eye text-danger'></i>{' '}
                        {product.views}
                      </div>
                      <div className='col-2'>
                        <OverlayTrigger
                          key={'top'}
                          placement={'top'}
                          overlay={<Tooltip id='tooltip-top'>Curtir</Tooltip>}
                        >
                          <Button id='btn-like'>
                            <i className='far fa-sm fa-heart text-danger icon-like'></i>
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default RelatedAds;
