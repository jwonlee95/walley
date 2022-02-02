import {
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { ICategory } from "interfaces";
import {
  CategoryTable,
  CMButton,
  colors,
  EditButton,
  ModalCloseButton,
} from "components";
interface ICategoryDetailModalProps {
  open: boolean;
  onClose: () => void;
  category: ICategory | undefined;
}
export const CategoryDetailModal: React.FC<ICategoryDetailModalProps> = ({
  category,
  ...props
}) => {
  const [isEdit, setEdit] = useState<boolean>(false);

  const handleClick = () => {
    console.log("dwdwwd");
  };

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
      {category && (
        <>
          <DialogTitle id="category-detail-modal">
            <div className="modal-title flex align">
              <Icon sx={{ color: category.color, fontSize: "40px", mr: 1 }}>
                {category.icon}
              </Icon>
              <div>{category.name}</div>
              <EditButton fontSize={20} ml={1} />
            </div>
            <ModalCloseButton onClose={props.onClose} />
          </DialogTitle>
          <DialogContent>
            <div className="dialog-content">
              <div className="modal-content-comp wrap">
                <div className="content-title small">Category Information</div>
                <Card
                  variant="outlined"
                  className="cm-card flex"
                  sx={{
                    height: "100px",
                  }}
                >
                  <div className="category-info-wrapper">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      height="100%"
                    >
                      <Stack direction="column" justifyContent="space-evenly">
                        <div>Total Spent</div>
                        <div>Budget</div>
                        <div>Remain</div>
                      </Stack>
                      <Stack direction="column" justifyContent="space-evenly">
                        <Stack direction="row" justifyContent="flex-end">
                          <div>
                            USD <b>{category.spent}</b>
                          </div>
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end">
                          <div>
                            USD <b>{category.budget}</b>
                          </div>
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end">
                          <div>
                            USD <b>{category.budget - category.spent}</b>
                          </div>
                        </Stack>
                      </Stack>
                    </Stack>
                  </div>
                </Card>
              </div>
              <div className="modal-content-comp wrap">
                <div className="content-title small">Food History</div>
              </div>
              <CategoryTable category={category} />
              <div className="modal-content-comp btns-wrapper flex">
                <CMButton
                  animation={isEdit}
                  text={isEdit ? "Save" : "Cancel"}
                  bgcolor={isEdit ? "#28B463" : "rgb(255, 255, 255)"}
                  border={isEdit ? "" : `1px solid ${colors["gray"]}`}
                  color={isEdit ? "" : colors["gray"]}
                  width={90}
                  height={37.5}
                  mr={1}
                  onClick={handleClick}
                />
                <CMButton
                  text={`Delete Category`}
                  bgcolor="rgba(235, 87, 87, 0.1)"
                  border={`1px solid ${colors["red"]}`}
                  color={colors["red"]}
                  width={150}
                  onClick={handleClick}
                />
              </div>
            </div>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
