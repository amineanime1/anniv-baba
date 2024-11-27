import { NextResponse } from "next/server";
import { supabaseServerClient as supabase } from "@/lib/supabase/server-client";

export async function GET() {
  try {
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
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
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const productData = {
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock || 0,
      category: body.category,
      images: body.images || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("products")
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating product:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { 
        error: "Failed to create product",
        details: error.message 
      },
      { status: 500 }
    );
  }
}