import {
  type SetStateAction,
  type Dispatch,
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";
import { trapFocus } from "../utils/trapFocus";

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & ComponentPropsWithoutRef<"dialog">;

export function Modal({
  isOpen,
  setIsOpen,
  className,
  children,
  ...rest
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = ref.current;

    if (!dialogElement) return;

    if (!isOpen) {
      dialogElement.close();

      return;
    }

    dialogElement.showModal();

    const handleKeydown = (e: KeyboardEvent) => {
      trapFocus<HTMLDialogElement>(dialogElement, e);
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className={twMerge(
        "rounded-xl p-0 shadow-[0_0_20px_20px] shadow-primary-500 outline-none backdrop:bg-gray-400 backdrop:bg-opacity-50 open:animate-fadeIn open:backdrop:animate-fadeIn",
        className,
      )}
      onClick={(e) => {
        if (e.target !== ref.current) return;

        setIsOpen(false);

        if (ref.current) {
          ref.current.close();
        }
      }}
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;

        setIsOpen(false);
      }}
      {...rest}
    >
      {children}
    </dialog>
  );
}
