/**
 * EMIRATES OPTICIAN: BRANCH ROUTING CONFIGURATION
 * Centralized registry for boutique WhatsApp numbers and metadata
 */

export interface BranchConfig {
  id: string;
  name: string;
  slug: string;
  whatsapp: string;
  location: string;
}

export const BRANCH_DIRECTORY: BranchConfig[] = [
  {
    id: "br-2",
    name: "Thiruvalla",
    slug: "thiruvalla",
    whatsapp: "+918714032602",
    location: "Pathanamthitta, Kerala"
  },
  {
    id: "br-3",
    name: "Pandalam",
    slug: "pandalam",
    whatsapp: "+918714032606",
    location: "Pathanamthitta, Kerala"
  }
];

export function getBranchBySlug(slug: string) {
  return BRANCH_DIRECTORY.find(b => b.slug === slug);
}

export function getBranchById(id: string) {
  return BRANCH_DIRECTORY.find(b => b.id === id);
}
