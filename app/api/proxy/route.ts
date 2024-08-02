import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { symbol } = await request.json();
  try {
    const response = await axios.get(
      `https://api.kucoin.com/api/v1/market/stats?symbol=${symbol}-USDT`
    );    
    return NextResponse.json({ msg: response.data });
  } catch (error) {
    
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 501 }
    );
  }
}
