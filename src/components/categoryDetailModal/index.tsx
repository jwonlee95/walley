import { Dialog } from "@mui/material";
import React from "react";

interface ICategoryDetailModalProps {
  open: boolean;
  onClose: () => void;
}
export const CategoryDetailModal: React.FC<ICategoryDetailModalProps> = (
  props
) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="atransaction-detail-title"
      aria-describedby="transaction-detail-desc"
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      {/* <div className="modal-title flex justify align capitalize">
          {selectedTransaction && selectedTransaction.type}
          <EditButton fontSize={20} ml={1} onClick={handleClickEdit} />
          <ModalCloseButton onClose={props.onClose} />
        </div> */}
    </Dialog>
  );
};
