import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getOrders } from '../../actions';
import Message from '../Message';
import Loading from '../Loading';
import Paginate from '../Paginate';

const OrderListScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const getPath = location.search.split('page=')[1];
  const currentPage = getPath ? getPath.split('&')[0] : 1;
  console.log(currentPage);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, orders, success, error, page, pages } = useSelector(
    (state) => state.orderList
  );
  // const { success: successDelete } = useSelector(state => state.productDelete);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (
      (userInfo && userInfo.role === 'admin') ||
      (userInfo && userInfo.role === 'manager')
    ) {
      dispatch(getOrders(currentPage));
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo, currentPage]);

  return (
    <>
      {loading && <Loading />}
      {error && <Message variant='danger'>{error}</Message>}

      {orders && !loading && (
        <div className='container'>
          <div className='row mt-5'>
            <div className='col-10'>
              <h1 className='text-uppercase my-5'>Lista de Pedidos</h1>
              <table className='table table-striped border table-hover responsive text-center fs-4'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USUÁRIO</th>
                    <th>DATA</th>
                    <th>MONTANTE</th>
                    <th>PAGO?</th>
                    <th>ENTREGUE</th>
                    <th>DATA ENTREGA</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice} MZN</td>
                      <td>
                        {order.isPaid ? (
                          <i className='fas fa-check text-success'></i>
                        ) : (
                          <i className='fas fa-times text-danger'></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <i className='fas fa-check text-success'></i>
                        ) : (
                          <i className='fas fa-times text-danger'></i>
                        )}
                      </td>
                      <td>
                        {order.deliveredAt ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <div>-----</div>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <button
                            type='button'
                            className='btn badge rounded-pill bg-danger px-2 py-2'
                          >
                            Detalhes
                          </button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paginate pages={pages} page={page} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderListScreen;
