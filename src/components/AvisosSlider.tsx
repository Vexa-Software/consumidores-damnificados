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
    <div className="bg-[#F7F7F7] h-[700px] w-full my-16 flex flex-col justify-center ">
      <h1 className="text-3xl font-bold text-center mb-16">Últimos Avisos Judiciales</h1>
      <div className=" flex flex-row justify-center items-center">
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
          className="relative w-[100rem] mx-10 "
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              className="w-[550px] scale-90 transition-all duration-300 hover:scale-100"
            >
              <div className="bg-white rounded-lg  px-10 flex items-center space-x-4 min-h-[200px] max-h-[250px] w-full"
                style={{
                  boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)", 
                }}>
              
                <div className=" flex items-center justify-center">
                  <FaCheckCircle className="text-sky-500 text-5xl" />
                </div>

             
                <div className="flex flex-col flex-grow w-[90%] h-42">
                  <div className="flex flex-col flex-grow h-24">
                    <h1 className="text-xl font-bold text-gray-800 ">{item.titulo}</h1>
                    <p className="text-gray-600 text-sm mt-2 break-words line-clamp-5 overflow-hidden w-full whitespace-normal ">
                      {item.descripcion}
                    </p>
                  </div>
                
                  <div className=" flex justify-end w-full">
                    <Link to="/avisos-judiciales"><button className="bg-sky-500 text-white rounded-lg px-6 py-1 w-[170px] mt-4">
                      Ver más
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

        
          {/* <div className="swiper-button-prev absolute -left-12 top-1/2 transform -translate-y-1/2 z-50 text-black hover:text-gray-900 text-3xl cursor-pointer"></div>
          <div className="swiper-button-next absolute -right-12 top-1/2 transform -translate-y-1/2 z-50 text-black hover:text-gray-900 text-3xl cursor-pointer"></div> */}
        </Swiper>

      </div>
      <Link to="/avisos-judiciales" className="flex flex-row justify-center">Ver todos los Avisos Judiciales </Link>
    </div>
  );
}
