import Image from "next/image";

const Header = () => {
  return(
    <section className="bg-white h-20 flex justify-center">
      <div className="container w-full h-full flex justify-between items-center">
        <div className="h-full py-3 flex items-center gap-3">
          <Image src="/Logo-Sj.svg" alt="Logo Gobierno de San Juan" width={100} height={24}/>
          <div className="h-full w-0.5 rounded-3xl bg-primary-600/50"></div>
          <span className="text-xs font-semibold w-12">Gobierno Digital</span>
        </div>
      </div>
    </section>
  )
}

export default Header;