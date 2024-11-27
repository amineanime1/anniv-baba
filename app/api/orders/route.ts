import { NextResponse } from "next/server";
import { supabaseServerClient as supabase } from '@/lib/supabase/server-client';
import { sendOrderConfirmation } from '@/lib/email/send-order-confirmation';

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase client is not initialized" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase client is not initialized" },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Start a Supabase transaction
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: body.customerName,
        customer_email: body.customerEmail,
        customer_phone: body.customerPhone,
        wilaya: body.wilaya,
        address: body.address,
        notes: body.notes,
        total_amount: body.totalAmount,
        delivery_fee: body.deliveryFee,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = body.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price_at_time: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Update product stock
    for (const item of body.items) {
      const { error: stockError } = await supabase.rpc('update_product_stock', {
        p_product_id: item.productId,
        p_quantity: item.quantity
      });

      if (stockError) throw stockError;
    }

   // Send confirmation email if email is provided
   if (order.customer_email) {
    await sendOrderConfirmation(order);
  }
  
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}