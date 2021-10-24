import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchPopularProducts } from '../../actions';
import SearchBar from '../SearchBar';
import Loading from '../Loading';
import Message from '../Message';
// import '../../scss/components/_ads_listview.scss';
import Rating from '../Rating';
import moment from 'moment';
import Paginate from '../Paginate';

const AdsPopularScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, popularProducts, error, success, page, pages } = useSelector(
    (state) => state.popularProducts
  );

  useEffect(() => {
    dispatch(fetchPopularProducts(history.location.search));
    return () => {
      dispatch({ type: 'FETCH_POPULAR_PRODUCTS_RESET' });
    };
  }, [history.location.search]);
  return (
    <>
      <SearchBar />
      <div className='container-fluid mt-5'>
        <div className='row'>
          <div className='col-12 col-sm-11 col-md-10  mx-auto'>
            <div className='category-search-filter mb-3'>
              <div className='row'>
                <div className='col-6 d-flex align-items-center'>
                  <h4>Anúncios Populares</h4>
                </div>
                {loading ? (
                  <Loading />
                ) : popularProducts && popularProducts.length > 0 ? (
                  popularProducts.map((product) => (
                    <div key={product._id} className='ad-listing-list mb-3'>
                      <div className='row p-lg-3 p-sm-5 p-4'>
                        <div className='col-4 align-self-center'>
                          <LinkContainer
                            to={`/product/${product.slug}/${product._id}`}
                          >
                            <img
                              src={product.image}
                              className='img-fluid'
                              alt=''
                              width='150'
                              height='150'
                            />
                          </LinkContainer>
                        </div>
                        <div className='col-8'>
                          <div className='row justify-content-center align-items-center'>
                            <div className='col-sm-6'>
                              <div className='ad-listing-content'>
                                <div>
                                  <Link
                                    to={`/product/${product.slug}/${product._id}`}
                                    className='title'
                                  >
                                    {product.name}
                                  </Link>
                                </div>
                                <ul className='list-inline mt-2 mb-3'>
                                  <li className='list-inline-item'>
                                    <Link
                                      to={`/ads/categoria/${product.category.name}/${product.category._id}`}
                                      className='category-cta'
                                    >
                                      {' '}
                                      <i className='fa fa-folder-open-o'></i>{' '}
                                      {product.category.name}
                                    </Link>
                                  </li>
                                  <li className='list-inline-item'>
                                    <i className='fa fa-sm fa-calendar'></i>{' '}
                                    {moment(product.createdAt).fromNow()}
                                  </li>
                                </ul>
                                <ul className='ads-list-group'>
                                  <li className='ads-list-group-item mb-3'>
                                    Marca:
                                    {product.brand}
                                  </li>
                                  <li className='ads-list-group-item mb-3'>
                                    <i className='fa fa-sm fa-map-marker-alt'></i>{' '}
                                    {(product.address, product.city)}
                                  </li>
                                  <li className='ads-list-group-item mb-3'>
                                    Estado:
                                    {product.state}
                                  </li>
                                  <li className='ads-list-group-item mb-3'>
                                    Visualizações:
                                    {product.views}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className='col-sm-6'>
                              <Rating
                                star={product.review}
                                review={product.numReviews}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <Message
                    variant='info'
                    children='Nenhum resultado encontrado'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Paginate page={page} pages={pages} />
      </div>
    </>
  );
};

export default AdsPopularScreen;
