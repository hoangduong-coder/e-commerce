import {FormControl, InputLabel, MenuItem, Select, Slider} from '@mui/material';

import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {CATEGORIES} from '../../utils';

const Products = () => {
  const {categoryId} = useParams ();
  const categoryTitle = CATEGORIES.find (category => category.id === categoryId)
    .title;
  const [sortOption, setSortOption] = useState ('');
  const [price, setPrice] = useState ([2, 2000]);
  const handleChangeOption = event => {
    setSortOption (event.target.value);
  };
  const handleChangePrice = (event, newPriceRange) => {
    setPrice (newPriceRange);
  };
  const priceText = value => {
    return `€${value}`;
  };
  return (
    <div>
      <h1>{categoryTitle}</h1>
      <div className="filter-container">
        <Select label="Price" className="filter-box">
          <Slider
            getAriaLabel={() => 'Price range'}
            value={price}
            onChange={handleChangePrice}
            valueLabelDisplay="auto"
            getAriaValueText={priceText}
            className="price-filter-dropdown"
          />
        </Select>
        <FormControl className="filter-box">
          <InputLabel>Brand</InputLabel>
        </FormControl>
        <FormControl className="filter-box">
          <InputLabel>Color</InputLabel>
        </FormControl>
        <FormControl className="sort-filter-box">
          <InputLabel>Sort</InputLabel>
          <Select value={sortOption} label="Sort" onChange={handleChangeOption}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="discount">By discount</MenuItem>
            <MenuItem value="price-ascending">By price (low to high)</MenuItem>
            <MenuItem value="price-descending">By price (high to low)</MenuItem>
          </Select>
        </FormControl>

      </div>
    </div>
  );
};
export default Products;
