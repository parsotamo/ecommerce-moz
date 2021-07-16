import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewProduct from "../NewProduct";
import { fetchNewProducts, getReviewsUsers } from "../../actions";
import { useLocation, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../Message";
import Rating from "../Rating";
import Products from "../Products";
import UserReviews from "../UserReviews";
import Banner from "../Banner";
import Meta from "../Meta";
import _ from "lodash";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { error, loading, success, newProducts } = useSelector(
    (state) => state.newProducts
  );

  const {
    loading: loadingReviews,
    reviewsUsers,
    success: successReviews,
  } = useSelector((state) => state.reviewsUsers);

  useEffect(() => {
    dispatch(fetchNewProducts());
    dispatch(getReviewsUsers());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Meta />
      <Banner />
      {success && (
        <>
          <NewProduct products={newProducts} loading={loading} error={error} />

          <Products />
        </>
      )}
      {successReviews && (
        <UserReviews reviews={reviewsUsers} loading={loadingReviews} />
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
