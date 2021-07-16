import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const SearchBar = () => {
  const { products, success } = useSelector((state) => state.products);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const inputKeyword = useRef(null);
  const inputCategory = useRef(null);
  const inputPrice = useRef(null);
  const inputRating = useRef(null);

  let history = useHistory();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword || category || rating || price) {
      history.push(
        `/?keyword=${keyword}&category=${category}&price=${price}&avgRating=${rating}`
      );
      inputKeyword.current.value = null;
      inputCategory.current.selectedIndex = 0;
      inputPrice.current.selectedIndex = 0;
      inputRating.current.selectedIndex = 0;
    } else {
      history.push(history.location.pathname);
    }
    setKeyword("");
    setCategory("");
    setRating("");
    setPrice("");
  };
  return (
    <form onSubmit={onSubmitHandler} className="nav-form d-flex">
      <InputGroup className="nav-form-input">
        <InputGroup.Prepend>
          <FormControl
            ref={inputCategory}
            as="select"
            className="form-select form-select-sm nav-category"
            onChange={(e) => setCategory(inputCategory.current.value)}
          >
            <option>Categoria</option>
            {success &&
              [...new Set(products.map((product) => product.category))].map(
                (category, ind) => (
                  <option key={ind} value={category}>
                    {category}
                  </option>
                )
              )}
          </FormControl>
        </InputGroup.Prepend>
        <InputGroup.Prepend>
          <FormControl
            ref={inputPrice}
            as="select"
            className="form-select form-select-sm nav-rating"
            onChange={(e) => setPrice(inputPrice.current.value)}
          >
            <option>Preço</option>
            <option value="1000">1,000 MTS</option>
            <option value="5000">5,000 MTS</option>
            {_.range(10000, 100000, 10000).map((el, i) => (
              <option key={i + 1} value={el}>
                {Intl.NumberFormat("en-US").format(el)} MTS
              </option>
            ))}
            {_.range(100000, 600000, 100000).map((el, i) => (
              <option key={i + 1} value={el}>
                {Intl.NumberFormat("en-US").format(el)} MTS
              </option>
            ))}
            <option value="1000000">1,000,000 MTS</option>
          </FormControl>
        </InputGroup.Prepend>

        <InputGroup.Prepend>
          <FormControl
            ref={inputRating}
            as="select"
            className="form-select form-select-sm nav-rating"
            onChange={(e) => setRating(inputRating.current.value)}
          >
            <option>Classificação</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4.5">4.5</option>
          </FormControl>
        </InputGroup.Prepend>

        <InputGroup.Append>
          <FormControl
            size="sm"
            className="nav-input"
            ref={inputKeyword}
            placeholder="pesquisar nome, marca e descrição..."
            onChange={(e) => setKeyword(inputKeyword.current.value)}
          />
        </InputGroup.Append>

        <InputGroup.Append>
          <Button type="submit" size="sm" variant="danger nav-btn">
            <i className="fas fa-search text-ligth"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
