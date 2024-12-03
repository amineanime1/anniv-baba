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
          <h1>Merci pour votre commande !</h1>
          <p>Cher ${order.customer_name},</p>
          <p>Nous avons bien reçu votre commande et elle est en cours de traitement. Voici les détails de votre commande :</p>
          
          <h2>Résumé de la commande</h2>
          <p>Numéro de commande : #${order.id}</p>
          <p>Montant total : ${order.total_amount} DZD</p>
          
          <h2>Informations de livraison</h2>
          <p>Adresse de livraison : ${order.address}</p>
          <p>Wilaya : ${order.wilaya}</p>
          
          <p>Nous vous informerons lorsque votre commande aura été expédiée.</p>
          
          <p>Cordialement,<br>L'équipe de Les Plantes de Grand-père</p>
        `,
      });
    }

    // Send notification to admin
    await resend.emails.send({
      from: 'Grandpa\'s Plant Shop <orders@grandpasplants.dz>',
      to: ADMIN_EMAIL,
      subject: `New Order Received #${order.id}`,
      html: `
        <h1>Nouvelle commande reçue</h1>
        <h2>Détails de la commande</h2>
        <p>Numéro de commande : #${order.id}</p>
        <p>Client : ${order.customer_name}</p>
        <p>Téléphone : ${order.customer_phone}</p>
        <p>Email : ${order.customer_email || 'Non fourni'}</p>
        <p>Montant total : ${order.total_amount} DZD</p>
        
        <h2>Informations de livraison</h2>
        <p>Adresse : ${order.address}</p>
        <p>Wilaya : ${order.wilaya}</p>
        
        <p>Veuillez traiter cette commande dès que possible.</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
  }
}