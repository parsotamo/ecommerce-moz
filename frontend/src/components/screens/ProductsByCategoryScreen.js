import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  fetchProductsCategory,
  fetchSubCategories,
  fetchFilteredProductsCategory,
} from '../../actions';
import Slider from 'rc-slider';

import Loading from '../Loading';
import Message from '../Message';
import Products from '../Products';
import Paginate from '../Paginate';
import Empty from '../Empty';
import SearchBar from '../SearchBar';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsByCategoryScreen = ({ history }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const categoryId = pathname[pathname.length - 1];
  const categoryName = pathname[pathname.length - 2];
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(5000);

  const { loading, productsCategory, error, pages, page } = useSelector(
    (state) => state.productsCategory
  );
  const { loading: loadingCategories, subCategories } = useSelector(
    (state) => state.subCategories
  );

  useEffect(() => {
    if (history.location.search === undefined) {
      dispatch(fetchProductsCategory({ categoryId, categoryName }));
    } else {
      dispatch(
        fetchProductsCategory(
          { categoryId, categoryName },
          history.location.search
        )
      );
    }
    if (subCategories.length === 0) {
      dispatch(fetchSubCategories());
    }
    return () => {
      console.log('Unmounted Categories Products');
      dispatch({ type: 'FETCH_PRODUCTS_CATEGORY_RESET' });
    };
  }, [dispatch, categoryName, history.location.search]);

  const showLocationHandler = (e) => {
    let str = history.location.search.replace(/page=[0-9]+&?/, '');
    if (e.target.value === 'reset') {
      const val = str
        .replace(/city=[- a-zA-Z]+&?/, '')
        .replace(/&$/, '')
        .replace(/&&/, '&');
      history.push(`/ads/categoria/${categoryName}/${categoryId}${val}`);
    } else if (str && str.match(/city/)) {
      const val = str
        .replace(/city=[- a-zA-Z]+&?/, `city=${e.target.value}&`)
        .replace(/&$/, '')
        .replace(/&&/, '&');
      history.push(`/ads/categoria/${categoryName}/${categoryId}${val}`);
    } else if (str) {
      history.push(
        `/ads/categoria/${categoryName}/${categoryId}${str}&city=${e.target.value}`
      );
    } else {
      history.push(
        `/ads/categoria/${categoryName}/${categoryId}?city=${e.target.value}`
      );
    }
    dispatch(
      fetchFilteredProductsCategory(
        { categoryId, categoryName },
        history.location.search
      )
    );
  };

  const showByHandler = (e) => {
    let str = history.location.search.replace(/page=[0-9]+&?/, '');
    if (e.target.value === 'reset') {
      const val = str
        .replace(/sort=[- a-zA-Z]+&?/, '')
        .replace(/&$/, '')
        .replace(/&&/, '&');
      history.push(`/ads/categoria/${categoryName}/${categoryId}${val}`);
    } else if (str && str.match(/sort/)) {
      const val = str
        .replace(/sort=[- a-zA-Z]+&?/, `sort=${e.target.value}&`)
        .replace(/&$/, '')
        .replace(/&&/, '&');
      history.push(`/ads/categoria/${categoryName}/${categoryId}${val}`);
    } else if (str) {
      history.push(
        `/ads/categoria/${categoryName}/${categoryId}${str}&sort=${e.target.value}`
      );
    } else {
      history.push(
        `/ads/categoria/${categoryName}/${categoryId}?sort=${e.target.value}`
      );
    }
    dispatch(
      fetchFilteredProductsCategory(
        { categoryId, categoryName },
        history.location.search
      )
    );
  };

  const productConditionHandler = (e) => {
    let str = history.location.search.replace(/page=[0-9]+&?/, '');
    if (e.target.value === 'reset') {
      const val = str
        .replace(/state=[- a-zA-Z]+&?/, '')
        .replace(/&$/, '')
        .replace(/&&/, '&');
      history.push(`/ads/categoria/${categoryName}/${categoryId}${val}`);
    } else if (str && str.match(/state/)) {
      let val = str
        .replace(/state=[- a-zA-Z]+/, `state=${e.target.value}&`)
        .replace(/&$/, '')
        .replace(/&&/, '&');

      history.push(`/ads/categoria/${categoryName}/${categoryId}${val}`);
    } else if (str) {
      history.push(
        `/ads/categoria/${categoryName}/${categoryId}${str}&state=${e.target.value}`
      );
    } else {
      history.push(
        `/ads/categoria/${categoryName}/${categoryId}?state=${e.target.value}`
      );
    }

    dispatch(
      fetchFilteredProductsCategory(
        { categoryId, categoryName },
        history.location.search
      )
    );
  };

  const filterPriceHandler = (e, minPrice, maxPrice, reset) => {
    let str = history.location.search.replace(/page=[0-9]+&?/, '');
    if (reset) {
      setPriceMin(0);
      setPriceMax(5000);
      const val = str
        .replace(/price\[gte\]=[0-9]+&price\[lte\]=[0-9]+&?/, '')
        .replace(/&$/, '')
        .replace(/&&/, '&');
      history.push(`/ads/categoria/${categoryName}/${categoryId}${val}`);
    } else if (str && str.match(/price\[/)) {
      let val = str
        .replace(
          /price\[gte\]=[0-9]+&price\[lte\]=[0-9]+&?/,
          `price[gte]=${minPrice}&price[lte]=${maxPrice}&`
        )
        .replace(/&$/, '')
        .replace(/&&/, '&');
      history.push(`/ads/categoria/${categoryName}/${categoryId}${val}`);
    } else if (str) {
      history.push(
        `/ads/categoria/${categoryName}/${categoryId}${str}&price[gte]=${minPrice}&price[lte]=${maxPrice}`
      );
    } else {
      history.push(
        `/ads/categoria/${categoryName}/${categoryId}?price[gte]=${minPrice}&price[lte]=${maxPrice}`
      );
    }
    dispatch(
      fetchFilteredProductsCategory(
        { categoryId, categoryName },
        history.location.search
      )
    );
  };

  return (
    <>
      <SearchBar />
      <section className='section-ads-category'>
        <div className='container'>
          <Breadcrumb>
            <Breadcrumb.Item href='/'>Início</Breadcrumb.Item>
            <Breadcrumb.Item active>{categoryName}</Breadcrumb.Item>
          </Breadcrumb>
          <div className='row justify-content-center'>
            <div className='col-md-9'>
              <div className='category-search-filter mb-3'>
                <div className='row'>
                  <div className='col-6 d-flex align-items-center'>
                    <h4>Resultados cetgoria "{categoryName}"</h4>
                  </div>
                  <div className='col-6'>
                    <div className='view'>
                      <strong>Tipo de Vista</strong>
                      <ul className='list-inline view-switcher'>
                        <li className='list-inline-item'>
                          <i className='fas fa-th-large text-info'></i>
                        </li>
                        <li className='list-inline-item'>
                          <i className='fas fa-list'></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='product-grid-list'>
                <div className='row mt-30'>
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message children={error.message} variant='danger' />
                  ) : productsCategory.length === 0 ? (
                    <Message
                      variant='info'
                      children='Nenhum resultado encontrado'
                    />
                  ) : (
                    <Products
                      loading={loading}
                      products={productsCategory}
                      error={error}
                      pages={pages}
                      page={page}
                      // keyword={keyword}
                      // category={category}
                      // avgRating={avgRating}
                      // price={price}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-3 mt-5 mt-md-0 d-none d-sm-block'>
              <div className='category-sidebar'>
                <div className='row'>
                  <div className='col-6 col-md-12'>
                    <div className='widget category-list'>
                      <h4 className='widget-header'>Todas Categorias</h4>
                      {loadingCategories ? (
                        <Loading />
                      ) : (
                        [
                          ...subCategories.map(
                            (subCategory) => subCategory.category
                          ),
                        ]
                          .reduce((acc, category) => {
                            const x = acc.find(
                              (item) => item.name === category.name
                            );
                            if (!x) {
                              return acc.concat([category]);
                            } else {
                              return acc;
                            }
                          }, [])
                          .sort((a, b) => {
                            if (a.name < b.name) {
                              return -1;
                            } else if (a.name > b.name) {
                              return 1;
                            } else {
                              return 0;
                            }
                          })
                          .map((category, ind) => (
                            <ul className='p-0' key={ind + 1}>
                              <NavDropdown
                                className='category-list'
                                title={category.name}
                              >
                                {subCategories
                                  .filter(
                                    (subCategory) =>
                                      subCategory.category.name ===
                                      category.name
                                  )
                                  .sort((a, b) => {
                                    if (a.name < b.name) {
                                      return -1;
                                    } else if (a.name > b.name) {
                                      return 1;
                                    } else {
                                      return 0;
                                    }
                                  })
                                  .map((subCategory) => (
                                    <LinkContainer
                                      className='category-list-item'
                                      key={subCategory._id}
                                      to={`/ads/categoria/${subCategory.name}/${subCategory._id}`}
                                    >
                                      <NavDropdown.Item>
                                        {subCategory.name}
                                      </NavDropdown.Item>
                                    </LinkContainer>
                                  ))}
                              </NavDropdown>
                            </ul>
                          ))
                      )}
                    </div>
                  </div>
                  <div className='col-6 col-md-12'>
                    <div className='widget filter'>
                      <h4 className='widget-header'>Localização</h4>
                      <select
                        className='form-select'
                        onChange={showLocationHandler}
                      >
                        <option value='reset'>Todos</option>
                        <option value='Maputo'>Maputo</option>
                        <option value='Matola'>Matola</option>
                        <option value='Nampula'>Nampula</option>
                      </select>
                    </div>
                    <div className='widget filter'>
                      <h4 className='widget-header'>Mostrar por</h4>
                      <select className='form-select' onChange={showByHandler}>
                        <option value='reset'>Todos</option>
                        <option value='-avgRating'>
                          Melhores Classificados
                        </option>
                        <option value='price'>Preço mais Baixo</option>
                        <option value='-price'>Preço mais alto</option>
                      </select>
                    </div>
                  </div>

                  <div className='col-6 col-md-12'>
                    <div className='widget px-4'>
                      <h4 className='widget-header'>Filtrar Preço</h4>
                      <Range
                        defaultValue={[0, 5000]}
                        min={0}
                        max={1000000}
                        step={100}
                        onChange={(val) => {
                          setPriceMin(val[0]);
                          setPriceMax([val[1]]);
                        }}
                      />
                      <span className='price-range d-block mt-3'>
                        {new Intl.NumberFormat('pt-PT', {
                          style: 'currency',
                          currency: 'MZN',
                        }).format(priceMin)}{' '}
                        -{' '}
                        {new Intl.NumberFormat('pt-PT', {
                          style: 'currency',
                          currency: 'MZN',
                        }).format(priceMax)}
                      </span>
                      <span
                        className='badge bg-danger d-inline-block rounded cursor-pointer price-range-btn'
                        onClick={(e) =>
                          filterPriceHandler(e, priceMin, priceMax, false)
                        }
                      >
                        Filtrar
                      </span>
                      <span
                        className='badge bg-secondary d-inline-block rounded cursor-pointer price-range-btn'
                        onClick={(e) =>
                          filterPriceHandler(e, priceMin, priceMax, true)
                        }
                      >
                        Desabilitar
                      </span>
                    </div>
                  </div>
                  <div className='col-6 col-md-12'>
                    <div className='widget product-shorting'>
                      <h4 className='widget-header'>Por Condição</h4>
                      <div className='form-check'>
                        <label className='form-check-label'>
                          <input
                            name='state'
                            className='form-check-input'
                            type='radio'
                            value='reset'
                            onChange={productConditionHandler}
                          />
                          Todos
                        </label>
                      </div>
                      <div className='form-check'>
                        <label className='form-check-label'>
                          <input
                            name='state'
                            className='form-check-input'
                            type='radio'
                            value='novo'
                            onChange={productConditionHandler}
                          />
                          Novo
                        </label>
                      </div>
                      <div className='form-check'>
                        <label className='form-check-label'>
                          <input
                            name='state'
                            className='form-check-input'
                            type='radio'
                            value='usado'
                            onChange={productConditionHandler}
                          />
                          Usado
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <Paginate page={page} pages={pages} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsByCategoryScreen;
