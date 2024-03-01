import { TableCell, TableRow } from "@mui/material"

export const TechnicalTableRow = ({
  title,
  value,
}: {
  title: string
  value: string | number | undefined
}) => (
  <>
    {value && value !== undefined && (
      <TableRow>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        <TableCell>
          <b>{value}</b>
        </TableCell>
      </TableRow>
    )}
  </>
)
