import clsx from "clsx";
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./TextLoading.module.css";

export interface TextLoadingProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TextLoading: FC<TextLoadingProps> = ({
  children,
  className,
  ...rest
}) => {
  const [loadingText, setLoadingText] = useState("");
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setLoadingText((text) => {
        if (text.length >= 3) {
          return "";
        }

        return text + ".";
      });
    }, 200);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  return (
    <div className={clsx(styles["loading__text"], className)} {...rest}>
      {children}
      <span className={styles["loading__dots"]}>{loadingText}</span>
    </div>
  );
};
