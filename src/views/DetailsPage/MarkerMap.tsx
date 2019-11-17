import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import mapMarker from '@/assets/map-marker.png';

// @ts-ignore

interface IProps {
  classes?: any,
  text?:string,
  lat:number,
  lng:number,
}

const MarkerMap: ComponentType<IProps> = (props: IProps) => {

  return (
    <Fragment>
      <div style={{
        width:32,
        height:32,
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -100%)'
      }}>
        <img src = {mapMarker} alt = 'marker' width={'100%'}/>
      </div>
    </Fragment>
  );
};

export default MarkerMap;
