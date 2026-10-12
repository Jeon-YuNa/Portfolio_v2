import Image from "next/image";
import { ProjectImages } from "../data/image";
import { ProjectData } from "@/types/projects";
import nonymosaaImage from "../../../img/nonymosaa.png";

const ImageBox = ({
  siteURL,
  title,
}: Pick<ProjectData, "siteURL" | "title">) => {
  return (
    <div
      className="imgBox h-[30vh] mx-auto mb-3 overflow-hidden"
      data-aos="fade-left"
      data-aos-delay="200"
    >
      <a href={siteURL} target="_blank">
        <Image
          src={ProjectImages[`${title}`] || nonymosaaImage}
          alt=""
          className="img"
          priority
        ></Image>
      </a>
    </div>
  );
};

export default ImageBox;
