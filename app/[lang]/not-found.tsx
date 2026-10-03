import Link from "next/link";
import { btn, container } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className={`${container} py-32 text-center`}>
      <p className="font-display text-7xl font-semibold text-forest">404</p>
      <h1 className="mt-4 text-3xl font-semibold">Page not found · الصفحة غير موجودة</h1>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/en" className={btn.primary}>Home</Link>
        <Link href="/ar" className={btn.outlineDark}>الرئيسية</Link>
      </div>
    </section>
  );
}
