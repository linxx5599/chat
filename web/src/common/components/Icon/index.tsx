import React from "react";
type Props = {
  name: string;
  style?: React.CSSProperties;
  className?: string;
};
const Icon = (props: Props) => {
  const { name, style = {}, className = "" } = props;
  if (!name) {
    return <></>
  }
  return (
    <svg className={`icon icon-${name} ${className}`} style={style}>
      <use xlinkHref={"#" + name} />
    </svg>
  );
};
export default Icon;
