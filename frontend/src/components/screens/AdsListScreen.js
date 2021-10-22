import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchProducts } from '../../actions';
import SearchBar from '../SearchBar';
import Loading from '../Loading';
import Message from '../Message';
// import '../../scss/components/_ads_listview.scss';
import Rating from '../Rating';
import moment from 'moment';
import Paginate from '../Paginate';

const AdsListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, products, error, success, page, pages } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(history.location.search));
    return () => {
      dispatch({ type: 'FETCH_PRODUCTS_RESET' });
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
                  <h4>Resultados da pesquisa</h4>
                </div>
                {loading ? (
                  <Loading />
                ) : products && products.length > 0 ? (
                  products.map((product) => (
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
                                    className='font-weight-bold'
                                  >
                                    {product.name}
                                  </Link>
                                </div>
                                <ul className='list-inline mt-2 mb-3'>
                                  <li className='list-inline-item'>
                                    <Link to={`categoria/`}>
                                      {' '}
                                      <i className='fa fa-folder-open-o'></i>{' '}
                                      {product.category.name}
                                    </Link>
                                  </li>
                                  <li className='list-inline-item'>
                                    <i className='fa fa-calendar'></i>{' '}
                                    {moment(product.createdAt).fromNow()}
                                  </li>
                                </ul>
                                <p className='pr-5'>{product.description}</p>
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

export default AdsListScreen;
