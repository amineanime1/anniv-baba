import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/config";

export async function GET() {
  try {
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }
    const { data, error } = await supabase
      .from("delivery_fees")
      .select("*")
      .order("wilaya", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch delivery fees" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!supabase) {
        throw new Error("Supabase client is not initialized");
      }
    const body = await request.json();
    const { data, error } = await supabase
      .from("delivery_fees")
      .insert([
        {
          wilaya: body.wilaya,
          fee: body.fee,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create delivery fee" },
      { status: 500 }
    );
  }
}