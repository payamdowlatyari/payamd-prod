import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({ name: "Payam Dowlatyari" }, { status: 200 });
};
