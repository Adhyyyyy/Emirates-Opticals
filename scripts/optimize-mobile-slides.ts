import sharp from "sharp";
import { join } from "path";

const HERO_DIR = join(process.cwd(), "public", "Hero");

async function optimize() {
  console.log("⚡ Starting Mobile Hero Slide WebP Optimization...");
  const images = ["mobile1", "mobile2", "mobile3"];
  
  try {
    for (const img of images) {
      const inputPath = join(HERO_DIR, `${img}.png`);
      const outputPath = join(HERO_DIR, `${img}.webp`);
      
      console.log(`   - Compressing: ${img}.png -> ${img}.webp`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`   - [SUCCESS] Created optimized slide.`);
    }
    console.log("✨ All mobile slides optimized successfully!");
  } catch (error) {
    console.error("❌ Optimization failed:", error);
  }
}

optimize();
