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

interface NuestrosLogrosSliderProps {
  items: Item[];
}

export function NuestrosLogrosSlider({ items }: NuestrosLogrosSliderProps) {
  return (
    <div className="w-full flex flex-col justify-center ">
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
                className="bg-white rounded-lg px-4 py-2 flex items-center space-x-4 min-h-[100px] 2xl:min-h-[200px] max-h-[350px] 2xl:max-h-[850px] w-[400px] sm:w-[full] xl:w-[full] 2xl:w-[90%] shadow-xl"
              >
             
                <div className="flex items-center justify-center">
                  <FaCheckCircle className="text-sky-500 text-4xl 2xl:text-5xl" />
                </div>

                
                <div className="flex flex-col gap-4 justify-center flex-grow w-[90%] min-h-48 2xl:h-72 p-4 ">
                  <div className="flex flex-col">
                    <h1 className="text-lg 2xl:text-xl font-bold text-gray-800 ">{item.titulo}</h1>
                    <p className="text-gray-600 text-sm mt-2 break-words line-clamp-2 2xl:line-clamp-4 overflow-hidden w-full whitespace-normal ">
                      {item.descripcion}
                    </p>
                  </div>

                  
                  <div className="flex justify-end w-full 2xl:mt-6">
                    <Link to="/nuestros-logros">
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

      <Link to="/nuestros-logros" className="text-sky-600 flex flex-row justify-center">Ver todos Nuestros Logros </Link>
    </div>
  );
}
