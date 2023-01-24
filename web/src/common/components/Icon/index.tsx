import React from "react";
type IProps = {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<Element> | undefined;
};
const Icon: React.FC<IProps> = (props) => {
  const { name, style = {}, className = "", onClick } = props;
  if (!name) {
    return <></>;
  }
  return (
    <>
      <svg
        onClick={onClick}
        className={`icon icon-${name} ${className}`}
        style={style}
      >
        <use xlinkHref={"#" + name} />
      </svg>
    </>
  );
};
export default Icon;
