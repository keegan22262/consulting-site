import { error, success } from "@/lib/server/apiResponse";
import { getAllServices } from "@/lib/sanityServices";

export const runtime = "nodejs";

export async function GET() {
  try {
    const services = await getAllServices();
    return success(services);
  } catch {
    return error("Failed to fetch services", 500);
  }
}
