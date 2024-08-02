"use client";
import Button from "@mui/material/Button";
import CustomTable from "@/components/table";
import { TableCell, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

function createData(
  symbol: string,
  high: number,
  Low: number,
  Sell: number,
  ChangeRate: number,
  Buy: string
) {
  return { symbol: () => <h1>{symbol}</h1>, high, Low, Sell, ChangeRate, Buy };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, "12"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, "12"),
  createData("Eclair", 262, 16.0, 24, 6.0, "12"),
  createData("Cupcake", 305, 3.7, 67, 4.3, "12"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, "12"),
];
const fetchMarketStats = async (symbol: string) => {
  const response = await fetch(`http://localhost:3000/api/proxy`, {
    method:"POST",
    body: JSON.stringify({ symbol}),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["marketStats", "symbol"],
    queryFn: () => fetchMarketStats("BTC"),
    refetchInterval: 5000,
  });

  if (!isLoading) {
    console.log(data);
  }

  return (
    <>
      <Button variant="contained">salamam</Button>
      <CustomTable>
        {rows.map((row) => {
          return (
            <TableRow
              key={row.Sell}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.symbol()}
              </TableCell>
              <TableCell align="right">{row.Sell}</TableCell>
              <TableCell align="right">{row.Buy}</TableCell>
              <TableCell align="right">{row.high}</TableCell>
              <TableCell align="right">{row.Low}</TableCell>
              <TableCell align="right">{row.ChangeRate}</TableCell>
            </TableRow>
          );
        })}
      </CustomTable>
    </>
  );
}
