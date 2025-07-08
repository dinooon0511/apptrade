import LightningIcon from "@/icons/lightning-icon.tsx";
import style from "./counter.module.css";
import Orb from "@/components/Orb/Orb.tsx";

interface CounterProps {
  max: number,
  current: number,
  onButtonClick?: () => void
}

export default function Counter({max, current, onButtonClick}: CounterProps) {
  return (
    <div className={style.counterWrapper}>
      <LightningIcon />
      <span>{current}/{max}</span>
        <button onClick={onButtonClick} className={style.openModalButton}>
          <Orb>+</Orb>
        </button>
    </div>
  );
}
