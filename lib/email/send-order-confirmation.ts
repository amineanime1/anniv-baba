import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@grandpasplants.dz';

export async function sendOrderConfirmation(order: any) {
  try {
    // Send confirmation to customer
    if (order.customer_email) {
      await resend.emails.send({
        from: 'Grandpa\'s Plant Shop <orders@grandpasplants.dz>',
        to: order.customer_email,
        subject: `Order Confirmation #${order.id}`,
        html: `
          <h1>Thank you for your order!</h1>
          <p>Dear ${order.customer_name},</p>
          <p>We've received your order and it's being processed. Here are your order details:</p>
          
          <h2>Order Summary</h2>
          <p>Order Number: #${order.id}</p>
          <p>Total Amount: ${order.total_amount} DZD</p>
          
          <h2>Delivery Information</h2>
          <p>Delivery Address: ${order.address}</p>
          <p>Wilaya: ${order.wilaya}</p>
          
          <p>We'll notify you when your order has been shipped.</p>
          
          <p>Best regards,<br>Grandpa's Plant Shop Team</p>
        `,
      });
    }

    // Send notification to admin
    await resend.emails.send({
      from: 'Grandpa\'s Plant Shop <orders@grandpasplants.dz>',
      to: ADMIN_EMAIL,
      subject: `New Order Received #${order.id}`,
      html: `
        <h1>New Order Received</h1>
        <h2>Order Details</h2>
        <p>Order Number: #${order.id}</p>
        <p>Customer: ${order.customer_name}</p>
        <p>Phone: ${order.customer_phone}</p>
        <p>Email: ${order.customer_email || 'Not provided'}</p>
        <p>Total Amount: ${order.total_amount} DZD</p>
        
        <h2>Delivery Information</h2>
        <p>Address: ${order.address}</p>
        <p>Wilaya: ${order.wilaya}</p>
        
        <p>Please process this order as soon as possible.</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
  }
}