import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import 'jquery';
import Slider from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Rating from './Rating';

class Carousel extends React.Component {
  renderedProd = (products) => {
    return Object.values(products).map((product, i) => {
      return (
        <div index={i} key={product._id}>
          <LinkContainer to={`/product/${product.slug}/${product._id}`}>
            <div className='card product-card text-center'>
              <img
                src={product.image}
                className='card-img'
                alt='Produto recente'
              />
              <div className='card-body'>
                <div className='product-detail'>
                  <h5 className='text-muted text-uppercase'>Categoria</h5>
                  <h3>{product.name}</h3>
                  <h3 className='text-danger'>{product.price} MTS</h3>
                  <div className='product-ratings'>
                    <Rating
                      star={product.avgRating}
                      review={product.numReviews}
                    />
                  </div>
                </div>
              </div>
              <div className='cta-card bg-dark py-4'>
                <Link to={`/cart/${product._id}`} className='cta-link-main'>
                  <i className='fas fa-shopping-cart cta-icon'></i>Adicionar
                  Carrinho
                </Link>
              </div>
            </div>
          </LinkContainer>
        </div>
      );
    });
  };
  render() {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 2001 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 2000, min: 1201 },
        items: 4,
      },
      tablet: {
        breakpoint: { max: 1200, min: 901 },
        items: 3,
      },
      miniTablet: {
        breakpoint: { max: 900, min: 465 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    return (
      <>
        <div className='row mb-5'>
          <h1 className='main-title text-uppercase'>Produto Recente</h1>
          <Slider
            containerClass='slider-container'
            itemClass='slider-item'
            responsive={responsive}
            swipeable={true}
            draggable={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            ssr={true}
            showDots={true}
            partialVisible={false}
          >
            {this.renderedProd(this.props.products)}
          </Slider>
        </div>
      </>
    );
  }
}

export default Carousel;
