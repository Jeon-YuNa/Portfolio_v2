import {
  FaAndroid,
  FaCss3,
  FaFigma,
  FaHtml5,
  FaJsSquare,
} from "react-icons/fa";
import { SiGreensock, SiNestjs, SiPhp, SiWebgl } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { IoLogoFirebase } from "react-icons/io5";
import { JSX } from "react";
import { RiNextjsFill, RiReactjsLine } from "react-icons/ri";
import { TbBrandReactNative } from "react-icons/tb";
export const skillIcons: Record<string, JSX.Element> = {
  HTML: <FaHtml5 />,
  CSS: <FaCss3 />,
  JS: <FaJsSquare />,
  TS: <BiLogoTypescript />,
  GSAP: <SiGreensock />,
  NestJS: <SiNestjs />,
  NextJS: <RiNextjsFill />,
  firebase: <IoLogoFirebase />,
  React: <RiReactjsLine />,
  PHP: <SiPhp />,
  webGL: <SiWebgl />,
  ReactNative: <TbBrandReactNative />,
  Androidstudio: <FaAndroid />,
  Figma: <FaFigma />,
};
