import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// symbol
// high
// Low
// Sell
// Buy
// ChangeRate

export default function CustomTable({ children }: React.PropsWithChildren) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }}  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>symbol</TableCell>
            <TableCell>high</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Sell</TableCell>
            <TableCell align="right">Buy</TableCell>
            <TableCell align="right">ChangeRate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
