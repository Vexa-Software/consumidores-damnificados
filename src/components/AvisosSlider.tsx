import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Item {
  id: string;
  titulo: string;
  descripcion: string;

}

interface AvisosSliderProps {
  items: Item[];
}

export function AvisosSlider({ items }: AvisosSliderProps) {
  return (
    <div className="bg-[#F7F7F7] h-[450px] sm:h-[500px] 2xl:h-[700px] w-full my-16 flex flex-col justify-center ">
      <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center mb-16">Últimos Avisos Judiciales</h1>
      <div className="flex justify-center items-center  w-full">
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={120}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          className="relative w-full max-w-6xl 2xl:max-w-[90rem] "
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex justify-center w-[300px] sm:w-[600px] xl:w-[360px] 2xl:w-[470px] scale-90 transition-all duration-300 hover:scale-100 "
            >
              <div
                className="bg-white rounded-lg px-4 py-2 flex items-center space-x-4 min-h-[100px] 2xl:min-h-[200px] max-h-[350px] 2xl:max-h-[250px] w-[400px] sm:w-[full] xl:w-[full] 2xl:w-[90%] shadow-xl"
              >
             
                <div className="flex items-center justify-center">
                  <FaCheckCircle className="text-sky-500 text-4xl 2xl:text-5xl" />
                </div>

                
                <div className="flex flex-col flex-grow w-[90%] min-h-36 2xl:h-42 ">
                  <div className="flex flex-col h-28 2xl:h-26">
                    <h1 className="text-lg 2xl:text-xl font-bold text-gray-800 ">{item.titulo}</h1>
                    <p className="text-gray-600 text-sm mt-2 break-words line-clamp-3 2xl:line-clamp-5 overflow-hidden w-full whitespace-normal ">
                      {item.descripcion}
                    </p>
                  </div>

                  
                  <div className="flex justify-end w-full 2xl:mt-6">
                    <Link to="/avisos-judiciales">
                      <button className="bg-sky-500 text-white rounded-lg px-6 py-0 2xl:py-1 w-[110px] 2xl:w-[170px] ">
                        Ver más
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link to="/avisos-judiciales" className="text-sky-600 flex flex-row justify-center">Ver todos los Avisos Judiciales </Link>
    </div>
  );
}
