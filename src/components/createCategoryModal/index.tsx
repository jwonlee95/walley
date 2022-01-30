import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Popover,
  TextField,
} from "@mui/material";
import {
  CMButton,
  CMNumberFormat,
  CMRadioGroup,
  colors,
  ModalCloseButton,
  PlusButton,
} from "components";
import { CategoryIcons } from "assets";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "common/store";
import { CreateCategoryData } from "common/action";
import { SetterContext, UserContext } from "contexts";
import produce from "immer";
interface ICreateCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateCategoryModal: React.FC<ICreateCategoryModalProps> = (
  props
) => {
  const { user } = useContext(UserContext).userState;
  const { setCategory } = useContext(SetterContext);
  const dispatch = useDispatch();
  const categorySelector = useSelector((state: reducerState) => state.category);

  const [name, setName] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("red");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [icon, setIcon] = useState<string | null>(null);

  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false);
  const [isBudgetEmpty, setIsBudgetEmpty] = useState<boolean>(false);
  const [isIconEmpty, setIsIconEmpty] = useState<boolean>(false);
  const openPopover = Boolean(anchorEl);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setName("");
        setBudget("");
        setSelectedColor("red");
        setIcon(null);
      }, 500);
    }
  }, [props.open]);

  useEffect(() => {
    if (isNameEmpty) {
      setIsNameEmpty(false);
    }
  }, [name]);
  useEffect(() => {
    if (isBudgetEmpty) {
      setIsBudgetEmpty(false);
    }
  }, [budget]);
  useEffect(() => {
    if (isIconEmpty) {
      setIsIconEmpty(false);
    }
  }, [icon]);
  useEffect(() => {
    if (categorySelector.createCategoryData) {
      setCategory(
        produce((draft) => {
          draft.push(categorySelector.createCategoryData);
        })
      );
    }
  }, [categorySelector.createCategoryData]);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleClickIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSaveIcon = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string
  ) => {
    setAnchorEl(null);
    setIcon(key);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSaveCategory = () => {
    if (name === "" || budget === "" || icon === null) {
      if (name === "") {
        setIsNameEmpty(true);
      }
      if (budget === "") {
        setIsBudgetEmpty(true);
      }
      if (icon === null) {
        setIsIconEmpty(true);
      }
      return;
    }
    props.onClose();
    //Api
    const _budget = parseFloat(budget.slice(4).replace(/,/g, ""));
    const data = {
      icon: CategoryIcons[icon],
      color: colors[selectedColor],
      name: name,
      budget: _budget,
      spent: 0,
    };

    dispatch(CreateCategoryData(user._id, data));
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="add-category-modal-title"
      aria-describedby="add-category-modal-desc"
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <DialogTitle id="add-category-modal-title">
        <div className="modal-title">Add Category</div>
        <ModalCloseButton onClose={props.onClose} />
      </DialogTitle>
      <DialogContent>
        <div className="dialog-content">
          <TextField
            autoComplete="off"
            error={isNameEmpty}
            id="modal-textfield"
            required
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={handleChangeName}
            size="small"
          />
          <CMNumberFormat
            label="Budget"
            error={isBudgetEmpty}
            value={budget}
            onChange={handleChangeBudget}
          />
          <div className="modal-content-comp wrap">
            <div
              className={isIconEmpty ? `content-title red` : `content-title`}
            >
              Icon
            </div>
            <Card
              variant="outlined"
              className="cm-card"
              sx={{
                height: "68px",
                fontSize: "50px",

                border: isIconEmpty ? `1px solid ${colors["red"]}` : "",
              }}
            >
              {icon ? (
                <Icon
                  fontSize="inherit"
                  color="inherit"
                  onClick={handleClickIcon}
                  sx={{
                    ml: 1,
                    cursor: "pointer",
                    color: colors[selectedColor],
                  }}
                >
                  {CategoryIcons[icon]}
                </Icon>
              ) : (
                <PlusButton fontSize={50} onClick={handleClickIcon} />
              )}
              <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
              >
                <Paper variant="elevation" sx={{ p: 2, maxWidth: "250px" }}>
                  {Object.keys(CategoryIcons).map((key) => {
                    return (
                      <IconButton
                        onClick={(e) => handleSaveIcon(e, key)}
                        key={key}
                      >
                        <Icon id={key} fontSize="medium">
                          {CategoryIcons[key]}
                        </Icon>
                      </IconButton>
                    );
                  })}
                </Paper>
              </Popover>
            </Card>
          </div>
          <div className="modal-content-comp flex">
            <div className="content-title">Color</div>
            <div className="color-picker">
              <CMRadioGroup
                selectedValue={selectedColor}
                onChange={handleChangeColor}
              />
            </div>
          </div>
          <div className="modal-content-comp btns-wrapper flex">
            <CMButton
              text="Save"
              bgcolor="#28B463"
              width={120}
              height={37.5}
              mr={1}
              onClick={handleSaveCategory}
            />

            <CMButton
              text="Cancel"
              bgcolor="rgba(235, 87, 87, 0.1)"
              border={`1px solid ${colors["red"]}`}
              color={colors["red"]}
              width={120}
              onClick={props.onClose}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
