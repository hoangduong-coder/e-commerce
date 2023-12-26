import "./admin.css"

import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import { FormEvent, useState } from "react"

import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { CATEGORIES } from "../../utils"

function CreateForm() {
  const [selectedColor, setSelectedColor] = useState("#2979ff")
  const [productColors, setProductColors] = useState<string[]>([""])
  const [typeOption, setTypeOption] = useState({})

  const deleteColor = (deletedData: string) => {
    setProductColors(productColors.filter((color) => color !== deletedData))
  }
  const createProduct = async (event: FormEvent) => {
    event.preventDefault()
  }
  const handleChangeType = (event: SelectChangeEvent) => {
    setTypeOption(event.target.value)
  }

  return (
    <div>
      <h1>New products</h1>
      <form onSubmit={createProduct}>
        <Box mt={1}>
          <h3>Basic details</h3>
        </Box>
        <Grid container spacing={2} marginBlock={1}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              className="create-form-textfield"
              label="Title"
              name="title"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              className="create-form-textfield"
              label="Model"
              name="model"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              className="create-form-textfield"
              label="Brand"
              name="brand"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              className="create-form-textfield"
              label="Price"
              type="number"
              name="price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl required className="create-form-textfield">
              <InputLabel>Product type</InputLabel>
              <Select
                value={typeOption.title}
                label="Product type"
                className="create-form-type-dropdown"
                onChange={handleChangeType}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <TextField
          required
          fullWidth
          className="create-form-textfield"
          label="Description"
          name="description"
          multiline
          rows={8}
          sx={{ marginBlock: 1 }}
        />
        <Box mt={1}>
          <h3>Select color</h3>
        </Box>
        <Grid spacing={2} marginBlock={1} xs={5} container alignItems="stretch">
          <Grid item xs={5}>
            <TextField
              sx={{ width: "100%" }}
              className="create-form-textfield"
              label="Color"
              type="color"
              name="color"
              value={selectedColor}
              onChange={(event) => {
                event.preventDefault()
                setSelectedColor(event.target.value)
              }}
            />
          </Grid>
          <Grid item marginLeft={2}>
            <Button
              onClick={() => {
                setProductColors([...productColors, selectedColor])
              }}
              variant="contained"
              className="add-color-button"
            >
              Add this color
            </Button>
          </Grid>
        </Grid>
        <div className="color-selection-box">
          {productColors.length > 0 ? (
            productColors.map((color) => (
              <Chip
                key={color}
                label={color}
                onDelete={() => deleteColor(color)}
                sx={{ backgroundColor: color, marginRight: "1rem" }}
              >
                {color}
              </Chip>
            ))
          ) : (
            <p>No selected color</p>
          )}
        </div>
        <Box mt={1}>
          <h3>Import product pictures</h3>
        </Box>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ marginTop: 1 }}
        >
          <span>Upload file</span>
          <input type="file" className="create-form-image-input" />
        </Button>
      </form>
    </div>
  )
}

export default CreateForm
