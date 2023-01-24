import React from "react";
type Props = {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler;
};
const Icon = (props: Props) => {
  const { name, style = {}, className = "", onClick } = props;
  if (!name) {
    return <></>;
  }
  return (
    <svg
      onClick={(e) =>  onClick?.(e)}
      className={`icon icon-${name} ${className}`}
      style={style}
    >
      <use xlinkHref={"#" + name} />
    </svg>
  );
};
export default Icon;
