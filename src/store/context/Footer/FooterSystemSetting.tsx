import { createContext, Dispatch } from 'react';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
// import { LocationDescriptorObject } from 'history';
// import qs from 'query-string';
// import { AxiosRes, Pagination, BaseResponse, TypeSelect } from '@/types/Requests/ResponseTemplate';
// import { axios } from '@/utils/axiosInstance';
import { updateObject } from '@/store/utility';
// import { RoomIndexGetParams, RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
// import { Range } from 'react-input-range';
import _ from 'lodash';
// import { AxiosResponse } from 'axios';
// import { fetchRoom } from '@/store/context/Room/RoomIndexContext';

export const FooterSystemSetting = createContext<IFooterSystemSetting | any>(null);

export interface IFooterSystemSetting {
   state: FooterSystemSettingState,
   dispatch: Dispatch<FooterSystemSettingAction>,
}

export type FooterSystemSettingAction = { type: 'setSystemSetting', rooms: RoomIndexRes[] }

export type FooterSystemSettingState = {
   readonly systemSetting: RoomIndexRes[]
}

export const FooterSystemSettingInit: FooterSystemSettingState = {
   systemSetting: [],
};

export const RoomHotReducer = (state: FooterSystemSettingState, action: FooterSystemSettingAction): FooterSystemSettingState => {
   switch (action.type) {
      case 'setSystemSetting':
         return updateObject<FooterSystemSettingState>(state, {
            systemSetting: action.rooms,
         });
      default:
         return state;
   }
};
