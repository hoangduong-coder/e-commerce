import {InputAdornment, TextField} from '@mui/material';

import React from 'react';

function CreateForm () {
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
        <TextField
          required
          id="create-form-textfield"
          label="Color"
          type="color"
          name="color"
        />

      </form>
    </div>
  );
}

export default CreateForm;
