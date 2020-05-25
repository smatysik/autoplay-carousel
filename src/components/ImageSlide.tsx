import React from "react";

interface Props {
  src: string;
}

const ImageSlide = ({ src }: Props): JSX.Element => <img src={src} alt={""} />;

export default ImageSlide;
