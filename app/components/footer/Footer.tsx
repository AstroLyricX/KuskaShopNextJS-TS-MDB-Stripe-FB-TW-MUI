import Link from "next/link";
import { Container } from "../Container";
import { FooterList } from "./FooterList";

import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href="#">Textiles</Link>
            <Link href="#">Cerámicas</Link>
            <Link href="#">Retablos</Link>
            <Link href="#">Cajas Decoradas</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Servicio al Cliente</h3>
            <Link href="#">Contáctanos</Link>
            <Link href="#">Política de Envío</Link>
            <Link href="#">Devoluciones</Link>
            <Link href="#">Preguntas Frecuentes</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">Sobre Nosotros</h3>
            <p className="mb-2">
              En KuskaShop, nuestra pasión es impulsar la riqueza de la
              artesanía peruana y llevarla a un escenario global. Nos
              enorgullece ser el nexo que conecta a los talentosos artesanos
              peruanos con una audiencia diversa y apasionada por el arte y la
              cultura. Cada producto que ofrecemos cuenta una historia única y
              refleja la dedicación y habilidad de los artesanos detrás de cada
              creación. Nuestra misión es preservar y perpetuar el legado
              cultural de Perú, garantizando que estas tradiciones perduren y
              prosperen. Únete a nosotros en este viaje emocionante de
              descubrimiento y apreciación de la auténtica belleza peruana. En
              KuskaShop, estamos comprometidos con la sostenibilidad, la equidad
              y la promoción de la creatividad de los artesanos. ¡Descubre el
              encanto de la artesanía peruana con nosotros!
            </p>
            <p>
              &copy; {new Date().getFullYear()} KuskaShop. Todos los derechos
              reservados{" "}
            </p>
          </div>

          <FooterList>
            <h3 className="text-base font-bold mb-2">Síguenos</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
