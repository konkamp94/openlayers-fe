import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function BasicTable({ rows, labels} : { rows: any[], labels: string[] }) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                labels.map((label, index) => {
                    return index === 0 ?
                        (<TableCell key={index}>{label}</TableCell>) :
                        (<TableCell key={index} align="right">{label}</TableCell>)
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              
              <TableRow
                id={`row-${row?.id ?? index}`}
                key={`row-${row?.id ?? index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {
                    Object.keys(row).map((key, index) => {
                        return index === 0 ?
                            (<TableCell key={`cell-${key}-${row?.id ?? index}`} component="th" scope="row">{row[key]}</TableCell>) :
                            (<TableCell key={`cell-${key}-${row?.id ?? index}`} align="right">{row[key]}</TableCell>)
                    })
                }
              </TableRow>
            )
            )
          }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }