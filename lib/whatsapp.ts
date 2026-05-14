/**
 * EMIRATES OPTICIAN: WHATSAPP COMMUNICATION ENGINE
 * Optimized for Kerala Retail Operations & Multi-Branch Routing
 */

export type WhatsAppMessageType = "PRODUCT" | "APPOINTMENT" | "BRANCH_CONTACT" | "GENERAL";

interface WhatsAppConfig {
  phone: string;
  message: string;
}

/**
 * UTILITY: generateWhatsAppUrl
 * Handles encoding and platform-specific redirection
 */
export function generateWhatsAppUrl(phone: string, message: string): string {
  const cleanedPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  
  // Detection for WhatsApp Web vs Mobile App can be handled here if needed
  return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
}

/**
 * TEMPLATE: Product Enquiry
 */
export function getProductEnquiryMessage(data: {
  productName: string;
  brandName: string;
  price: number;
  branchName: string;
}) {
  return `Hello Emirates Optician,

I would like to enquire about this eyewear product.

Product: ${data.productName}
Brand: ${data.brandName}
Price: ₹${data.price.toLocaleString()}
Branch: ${data.branchName}

Please provide more details regarding availability and consultation.

Thank you.`;
}

/**
 * TEMPLATE: Appointment Booking
 */
export function getAppointmentMessage(data: {
  name: string;
  branchName: string;
  date: string;
  time: string;
  notes?: string;
}) {
  return `Hello Emirates Optician,

I would like to book a free eye test appointment.

Name: ${data.name}
Preferred Branch: ${data.branchName}
Preferred Date: ${data.date}
Preferred Time: ${data.time}
${data.notes ? `Additional Notes: ${data.notes}` : ""}

Please confirm my appointment.

Thank you.`;
}

/**
 * TEMPLATE: Branch Contact
 */
export function getBranchContactMessage(data: {
  name: string;
  branchName: string;
  subject: string;
  message: string;
}) {
  return `Hello Emirates Optician,

My name is ${data.name}.

I would like to contact the ${data.branchName} branch.

Subject: ${data.subject}
Message: ${data.message}

Please contact me regarding my enquiry.

Thank you.`;
}
