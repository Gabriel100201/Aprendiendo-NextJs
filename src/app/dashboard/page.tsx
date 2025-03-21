import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth-utils"
import { CardComponent } from "@/components/CardComponent";
import { getCategorias } from "@/actions/categorias/getCategorias";
import { AlterServicesByCatSection } from "./components/AlterServicesByCatSection";

export default async function DashboardPage() {
  const session = await getSession();
  const categorias = await getCategorias();
  const user = session?.user;

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col gap-5 px-12 py-8 w-full min-h-screen">
      <CardComponent>
        <h2 className="font-bold text-2xl">Bienvenido, {user?.nombre}</h2>
      </CardComponent>

      <section className="flex gap-5 w-full">
        <AlterServicesByCatSection categorias={categorias}/>
      </section>
    </main>
  );
}