
import React from 'react';
//import React, { useRef } from 'react';
//import emailjs from 'emailjs-com';

interface ContactoProps {
  isHomePage?: boolean;
}

const Contacto: React.FC<ContactoProps> = ({ isHomePage = false}) => {
  //const form = useRef();

  /*const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'YOUR_SERVICE_ID', // Reemplaza con tu Service ID
        'YOUR_TEMPLATE_ID', // Reemplaza con tu Template ID
        form.current,
        'YOUR_PUBLIC_KEY' // Reemplaza con tu Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('Mensaje enviado con éxito.');
        },
        (error) => {
          console.log(error.text);
          alert('Hubo un error al enviar el mensaje.');
        }
      );

    e.target.reset(); 
  };*/


  return (

    <div className="  flex flex-col  items-center mx-auto  md:py-0">
      {!isHomePage &&
      <section className="areasdepractica-banner">
      <div className="flex flex-col-reverse gap-10  lg:flex-row items-center justify-between pb-10 lg:pb-0">
        {/* Columna de Información */}
        <div className='lg:w-[45%] px-[5%] lg:ps-[5%]'>
          <h2 className="font-bold text-4xl lg:text-5xl mb-5">Hace tu consulta</h2>
          <p className="text-md md:text-lg">
            Nuestro equipo de abogados está aquí <strong>para ayudarte.</strong> {" "}
            Completa el formulario o comunícate con nosotros  {" "}
            directamente para recibir una <strong> consulta personalizada.</strong>{" "}
            Estamos listos para atender tus <strong>necesidades legales</strong> de {" "}
            manera eficiente y profesional.
          </p>
        </div>


        {/* Columna de Imagen */}
        <div className='h-[40%] lg:w-[50%]'>
          <img
            src="/assets/img/contacto-banner-img.jpeg"
            alt="Áreas de práctica"
          />
        </div>
      </div>
    </section>}
      <div id="contact-form" className="bg-customBlue text-white w-full py-12 px-6 md:px-40">
        <h2 className="flex items-center justify-center font-bold mb-12 text-4xl lg:text-5xl">Contacto</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna izquierda: Formulario */}
          <div>
            <h2 className="text-2xl text-center md:text-start md:text-4xl font-bold mb-4">
              ¿Estás necesitando asesoría legal?
            </h2>
            <p className="text-gray-300 mb-6 text-sm md:text-base text-center md:text-start">
              En APM Abogados, nos especializamos en ofrecer soluciones jurídicas eficaces y a medida para cada uno de
              nuestros clientes. Complete el formulario y uno de nuestros abogados se pondrá en contacto con usted lo
              antes posible.
            </p>

            {/* Formulario */}
            <form className="flex flex-col gap-4">
              <h4>Nombre</h4>
              <input
                type="text"
                className="p-1 bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-white transition duration-300"
              />
              <h4>Email</h4>
              <input
                type="email"
                className="p-1 bg-transparent text-white border-b border-gray-400 focus:outline-none focus:border-white transition duration-300"
              />
              <h4>Mensaje</h4>
              <textarea
                className="p-3 text-white bg-customBlue border focus:outline-none"
                rows={5}
              ></textarea>
              <button
                type="submit"
                className="w-full md:w-fit bg-white text-primary px-10 py-2 md:px-20 md:py-4  md:mt-8 shadow hover:bg-gray-300 transition"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Columna derecha: Mapa */}
          <div className="w-full h-full flex justify-center items-center">
            <iframe
              src="https://maps.google.com/?q=General Juan D Perón 315 7° piso, CABA&output=embed"
              className="w-full md:w-[692px] h-[300px] md:h-[622px] shadow-md"
              title="Ubicación"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
