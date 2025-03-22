import Image from "next/image";

const Header = () => {
  return(
    <header className="flex justify-center bg-white px-6 h-20">
      <div className="flex justify-between items-center w-full h-full container">
        <div className="flex items-center gap-3 py-3 h-full">
          <Image src="/Logo-Sj.svg" alt="Logo Gobierno de San Juan" width={100} height={24}/>
          <div className="bg-primary-600/50 rounded-3xl w-0.5 h-full"></div>
          <span className="w-12 font-semibold text-xs">Gobierno Digital</span>
        </div>
      </div>
    </header>
  )
}

export default Header;