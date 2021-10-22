import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  fetchPopularProducts,
  fetchHotProducts,
  fetchNewProducts,
  getReviewsUsers,
} from '../../actions';
import Products from '../Products';
import UserReviews from '../UserReviews';
import Banner from '../Banner';
import Category from '../Category';
import Meta from '../Meta';
import Loading from '../Loading';
import '../../scss/components/_products.scss';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('hot');

  const { loading, popularProducts, success, error, page, pages } = useSelector(
    (state) => state.popularProducts
  );
  const {
    loading: loadingHot,
    hotProducts,
    success: successHot,
    error: errorHot,
    page: pageHot,
    pages: pagesHot,
  } = useSelector((state) => state.hotProducts);

  const {
    loading: loadingNew,
    newProducts,
    success: successNew,
    error: errorNew,
    page: pageNew,
    pages: pagesNew,
  } = useSelector((state) => state.newProducts);

  const {
    loading: loadingReviews,
    reviewsUsers,
    success: successReviews,
  } = useSelector((state) => state.reviewsUsers);

  useEffect(() => {
    if (hotProducts.length === 0) {
      dispatch(fetchHotProducts());
    }
    if (!successReviews) {
      dispatch(getReviewsUsers());
    }
    if (key === 'popular') {
      if (popularProducts.length === 0) {
        dispatch(fetchPopularProducts());
      }
    } else if (key === 'recent') {
      if (newProducts.length === 0) {
        dispatch(fetchNewProducts());
      }
    }
  }, [dispatch, key]);

  return (
    <React.Fragment>
      <Meta />
      <Banner />
      <Category />
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-12'>
            <Tabs
              activeKey={key}
              onSelect={(k) => {
                setKey(k);
                if (key === 'popular' && popularProducts.length === 0) {
                  dispatch(fetchPopularProducts());
                } else if (key === 'recent' && !newProducts.length === 0) {
                  dispatch(fetchNewProducts());
                }
              }}
              className='products-tab mb-3'
              variant='pills'
            >
              <Tab
                eventKey='hot'
                title={
                  <span className='tab-title tab-title--dark'>
                    <i className='fas fa-fire text-danger'></i>&nbsp;Quentes
                  </span>
                }
              >
                {loadingHot ? (
                  <Loading />
                ) : (
                  successHot && (
                    <Products
                      loading={loadingHot}
                      products={hotProducts}
                      error={errorHot}
                      pages={pagesHot}
                      page={pageHot}
                    />
                  )
                )}
              </Tab>

              <Tab
                eventKey='popular'
                title={
                  <span className='tab-title tab-title--dark'>
                    <i className='fas fa-eye text-danger'></i>&nbsp;Populares
                  </span>
                }
              >
                {loading ? (
                  <Loading />
                ) : (
                  success && (
                    <Products
                      loading={loading}
                      products={popularProducts}
                      error={error}
                      pages={pages}
                      page={page}
                    />
                  )
                )}
              </Tab>
              <Tab
                eventKey='recent'
                title={
                  <span className='tab-title tab-title--dark'>
                    <i className='fas fa-shipping-fast text-danger'></i>
                    &nbsp;Recentes
                  </span>
                }
              >
                {loadingNew ? (
                  <Loading />
                ) : (
                  successNew && (
                    <Products
                      loading={loadingNew}
                      products={newProducts}
                      error={errorNew}
                      pages={pagesNew}
                      page={pageNew}
                    />
                  )
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className='d-flex justify-content-center mt-5'>
          <Link
            to={`${
              key === 'hot'
                ? '/ads/quente'
                : key === 'popular'
                ? '/ads/popular'
                : key === 'recent' && '/ads/recente'
            }`}
            className='btn-gradient btn-gradient--primary btn-gradient--sm'
          >
            Mostrar Todos
          </Link>
        </div>
      </div>

      {successReviews && (
        <UserReviews reviews={reviewsUsers} loading={loadingReviews} />
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
