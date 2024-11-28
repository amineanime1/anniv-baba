import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabase/server-client";

export async function PATCH(
  request: Request,
  { params }: { params: { wilaya: string } }
) {
  try {
    const body = await request.json();
    if (!supabaseServerClient) {
      throw new Error("Supabase client is not initialized");
    }

    const { data, error } = await supabaseServerClient
      .from("delivery_fees")
      .upsert(
        {
          wilaya: params.wilaya,
          fee: body.fee,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "wilaya",
        }
      )
      .select()
      .single();

   
      if (error) {
        console.error("Error updating delivery fee:", error);
        throw error;
      }

      return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to update delivery fee:", error);
    return NextResponse.json(
      { error: "Failed to update delivery fee" },
      { status: 500 }
    );
  }
}