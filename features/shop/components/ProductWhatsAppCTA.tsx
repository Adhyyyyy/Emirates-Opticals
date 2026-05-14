"use client";

import React from "react";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getProductEnquiryMessage } from "@/lib/whatsapp";
import { BRANCH_DIRECTORY } from "@/lib/shop/branches";

interface ProductWhatsAppCTAProps {
  product: {
    name: string;
    brand: string;
    price: number;
  };
}

export function ProductWhatsAppCTA({ product }: ProductWhatsAppCTAProps) {
  // Default to the first branch or a general HQ number
  const defaultBranch = BRANCH_DIRECTORY[0];

  const message = getProductEnquiryMessage({
    productName: product.name,
    brandName: product.brand,
    price: product.price,
    branchName: defaultBranch.name
  });

  return (
    <div className="space-y-6">
      <div className="p-8 bg-brand-pearl/30 border border-black/5 rounded-[2rem]">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40 mb-6">Immediate Consultation</h3>
        
        <div className="space-y-4">
          <WhatsAppButton 
            phone={defaultBranch.whatsapp}
            message={message}
            label="Enquire via WhatsApp"
            className="w-full py-5 text-xs shadow-2xl"
          />
          <p className="text-[9px] text-center text-brand-charcoal/30 font-medium uppercase tracking-widest leading-relaxed">
            Chat instantly with our specialists at {defaultBranch.name} Boutique.
          </p>
        </div>
      </div>
    </div>
  );
}

