import './store.scss';

import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  MenuList,
  Select,
  Slider,
} from '@mui/material';
import {CATEGORIES, PHONEBRAND} from '../../utils';

import {useState} from 'react';
import {useParams} from 'react-router-dom';
import ProductsFilter from './ProductsFilter';

const Products = () => {
  const {categoryId} = useParams ();
  const categoryTitle = CATEGORIES.find (category => category.id === categoryId)
    .title;
  const [sortOption, setSortOption] = useState ('');
  const [price, setPrice] = useState ([10, 100]);
  const [selectedBrand, setSelectedBrand] = useState ([]);
  const handleChangeOption = event => {
    setSortOption (event.target.value);
  };
  const handleChangePrice = (event, newPriceRange) => {
    event.preventDefault ();
    setPrice (newPriceRange);
  };
  const priceText = value => {
    return `€${value}`;
  };
  const handleChangeBrands = event => {
    event.preventDefault ();
    setSelectedBrand (
      typeof event.target.value === 'string'
        ? event.target.value.split (',')
        : event.target.value
    );
  };
  return (
    <div>
      <h1>{categoryTitle}</h1>
      <div className="filter-container">
        <ProductsFilter title={`Brand: ${selectedBrand.length} selected`}>
          <Box className="filter-box-selection">
            <MenuList
              value={selectedBrand}
              onChange={handleChangeBrands}
              renderValue={selected => selected.join (', ')}
            >
              {PHONEBRAND.map (name => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedBrand.indexOf (name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </MenuList>
          </Box>
        </ProductsFilter>
        <ProductsFilter title={`Price: From €${price[0]} to €${price[1]}`}>
          <Box className="price-slider">
            <Slider
              getAriaLabel={() => 'Price range'}
              value={price}
              max={1000}
              onChange={handleChangePrice}
              valueLabelDisplay="auto"
              getAriaValueText={priceText}
              className="price-filter-dropdown"
              marks={[
                {
                  value: 0,
                  label: '€0',
                },
                {
                  value: 1000,
                  label: '€1000',
                },
              ]}
            />
          </Box>
        </ProductsFilter>
        <FormControl className="sort-filter-box" size="small">
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
