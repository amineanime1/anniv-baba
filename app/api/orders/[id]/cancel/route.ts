import { NextResponse } from "next/server";
import { supabaseServerClient as supabase } from "@/lib/supabase/server-client";
import { sendOrderCancellationEmail } from "@/lib/email/send-order-cancellation";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase client is not initialized" },
      { status: 500 }
    );
  }

  try {
    // Get order details first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', params.id)
      .single();

    if (orderError) throw orderError;

    // Start a Supabase transaction
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('product_id, quantity')
      .eq('order_id', params.id);

    if (itemsError) throw itemsError;

    // Update product stock quantities
    for (const item of orderItems) {
      const { error: updateError } = await supabase.rpc('update_product_stock_refund', {
        p_product_id: item.product_id,
        p_quantity: item.quantity
      });

      if (updateError) throw updateError;
    }

    // Update order status
    const { error: orderUpdateError } = await supabase
      .from('orders')
      .update({
        status: 'annulé',
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id);

    if (orderUpdateError) throw orderUpdateError;

    // Send cancellation email if email exists
    if (order.customer_email) {
      await sendOrderCancellationEmail(order);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error cancelling order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to cancel order" },
      { status: 500 }
    );
  }
}