const searchHandler = (searchedProduct)=>{
    if(searchedProduct){
      setName(searchedProduct.name);
      setPrice(searchedProduct.price);
      setRating(searchedProduct.rating);
      setCategory(searchedProduct.category);
      setDescription(searchedProduct.description);
      return {name, price, rating, category, description}
    }

  }
  const searchChangeHandler = (searchedProduct)=>{
    if(searchedProduct){
      setName(searchedProduct.name);
      setPrice(searchedProduct.price);
      setRating(searchedProduct.rating);
      setCategory(searchedProduct.category);
      setDescription(searchedProduct.description);
      return {name, price, rating, category, description}
    }
  }
