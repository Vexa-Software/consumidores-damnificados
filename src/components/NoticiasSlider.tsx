import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";


interface Item {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?: string;
}

interface NoticiasSliderProps {
  items: Item[];
}

export function NoticiasSlider({ items }: NoticiasSliderProps) {
  return (
    <div className="h-[700px] w-full mb-8 flex flex-col justify-center ">
      <div className="h-[500px]">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            }
          }}
          navigation
          pagination={{ clickable: true }}
          centeredSlides={false}
          loop={true}
          className="w-full"
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              className="w-full"
            >
              <NewsCard
                imagen={item.imagen}
                title={item.titulo}
                description={item.descripcion}

                date={item.fecha}
              />
            </SwiperSlide>
          ))}



        </Swiper>
      </div>
      <Link to="/noticias" className="text-sky-600 flex flex-row justify-center">Ver todas las Noticias y Avisos Judiciales </Link>
    </div>
  );
}
