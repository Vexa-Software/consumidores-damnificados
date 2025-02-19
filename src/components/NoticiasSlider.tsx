import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import NewsCard from "./NewsCard"; 
import { Link } from "react-router-dom";


interface Item {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?:string;
}

interface NoticiasSliderProps {
  items: Item[];
}

export function NoticiasSlider({ items }: NoticiasSliderProps) {
  return (
    <div className="bg-[#F7F7F7] h-[700px] w-full my-16 flex flex-col justify-center ">
      <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center mb-16">Últimas Noticias y Avisos Judiciales</h1>
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
        className="relative w-[70rem] 2xl:w-[90rem] mx-10 "
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className="w-[550px] xl:w-[370px] 2xl:w-[520px] "
          >
             <NewsCard
             imagen={item.imagen}
              title={item.titulo}
              description={item.descripcion}
     
              date={item.fecha}
            />
          </SwiperSlide>
        ))}

        
        {/* <div className="swiper-button-prev absolute -left-12 top-1/2 transform -translate-y-1/2 z-50 text-black hover:text-gray-900 text-3xl cursor-pointer"></div>
        <div className="swiper-button-next absolute -right-12 top-1/2 transform -translate-y-1/2 z-50 text-black hover:text-gray-900 text-3xl cursor-pointer"></div> */}
      </Swiper>
    </div>
    <Link to="/noticias" className="text-sky-600 flex flex-row justify-center">Ver todas las Noticias y Avisos Judiciales </Link>
    </div>
  );
}
