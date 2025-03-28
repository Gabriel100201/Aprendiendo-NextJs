import Link from "next/link";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { CardComponent } from "@/components/CardComponent";

type Color = `#${string}`;

type Option = {
  name: string;
  subPath: string;
  icon?: IconName | "";
  bgColor?: Color;
};

const options: Option[] = [
  {
    name: "Agregar / Editar Categoria",
    subPath: "categorias",
    icon: "blocks",
  },
  {
    name: "Agregar / Editar Servicio",
    subPath: "servicios",
    icon: "file-pen-line",
  },
  {
    name: "Enlazar Servicio - Categoría",
    subPath: "categorias-servicios",
    icon: "link",
  }
];

export const OptionsSection = () => {
  return (
    <section className="flex gap-5 w-full h-40">
      {options.map((option) => (
        <Link
          key={option.name}
          href={`/dashboard/${option.subPath}`}
          style={{ flex: 1 }}
        >
          <CardComponent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: option.bgColor,
            }}
          >
            <DynamicIcon
              name={option.icon || "copy-plus"}
              size={52}
              color="#ec6608"
            />
            <span className="font-semibold text-xl">{option.name}</span>
          </CardComponent>
        </Link>
      ))}
    </section>
  );
};
