// pages/products/[id].tsx
import { NextResponse } from "next/server";
import { GetStaticProps, GetStaticPaths } from 'next';
import { supabase } from '@/lib/supabase/config';

export const getStaticPaths: GetStaticPaths = async () => {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return { paths: [], fallback: false };
  }
  const { data: products, error } = await supabase
    .from('products')
    .select('id');

  if (error) {
    console.error('Error fetching product IDs:', error);
    return { paths: [], fallback: false };
  }

  const paths = products.map((product: { id: string }) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return { notFound: true };
  }
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return { notFound: true };
  }

  return { props: { product } };
};
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase client is not initialized" },
        { status: 500 }
      );
    }
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase client is not initialized" },
        { status: 500 }
      );
    }
    const body = await request.json();
    const { data, error } = await supabase
      .from("products")
      .update({
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        category: body.category,
        images: body.images,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase client is not initialized" },
        { status: 500 }
      );
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}