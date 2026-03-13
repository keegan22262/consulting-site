import fs from "fs";
import path from "path";
import https from "https";

const PROJECT_ROOT = process.cwd();

const TARGET_DIRECTORIES = [
  "public/images/industries",
  "public/images/industries/hero",
  "public/images/industries/philosophy",
  "public/images/industries/analytical",
  "public/images/industries/sectors",
  "public/images/insights/sectors",
];

const IMAGE_ASSETS = [
  {
    group: "hero",
    fileName: "hero-boardroom.jpg",
    url: "https://images.unsplash.com/photo-1573166364839-1bfe9196c23e",
    outputDir: "public/images/industries/hero",
  },
  {
    group: "hero",
    fileName: "hero-bridge-infrastructure.jpg",
    url: "https://images.unsplash.com/photo-1681154469337-5e376fbc224c",
    outputDir: "public/images/industries/hero",
  },
  {
    group: "hero",
    fileName: "hero-digital-command-center.jpg",
    url: "https://images.unsplash.com/photo-1621361356099-704eb70d9f0f",
    outputDir: "public/images/industries/hero",
  },
  {
    group: "hero",
    fileName: "hero-city-skyline.jpg",
    url: "https://images.unsplash.com/photo-1764129669382-ec26da02a313",
    outputDir: "public/images/industries/hero",
  },
  {
    group: "philosophy",
    fileName: "energy-grid.jpg",
    url: "https://images.unsplash.com/photo-1768839722571-c45c96186dee",
    outputDir: "public/images/industries/philosophy",
  },
  {
    group: "philosophy",
    fileName: "manufacturing-plant.jpg",
    url: "https://images.unsplash.com/photo-1583737097428-af53774819a2",
    outputDir: "public/images/industries/philosophy",
  },
  {
    group: "philosophy",
    fileName: "logistics-port.jpg",
    url: "https://images.unsplash.com/photo-1769144256207-bc4bb75b29db",
    outputDir: "public/images/industries/philosophy",
  },
  {
    group: "philosophy",
    fileName: "consulting-office.jpg",
    url: "https://images.unsplash.com/photo-1696453423411-3fc7847a9611",
    outputDir: "public/images/industries/philosophy",
  },
  {
    group: "analytical",
    fileName: "financial-data-modeling.jpg",
    url: "https://images.unsplash.com/photo-1769684328001-dc78599f1518",
    outputDir: "public/images/industries/analytical",
  },
  {
    group: "analytical",
    fileName: "infrastructure-blueprints.jpg",
    url: "https://images.unsplash.com/photo-1760553120312-2821bf54e767",
    outputDir: "public/images/industries/analytical",
  },
  {
    group: "analytical",
    fileName: "digital-command-center.jpg",
    url: "https://images.unsplash.com/photo-1621361356099-704eb70d9f0f",
    outputDir: "public/images/industries/analytical",
  },
  {
    group: "sectors",
    fileName: "financial-services.jpg",
    url: "https://images.unsplash.com/photo-1643258367012-1e1a983489e5",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "technology-digital.jpg",
    url: "https://images.unsplash.com/photo-1645477704075-cb3d14b349ee",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "energy-resources.jpg",
    url: "https://images.unsplash.com/photo-1772376920750-dac1470b1bad",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "healthcare-life-sciences.jpg",
    url: "https://images.unsplash.com/photo-1768498993096-6db9950eeb1b",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "real-estate-infrastructure.jpg",
    url: "https://images.unsplash.com/photo-1770821013075-7977754dfd8f",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "public-sector-government.jpg",
    url: "https://images.unsplash.com/photo-1763434802399-0a93a66b187a",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "industrials-manufacturing.jpg",
    url: "https://images.unsplash.com/photo-1704580115974-64d5a2f32195",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "consumer-retail.jpg",
    url: "https://images.unsplash.com/photo-1758633854736-8973bcd84dd1",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "transport-logistics.jpg",
    url: "https://images.unsplash.com/photo-1532559765652-3f6070dcea83",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "private-capital.jpg",
    url: "https://images.unsplash.com/photo-1712567604499-08f207054260",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "sectors",
    fileName: "education.jpg",
    url: "https://images.unsplash.com/photo-1759092912891-9f52486bb059",
    outputDir: "public/images/industries/sectors",
  },
  {
    group: "insight-sectors",
    fileName: "technology.jpg",
    url: "https://images.unsplash.com/photo-1663932210347-164a05ed0ccd",
    outputDir: "public/images/insights/sectors",
  },
  {
    group: "insight-sectors",
    fileName: "finance.jpg",
    url: "https://images.unsplash.com/photo-1768991875855-856924832d4d",
    outputDir: "public/images/insights/sectors",
  },
  {
    group: "insight-sectors",
    fileName: "infrastructure.jpg",
    url: "https://images.unsplash.com/photo-1768404799633-47e76c68c135",
    outputDir: "public/images/insights/sectors",
  },
  {
    group: "insight-sectors",
    fileName: "public-policy.jpg",
    url: "https://images.unsplash.com/photo-1770068511771-7c146210a55b",
    outputDir: "public/images/insights/sectors",
  },
  {
    group: "insight-sectors",
    fileName: "strategy.jpg",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    outputDir: "public/images/insights/sectors",
  },
];

function ensureDirectories() {
  console.log("[setup] Ensuring target directories exist...");
  for (const relativeDir of TARGET_DIRECTORIES) {
    const absoluteDir = path.join(PROJECT_ROOT, relativeDir);
    fs.mkdirSync(absoluteDir, { recursive: true });
    console.log(`[setup] OK: ${relativeDir}`);
  }
}

function createUnsplashUrl(baseUrl) {
  const url = new URL(baseUrl);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("q", "80");
  url.searchParams.set("w", "1920");
  return url.toString();
}

function downloadWithRedirects(url, destinationPath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error("Too many redirects"));
      return;
    }

    const request = https.get(url, (response) => {
      const statusCode = response.statusCode || 0;

      if ([301, 302, 303, 307, 308].includes(statusCode)) {
        const redirectLocation = response.headers.location;
        response.resume();

        if (!redirectLocation) {
          reject(new Error(`Redirect without location header (${statusCode})`));
          return;
        }

        const nextUrl = new URL(redirectLocation, url).toString();
        downloadWithRedirects(nextUrl, destinationPath, redirectCount + 1)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (statusCode < 200 || statusCode >= 300) {
        response.resume();
        reject(new Error(`HTTP ${statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(destinationPath);

      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close(() => resolve());
      });

      fileStream.on("error", (streamError) => {
        fileStream.close(() => {
          if (fs.existsSync(destinationPath)) {
            fs.unlinkSync(destinationPath);
          }
          reject(streamError);
        });
      });
    });

    request.on("error", (error) => {
      reject(error);
    });

    request.setTimeout(30000, () => {
      request.destroy(new Error("Request timeout"));
    });
  });
}

async function run() {
  ensureDirectories();

  const downloaded = [];
  const skipped = [];
  const failed = [];

  console.log("[download] Starting image download process...");

  for (const asset of IMAGE_ASSETS) {
    const destinationPath = path.join(PROJECT_ROOT, asset.outputDir, asset.fileName);
    const destinationRelative = path.relative(PROJECT_ROOT, destinationPath).replace(/\\/g, "/");

    if (fs.existsSync(destinationPath)) {
      console.log(`[skip] Already exists: ${destinationRelative}`);
      skipped.push(destinationRelative);
      continue;
    }

    const sourceUrl = createUnsplashUrl(asset.url);
    console.log(`[download] ${asset.group}: ${asset.fileName}`);

    try {
      await downloadWithRedirects(sourceUrl, destinationPath);
      console.log(`[ok] Saved: ${destinationRelative}`);
      downloaded.push(destinationRelative);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`[error] Failed: ${destinationRelative} -> ${message}`);
      failed.push({ file: destinationRelative, error: message });
    }
  }

  console.log("\n=== Download Summary ===");
  console.log(`Downloaded: ${downloaded.length}`);
  console.log(`Skipped: ${skipped.length}`);
  console.log(`Failed: ${failed.length}`);

  if (downloaded.length > 0) {
    console.log("\nDownloaded files:");
    for (const file of downloaded) {
      console.log(`- ${file}`);
    }
  }

  if (skipped.length > 0) {
    console.log("\nSkipped existing files:");
    for (const file of skipped) {
      console.log(`- ${file}`);
    }
  }

  if (failed.length > 0) {
    console.log("\nFailed files:");
    for (const item of failed) {
      console.log(`- ${item.file} (${item.error})`);
    }
  }

  if (failed.length === 0) {
    console.log("\nSuccess: all requested image assets are available locally.");
  } else {
    console.log("\nCompleted with partial failures. Re-run the script to retry failed downloads.");
  }
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[fatal] ${message}`);
  process.exitCode = 1;
});
