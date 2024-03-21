"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ModalProps {
  title: any;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  classname?: string
}

export const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children,
    classname
  }) => {
    const onChange = (open: boolean) => {
      if (!open) {
        onClose();
      }
    };
    return (
      <Dialog onOpenChange={onChange} open={isOpen}>
        <DialogContent className={classname}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    );
  };
  