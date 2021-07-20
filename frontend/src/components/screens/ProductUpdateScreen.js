import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProduct, productUpdate } from "../../actions";
import Message from "../Message";
import Loading from "../Loading";
import { Container } from "react-bootstrap";

const ProductUpdateScreen = ({ history, match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const imageInput = useRef("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploadImage, setUploadImage] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  const { loading, product, error, success } = useSelector(
    (state) => state.product
  );

  const { success: successUpdate } = useSelector(
    (state) => state.productUpdate
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && userInfo.role === "admin") {
      if (!product) {
        dispatch(fetchProduct(productId));
      } else {
        if (product._id !== productId) {
          dispatch(fetchProduct(productId));
        }
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setImage1(product.image1);
        setImage2(product.image2);
        setImage3(product.image3);
        setImage4(product.image4);
        setImage5(product.image5);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        console.log([image1, image2, image3, image4, image5]);
      }
    } else if (userInfo.role !== "admin") {
      history.push("/");
    }
    if (successUpdate) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      dispatch({ type: "FETCH_PRODUCT_RESET" });
      history.push("/admin/products/updated");
    }
  }, [product, history, successUpdate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      productUpdate(
        productId,
        name,
        price,
        brand,
        category,
        countInStock,
        description
      )
    );
  };

  const uploadImageSetup = async (file, index) => {
    const formData = new FormData();
    formData.append("index", index);
    if (index) {
      formData.append(`image${index}`, file);
    } else {
      formData.append("image", file);
    }
    setUploadImage(true);

    try {
      const { data: response } = await axios.patch(
        `/api/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setImage(response.data);
      setUploadImage(false);
      dispatch(fetchProduct(productId));
    } catch (error) {
      console.log(error.response.data);
      setUploadImage(false);
    }
  };

  const addProductHandler = async (e) => {
    const file = e.target.files[0];
    const index = [image1, image2, image3, image4, image5].findIndex(
      (el) => el === "" || el === undefined
    );
    console.log(index);

    await uploadImageSetup(file, index + 1);
  };

  const uploadProductImage = async (e, index) => {
    const file = e.target.files[0];
    await uploadImageSetup(file, index);
  };

  const deleteProductImageHandler = async (e, index) => {
    let myObj = {};
    if (index === 1) {
      myObj.image1 = "";
    } else if (index === 2) {
      myObj.image2 = "";
    } else if (index === 3) {
      myObj.image3 = "";
    } else if (index === 4) {
      myObj.image4 = "";
    } else if (index === 5) {
      myObj.image5 = "";
    }

    setDeleteImage(false);
    try {
      await axios.patch(`/api/products/${productId}`, myObj, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setDeleteImage(false);
      dispatch(fetchProduct(productId));
    } catch (error) {
      console.log(error.response.data);
      setDeleteImage(false);
    }
  };

  return (
    <Container className="u-padding-bottom-huge">
      {loading && <Loading />};
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <form onSubmit={onSubmitHandler}>
          <h1 className="text-uppercase my-5">Actualizar Producto</h1>

          <div className="row">
            <div className="col-sm-5">
              <div className="form-group mb-3">
                <label className="fs-5" htmlFor="name">
                  Nome de Produto
                </label>
                <input
                  id="name"
                  type="text"
                  value={name || " "}
                  className="form-control py-3"
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
                  value={price || " "}
                  className="form-control py-3"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="fs-5" htmlFor="brand">
                  Marca
                </label>
                <input
                  id="brand"
                  type="text"
                  value={brand || " "}
                  className="form-control py-3"
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
                  value={category || " "}
                  className="form-control py-3"
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
                  value={countInStock || " "}
                  className="form-control py-3"
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="fs-5" htmlFor="description">
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  rows="5"
                  id="description"
                  value={description || " "}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={onSubmitHandler}
                className="btn btn-primary btn-lg py-3"
              >
                Actualizar
              </button>
            </div>

            <div className="col-sm-6 ms-auto">
              <div className="row">
                {[image1, image2, image3, image4, image5].filter(
                  (el) => el !== undefined && el !== ""
                ).length < 5 && (
                  <div className="col-12 mb-5">
                    <input
                      id="pickImg"
                      type="file"
                      className="d-none"
                      onChange={addProductHandler}
                    />
                    <label htmlFor="pickImg" className="btn btn-primary btn-lg">
                      Adicionar Imagem <i className="fas fa-plus"></i>
                    </label>
                  </div>
                )}
                <div className="col-sm-4 mb-5">
                  <div className="form-group mb-3">
                    <img
                      src={image}
                      className="img-fluid card-img"
                      alt="images de produto"
                      height="150"
                    />
                    <input
                      id="image"
                      type="text"
                      value={image || ""}
                      className="form-control py-3"
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <label className="fs-5" htmlFor="upload">
                      Actualizar Imagem
                    </label>
                    <input
                      ref={imageInput}
                      id="upload"
                      type="file"
                      className="form-control py-3"
                      onChange={uploadProductImage}
                    />
                    {uploadImage && <Loading />}
                  </div>
                </div>
                {[image1, image2, image3, image4, image5].map(
                  (currentImage, ind) =>
                    currentImage && (
                      <div className="col-sm-4 mb-5" key={ind + 1}>
                        <div className="form-group mb-3">
                          <img
                            src={currentImage}
                            className="img-fluid card-img"
                            alt="images de produto"
                            height="150"
                          />
                          <input
                            id="image"
                            type="text"
                            value={currentImage || ""}
                            className="form-control py-3"
                            onChange={(e) =>
                              ind + 1 === 1
                                ? setImage1(e.target.value)
                                : ind + 1 === 2
                                ? setImage2(e.target.value)
                                : ind + 1 === 3
                                ? setImage3(e.target.value)
                                : ind + 1 === 4
                                ? setImage4(e.target.value)
                                : ind + 1 === 5 && setImage5(e.target.value)
                            }
                          />
                          <label className="fs-5" htmlFor="upload">
                            Actualizar Imagem
                          </label>
                          <input
                            ref={imageInput}
                            id="upload"
                            type="file"
                            className="form-control py-3"
                            onChange={(e) => uploadProductImage(e, ind + 1)}
                          />
                          {uploadImage && <Loading />}
                        </div>
                        <button
                          onClick={(e) => deleteProductImageHandler(e, ind + 1)}
                          type="button"
                          className="btn btn-danger btn-sm"
                        >
                          Remover
                        </button>
                        {deleteImage && <Loading />}
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </Container>
  );
};

export default ProductUpdateScreen;
