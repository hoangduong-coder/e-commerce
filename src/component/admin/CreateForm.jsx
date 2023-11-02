import {
  Box,
  Button,
  Chip,
  InputAdornment,
  ListItem,
  TextField,
} from '@mui/material';
import React, {useState} from 'react';

function CreateForm () {
  const [selectedColor, setSelectedColor] = useState ('#ffee00');
  const [productColors, setProductColors] = useState ([]);

  const deleteColor = deletedData => {
    setProductColors (productColors.filter (color => color !== deletedData));
  };
  const createProduct = async event => {
    event.preventDefault ();
  };

  return (
    <div>
      <h1>New products</h1>
      <form onSubmit={createProduct}>
        <TextField
          required
          fullWidth
          id="create-form-textfield"
          label="Title"
          name="title"
        />
        <TextField
          required
          id="create-form-textfield"
          label="Model"
          name="model"
        />
        <TextField
          required
          id="create-form-textfield"
          label="Brand"
          name="brand"
        />
        <TextField
          required
          id="create-form-textfield"
          label="Price"
          type="number"
          name="price"
          startAdornment={
            <InputAdornment position="start">
              €
            </InputAdornment>
          }
        />
        <Box>
          <TextField
            sx={{width: '50%'}}
            id="create-form-textfield"
            label="Color"
            type="color"
            name="color"
            value={selectedColor}
            onChange={event => {
              event.preventDefault ();
              setSelectedColor (event.target.value);
            }}
          />
          <Button
            onClick={() => {
              setProductColors ([...productColors, selectedColor]);
            }}
            variant="contained"
          >
            Add this color
          </Button>
        </Box>

        <Box>
          <h3>Selected color</h3>
          <div>
            {productColors.map (color => (
              <ListItem key={color}>
                <Chip
                  label={color}
                  onDelete={() => deleteColor (color)}
                  sx={{backgroundColor: color}}
                >
                  {color}
                </Chip>
              </ListItem>
            ))}
          </div>
        </Box>

      </form>
    </div>
  );
}

export default CreateForm;
