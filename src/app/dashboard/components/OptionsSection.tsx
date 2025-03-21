import { Button } from "@/components/ui/button";
import Link from "next/link";

export const OptionsSection = () => {
  return (
    <section className="flex gap-5 w-full">
      <Link href="/dashboard/addCategoria" className="flex-1">
        <Button size={"lg"}>Añadir / Quitar Categoría</Button>
      </Link>
    </section>
  );
};
