import React, { ComponentType } from "react";
import { Request } from "express";
import RoomIndex from "@/views/Rooms";
import AppWrapper from "@server/wrapper/AppWrapper";
import { RoomIndexState } from "@/store/context/Room/RoomIndexContext";

interface IProps {
  req: Request;
  roomState: RoomIndexState;
}

// @ts-ignore
export const HomeIndex: ComponentType<IProps> = (props: IProps) => {
  const { req, roomState } = props;

  return (
    <AppWrapper req={req}>
      <RoomIndex roomStateInit={roomState} />
    </AppWrapper>
  );
};
