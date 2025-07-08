import style from "./orb.module.css";
import clsx from "clsx";
import {PropsWithChildren} from "react";

interface OrbProps {
  className?: string
}

export default function Orb({ className, children }: PropsWithChildren<OrbProps>) {
  return (
    <div className={clsx(style.orb, className)}>
      { children }
    </div>
  );
}
