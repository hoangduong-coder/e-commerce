import { Table, TableBody, Typography } from "@mui/material"
import { ComputerProduct, PhoneProduct } from "types/helpers/productHelper"

import { TechnicalTableRow } from "./TechnicalTableRow"

const ProductInformationTable = ({
  product,
}: {
  product: PhoneProduct | ComputerProduct
}) => {
  return (
    <div>
      <Typography variant="h6" marginTop={1}>
        Dimensions
      </Typography>
      <Table>
        <TableBody>
          <TechnicalTableRow title="Height (mm)" value={product.height} />
          <TechnicalTableRow title="Width (mm)" value={product.width} />
          <TechnicalTableRow title="Depth (mm)" value={product.depth} />
          <TechnicalTableRow title="Weight (g)" value={product.weight} />
        </TableBody>
      </Table>
      <Typography variant="h6" marginTop={1}>
        Product information
      </Typography>
      <Table>
        <TableBody>
          <TechnicalTableRow
            title="Device type"
            value={product.deviceType.join(", ")}
          />
          <TechnicalTableRow
            title="Warranty length (months)"
            value={product.warrantyLength}
          />
          <TechnicalTableRow title="EAN code" value={product.eanCode} />
          <TechnicalTableRow
            title="Product code"
            value={product.manufacturerProductCode}
          />
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductInformationTable
