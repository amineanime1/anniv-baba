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
        subject: `Order #${order.id} annulé`,
        html: `
          <h1>Confirmation d'annulation de commande</h1>
          <p>Cher ${order.customer_name},</p>
          <p>Votre commande #${order.id} a été annulée comme demandé.</p>
          <p>Le montant total de ${order.total_amount} DZD sera remboursé selon votre méthode de paiement d'origine.</p>
          <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
          <p>Cordialement,<br>L'équipe de Les Plantes de Grand-père</p>
        `,
      });
    }
  } catch (error) {
    console.error('Failed to send cancellation email:', error); 
  }
}