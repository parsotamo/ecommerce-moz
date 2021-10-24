import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import {
  fetchProduct,
  getProductReviews,
  createProductReview,
} from '../../actions';
import Rating from '../Rating';
import Loading from '../Loading';
import Message from '../Message';
import history from '../../history';
import Meta from '../Meta';

import { Picker } from 'emoji-mart';
import { SRLWrapper } from 'simple-react-lightbox';
import parse from 'html-react-parser';
import { Tabs, Tab } from 'react-bootstrap';
import 'emoji-mart/css/emoji-mart.css';
import axios from 'axios';
import RelatedAds from '../RelatedAds';
import SearchBar from '../SearchBar';

const ProductDetail = ({ match }) => {
  const dispatch = useDispatch();

  const [key, setKey] = useState('details');
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [emojiPickerState, setEmojiPickerState] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showWhatsAppNumber, setShowWhatsAppNumber] = useState(false);

  const { product, loading, error, success } = useSelector(
    (state) => state.product
  );

  const {
    loading: loadingReviews,
    productReviews,
    success: successProductReviews,
  } = useSelector((state) => state.productReviews);

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingCreateReview,
    success: successCreateReview,
    error: errorCreateReview,
  } = useSelector((state) => state.productCreateReview);

  useEffect(() => {
    if (successCreateReview) {
      setRating(0);
      setComment('');
      dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' });
    }
    dispatch(fetchProduct(match.params.id));

    return () => {
      console.log('Unmount Product Detail');
      dispatch({ type: 'FETCH_PRODUCT_RESET' });
      dispatch({ type: 'PRODUCT_REVIEWS_RESET' });
      dispatch({ type: 'FETCH_RELATED_PRODUCTS_RESET' });
    };
  }, [match.params.id, successCreateReview]);

  useEffect(() => {
    (async (id) => {
      try {
        await axios.get(`/api/products/${id}/incrementViews`);
      } catch (error) {
        console.log(error);
      }
    })(match.params.id);
  }, [match.params.id]);

  let emojiPicker;

  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title='Escolha emoji'
        emoji='point_up'
        onSelect={(emoji) => setComment(comment + emoji.native)}
      />
    );
  }

  function triggerPicker(e) {
    e.preventDefault();
    setEmojiPickerState(!emojiPickerState);
  }
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <SearchBar />
      <section className='product-detail my-5 mx-lg-5'>
        {success && <Meta title={product.name} />}
        <div
          className='container'
          onClick={(e) => {
            if (emojiPickerState) {
              setEmojiPickerState(!emojiPickerState);
            }
          }}
        >
          <Breadcrumb>
            <Breadcrumb.Item href='/'>Início</Breadcrumb.Item>
            <Breadcrumb.Item active>{product && product.name}</Breadcrumb.Item>
          </Breadcrumb>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant='danger' children={error} />
          ) : (
            product && (
              <>
                <div className='row justify-content-sm-between justify-content-center mt-5'>
                  <div className='col-12'>
                    <h2 className='text-capitalize fw-light'>{product.name}</h2>
                    <div className='d-flex mt-3 pb-5'>
                      <div className='box-user me-5'>
                        <i className='far fa-user me-2'></i>
                        <span className='fw-lighter'>Publicado por</span>&nbsp;
                        <span className='fw-bolder'>
                          {product?.user?.name.split(' ')[0]}
                        </span>
                      </div>
                      <div className='box-category me-5'>
                        <i className='far fa-folder me-2'></i>
                        <span className='fw-lighter'>Categoria</span>&nbsp;
                        <span className='fw-bolder'>
                          {product?.category?.name}
                        </span>
                      </div>
                      <div className='box-location me-2'>
                        <i className='fas fa-map-marker-alt me-2'></i>
                        <span className='fw-lighter'>Localização</span>&nbsp;
                        <span className='fw-bolder'>{product?.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-6 col-md-7 col-12 mb-5 mb-sm-0'>
                    <SRLWrapper>
                      <a href={product.image}>
                        <img
                          className='detail-product-image'
                          src={product.image}
                          alt='Imagem Principal'
                        />
                      </a>

                      <div className='d-flex mt-5'>
                        {product.images &&
                          product.images.filter(Boolean).map(
                            (prodImg, i) =>
                              prodImg && (
                                <div
                                  className='product-detail-thumb-wrapper'
                                  key={i + 1}
                                >
                                  <a href={prodImg}>
                                    <img
                                      className='img-fluid img-thumbnail'
                                      src={prodImg}
                                      alt='Images'
                                    />
                                  </a>
                                </div>
                              )
                          )}
                      </div>
                    </SRLWrapper>
                    <div className='row mt-5'>
                      <Tabs
                        activeKey={key}
                        onSelect={(k) => {
                          setKey(k);
                          if (k === 'reviews') {
                            if (!successProductReviews) {
                              dispatch(getProductReviews(match.params.id));
                            }
                          }
                        }}
                        className='products-tab mb-3'
                      >
                        <Tab
                          eventKey='details'
                          title={
                            <span className='tab-title'>
                              <i className='fas fa-clipboard-list text-danger'></i>
                              &nbsp;Detalhes
                            </span>
                          }
                        >
                          <table className='table'>
                            <tbody>
                              <tr>
                                <td>Marca</td>
                                <td>{product.brand}</td>
                              </tr>
                              <tr>
                                <td>Condições</td>
                                <td>{product.state}</td>
                              </tr>
                              <tr>
                                <td>Negociável</td>
                                <td>{product.negotiable ? 'sim' : 'não'}</td>
                              </tr>
                              <tr>
                                <td>Quantidade diponível</td>
                                <td>{product.countInStock}</td>
                              </tr>
                              <tr>
                                <td>Localização</td>
                                <td>
                                  {product.province} {product.address}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Tab>

                        <Tab
                          eventKey='description'
                          title={
                            <span className='tab-title'>
                              <i className='fas fa-info-circle text-danger'></i>
                              &nbsp;Descrição
                            </span>
                          }
                        >
                          <div className='row'>
                            <div className='col'>
                              {product.description &&
                                parse(product.description)}
                            </div>
                          </div>
                        </Tab>
                        <Tab
                          eventKey='reviews'
                          title={
                            <span className='tab-title'>
                              <i className='fas fa-comments text-danger'></i>
                              &nbsp;Comentários
                            </span>
                          }
                        >
                          <div className='row mt-5'>
                            <div className='col-12'>
                              <ul className='list-group list-group-flush fs-3'>
                                {loadingReviews ? (
                                  <Loading />
                                ) : productReviews.length === 0 ? (
                                  <Message variant='info'>
                                    Nenhum comentário feito
                                  </Message>
                                ) : (
                                  <>
                                    <h4 className='mb-3'>Comentários</h4>
                                    {productReviews.map((review, ind) => (
                                      <div className='row mb-4' key={ind}>
                                        <div className='col-2'>
                                          <img
                                            src={review.user.photo}
                                            className='img-fluid rounded-circle'
                                            alt='Foto de Usuario que comenta'
                                          />
                                        </div>
                                        <div className='col-10'>
                                          <li className='list-group-item'>
                                            {review.user.name}
                                          </li>
                                          <li className='list-group-item'>
                                            <Rating star={review.rating} />
                                            <div className='ms-2 mt-2'>
                                              {review.createdAt.substring(
                                                0,
                                                10
                                              )}
                                            </div>
                                            <div className='mt-3'>
                                              {review.comment}
                                            </div>
                                          </li>
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                )}
                                <li className='list-group-item mt-5'>
                                  <h3 className='text-capitalize mb-3'>
                                    Comentar
                                  </h3>
                                  {loadingCreateReview && <Loading />}
                                  {errorCreateReview && (
                                    <Message variant='danger'>
                                      {errorCreateReview}
                                    </Message>
                                  )}
                                  {successCreateReview && (
                                    <Message variant='success'>
                                      Comentário feito com sucesso
                                    </Message>
                                  )}
                                  {userInfo ? (
                                    <form onSubmit={submitReviewHandler}>
                                      <div className='form-group mb-4'>
                                        <select
                                          className='form-select fs-3'
                                          value={rating}
                                          onChange={(e) => {
                                            setRating(e.target.value);
                                          }}
                                        >
                                          <option value='0'>
                                            Escolha classificação
                                          </option>
                                          <option value='1'>1 - Ruim</option>
                                          <option value='2'>2 - OK</option>
                                          <option value='3'>3 - Bom</option>
                                          <option value='4'>
                                            4 - Muito Bom
                                          </option>
                                          <option value='5'>
                                            5 - Excelente
                                          </option>
                                        </select>
                                      </div>

                                      <div className='form-group comment-area mb-3'>
                                        <textarea
                                          className='form-control fs-3'
                                          rows='5'
                                          placeholder='comentar...'
                                          value={comment}
                                          onChange={(e) =>
                                            setComment(e.target.value)
                                          }
                                        ></textarea>
                                        {emojiPicker}
                                        <span
                                          className='select-emoji'
                                          onClick={triggerPicker}
                                        >
                                          <i className='far fa-smile fa-2x text-warning'></i>
                                        </span>
                                      </div>

                                      <div className='d-grid'>
                                        <button
                                          type='submit'
                                          className='btn-gradient btn-gradient--primary btn-gradient--sm'
                                          disabled={loadingCreateReview}
                                        >
                                          Comentar
                                        </button>
                                      </div>
                                    </form>
                                  ) : (
                                    <p>
                                      Você precisa estar autenticado para
                                      comentar.{' '}
                                      <Link to='/login'>Entre agora</Link>
                                    </p>
                                  )}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>

                  <div className='col-sm-6 col-md-5 col-lg-4 col-12'>
                    <div className='card-contact fs-3'>
                      <ul className='card-contact-list'>
                        <li className='card-contact-list-item'>
                          <figure className='wrapper-photo'>
                            <img
                              src={product.user.photo}
                              alt='Anuciante'
                              className='product-user-photo'
                              width='110'
                              height='110'
                              onError={(e) =>
                                (e.target.src =
                                  'https://comercio-moz.s3.us-east-2.amazonaws.com/default/default.jpg')
                              }
                            />
                            <figcaption className='product-user-name'>
                              {product.user.name}
                            </figcaption>
                          </figure>
                        </li>
                        <li className='card-contact-list-item'>
                          <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center'>
                              <i className='fas fa-phone-square-alt fa-2x text-primary me-2'></i>{' '}
                              {showPhoneNumber ? (
                                <span>{product.user.phoneNumber}</span>
                              ) : (
                                <span>XX-XX-XX-XXX</span>
                              )}
                            </div>
                            <button
                              disabled={showPhoneNumber ? true : false}
                              className='btn btn-outline-primary'
                              onClick={async () => {
                                setShowPhoneNumber(true);
                                try {
                                  await axios.get(
                                    `/api/products/${product._id}/incrementPhoneNumberViews`
                                  );
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              Mostrar
                            </button>
                          </div>
                        </li>
                        <li className='card-contact-list-item'>
                          <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center'>
                              <i className='fab fa-whatsapp fa-2x text-success me-2'></i>
                              {showWhatsAppNumber ? (
                                <span>{product.user.whatsApppNumber}</span>
                              ) : (
                                <span>XX-XX-XX-XXX</span>
                              )}
                            </div>
                            <button
                              disabled={showWhatsAppNumber ? true : false}
                              className='btn btn-outline-success'
                              onClick={async () => {
                                setShowWhatsAppNumber(true);
                                try {
                                  await axios.get(
                                    `/api/products/${product._id}/incrementPhoneNumberViews`
                                  );
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              Mostrar
                            </button>
                          </div>
                        </li>
                        <li className='card-contact-list-item'>
                          <div className='row'>
                            <div className='col'>Estrelas:</div>
                            <div className='col'>
                              <Rating
                                star={product.avgRating}
                                review={product.numReviews}
                              />
                            </div>
                          </div>
                        </li>
                        <li className='card-contact-list-item'>
                          <div className='row'>
                            <div className='col'>Preço:</div>
                            <div className='col'>
                              {new Intl.NumberFormat('pt-PT', {
                                style: 'currency',
                                currency: 'MZN',
                              }).format(product.price)}
                            </div>
                          </div>
                        </li>
                        <li className='card-contact-list-item text-muted'>
                          <div className='row'>
                            <div className='col'>Estado:</div>
                            <div className='col'>{product.state}</div>
                          </div>
                        </li>
                        {product.countInStock > 0 && (
                          <li className='card-contact-list-item text-muted'>
                            <div className='row'>
                              <select
                                className='py-3 form-select'
                                type='select'
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (el) => (
                                    <option key={el + 1} value={el + 1}>
                                      {el + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </li>
                        )}

                        <button
                          className='btn-gradient btn-gradient--primary btn-gradient--sm w-100'
                          type='button'
                          disabled={Number(product.countInStock) === 0}
                          onClick={addToCartHandler}
                        >
                          Adicionar <i className='fas fa-shopping-cart'></i>
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
                {product?.category?.category?.name && (
                  <RelatedAds
                    categoryId={product.category._id}
                    categoryName={product.category.category.name}
                    productId={match.params.id}
                  />
                )}
              </>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
