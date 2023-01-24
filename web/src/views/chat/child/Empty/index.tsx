import React from "react";
import Icon from "@/common/components/Icon";

const Empty: React.FC = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          name="chat"
          style={{
            width: "15%",
            height: "15%",
            fill: "var(--colorPrimary)"
          }}
        />
      </div>
    </>
  );
};

export default Empty;
