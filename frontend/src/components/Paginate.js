import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

const Paginate = ({ page, pages }) => {
  let location = useLocation();
  const path = location.pathname;
  const val = location.search.replace(/\?page=[0-9]+&?/, '').replace(/\?/, '');
  return (
    pages > 1 && (
      <Pagination className={`justify-content-center fs-4 pt-5`} size='lg'>
        {page !== '1' && (
          <LinkContainer to={`${path}?page=${1}${val ? `&${val}` : ''}`}>
            <Pagination.Item key={1}>
              <i className='fas fa-arrow-left'></i>
            </Pagination.Item>
          </LinkContainer>
        )}

        {[...Array(pages).keys()].map((x, i) => (
          <div key={i + 2}>
            {Number(page) - (x + 1) < 3 && Number(page) - (x + 1) > -3 && (
              <LinkContainer
                to={`${path}?page=${x + 1}${val ? `&${val}` : ''}`}
              >
                <Pagination.Item key={x + 2} active={x + 1 == page}>
                  {x + 1}
                </Pagination.Item>
              </LinkContainer>
            )}
          </div>
        ))}
        {page * 1 !== [...Array(pages).keys()].length && (
          <LinkContainer to={`${path}?page=${pages}${val ? `&${val}` : ''}`}>
            <Pagination.Item key={pages + 1}>
              <i className='fas fa-arrow-right'></i>
            </Pagination.Item>
          </LinkContainer>
        )}
      </Pagination>
    )
  );
};

export default Paginate;
