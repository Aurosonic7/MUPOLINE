import Carrusel from "@/components/Carrusel/Carrusel";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-transparent mt-4">
        <Carrusel></Carrusel>
      </div>

      <div className="bg-[#252222] relative">
        <div className="font-poppins font-bold text-4xl text-white text-center mt-10">
          ¿Quiénes Somos?
        </div>
        <div className="mb-10 flex flex-wrap justify-center sm:flex-col gap-12 lg:grid lg:grid-cols-3">

          <div className="m-5 sm:ml-1 lg:ml-10 bg-[#ECECEC] rounded-3xl text-center">
            <div className="font-poppins font-bold text-2xl text-black m-3 pt-8">
              Historia
            </div>
            <p className="text-sm text-black m-3 pb-6">El 26 de Enero de 1686 este inmueble se inaugura como colegio de niñas llevando el nombre de "Las Doncellas de Nuestra Señora de la Presentación", posteriormente tuvo variados usos: fue la primera sede donde se exhibieron las joyas de la tumba 7 de Monte Albán, luego el edificio se convirtió en el Museo Regional del Estado hasta 1986; después fue ocupado por el Ayuntamiento hasta 1992; de 1993 a 2003, la casona albergó las instalaciones de la Secretaría de Turismo Estatal.</p>
          </div>

          <div className="m-5 bg-[#ECECEC] rounded-3xl text-center">
            <div className="font-poppins font-bold text-2xl text-black m-3 pt-8">
              Misión
            </div>
            <p className="text-sm text-black m-3 pb-6">El museo tiene como misión promover y participar en el desarrollo del arte en Oaxaca y el mundo, mediante la investigación de formas de hacer, ver y entender las artes visuales (pintura, escultura, fotografía, instalación y video), como una herramienta que posibilite una nueva topología viva y participativa para la comunidad, en consonancia con su naturaleza de conservación, análisis y difusión de obras de arte producidas desde Oaxaca.</p>
          </div>

          <div className="m-5 sm:mr-1 lg:mr-10 bg-[#ECECEC] rounded-3xl text-center">
            <div className="font-poppins font-bold text-2xl text-black m-3 pt-8">
              Visión
            </div>
            <p className="text-sm text-black m-3 pb-6">El MUPO tiene la obligación de ser un instrumento especial para la educación mediante el acercamiento a lo concreto, e incluso un instrumento de desarrollo controlado de la economía y un lugar accesible a todos y posicionarse como uno de los mejores museos al sureste de la República mediante la difusión de sus actividades, exposiciones y acervo expresando las diferentes formas de pensamiento a nivel regional, nacional e internacional.</p>
          </div>
        </div>
      </div>
    </div >


  );
}
