import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchProducts, deleteProduct } from '../../actions';
import Message from '../Message';
import Loading from '../Loading';
import Paginate from '../Paginate';
import ModalRemove from '../ModalRemove';

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deletePrd, setDeleteProd] = useState('');
  const [productId, setProductId] = useState('');

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, products, success, error, page, pages } = useSelector(
    (state) => state.products
  );
  const { success: successDelete } = useSelector(
    (state) => state.productDelete
  );

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (
      (userInfo && userInfo.role === 'admin') ||
      (userInfo && userInfo.role === 'manager')
    ) {
      dispatch(fetchProducts(history.location.search));
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo, history.location.search, successDelete]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const openModal = (id, productName) => {
    setProductId(id);
    setDeleteProd(productName);
    setIsOpen(true);
  };

  return (
    <div className='row mt-5'>
      <div className='col-sm-10 col-md-8 col-11 mx-auto'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message children={error.message} variant='danger' />
        ) : (
          success && (
            <div className='dashboard-container my-adslist'>
              <h4 className='widget-header'>Todos Anúncios</h4>
              <table className='table table-responsive bg-white product-dashboard-table'>
                <thead className='thead-light'>
                  <tr>
                    <th>Imagem</th>
                    <th>Título de Produto</th>
                    <th className='text-center'>Categoria</th>
                    <th className='text-center'>Acção</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ModalRemove
                        modalIsOpen={modalIsOpen}
                        setIsOpen={setIsOpen}
                        deleteHandler={deleteProductHandler}
                        id={productId}
                        name={deletePrd}
                      />
                      <td className='product-thumb'>
                        <img
                          width='80px'
                          height='auto'
                          src={product.image}
                          alt='Imagem de Produto'
                          onError={(e) =>
                            (e.target.src =
                              'https://comercio-moz.s3.us-east-2.amazonaws.com/default/imagem-nao-disponivel.jpeg')
                          }
                        />
                      </td>
                      <td className='product-details'>
                        <h5 className='title'>{product.name}</h5>
                        <span className='add-id'>
                          <strong>ID do Anúncio:</strong> {product._id}
                        </span>
                        <span>
                          <strong>Postado em: </strong>
                          <time>{product.createdAt}</time>{' '}
                        </span>

                        {product.active ? (
                          <span className='status active'>
                            <strong>Estado</strong>
                            activo
                          </span>
                        ) : (
                          <span className='status'>
                            <strong>Estado</strong>
                            inativo
                          </span>
                        )}

                        <span className='location'>
                          <strong>Localização</strong>Maputo
                        </span>
                      </td>
                      <td className='product-category'>
                        <span className='categories'>
                          {product.category.name}
                        </span>
                      </td>
                      <td className='action'>
                        <ul className='d-flex justify-content-center align-items-center'>
                          <LinkContainer
                            className='view'
                            to={`/product/${product.slug}/${product._id}`}
                          >
                            <li className='list-inline-item'>
                              <i className='fas fa-eye'></i>
                            </li>
                          </LinkContainer>
                          <LinkContainer
                            className='edit'
                            to={`/admin/products/update/${product._id}`}
                          >
                            <li className='list-inline-item'>
                              <i className='fas fa-pen'></i>
                            </li>
                          </LinkContainer>

                          <li className='list-inline-item delete'>
                            <i
                              className='fas fa-trash'
                              onClick={(e) =>
                                openModal(product._id, product.name)
                              }
                            ></i>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paginate pages={pages} page={page} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductListScreen;
