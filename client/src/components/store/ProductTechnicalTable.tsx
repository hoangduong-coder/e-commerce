import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material"
import { ComputerProduct, PhoneProduct } from "types/helpers/productHelper"

const ProductTechnicalTable = ({
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
          <TableRow>
            <TableCell component="th" scope="row">
              Height (mm)
            </TableCell>
            <TableCell>
              <b>{product.height}</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Width (mm)
            </TableCell>
            <TableCell>
              <b>{product.width}</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Depth (mm)
            </TableCell>
            <TableCell>
              <b>{product.depth}</b>
            </TableCell>
          </TableRow>
          {product.weight && (
            <TableRow>
              <TableCell component="th" scope="row">
                Weight (g)
              </TableCell>
              <TableCell>
                <b>{product.weight}</b>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductTechnicalTable
