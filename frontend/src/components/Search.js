import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { fetchSubCategories, fetchProducts } from '../actions';

const Search = () => {
  const dispatch = useDispatch();
  const { products, success } = useSelector((state) => state.products);

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  const inputKeyword = useRef(null);
  const inputCategory = useRef(null);
  const inputPrice = useRef(null);
  const inputRating = useRef(null);

  let history = useHistory();

  const {
    loading,
    error,
    success: successSubCategories,
    subCategories,
  } = useSelector((state) => state.subCategories);
  useEffect(() => {
    if (subCategories.length === 0) {
      dispatch(fetchSubCategories());
    }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword || category || rating || price) {
      const query =
        `/ads/pesquisa/?keyword=${keyword}&category=${category}&price[lte]=${price}&avgRating=${rating}`
          .replace(/keyword=&/, '&')
          .replace(/category=&/, '&')
          .replace(/price\[lte\]=&/, '&')
          .replace(/avgRating=/, '')
          .replace(/(&&|&&&|&&&&|&&&&)/g, '&')
          .replace(/&$/, '');
      history.push(query);
      inputKeyword.current.value = null;
      inputCategory.current.selectedIndex = 0;
      inputPrice.current.selectedIndex = 0;
      inputRating.current.selectedIndex = 0;
    } else {
      history.push(history.location.pathname);
    }
    setKeyword('');
    setCategory('');
    setRating('');
    setPrice('');
  };
  return (
    <form onSubmit={onSubmitHandler} className='nav-form'>
      <InputGroup className='nav-form-input'>
        <InputGroup.Prepend>
          <FormControl
            ref={inputCategory}
            as='select'
            className='form-select form-select-sm nav-category'
            onChange={(e) => setCategory(inputCategory.current.value)}
          >
            <option>Todas Categorias</option>
            {subCategories && subCategories
              .map((subCategory) => subCategory.category)
              .reduce((acc, category) => {
                const x = acc.find((item) => item._id === category._id);
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
              .map((category) => (
                <optgroup label={category.name} key={category._id}>
                  {subCategories
                    .filter(
                      (subCategory) => subCategory.category._id === category._id
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
                      <option value={subCategory._id} key={subCategory._id}>
                        {subCategory.name}
                      </option>
                    ))}
                </optgroup>
              ))}
          </FormControl>
        </InputGroup.Prepend>
        <InputGroup.Prepend>
          <FormControl
            ref={inputPrice}
            as='select'
            className='form-select form-select-sm nav-rating'
            onChange={(e) => setPrice(inputPrice.current.value)}
          >
            <option>Preço</option>
            <option value='1000'>1,000 MTS</option>
            <option value='5000'>5,000 MTS</option>
            {_.range(10000, 100000, 10000).map((el, i) => (
              <option key={i + 1} value={el}>
                {Intl.NumberFormat('en-US').format(el)} MTS
              </option>
            ))}
            {_.range(100000, 600000, 100000).map((el, i) => (
              <option key={i + 1} value={el}>
                {Intl.NumberFormat('en-US').format(el)} MTS
              </option>
            ))}
            <option value='1000000'>1,000,000 MTS</option>
          </FormControl>
        </InputGroup.Prepend>

        <InputGroup.Prepend>
          <FormControl
            ref={inputRating}
            as='select'
            className='form-select form-select-sm nav-rating'
            onChange={(e) => setRating(inputRating.current.value)}
          >
            <option>Classificação</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='4.5'>4.5</option>
          </FormControl>
        </InputGroup.Prepend>

        <InputGroup.Append>
          <FormControl
            size='sm'
            className='nav-input'
            ref={inputKeyword}
            placeholder='pesquisar nome, marca e descrição...'
            onChange={(e) => setKeyword(inputKeyword.current.value)}
          />
        </InputGroup.Append>

        <InputGroup.Append>
          <Button type='submit' size='sm' variant='danger nav-btn'>
            <i className='fas fa-search text-ligth'></i> &nbsp; Pesquisar
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </form>
  );
};

export default Search;
