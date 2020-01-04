import React, { FunctionComponent, Fragment, memo } from "react";
import { compose } from "recompose";
import { createStyles, Theme, withStyles } from "@material-ui/core";
import { style } from "@/layouts/Main/SearchHome";
import CountBar from "@/components/Utils/CountBar";

interface IProps {
  classes?: any;
  hasApplyButton?: boolean;
}

const styles: any = (theme: Theme) =>
  createStyles({
    ...style(theme),
    paperSize: {
      padding: 10,
      display: "flex",
      justifyContent: "center"
    },
    countNumber: {
      fontSize: "1.2rem",
      color: "#248489"
    },
    textCount: {
      color: "#1f1f1f"
    },
    applyButton: {
      background: "transparent",
      boxShadow: "none",
      color: "#248489",
      fontWeight: 700,
      textTransform: "initial",
      fontSize: "16px",
      padding: "2px 11px"
    }
  });

// @ts-ignore
const GuestCount: FunctionComponent<IProps> = (props: IProps) => {
  const { classes, hasApplyButton } = props;

  return (
    <Fragment>
      <CountBar
        singular="người"
        plural="người"
        name="guests"
        p-classes={classes}
        hasApplyButton={hasApplyButton}
      />
    </Fragment>
  );
};

export default compose<IProps, any>(withStyles(styles), memo)(GuestCount);
