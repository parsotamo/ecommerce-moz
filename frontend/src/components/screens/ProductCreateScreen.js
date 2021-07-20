import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../actions";
import Message from "../Message";
import Loading from "../Loading";
import FormContainer from "../FormContainer";

const ProductCreateScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const { loading, success, error } = useSelector(
    (state) => state.productCreate
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo.role !== "admin") {
      history.push("/");
    } else if (success) {
      dispatch({ type: "PRODUCT_CREATE_RESET" });
      history.push("/admin/products");
    }
  }, [userInfo, history, success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        user: userInfo._id,
        name: name,
        price: price,
        image: `/images/products/default.jpeg`,
        brand: brand,
        countInStock: countInStock,
        category: category,
        description: description,
      })
    );
    console.log(name);
  };
  return (
    <FormContainer>
      {loading && <Loading />};
      {error && <Message variant="danger">{error}</Message>}
      {!loading && !error && (
        <form onSubmit={onSubmitHandler}>
          <h1 className="text-uppercase my-5">Criar Producto</h1>
          <div className="form-group mb-3">
            <label className="fs-5" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              type="text"
              className="form-control py-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label className="fs-5" htmlFor="price">
              Preço
            </label>
            <input
              id="price"
              type="number"
              className="form-control py-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label className="fs-5" htmlFor="image">
              Imagem
            </label>
            <input
              id="image"
              type="text"
              className="form-control py-3"
              value={image}
            />
            <input
              type="file"
              id="upload"
              onChange={(e) => setImage(e.target.files)}
            />
          </div>
          <div className="form-group mb-3">
            <label className="fs-5" htmlFor="brand">
              Marca
            </label>
            <input
              id="brand"
              type="text"
              className="form-control py-3"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label className="fs-5" htmlFor="category">
              Categoria
            </label>
            <input
              id="category"
              type="text"
              className="form-control py-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label className="fs-5" htmlFor="countInStock">
              Quantidade Stock
            </label>
            <input
              id="countInStock"
              type="text"
              className="form-control py-3"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label className="fs-5" htmlFor="description">
              Descrição
            </label>
            <textarea
              className="form-control"
              value={description}
              rows="5"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-dark fs-5 py-4">
              Criar
            </button>
          </div>
        </form>
      )}
    </FormContainer>
  );
};

export default ProductCreateScreen;
