import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Form, InputGroup } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DropZone from '../DropZone';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  createProduct,
  fetchCategories,
  fetchSubCategories,
} from '../../actions';
import Message from '../Message';
import Loading from '../Loading';

const ProductCreateScreen = ({ history }) => {
  const dispatch = useDispatch();
  const inputCategory = useRef(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [hot, setHot] = useState(false);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [negotiable, setNegotiable] = useState(false);
  const [state, setState] = useState('');

  const { categories } = useSelector((state) => state.categories);
  const { subCategories } = useSelector((state) => state.subCategories);
  const { loading, product, success, error } = useSelector(
    (state) => state.productCreate
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (userInfo.role === 'user') {
      history.push('/');
    } else if (success) {
      dispatch({ type: 'PRODUCT_CREATE_RESET' });
      history.push(`/userAds`);
    }
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
    if (!subCategories || subCategories.length === 0) {
      dispatch(fetchSubCategories());
    }
  }, [userInfo, history, success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    formData.append('user', userInfo._id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('countInStock', countInStock);
    formData.append('category', subCategory);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('images', images);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('negotiable', negotiable);
    formData.append('hot', hot);
    formData.append('state', state);
    dispatch(createProduct(formData));
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          {loading && <Loading />};
          {error && <Message variant='danger'>{error}</Message>}
          {!loading && (
            <form onSubmit={onSubmitHandler}>
              <h1 className='text-uppercase my-5'>Criar Producto</h1>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='form-group mb-3'>
                    <label className='fs-5' htmlFor='name'>
                      Nome
                    </label>
                    <input
                      id='name'
                      type='text'
                      className='form-control py-3'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='form-group mb-3'>
                    <label className='fs-5' htmlFor='price'>
                      Preço
                    </label>
                    <input
                      id='price'
                      type='number'
                      className='form-control py-3'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  {/* <div className='form-group mb-3'>
            <label className='fs-5' htmlFor='image'>
              Imagem
            </label>
            <input
              id='image'
              type='text'
              className='form-control py-3'
              value={image}
            />
            <input
              type='file'
              id='upload'
              onChange={(e) => setImage(e.target.files)}
            />
          </div> */}
                  <div className='form-group mb-3'>
                    <label className='fs-5' htmlFor='brand'>
                      Marca
                    </label>
                    <input
                      id='brand'
                      type='text'
                      className='form-control py-3'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                  <FormControl
                    ref={inputCategory}
                    as='select'
                    className='form-select form-select-sm nav-category py-3 mb-3'
                    onChange={(e) =>
                      setSubCategory(inputCategory.current.value)
                    }
                  >
                    <option>Categoria</option>
                    {categories &&
                      categories.map((category) => (
                        <optgroup label={category.name} key={category._id}>
                          {subCategories
                            .filter(
                              (subCategory) =>
                                subCategory.category.name === category.name
                            )
                            .map((subCategory, ind) => (
                              <option key={ind} value={subCategory._id}>
                                {subCategory.name}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                  </FormControl>
                  <div className='form-group mb-3'>
                    <label className='fs-5' htmlFor='countInStock'>
                      Quantidade Stock
                    </label>
                    <input
                      id='countInStock'
                      type='text'
                      className='form-control py-3'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
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
                </div>
                <div className='col-lg-6'>
                  <div className='form-group mb-3'>
                    {image && (
                      <div style={{ height: '100px' }}>
                        <img
                          style={{ objectFit: 'contain' }}
                          referrerPolicy='no-referrer'
                          src={image.preview}
                          id='main-img'
                          className=''
                          alt='imagem principal do produto'
                          widt='200'
                          height='100'
                        />
                      </div>
                    )}

                    <Form.Label className='fs-5 mt-5' htmlFor='upload'>
                      Imagem Principal
                    </Form.Label>
                    <FormControl
                      id='upload'
                      type='file'
                      className='form-control py-3'
                      onChange={(e) => {
                        Object.assign(e.target.files[0], {
                          preview: URL.createObjectURL(e.target.files[0]),
                        });
                        setImage(e.target.files[0]);
                      }}
                    />
                  </div>

                  <DropZone setContent={setImages} />
                  <div className='form-group mb-3 mt-5 d-flex align-items-center'>
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
                </div>
              </div>
              <div className='row'>
                <div className=''>
                  <button
                    type='submit'
                    className='btn-gradient btn-gradient--primary btn-gradient--sm'
                  >
                    Criar
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCreateScreen;
