import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  fetchProduct,
  productUpdate,
  uploadProductImage,
  uploadProductImages,
  updateProductImage,
  deleteProductImage,
  fetchSubCategories,
} from '../../actions';
import Message from '../Message';
import Loading from '../Loading';
import { Container } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DropZone from '../DropZone';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Breadcrumb } from 'react-bootstrap';

const ProductUpdateScreen = ({ history, match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [hot, setHot] = useState(false);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [negotiable, setNegotiable] = useState(false);
  const [state, setState] = useState('');
  const [key, setKey] = useState('');

  const { loading, product, error, success } = useSelector(
    (state) => state.product
  );

  const { loading: loadingUpdate, success: successUpdate } = useSelector(
    (state) => state.productUpdate
  );

  const {
    loading: loadingImage,
    productImage,
    success: successImage,
    error: errorImage,
  } = useSelector((state) => state.productImage);
  const {
    loading: loadingImages,
    productImages,
    success: successImages,
    error: errorImages,
  } = useSelector((state) => state.productImages);
  const { loading: loadingImageUpdate, success: successImageUpdate } =
    useSelector((state) => state.updateProductImage);
  const {
    loading: loadingImageDelete,
    success: successImageDelete,
    imagesAD,
  } = useSelector((state) => state.deleteProductImage);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: successCategories, subCategories } = useSelector(
    (state) => state.subCategories
  );

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (userInfo.role !== 'user') {
      if (!product) {
        dispatch(fetchProduct(productId));
      } else {
        if (product._id !== productId) {
          dispatch(fetchProduct(productId));
        }
        setImage(product.image);
        setImages(product.images);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setAddress(product.address);
        setCity(product.city);
        setHot(product.hot);
        setNegotiable(product.negotiable);
        setState(product.state);
      }
    } else if (userInfo.role === 'user') {
      history.push('/');
    }
    if (successUpdate) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET' });
      dispatch({ type: 'FETCH_PRODUCT_RESET' });
      history.push('/admin/products/updated');
    }

    if (successImages && key === 'uploadImages') {
      setImages(productImages);
    }

    if (successImageUpdate && key === 'updateImage') {
      dispatch({ type: 'UPDATE_PRODUCT_IMAGE_RESET' });
    }
    if (successImageDelete && key === 'deleteImage') {
      setImages(imagesAD);
    }
    if (subCategories.length === 0) {
      dispatch(fetchSubCategories());
    }
  }, [
    dispatch,
    product,
    productId,
    successUpdate,
    successImageUpdate,
    successImages,
    successImageDelete,
    history,
    productImages,
    imagesAD,
    userInfo,
    key,
  ]);

  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: 'UPLOAD_PRODUCT_IMAGES_RESET' });
  //     dispatch({ type: 'DELETE_PRODUCT_IMAGE_RESET' });
  //   };
  // }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      productUpdate(productId, {
        name,
        price,
        brand,
        category,
        hot,
        countInStock,
        description,
        address,
        city,
        negotiable,
      })
    );
  };

  // const addProductHandler = async (e) => {
  //   const files = e.target.files;
  //   const formData = new FormData();

  //   for (let i = 0; i < files.length; i++) {
  //     formData.append('images', files[i]);
  //   }
  //   formData.append('prodImages', product.images);
  //   dispatch(uploadProductImages(productId, formData));
  // };

  const uploadMainProductImage = async (e) => {
    const file = e.target.files[0];
    const filename = `${productId}-main.jpeg`;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filename);
    dispatch(uploadProductImage(productId, formData));
  };

  const updateSelectedProductImage = async (e, image, ind) => {
    setKey('updateImage');
    const file = e.target.files[0];
    const index = product.images.indexOf(image);
    const filename = `${productId}-(${index + 1}).jpeg`;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('index', index);
    formData.append('filename', filename);
    dispatch(updateProductImage(productId, formData));
  };

  const deleteProductImageHandler = async (e, currentImage) => {
    setKey('deleteImage');
    const index = product.images.indexOf(currentImage);
    const filename = `${productId}-(${index + 1}).jpeg`;
    dispatch(deleteProductImage(productId, { filename, index }));
  };

  return (
    <Container className='u-padding-bottom-huge'>
      <div className='row'>
        <div className='col-sm-5 col-10'>
          <Breadcrumb>
            <LinkContainer to='/'>
              <Breadcrumb.Item>Início</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to='/admin/products'>
              <Breadcrumb.Item>Anúncios</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>{product && product.name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={onSubmitHandler}>
        <div className='row mt-5'>
          <div className='col-sm-5 col-10 mx-auto mb-5'>
            <h1 className='text-capitalize mb-5'>Actualizar Anúncio</h1>
            <div className='form-group mb-3'>
              <Form.Label className='fs-5' htmlFor='name'>
                Nome de Produto
              </Form.Label>
              <FormControl
                value={name || ''}
                id='name'
                type='text'
                className='form-control py-3'
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className='form-group mb-3'>
              <Form.Label className='fs-5' htmlFor='price'>
                Preço
              </Form.Label>
              <FormControl
                value={price || ''}
                id='price'
                type='number'
                className='form-control py-3'
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div className='form-group mb-3'>
              <Form.Label className='fs-5' htmlFor='brand'>
                Marca
              </Form.Label>
              <FormControl
                value={brand || ''}
                id='brand'
                type='text'
                className='form-control py-3'
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              />
            </div>

            <div className='form-group mb-3'>
              <Form.Label className='fs-5' htmlFor='category'>
                Categoria
              </Form.Label>
              {success & successCategories && (
                <select
                  id='category'
                  className='form-select'
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {subCategories.map((subCategory) => (
                    <option value={subCategory._id} key={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className='form-group mb-3'>
              <Form.Label className='fs-5' htmlFor='address'>
                Endereço
              </Form.Label>
              <FormControl
                value={address || ''}
                id='address'
                type='text'
                className='form-control py-3'
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div className='form-group mb-3'>
              <Form.Label className='fs-5' htmlFor='city'>
                Cidade
              </Form.Label>

              <select
                value={city || ''}
                id='city'
                className='form-select'
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option value=''>Escolher</option>
                <option value='Maputo'>Maputo</option>
                <option value='Matola'>Matola</option>
                <option value='Nampula'>Nampula</option>
              </select>
            </div>

            <div className='form-group mb-3'>
              <Form.Label className='fs-5' htmlFor='countInStock'>
                Quantidade Stock
              </Form.Label>
              <FormControl
                value={countInStock || ''}
                id='countInStock'
                type='number'
                className='form-control py-3'
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              />
            </div>

            <div className='form-group mb-3'>
              <Form.Label className='fs-5' htmlFor='description'>
                Descrição
              </Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={description || ''}
                id='description'
                onChange={(e, editor) => {
                  setDescription(editor.getData());
                }}
              />
            </div>
            <div className='form-group mb-3 d-flex align-items-center'>
              <InputGroup className='mb-3'>
                <InputGroup.Checkbox
                  checked={negotiable || false}
                  onChange={(e) => {
                    setNegotiable(negotiable === true ? false : true);
                  }}
                />
                <FormControl value='É negociável?' disabled />
              </InputGroup>
            </div>
            <div className='form-group mb-3 d-flex align-items-center'>
              <InputGroup className='mb-3'>
                <InputGroup.Checkbox
                  checked={hot || false}
                  onChange={(e) => {
                    setHot(hot === true ? false : true);
                  }}
                />
                <FormControl value='É quente?' disabled />
              </InputGroup>
            </div>
            <div className='form-group mb-3'>
              <Form.Label className='fs-5' htmlFor='state'>
                Estado
              </Form.Label>
              <select
                value={state || ''}
                id='state'
                className='form-select'
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <option value=''>Escolher</option>
                <option value='novo'>Novo</option>
                <option value='usado'>Usado</option>
              </select>
            </div>
            <button
              type='submit'
              onClick={onSubmitHandler}
              className='btn-gradient btn-gradient--primary btn-gradient--sm'
              disabled={loadingUpdate ? true : false}
            >
              {loadingUpdate ? (
                <span>
                  Actualizando &nbsp; <i className='fas fa-sync fa-spin'></i>
                </span>
              ) : (
                <span>Actualizar</span>
              )}
            </button>
          </div>

          <div className='col-sm-6 col-10 ms-sm-auto mx-auto'>
            <div className='row'>
              {images && images.filter(Boolean).length < 5 && (
                <>
                  <DropZone
                    id={productId}
                    fnUploader={uploadProductImages}
                    images={images}
                    setKey={setKey}
                  />
                  <div className='col-12 mb-5'>
                    {/* <FormControl
                      id='pickImg'
                      type='file'
                      className='d-none'
                      onChange={addProductHandler}
                      multiple
                    />
                    <Form.Label
                      htmlFor='pickImg'
                      className='btn btn-primary btn mt-3 mb-5'
                    >
                      Adicionar Imagem <i className='fas fa-plus'></i>
                    </Form.Label> */}
                    {errorImages && (
                      <Message
                        variant='danger'
                        children={'Número máximo de imagens não pode exceder 5'}
                      />
                    )}
                  </div>
                </>
              )}
              {loadingImage ||
              loadingImages ||
              loadingImageDelete ||
              loadingImageUpdate ? (
                <Loading />
              ) : (
                <>
                  <div className='col-sm-4 mb-5'>
                    <div className='form-group mb-3'>
                      {image && (
                        <>
                          <img
                            referrerPolicy='no-referrer'
                            src={`${image}?${Math.random()}`}
                            id='main-img'
                            className='img-fluid card-img'
                            alt='imagem principal do produto'
                            height='150'
                            loading='lazy'
                            onError={(e) => {
                              e.target.src = `${image}?${Math.random()}`;
                            }}
                          />

                          <Form.Label className='fs-5 mt-3' htmlFor='upload'>
                            {loading ? 'Actualizando...' : 'Actualizar Imagem'}
                          </Form.Label>
                          <FormControl
                            id='upload'
                            type='file'
                            className='form-control py-3'
                            onChange={uploadMainProductImage}
                          />

                          <i
                            className='fas fa-sync fa-lg text-dark p-3'
                            onClick={(e) => {
                              setTimeout(() => {
                                document.getElementById(
                                  'main-img'
                                ).src = `${image}?${Math.random()}`;
                              }, 1000);
                            }}
                          ></i>
                        </>
                      )}
                    </div>
                  </div>
                  {images &&
                    [...new Set(images.filter(Boolean))].map(
                      (currentImage, ind) =>
                        currentImage && (
                          <div className='col-sm-4 mb-5' key={ind + 1}>
                            <div className='form-group mb-3'>
                              <img
                                id={`image-${ind}`}
                                src={`${currentImage}?${Math.random()}`}
                                className='img-fluid card-img rounded'
                                alt='images de produto'
                                height='150'
                                loading='lazy'
                                onError={(e) => {
                                  e.target.src = `${currentImage}?${Math.random()}`;
                                }}
                              />

                              <Form.Label
                                className='fs-5 mt-3'
                                htmlFor='upload'
                              >
                                Actualizar Imagem
                              </Form.Label>
                              <FormControl
                                id='upload'
                                type='file'
                                className='form-control py-3'
                                onChange={(e) =>
                                  updateSelectedProductImage(
                                    e,
                                    currentImage,
                                    ind
                                  )
                                }
                              />
                            </div>
                            <i
                              className='d-inline-block me-5 fas fa-sync fa-lg text-dark p-3'
                              onClick={(e) => {
                                setTimeout(() => {
                                  document.getElementById(
                                    `image-${ind}`
                                  ).src = `${currentImage}?${Math.random()}`;
                                }, 1000);
                              }}
                            ></i>
                            <button
                              onClick={(e) =>
                                deleteProductImageHandler(e, currentImage)
                              }
                              type='button'
                              className='btn btn-danger btn-sm'
                            >
                              Remover
                            </button>
                          </div>
                        )
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default ProductUpdateScreen;
