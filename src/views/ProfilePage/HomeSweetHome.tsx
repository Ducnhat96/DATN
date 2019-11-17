import React, {Fragment, useState, useRef, ComponentType, ChangeEvent} from 'react';
import {createStyles, withStyles, Theme} from '@material-ui/core/styles';
import {compose} from 'recompose';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import GridContainer from '@/layouts/Grid/Container';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import IconButton from '@material-ui/core/IconButton/IconButton';
import fb from '@/assets/facebook.png';
import gg from '@/assets/google.png';
import twt from '@/assets/twitter.png';
import houseSweet from '@/assets/house.png';
import {ThemeCustom} from '@/components/Theme/Theme';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles<Theme>((theme: Theme) => createStyles ({
  boxSweetHome: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 80,
    },
  },
  inputDisabled: {
    padding: '0 3px',
    textAlign: 'center',
    maxWidth: 300,
    width: 230,
  },
  firstLine: {
    margin: '40px 0',
  },
  lightTooltip: {
    background: '#EEEEEE',
    color: theme.palette.text!.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrowPopper: {
    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent #EEEEEE transparent`,
      },
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `#EEEEEE transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      top: '30%',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent #EEEEEE transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent #EEEEEE`,
      },
    },
  },
  arrowArrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  root: {
    width: '100%',
    maxWidth: 'max-content',
  },
  listItem: {
    padding: 0,
  },
  ckbView:{
    padding:'0 12px',
  },
  formControlLabel:{
    width:'45%',
    height:'max-content',
  },
  inputAdornment: {
    padding: 5,
  },
  iconSocial:{
    width:24,
    height:24,
  },
  textFieldSocial:{
    width:'80%',
    padding:'4px 0',
  }
})
);

interface IHomeSweetHome {
    classes?:any;
}

const x: Array<ExType>= [
  {id: 0, des: 'none'},
  {id: 1, des: 'the mountain'},
  {id: 2, des: 'the city'},
  {id: 3, des: 'the sea'},
];
const y: Array<ExType>= [
  {id: 0, des: 'Work'},
  {id: 1, des: 'Relax'},
];

type ExType = {
    id: number,
    des: string
}

const HomeSweetHome:ComponentType<IHomeSweetHome> = (props:IHomeSweetHome) => {
  const classes = useStyles(props);
  const [ckbox, setCkbox]       = useState<boolean>(false);
  const [checked, setChecked]   = useState<Array<ExType>>([]);
  const [arrowRef, setArrowRef] = useState<any>(null);
  const desc = useRef<string>('');

  const handleChange = () =>{
    setCkbox(!ckbox);
  };

  // const handleArrowRef = node => {
  //   if (node !== arrowRef) {
  //     setArrowRef(node);
  //   }
  // };

  const handleToggle = (e:ChangeEvent<HTMLInputElement>) => {
    let value  = parseInt(e.target.value);
    let status = e.target.checked;
    let checkList = checked;

    let item = x.find(e => {
      return status && e.id === value;
    });

    if (status && item) { // TypeOf item !== undefined
        checkList.push(item);
    }

    let filtered = checkList.filter(el => {
      return (value !== el.id || status);
    });
    setChecked(filtered);
  };

  return (
      <Fragment>
        <Paper square className = {classes.boxSweetHome}>
          <GridContainer xs = {11}>
            <Grid item xs = {12} className = {classes.firstLine}>
              <div>
                It is a home with the view over &nbsp;
                <Tooltip
                    title = {
                      <Fragment>
                        <div className = {classes.root}>
                          <FormGroup row>
                            {x.map(value => (
                                <FormControlLabel key = {value.id}
                                  control = {
                                    <Checkbox
                                        name = {value.des}
                                        value = {value.id.toString()}
                                        color = 'primary'
                                        onChange = {(e) => handleToggle(e)}
                                        classes={{root:classes.ckbView}}
                                    />
                                  }
                                   classes={{root:classes.formControlLabel}}
                                   label = {value.des}
                                   inputRef={desc}
                                />
                            ))}
                          </FormGroup>
                        </div>
                        <span className = {classes.arrowArrow}  />
                      </Fragment>
                    }
                    classes = {{
                      popper: classes.arrowPopper,
                      tooltip: classes.lightTooltip,
                    }}
                    PopperProps = {{
                      popperOptions: {
                        modifiers: {
                          arrow: {
                            enabled: Boolean(arrowRef),
                            element: arrowRef,
                          },
                        },
                      },
                    }}
                    open = {true}
                    placement = 'right'
                >
                  <TextField
                      disabled
                      id = 'inputDisabled'
                      value = {checked.map(item => `${item.des} `)}
                      className = {classes.textField}
                      InputProps = {{
                        classes: {input: classes.inputDisabled},
                      }}
                  />
                </Tooltip>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                    control={
                      <Checkbox
                          name=""
                          checked={ckbox}
                          onChange={handleChange}
                          value="clean the home"
                          color='primary'
                      />
                    }
                    label="I want my house always clean, so it is fantastic if someone help me to clean the home."
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          name=''
                          checked={ckbox}
                          onChange={handleChange}
                          value="internet is also important"
                          color = 'primary'
                      />
                    }
                    label="Sometime I have to work, so the internet is also important, too."
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          name=''
                          checked={ckbox}
                          onChange={handleChange}
                          value="internet is also important"
                          color = 'primary'
                      />
                    }
                    label="It's wonderful if there are televisions in the house, I can watch my favorite show."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                        name=''
                        checked={ckbox}
                        onChange={handleChange}
                        value="internet is also important"
                        color = 'primary'
                    />
                  }
                  label="I love the Gym!"
              />
                <FormControlLabel
                    control={
                      <Checkbox
                          name=''
                          checked={ckbox}
                          onChange={handleChange}
                          value="internet is also important"
                          color = 'primary'
                      />
                    }
                    label="How about the swimming pool?"
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          name=''
                          checked={ckbox}
                          onChange={handleChange}
                          value="internet is also important"
                          color = 'primary'
                      />
                    }
                    label="I have a car, I will be pleased if there are a car parking nearby."
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          name=''
                          checked={ckbox}
                          onChange={handleChange}
                          value="internet is also important"
                          color = 'primary'
                      />
                    }
                    label="I love a room near the shopping center."
                />
              </FormGroup>
            </Grid>
            <Grid item xs = {12} className = {classes.firstLine}>
              <div>
                Most of my trips are for &nbsp;
                <Tooltip
                    title = {
                      <Fragment>
                        <div className = {classes.root}>
                          <FormGroup>
                            {y.map(value => (
                              <FormControlLabel key = {value.id}
                                control = {
                                  <Checkbox
                                      name = 'view-check'
                                      value = {value.id.toString()}
                                      color = 'primary'
                                      onChange = {(e) => handleToggle(e)}
                                      classes={{root:classes.ckbView}}
                                  />
                                }
                                classes={{root:classes.formControlLabel}}
                                label = {value.des} />
                            ))}
                          </FormGroup>
                        </div>
                        <span className = {classes.arrowArrow}  />
                      </Fragment>
                    }
                    classes = {{
                      popper: classes.arrowPopper,
                      tooltip: classes.lightTooltip,
                    }}
                    PopperProps = {{
                      popperOptions: {
                        modifiers: {
                          arrow: {
                            enabled: Boolean(arrowRef),
                            element: arrowRef,
                          },
                        },
                      },
                    }}
                    open = {true}
                    placement = 'right'
                >
                  <TextField
                      disabled
                      id = 'inputDisabled'
                      value = {''}
                      className = {classes.textField}
                      InputProps = {{
                        classes: {input: classes.inputDisabled},
                      }}
                  />
                </Tooltip>
              </div>

            </Grid>
            <Divider />
            <Grid item container xs={12}>
              <Grid item xs={8}>
                <FormGroup>
                  <FormControlLabel
                      control={
                        <Checkbox
                            name=""
                            checked={ckbox}
                            onChange={handleChange}
                            value="clean the home"
                            color='primary'
                        />
                      }
                      label="I want to know if there are promotions and  deals from Westay."
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                      control={
                        <Checkbox
                            name=""
                            checked={ckbox}
                            onChange={handleChange}
                            value="clean the home"
                            color='primary'
                        />
                      }
                      label="I've things to share with Westay, let's check it out on:"
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                      id="facebook"
                      variant="outlined"
                      className = {classes.textFieldSocial}
                      value='https://facebook.com/weStay'
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                  className = {classes.inputAdornment}
                                  aria-label="Toggle password visibility"
                                  // onClick={}
                              >
                                <img alt='fb' src={fb} className={classes.iconSocial}/>
                              </IconButton>

                            </InputAdornment>
                        ),
                        classes:{input:classes.inputAdornment}
                      }}
                  />
                  <TextField
                      id="twitter"
                      variant="outlined"
                      className = {classes.textFieldSocial}
                      value='https://twitter.com/weStay'
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                  className = {classes.inputAdornment}
                                  aria-label="Toggle password visibility"
                                  // onClick={}
                              >
                                <img alt='twt' src={twt} className={classes.iconSocial}/>
                              </IconButton>

                            </InputAdornment>
                        ),
                        classes:{input:classes.inputAdornment}
                      }}
                  />
                  <TextField
                      id="google"
                      variant="outlined"
                      className = {classes.textFieldSocial}
                      value='https://plus.google.com/weStay'
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                  className = {classes.inputAdornment}
                                  aria-label="Toggle password visibility"
                                  // onClick={}
                              >
                                <img alt='gg' src={gg} className={classes.iconSocial}/>
                              </IconButton>

                            </InputAdornment>
                        ),
                        classes:{input:classes.inputAdornment}
                      }}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={3}>
                <img alt={'image sweet home'} src={houseSweet} width='100%'/>
              </Grid>
            </Grid>
          </GridContainer>
        </Paper>
      </Fragment>
  );
};

export default HomeSweetHome;
