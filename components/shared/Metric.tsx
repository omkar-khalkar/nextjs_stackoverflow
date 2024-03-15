import React from "react";
import Image from "next/image";
import { text } from "stream/consumers";
import Link from "next/link";
interface MetricProps {
  imgURL: string;
  alt: string;
  value: string[] | number | string;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgURL,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  const MetricContent = (
    <>
      <Image
        src={imgURL}
        alt={alt}
        width={16}
        height={16}
        className={`invert-colors ${href ? "rounded-full" : ""}  `}
      />
      <p className={`${textStyles} flex  items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hideen" : ""} `}
        ></span>
        {title}
      </p>
    </>
  );

  if (href) {
    return <Link href={href} className="flex-center gap-1 ">{MetricContent}
    </Link>
  }

  return <div className="flex-center flex-wrap gap-1">{MetricContent}</div>;
};

export default Metric;
