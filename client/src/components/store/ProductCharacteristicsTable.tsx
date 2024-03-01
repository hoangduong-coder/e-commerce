import { Table, TableBody, Typography } from "@mui/material"
import { ComputerProduct, PhoneProduct } from "types/helpers/productHelper"

import { TechnicalTableRow } from "./TechnicalTableRow"

const ProductCharacteristicsTable = ({
  product,
}: {
  product: PhoneProduct | ComputerProduct
}) => {
  return (
    <div>
      <Typography variant="h6" marginTop={1}>
        Characteristics
      </Typography>
      <Table>
        <TableBody>
          <TechnicalTableRow
            title="Power (W)"
            value={(product as ComputerProduct).power}
          />
          <TechnicalTableRow
            title="Sound reproduction"
            value={(product as ComputerProduct).soundReproduction}
          />
          <TechnicalTableRow
            title="Screen size (inch)"
            value={product.screenSize}
          />
          <TechnicalTableRow
            title="Screen resolution"
            value={product.screenResolution}
          />
          <TechnicalTableRow
            title="Refresh rate (Hz)"
            value={product.refreshRate}
          />
          <TechnicalTableRow title="Camera" value={product.camera} />
          <TechnicalTableRow
            title="Front-camera"
            value={(product as PhoneProduct).frontCamera}
          />
          <TechnicalTableRow title="Processor" value={product.processor} />
          <TechnicalTableRow
            title="Operating system"
            value={product.operatingSystem}
          />
          <TechnicalTableRow
            title="Video card"
            value={(product as ComputerProduct).videoCard}
          />
          <TechnicalTableRow
            title="Resistance ability"
            value={(product as PhoneProduct).resistanceAbility.join(", ")}
          />
          <TechnicalTableRow
            title="Battery"
            value={product.batteryCharacteristics}
          />
          <TechnicalTableRow
            title="Inner memory available (GB)"
            value={product.innerMemory.join(", ")}
          />
          <TechnicalTableRow
            title="RAM memory (GB)"
            value={product.ramMemory}
          />
        </TableBody>
      </Table>
      <Typography variant="h6" marginTop={1}>
        Connectivity
      </Typography>
      <Table>
        <TableBody>
          <TechnicalTableRow
            title="Compatibility"
            value={product.compatibility}
          />
          <TechnicalTableRow
            title="Supported network"
            value={product.supportedNetwork}
          />
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductCharacteristicsTable
