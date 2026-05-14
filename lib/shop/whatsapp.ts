import { Product } from "@/types/shop";

export type EnquiryType = "product" | "appointment" | "contact";

export const getWhatsAppUrl = (
  product: Product,
  branchPhone: string,
  branchName: string,
  type: EnquiryType = "product"
) => {
  const baseMessage = `Hello Emirates Optician,`;
  
  let enquiryDetails = "";
  
  if (type === "product") {
    enquiryDetails = 
      `I would like to enquire about this eyewear product.%0A%0A` +
      `*Product:* ${product.name}%0A` +
      `*Brand:* ${product.brand}%0A` +
      `*Price:* ₹${product.price.toLocaleString()}%0A` +
      `*Branch:* ${branchName}%0A%0A` +
      `Please provide more details regarding availability and consultation.`;
  } else if (type === "appointment") {
    enquiryDetails = 
      `I would like to book an appointment for this product.%0A%0A` +
      `*Product:* ${product.name}%0A` +
      `*Branch:* ${branchName}%0A%0A` +
      `Please let me know the available time slots.`;
  } else {
    enquiryDetails = 
      `I would like to contact the ${branchName} regarding this product: ${product.name}.`;
  }

  const footer = `%0A%0AThank you.`;
  
  const fullMessage = `${baseMessage}%0A%0A${enquiryDetails}${footer}`;
  const phone = branchPhone.replace(/\D/g, "");
  
  return `https://wa.me/${phone}?text=${fullMessage}`;
};
