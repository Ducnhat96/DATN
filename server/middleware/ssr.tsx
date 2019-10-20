import React from 'react';
import {Request, Response, NextFunction} from 'express';
import {ssrRender} from '@server/util';
import {renderToString} from 'react-dom/server';
import {HomeIndex} from '@server/pages/HomeIndex';
import {getRooms, RoomIndexStateInit} from '@/store/context/Room/RoomIndexContext';
import {updateObject} from '@/store/utility';

export const SSRroomDetails = (req: Request, res: Response, next: NextFunction) => {
  getRooms(req.url).then(response => {
    const roomIndexState = updateObject(RoomIndexStateInit, {
      rooms: response.data,
    });

    const dom = renderToString((
      <HomeIndex
        req = {req}
        roomState={roomIndexState}
      />
    ));
    return ssrRender(res, dom);
  }).catch(err => {
    console.log(err);
    return ssrRender(res);
  });
};
