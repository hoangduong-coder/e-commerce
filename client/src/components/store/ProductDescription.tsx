import { Box, Tab, Tabs, Typography } from "@mui/material"
import { ReactNode, SyntheticEvent, useState } from "react"
import { ComputerProduct, PhoneProduct } from "types/helpers/productHelper"

import ProductCharacteristicsTable from "./ProductCharacteristicsTable"
import ProductInformationTable from "./ProductInformationTable"

const TabPanel = ({
  children,
  value,
  selected,
}: {
  children: ReactNode
  value: number
  selected: number
}) => {
  return (
    <div hidden={value !== selected} role="tabpanel">
      {value === selected && children}
    </div>
  )
}

const ProductDescription = ({
  product,
}: {
  product: PhoneProduct | ComputerProduct
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(0)

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setSelectedValue(newValue)
  }

  const otherListItems = product.otherFeatures?.split("\n").map((feature) => (
    <li key={feature} className="product-otherFeature-list-item">
      <Typography variant="body1">{feature}</Typography>
    </li>
  ))

  return (
    <div>
      <Typography variant="h5" marginTop={2}>
        Description
      </Typography>
      <Typography variant="body1" marginTop={2}>
        {product.description}
      </Typography>
      <Box className="product-description-toggle">
        <Tabs value={selectedValue} onChange={handleTabChange}>
          <Tab label="Product basic information" />
          <Tab label="Characteristics" />
          {product.otherFeatures && product.otherFeatures.length > 0 && (
            <Tab label="Others" />
          )}
        </Tabs>
      </Box>
      <TabPanel value={0} selected={selectedValue}>
        <ProductInformationTable product={product} />
      </TabPanel>
      <TabPanel value={1} selected={selectedValue}>
        <ProductCharacteristicsTable product={product} />
      </TabPanel>
      {product.otherFeatures && product.otherFeatures.length > 0 && (
        <TabPanel value={2} selected={selectedValue}>
          <ul className="product-otherFeature-list">{otherListItems}</ul>
        </TabPanel>
      )}
    </div>
  )
}

export default ProductDescription
