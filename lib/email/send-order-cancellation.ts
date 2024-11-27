import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@grandpasplants.dz';

export async function sendOrderCancellationEmail(order: any) {
  try {
    // Send email to customer
    if (order.customer_email) {
      await resend.emails.send({
        from: 'Grandpa\'s Plant Shop <orders@grandpasplants.dz>',
        to: order.customer_email,
        subject: `Order #${order.id} Cancelled`,
        html: `
          <h1>Order Cancellation Confirmation</h1>
          <p>Dear ${order.customer_name},</p>
          <p>Your order #${order.id} has been cancelled as requested.</p>
          <p>The total amount of ${order.total_amount} DZD will be refunded according to your original payment method.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>Grandpa's Plant Shop Team</p>
        `,
      });
    }
  } catch (error) {
    console.error('Failed to send cancellation email:', error);
  }
}