import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Carousel, Container, Col, Row } from "react-bootstrap";
import Rating from "./Rating";
import Loading from "./Loading";

const UserReviews = ({ reviews, loading }) => {
  return (
    <React.Fragment>
      {loading && <Loading />}

      {reviews.length > 0 && (
        <section className="p-5 customers">
          <Container fluid>
            <Row className="text-white text-center">
              <Col className="m-4">
                <h1 className="display-4 fst-italic mb-4 text-light">
                  Testemunhos
                </h1>
                <div className="underline mb-4"></div>
                <p className="lead">
                  Todos gostam dos produtos de excelente qualidade{" "}
                  <i className="fas fa-smile text-warning"></i>
                </p>
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mx-auto">
                <Carousel>
                  {reviews.map((review) => (
                    <Carousel.Item key={review._id} className="text-center">
                      <img
                        src={review.user.photo}
                        width="150"
                        className="img-fluid rounded-circle m-5"
                        alt="Foto comentarista"
                      />
                      <blockquote className="blockquote text-white lead mb-5">
                        {review.user.name}
                      </blockquote>
                      <h5 className="mb-4 text-uppercase text-white fw-bold">
                        {review.comment}
                      </h5>
                      <Rating
                        star={review.product.avgRating}
                        reviews={review.product.numReviews}
                      />
                      <br />
                      <br />
                      <br />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </React.Fragment>
  );
};

export default UserReviews;
