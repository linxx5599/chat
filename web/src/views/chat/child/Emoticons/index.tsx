import React from "react";
import style from "./index.module.less";

import { Popover } from "antd";

import { insertAtCursor } from "@/utils";

//表情包数组 "\u{1f250}" - "\u{1f649}"
import emoticonsData from "./emoticonsData";

interface IProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  textAreaVal: string;
  setTextAreaVal: React.Dispatch<React.SetStateAction<string>>;
}
const Emoticons: React.FC<IProps> = ({
  open,
  setOpen,
  children,
  textAreaVal,
  setTextAreaVal
}) => {
  const content = emoticonsData.map((item, index) => {
    return (
      <span className={style["emoji-span"]} key={index}>
        {item}
      </span>
    );
  });
  let textAreaEl: HTMLTextAreaElement | null;

  const textAreaElFocus = (target?: Element) => {
    if (!textAreaEl) {
      textAreaEl = document.querySelector(".chat-content-right-footer-edit");
    }
    if (textAreaEl) {
      const text = target ? (target.innerHTML as string) : "";
      if (textAreaVal.length >= 1000) return;
      const { selectionEnd } = insertAtCursor(textAreaEl, text, {
        targetVal: textAreaVal,
        setTargetVal: setTextAreaVal
      });
      setOpen(false);
      textAreaEl.focus();
      if (selectionEnd || selectionEnd == 0) {
        setTimeout(() => {
          textAreaEl && (textAreaEl.selectionEnd = selectionEnd);
        }, 0);
      }
    }
  };
  const emojiClick = ({ target }: any) => {
    if (![...target.classList].includes(style["emoji-span"])) return;
    textAreaElFocus(target);
  };

  return (
    <>
      <Popover
        placement="topLeft"
        trigger="click"
        overlayClassName={style["emoji"]}
        content={
          <div className={style["emoji-war"]} onClick={emojiClick}>
            {content}
          </div>
        }
        open={open}
        onOpenChange={(newOpen: boolean) => {
          setOpen(newOpen);
        }}
      >
        <>{children}</>
      </Popover>
    </>
  );
};

export default Emoticons;
