import React from "react";
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import SimpleLoader from "./SimpleLoader/SimpleLoader";

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<{
    facebook: string;
    instagram: string;
    enlaces_relacionados: string;
  }>({
    facebook: "",
    instagram: "",
    enlaces_relacionados: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchFooterData = async () => {
      setLoading(true);
      try {
        const enlacesRef = doc(db, "textos_sistema", "footer", "textos", "enlaces_relacionados");
        const facebookRef = doc(db, "textos_sistema", "footer", "textos", "facebook");
        const instagramRef = doc(db, "textos_sistema", "footer", "textos", "instagram");

        const [enlacesSnap, facebookSnap, instagramSnap] = await Promise.all([
          getDoc(enlacesRef),
          getDoc(facebookRef),
          getDoc(instagramRef)
        ]);

        const newError = {
          enlaces_relacionados: !enlacesSnap.exists(),
          facebook: !facebookSnap.exists(),
          instagram: !instagramSnap.exists()
        };

        setError(newError);
        setFooterData({
          enlaces_relacionados: enlacesSnap.exists() ? enlacesSnap.data()?.contenido || "" : "",
          facebook: facebookSnap.exists() ? facebookSnap.data()?.contenido || "" : "",
          instagram: instagramSnap.exists() ? instagramSnap.data()?.contenido || "" : ""
        });
      } catch (error) {
        console.error("Error obteniendo datos del footer:", error);
        setError({
          enlaces_relacionados: true,
          facebook: true,
          instagram: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-4">
        <SimpleLoader />
      </div>
    );
  }

  return (
    <footer className="bg-[#2A2A2B] text-white w-full py-6">
      <div className="container mx-auto flex flex-col sm:flex-row lg:flex-row justify-between items-center px-16 sm:px-20 lg:px-16">
        <div className="flex items-center justify-center lg:justify-start mb-6 lg:mb-0">
          <img
            src="/assets/img/consumidores-damnificados/footer-logo.png"
            alt="Consumidores Damnificados"
            className="w-[180px] object-contain"
          />
        </div>

        <div className="text-center text-sm text-gray-400 flex flex-wrap gap-4">
          <span className="text-white font-medium">Enlaces Relacionados:</span>
          {!error.enlaces_relacionados && footerData.enlaces_relacionados ? (
            <div dangerouslySetInnerHTML={{ __html: footerData.enlaces_relacionados }} />
          ) : (
            <p className="text-gray-500">No hay enlaces disponibles.</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!error.facebook && footerData.facebook && (
            <a href={footerData.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-white text-2xl hover:text-gray-400 transition" />
            </a>
          )}
          {!error.instagram && footerData.instagram && (
            <a href={footerData.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-2xl hover:text-gray-400 transition" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;










































// import React from "react";
// import { FaFacebookF, FaInstagram } from "react-icons/fa";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-[#2A2A2B] text-white w-full py-6">
//       <div className="container mx-auto flex flex-col sm:flex-row lg:flex-row justify-between items-center px-16 sm:px-20 lg:px-16">

//         <div className="flex items-center justify-center lg:justify-start mb-6 lg:mb-0">
//           <img
//             src="/assets/img/consumidores-damnificados/footer-logo.png"
//             alt="Consumidores Damnificados"
//             className="w-[180px] object-contain"
//           />
//         </div>


//         <div className="text-center text-sm text-gray-400 flex flex-col lg:flex-row lg:items-center lg:gap-4">
//           <span className="text-white font-medium">Enlaces Relacionados:</span>
//           {[
//             { name: "ssn.gov.ar", url: "https://www.ssn.gov.ar" },
//             { name: "enre.gov.ar", url: "https://www.enre.gov.ar" },
//             { name: "enargas.gov.ar", url: "https://www.enargas.gov.ar" },
//             { name: "cns.gov.ar", url: "https://www.cns.gov.ar" },
//             { name: "cnrt.gov.ar", url: "https://www.cnrt.gov.ar" },
//           ].map((link, index) => (
//             <a
//               key={index}
//               href={link.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-400 hover:text-white transition"
//             >
//               {link.name}
//             </a>
//           ))}
//         </div>


//         <div className="flex items-center gap-4 mt-6 lg:mt-0">
//           <a
//             href="https://www.facebook.com/consumidoresdamnificados/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-white p-2 rounded-full text-[#2A2A2B] hover:bg-gray-300 transition text-xl w-10 h-10 flex items-center justify-center"
//           >
//             <FaFacebookF />
//           </a>
//           <a
//             href="https://www.instagram.com/CONSUMIDORESDAMNIFICADOS/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-white p-2 rounded-full text-[#2A2A2B] hover:bg-gray-300 transition text-xl w-10 h-10 flex items-center justify-center"
//           >
//             <FaInstagram />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
