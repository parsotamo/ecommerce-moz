import { useState, useRef } from 'react';
import { useSelector } from "react-redux";

const Search = (props)=>{
    const { products, success } = useSelector(state => state.products);
    const inputName = useRef("");
    const inputDescription = useRef("");
    const inputRating = useRef("");
    const inputCategory = useRef("");
    const inputPrice = useRef("");
  
    const searchHandler = (e)=>{
      let name = inputName.current.value;
      let price = inputPrice.current.value;
      let description = inputDescription.current.value;
      let rating = inputRating.current.value;
      let category = inputCategory.current.value;
        e.preventDefault();
        props.onSubmit({name, description, rating, category, price});
    }
    const searchChangeHandler = (e)=>{
      let name = inputName.current.value;
      let price = inputPrice.current.value;
      let description = inputDescription.current.value;
      let rating = inputRating.current.value;
      let category = inputCategory.current.value;

      props.onChange({name, description, rating, category, price});
    }
    return (
<section id="showcase">
        <div className="container text-center">
          <div className="home-search p-5">
            <div className="overlay p-5">
              <h1 className="display-4 mb-4">
                Pesquise Produtos 
              </h1>
              <p className="lead">Faça a seleção de qualquer </p>
              
            <div id="showcase-inner" className="showcase-search text-white py-5">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <form onSubmit={searchHandler}>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="sr-only">Nome</label>
                      <input ref={inputName} type="text" name="name" onChange={searchChangeHandler} className="form-control fs-4" placeholder="Nome" />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="sr-only">Valor</label>
                      <input ref={inputPrice} type="int" name="price" onChange={searchChangeHandler} className="form-control fs-4" placeholder="Valor do produto" />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="sr-only">Numéro de estrelas</label>
                      <select ref={inputRating} name="rating" onChange={searchChangeHandler} className="form-select fs-4">
                        <option value="">Escolha classificação</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="4.5">4.5</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="sr-only">Categoria</label>
                      <select ref={inputCategory} name="category" onChange={searchChangeHandler} className="form-select fs-4">
                        <option value="" selected="true">Categoria</option>
                        {success ?  [...new Set(products.map(product=>product.category))].map((category, ind) => (
                          <option key={ind} value={category}>{category}</option>
                        )) : null}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="sr-only">Descrição</label>
                      <input ref={inputDescription} type="text" name="description" onChange={searchChangeHandler} className="form-control fs-4" placeholder="Descrição..." />
                    </div>
                  </div>
                  <div className="d-grid">
                  <button className="btn btn-danger btn-block mt-4 fs-4" type="submit">Pesquisar</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    )
}

export default Search;