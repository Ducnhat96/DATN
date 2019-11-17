import { ThemeCustom } from '@/components/Theme/Theme';
import Grid from '@material-ui/core/Grid/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import React, { ComponentType, memo, useState, useContext } from 'react';
import { compose } from 'recompose';
import AsyncSelect from 'react-select/lib/Async';
import { InputActionMeta, ActionMeta } from 'react-select/lib/types';
import { getRoomSearch } from '@/store/context/searchSuggestion';
import axiosBase from 'axios';
import { StylesConfig } from 'react-select/lib/styles';
import { IGlobalContext, GlobalContext } from '@/store/context/GlobalContext';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { IRoomIndexContext, RoomIndexContext, newRoomLocation } from '@/store/context/Room/RoomIndexContext';
import { RoomUrlParams } from '@/types/Requests/Rooms/RoomRequests';
import qs from 'query-string';
import { updateObject } from '@/store/utility';

interface IProps {
  classes?: any
}

const searchStylesHome: StylesConfig = {
  menuList: base => ({
    ...base,
    maxHeight: '70vh',
  }),
};

const SearchProperty: ComponentType<IProps> = (props: IProps) => {
  const [searchText, setSearchText] = useState('');
  const [nameBefore, setNameBefore] = useState<string | undefined>('');

  const { dispatch } = useContext<IRoomIndexContext>(RoomIndexContext);
  const { location, history } = useContext<IGlobalContext>(GlobalContext);

  const onSearchProperty = (value: string, meta: InputActionMeta) => {
    let { action } = meta;
    if (action === 'menu-close' || action === 'input-blur') return;

    setSearchText(value);
    return value;
  };

  // Change the name in the filter
  const onPropertyItemChange = (room: RoomIndexRes | any, meta: ActionMeta) => {
    const { action } = meta;

    const params: RoomUrlParams = qs.parse(location.search!);
    let name = params.name;
    if (action === 'select-option') {
      if (!!nameBefore) setNameBefore(name);
      name = room.details.data[0].name;
    } else if (action === 'clear') {
      name = nameBefore;
      setNameBefore('');
    }

    const newParams = updateObject(params, {
      name: name,
    });

    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: 'setRooms',
      rooms: [],
    });

    history.push(locationTo);
  };

  const suggestEvent = (value: string, cb: (result: any[]) => void) => {
    getRoomSearch(location, value).then(res => {
      cb(res.data);
    }).catch(err => {
      if (!axiosBase.isCancel(err)) {
        cb([{
          error: 'Có lỗi xảy ra. Vui lòng thử lại',
        }]);
      }
    });
  };

  const optionSearchLabel = (option: RoomIndexRes) => option.details.data[0].name;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant='subtitle2' style={{ fontWeight: 700 }}>Tìm kiếm phòng</Typography>
      </Grid>
      <Grid item xs={12}>
        <AsyncSelect
          name='search-property'
          isClearable
          cacheOptions
          defaultOptions
          getOptionLabel={optionSearchLabel}
          getOptionValue={optionSearchLabel}
          inputValue={searchText}
          loadOptions={suggestEvent}
          onInputChange={onSearchProperty}
          onChange={onPropertyItemChange}
          placeholder='Tìm kiếm'
          styles={searchStylesHome}
        />
      </Grid>
    </Grid>
  );
};

export default compose<IProps, any>(
  memo,
)(SearchProperty);
