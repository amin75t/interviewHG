"use client";
import Button from "@mui/material/Button";
import CustomTable from "@/components/table";
import { Badge, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { symbols } from "./data/Symbols-name";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalUnstyled from "@/components/model";
import { dataFormat } from "@/types/dataFormat";

function createData(
  symbol: string,
  high: number,
  Low: number,
  Sell: number,
  ChangeRate: number,
  Buy: string
) {
  return { symbol, high, Low, Sell, ChangeRate, Buy };
}

const fetchMarketStats = async (symbol: string) => {
  const response = await axios.post(`http://localhost:3000/api/proxy`, {
    symbol,
  });
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
};

export default function Home() {
  const [coinCliked, setCoinClicked] = useState<dataFormat>();
  const [open, setOpen] = useState(false);

  const [rows, setRows] = useState<any>([]);
  const { data, error, isLoading } = useQuery({
    queryKey: ["marketStats"],
    queryFn: () => Promise.all(symbols.map(fetchMarketStats)),
    refetchInterval: 5000,
  });

  // to update the state that store the data from server
  useEffect(() => {
    if (!isLoading) {
      setRows(
        data?.map((item) => {
          return createData(
            item.msg.data.symbol,
            item.msg.data.high,
            item.msg.data.low,
            item.msg.data.sell,
            item.msg.data.changeRate,
            item.msg.data.buy
          );
        })
      );
    }
  }, [data]);

  // call to update the model
  useEffect(() => {
    if (coinCliked !== undefined) {
      updateModelData(coinCliked?.symbol);
    }
  }, [data]);

  const updateModelData = (symbolClicked: string | undefined) => {
    const coin = data?.find((item) => item.msg.data.symbol === symbolClicked);
    setCoinClicked(coin.msg.data);
  };

  const handelClick = (symbolClicked: string) => {
    updateModelData(symbolClicked);
    setOpen(true);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2 ">
        <CustomTable>
          {rows.map((row: any) => {
            return (
              <TableRow
                key={row.Sell}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  onClick={() => handelClick(row.symbol)}
                  component="th"
                  scope="row"
                >
                  {row.symbol}
                </TableCell>
                <TableCell align="center">{row.Sell}</TableCell>
                <TableCell align="center">{row.Buy}</TableCell>
                <TableCell align="center">{row.high}</TableCell>
                <TableCell align="center">{row.Low}</TableCell>
                <TableCell align="center">
                  <Badge
                    className={`${
                      row.ChangeRate.includes("-")
                        ? "bg-red-400"
                        : "bg-green-400"
                    } px-2 rounded-xl py-1.5`}
                  >
                    {row.ChangeRate}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </CustomTable>
      </div>
      <ModalUnstyled open={open} setOpen={setOpen} coinData={coinCliked} />
    </div>
  );
}
