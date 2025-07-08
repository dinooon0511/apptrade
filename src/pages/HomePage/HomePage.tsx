import Coin from "@/components/Coin/Coin.tsx";
import style from "./home.module.css";
import {useCallback, useRef} from "react";
import Balance from "@/components/Balance/Balance.tsx";
import Counter from "@/components/Counter/Counter.tsx";
import BottomMenu from "@/components/BottomMenu/BottomMenu.tsx";
import { useAppStore } from "@/store/appStore.ts";
import {initData, useSignal} from "@telegram-apps/sdk-react";
import Modal from "@/components/Modal/Modal.tsx";

export default function HomePage() {
  const user = useSignal(initData.user);
  const coinRef = useRef<HTMLImageElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { energi, money, spendEnegi, max_energi } = useAppStore();

  if (user === undefined) {
    throw new Error("Invalid user");
  }

  const handleModalOpen = useCallback(() => {
    dialogRef.current!.showModal()
  }, []);

  const handlePointerDown = useCallback(() => {
    if (coinRef.current) {
      coinRef.current.style.transform = "scale(0.95)";
      setTimeout(() => {
        coinRef.current!.style.transform = "";
      }, 100);
    }
    if (energi === 0 || energi === 1) {
        handleModalOpen();
    }
    spendEnegi();
  }, [spendEnegi, energi, handleModalOpen]);


  const handleModalClose = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dialogRef.current?.close();
    }
  }, []);

  return (
    <>
      <Balance balance={money} />
      <div className={style.coinWrapper}>
        <Coin
          ref={coinRef}
          className="page-coin"
          onPointerDown={handlePointerDown}
          style={{ touchAction: "manipulation" }}
        />
        <Counter max={max_energi} current={energi} onButtonClick={handleModalOpen} />
      </div>
      <Modal ref={dialogRef} handleModalClose={handleModalClose}  />
      <BottomMenu/>
    </>
  );
}
