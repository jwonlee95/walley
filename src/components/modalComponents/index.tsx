import {
  IconButton,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  Button,
  IconProps,
  Icon,
  SxProps,
  Theme,
  ToggleButton,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import NumberFormat from "react-number-format";
import styled from "@emotion/styled";
interface IColors {
  [key: string]: string;
}
export const colors: IColors = {
  red: "#ff3a3a",
  orange: "#ff9f0a",
  yellow: "#ffd60a",
  green: "#30d158",
  cyan: "#64d3ff",
  blue: "#0a84ff",
  indigo: "#5e5ce6",
  pink: "#f29b9b",
  purple: "#bf5af2",
  brown: "#ac8f68",
  black: "#14181F",
  gray: "#828282",
};

export const ModalCloseButton: React.FC<{ onClose: () => void }> = (props) => {
  return (
    <IconButton
      sx={{
        position: "absolute",
        right: 8,
        top: 11,
        color: (theme) => theme.palette.grey[500],
      }}
      onClick={props.onClose}
    >
      <CloseIcon />
    </IconButton>
  );
};

interface INumberFormatProps {
  value: string;
  label: string;
  error?: boolean;
  sx?: SxProps<Theme>;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const CMNumberFormat: React.FC<INumberFormatProps> = ({
  value,
  label,
  error,
  sx,
  onChange,
}) => {
  return (
    <NumberFormat
      sx={sx}
      value={value}
      prefix="USD "
      error={error}
      id="modal-textfield"
      autoComplete="off"
      label={label}
      onChange={onChange}
      customInput={TextField}
      variant="standard"
      fullWidth
      required
      thousandSeparator={true}
    />
  );
};

//Radio Color picker
const BpIcon = styled("span")({
  borderRadius: "50%",
  width: 20,
  height: 20,
});

const BpCheckedIcon = styled(BpIcon)({
  boxShadow: "inset 0 0 0 1px rgba(51,51,51,1), 0 0 0 1px rgba(51,51,51,1)",
  zIndex: 1,
  filter: "blur(0px)",
});

interface ICMRadioProps {
  backgroundColor: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// Inspired by blueprintjs
const CMRadio: React.FC<ICMRadioProps> = (props) => {
  return (
    <Radio
      value={props.value}
      checkedIcon={
        <BpCheckedIcon style={{ backgroundColor: props.backgroundColor }} />
      }
      icon={<BpIcon style={{ backgroundColor: props.backgroundColor }} />}
      onChange={props.onChange}
    />
  );
};

interface ICMRadioGroups {
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const CMRadioGroup: React.FC<ICMRadioGroups> = (props) => {
  return (
    <FormControl>
      <RadioGroup
        defaultValue="red"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
      >
        <div className="flex">
          {Object.keys(colors)
            .slice(0, 6)
            .map((key) => {
              return (
                <CMRadio
                  value={key}
                  backgroundColor={colors[key]}
                  onChange={props.onChange}
                  key={key}
                />
              );
            })}
        </div>
        <div className="flex">
          {Object.keys(colors)
            .slice(6, 12)
            .map((key) => {
              return (
                <CMRadio
                  value={key}
                  backgroundColor={colors[key]}
                  onChange={props.onChange}
                  key={key}
                />
              );
            })}
        </div>
      </RadioGroup>
    </FormControl>
  );
};

//Button
interface ICMButtonProps {
  text: string;
  bgcolor: string;
  color?: string;
  width?: number;
  height?: number;
  hoverColor?: string;
  border?: string;
  boxShadow?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mr?: string;
}

export const CMButton: React.FC<ICMButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      sx={{
        color: props.color,
        bgcolor: props.bgcolor,
        textTransform: "none",
        width: props.width,
        height: props.height,
        border: props.border,
        "&:hover": {
          backgroundColor: props.hoverColor ? props.hoverColor : props.bgcolor,
        },
        boxShadow: props.boxShadow,
        mr: props.mr,
      }}
    >
      {props.text}
    </Button>
  );
};

export const CMToggleButton = styled(ToggleButton)({
  "&.Mui-selected": {
    backgroundColor: "#83b0f3",
    color: "white",
    "&:hover": {
      backgroundColor: "#83b0f3",
    },
  },
  fontFamily: "Inter, -apple-system, sans-serif",
  color: "#83b0f3",
  fontWeight: "500",
});
