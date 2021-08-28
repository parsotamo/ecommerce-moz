import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProduct,
  getProductReviews,
  createProductReview,
} from "../../actions";
import Rating from "../Rating";
import Loading from "../Loading";
import Message from "../Message";
import history from "../../history";
import Meta from "../Meta";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const ProductDetail = ({ match }) => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);

  const {
    loading: loadingReviews,
    productReviews,
    error: errorReviews,
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
      setComment("");
      dispatch({ type: "PRODUCT_CREATE_REVIEW_RESET" });
    }
    dispatch(fetchProduct(match.params.id));
    dispatch(getProductReviews(match.params.id));
  }, [dispatch, match.params.id, successCreateReview]);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [emojiPickerState, setEmojiPickerState] = useState(false);

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
    <section className='product-detail my-5 mx-lg-5'>
      <Meta title={product.name} />
      <div
        className='container-fluid'
        onClick={(e) => {
          if (emojiPickerState) {
            setEmojiPickerState(!emojiPickerState);
          }
        }}
      >
        <Link to='/' className='back-link'>
          &larr; Voltar
        </Link>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div className='row mt-5'>
            <div className='col-sm-6 col-md-7'>
              <Link to={product.image}>
                <img
                  className='detail-product-image'
                  src={product.image}
                  alt='Foto Principal'
                />
              </Link>

              <div className='row mt-5'>
                {[
                  product.image1,
                  product.image2,
                  product.image3,
                  product.image4,
                  product.image5,
                ].map(
                  (prodImg, i) =>
                    prodImg && (
                      <div className='col-3' key={i + 1}>
                        <Link
                          to={prodImg}
                          data-lightbox='library'
                          data-title={prodImg}
                        >
                          <img
                            className='img-fluid img-thumbnail'
                            src={prodImg}
                            alt='Produto Recente'
                          />
                        </Link>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className='col-sm-3  text-secondary'>
              <ul className='list-group list-group-flush mt-5'>
                <li className='list-group-item h2 text-uppercase fw-light pb-5'>
                  {product.name}
                </li>
                <li className='list-group-item fs-4 py-4'>
                  <Rating
                    star={product.avgRating}
                    review={product.numReviews}
                  />
                </li>
                <li className='list-group-item fs-3 py-4 mb-3'>
                  Preço: {product.price}
                </li>
                <li className='list-group-item fs-3 py-4 text-muted'>
                  Descrição: {product.description}
                </li>
              </ul>
            </div>
            <div className='col-sm-3 col-md-2'>
              <div className='card fs-3'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item text-muted'>
                    <div className='row'>
                      <div className='col'>Preço</div>
                      <div className='col'>{product.price} MTS</div>
                    </div>
                  </li>
                  <li className='list-group-item text-muted'>
                    <div className='row'>
                      <div className='col'>Estado</div>
                      <div className='col'>
                        {product.countInStock > 0
                          ? "Tem estoque"
                          : "Estoque esgotado"}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <li className='list-group-item text-muted'>
                      <div className='row'>
                        <select
                          className='py-3 form-select'
                          type='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((el) => (
                            <option key={el + 1} value={el + 1}>
                              {el + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </li>
                  )}

                  <button
                    className='btn btn-dark py-4 fs-4 text-uppercase fw-bold'
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
        )}
        <div className='row mt-5'>
          <div className='col-sm-12 col-md-6'>
            <h1 className='text-uppercase mb-3'>Comentários</h1>
            <ul className='list-group list-group-flush fs-3'>
              {loadingReviews ? (
                <Loading />
              ) : productReviews === 0 ? (
                <Message variant='info'>Nenhum comentário postado</Message>
              ) : (
                productReviews.map((review, ind) => (
                  <div className='row mb-4' key={ind}>
                    <div className='col-2'>
                      <img
                        src={review.user.photo}
                        className='img-fluid rounded-circle'
                        alt='Foto de Usuario que comenta'
                      />
                    </div>
                    <div className='col-10'>
                      <li className='list-group-item'>{review.user.name}</li>
                      <li className='list-group-item'>
                        <Rating star={review.rating} />
                        <div className='ms-2 mt-2'>
                          {review.createdAt.substring(0, 10)}
                        </div>
                        <div className='mt-3'>{review.comment}</div>
                      </li>
                    </div>
                  </div>
                ))
              )}
              <li className='list-group-item mt-5'>
                <h2 className='display-5 text-uppercase mb-3'>
                  Escrever comentário
                </h2>
                {loadingCreateReview && <Loading />}
                {errorCreateReview && (
                  <Message variant='danger'>{errorCreateReview}</Message>
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
                        <option value='0'>Escolha classificação</option>
                        <option value='1'>1 - Ruim</option>
                        <option value='2'>2 - OK</option>
                        <option value='3'>3 - Bom</option>
                        <option value='4'>4 - Muito Bom</option>
                        <option value='5'>5 - Excelente</option>
                      </select>
                    </div>

                    <div className='form-group comment-area mb-3'>
                      <textarea
                        className='form-control fs-3'
                        rows='5'
                        placeholder='comentar...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      {emojiPicker}
                      <span className='select-emoji' onClick={triggerPicker}>
                        <i className='far fa-smile fa-2x text-warning'></i>
                      </span>
                    </div>

                    <div className='d-grid'>
                      <button
                        type='submit'
                        className='btn btn-dark py-3 fs-3'
                        disabled={loadingCreateReview}
                      >
                        Comentar
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>
                    Você precisa estar autenticado para comentar.{" "}
                    <Link to='/login'>Entre agora</Link>
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
