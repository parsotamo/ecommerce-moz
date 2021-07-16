import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../../actions";
import Message from "../Message";
import Loading from "../Loading";
import Paginate from "../Paginate";

const ProductListScreen = ({ history, match }) => {
  const isUpdated = match.params.isUpdated;
  const dispatch = useDispatch();
  const location = useLocation();
  let currentPage = location.search.split("page=")[1];
  if (currentPage) {
    currentPage = currentPage.split("&")[0] || 1;
  }

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, products, success, error, page, pages } = useSelector(
    (state) => state.products
  );
  const { success: successDelete } = useSelector(
    (state) => state.productDelete
  );

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && userInfo.role === "admin") {
      dispatch(fetchProducts(currentPage));
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo, currentPage]);

  useEffect(() => {
    if (successDelete) {
      dispatch(fetchProducts());
    }
  }, [successDelete]);

  useEffect(() => {
    if (isUpdated) {
      dispatch(fetchProducts(currentPage));
    }
  }, []);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container-fluid product-list">
      <div className="row mt-5">
        <div className="col-10 text-end">
          <LinkContainer to="/admin/products/new/">
            <button className="btn btn-dark fs-5 py-4 px-3">
              Adicionar Producto <i className="fas fa-plus"></i>
            </button>
          </LinkContainer>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-10  mx-auto table-responsive-sm">
          <table className="table table-striped table-hover fs-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>PREÇO</th>
                <th>CATEGORIA</th>
                <th>MARCA</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="table-btns">
                    <i
                      className="fas fa-edit btn fs-4"
                      onClick={() => {
                        history.push(`/admin/products/update/${product._id}`);
                      }}
                    ></i>
                    <i
                      className="fas fa-trash text-danger ms-3 btn fs-4"
                      onClick={() => {
                        deleteProductHandler(product._id);
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginate pages={pages} page={page} />
        </div>
      </div>
    </div>
  );
};

export default ProductListScreen;
