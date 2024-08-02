import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CustomTable({ children }: React.PropsWithChildren) {
  return (
    <TableContainer className=" shadow-lg border rounded-xl " component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="text-md font-bold ">symbol</TableCell>
            <TableCell className="text-md font-bold " align="center">high</TableCell>
            <TableCell className="text-md font-bold " align="center">Low</TableCell>
            <TableCell className="text-md font-bold " align="center">Sell</TableCell>
            <TableCell className="text-md font-bold " align="center">Buy</TableCell>
            <TableCell className="text-md font-bold " align="center">ChangeRate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
