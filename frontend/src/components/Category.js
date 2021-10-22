import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-multi-carousel';
import { fetchSubCategories } from '../actions';
import 'react-multi-carousel/lib/styles.css';
import '../scss/components/_product_slider.scss';
import '../scss/components/_category.scss';

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

const Category = () => {
  const dispatch = useDispatch();
  const { loading, error, success, subCategories } = useSelector(
    (state) => state.subCategories
  );

  return (
    //    Start Categories Area
    success ? (
      <section className='categories'>
        <div className='container'>
          <div className='cat-inner'>
            <div className='row'>
              <Slider
                containerClass='slider-container'
                itemClass='single-cat'
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
                {[...subCategories.map((subCategory) => subCategory.category)]
                  .reduce((acc, category) => {
                    const x = acc.find((item) => item.name === category.name);
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
                    <div className='single-cat' key={ind + 1}>
                      <div className='icon'>
                        <i
                          className={`fas fa-2x text-danger fa-${category.icon}`}
                        />
                      </div>
                      <h4 className='single-cat-name'>{category.name}</h4>
                      <ul className='category-list d-flex flex-column'>
                        {subCategories
                          .filter(
                            (subCategory) =>
                              subCategory.category.name === category.name
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
                            <li
                              className='category-list-item'
                              key={subCategory._id}
                            >
                              <Link
                                to={`ads/categoria/${subCategory.name}/${subCategory._id}`}
                                className='category-list-link'
                              >
                                {subCategory.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    ) : null
  );
};

export default Category;
