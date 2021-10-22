import { useLocation } from 'react-router-dom';

import Search from './Search';

const Banner = () => {
  const location = useLocation();
  const queryString = location.search;

  return (
    !queryString && (
      <div className='header-parent'>
        <header className='header'>
          <div className='text-light text-md-end text-center banner'>
            <div className='col-nav-search'>
              <Search />
            </div>
          </div>
        </header>
      </div>
    )
  );
};

export default Banner;
