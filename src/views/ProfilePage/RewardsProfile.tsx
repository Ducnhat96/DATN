import React, {Fragment, useState, useRef, ComponentType, MouseEvent} from 'react';
import {createStyles, withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FileCopy from '@material-ui/icons/FileCopyOutlined';
import silverMedal from '@/assets/silver_medal.png';
import goldMedal from '@/assets/gold_medal.png';
import diamondMedal from '@/assets/diamond.png';
import fb from '@/assets/facebook.png';
import gg from '@/assets/google.png';
import twt from '@/assets/twitter.png';
import OneWorldBanner from '@/assets/OneWorldBanner.jpg';
import worldRouned from '@/assets/worldRouned.jpg';
import carTravel from '@/assets/car_travel.png';
import aroundTheWorld from '@/assets/around_the_world.jpg';
import {ThemeStyle} from '@material-ui/core/styles/createTypography';

const styles: any = (theme: ThemeStyle) => createStyles({
    borderSilver: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: 'double 10px transparent',
        backgroundImage: 'linear-gradient(white, white), radial-gradient(circle at top left, #61c69d,#91BDE6 )',
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        position: 'relative',
        textAlign: 'center',
        margin: '0 auto',
        marginBottom: 10,
    },
    imgMedal: {
        position: 'absolute',
        width: '80%',
        left: '50%',
        top: '50%',
        WebkitTransform: 'translateX(-50%) translateY(-50%)',
        MozTransform: 'translateX(-50%) translateY(-50%)',
        transform: 'translateX(-50%) translateY(-50%)',
    },
    boxPoints: {
        width: '100%',
        height: '100%',
        backgroundColor: '#91BDE6',
    },
    boxMedal: {
        padding: 22,
    },
    boxInvited: {
        padding: 8,
    },
    rowMargin: {
        margin: '5px 0',
        textAlign: 'center',
    },
    textField: {
        padding: 0,
    },
    inputAdornment: {
        padding: 5,
    },
    imgSocial: {
        width: 24,
        height: 24,
        padding: '0 15px',
    },
    typo: {
        padding: 4,
        color: '#37474f',
    },
    typoPoints: {
        padding: 4,
        color: '#ffffff',
    },
    btExchange: {
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#91BDE6',
        },
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },
    rowImage: {
        margin: '5px 0',
        maxHeight: '400px',
    },
    imgRight1: {
        maxHeight: 200,
        height: 189,
        width: '100%',
        backgroundImage: `url(${carTravel})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'cover',
    },
    imgRight2: {
        maxHeight: 200,
        height: 189,
        width: '100%',
        backgroundImage: `url(${worldRouned})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    },
});

interface IRewardsProfile {
    classes?: any;
}

const RewardsProfile: ComponentType<IRewardsProfile> = (props: IRewardsProfile) => {
    const {classes} = props;
    const [openTooltip, setOpenTooltip] = useState<boolean>(false);
    const [MessageTooltip, setMessageTooltip] = useState<string>('copy link');
    const textLink = useRef<any>(null);

    const handleClickCopy = (e: MouseEvent<HTMLElement>) => {
        textLink.current.select();
        document.execCommand('copy');

        setOpenTooltip(true);
        setMessageTooltip('copied');
    };
    const handleTooltipClose = () => {
        setOpenTooltip(false);
    };

    return (
        <Fragment>
            <Grid container spacing = {0}>
                <Grid item container xs = {9}>
                    <Grid item xs = {8}>
                        <Paper square className = {classes.boxMedal}>
                            <Grid container>
                                <Grid item xs = {4}>
                                    <div className = {classes.borderSilver}>
                                        <img alt = 'medal silver' src = {silverMedal} className = {classes.imgMedal} />
                                    </div>
                                    <Typography variant = 'subtitle2' color = 'primary' align = 'center'>
                                        1 of 2 invited
                                    </Typography>
                                </Grid>
                                <Grid item xs = {4}>
                                    <div className = {classes.borderSilver}>
                                        <img alt = 'medal silver' src = {goldMedal} className = {classes.imgMedal} />
                                    </div>
                                    <Typography variant = 'subtitle2' color = 'primary' align = 'center'>
                                        1 of 2 invited
                                    </Typography>
                                </Grid>
                                <Grid item xs = {4}>
                                    <div className = {classes.borderSilver}>
                                        <img alt = 'medal silver' src = {diamondMedal} className = {classes.imgMedal} />
                                    </div>
                                    <Typography variant = 'subtitle2' color = 'primary' align = 'center'>
                                        1 of 2 invited
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs = {4}>
                        <Paper square className = {classes.boxInvited}>
                            <Grid container alignItems = {'center'} justify = {'center'}>
                                <Grid item xs = {12}>
                                    <Typography variant = {'h3'} color = {'textSecondary'} align = {'center'}>
                                        3%
                                    </Typography>
                                    <Divider className = {classes.rowMargin} />
                                </Grid>
                                <Grid item xs = {10}>
                                    <Typography variant = {'subtitle2'} align = {'center'}>
                                        Invite 2 more friends to get the GOLD tier
                                    </Typography>
                                </Grid>
                                <Grid item xs = {10} className = {classes.rowMargin}>
                                    <TextField
                                        id = 'outlined-adornment-password'
                                        className = {classes.textField}
                                        variant = 'outlined'
                                        type = 'text'
                                        value = 'https://material-ui.com/demos/text-fields'
                                        inputRef = {textLink}
                                        InputProps = {{
                                            endAdornment: (
                                                <InputAdornment position = {'end'} className = {classes.textField}>
                                                    <ClickAwayListener onClickAway = {handleTooltipClose}>
                                                        <div>
                                                            <Tooltip
                                                                PopperProps = {{
                                                                    disablePortal: true,
                                                                }}
                                                                onClose = {handleTooltipClose}
                                                                open = {openTooltip}
                                                                disableFocusListener
                                                                disableHoverListener
                                                                disableTouchListener
                                                                title = {MessageTooltip}
                                                                leaveDelay = {200}
                                                            >
                                                                <IconButton
                                                                    className = {classes.textField}
                                                                    aria-label = 'Copy to Clipboard'
                                                                    onClick = {handleClickCopy}
                                                                >
                                                                    <FileCopy />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    </ClickAwayListener>
                                                </InputAdornment>
                                            ),
                                            classes: {input: classes.inputAdornment},
                                        }}
                                    />
                                </Grid>
                                <Grid item xs = {10} className = {classes.rowMargin}>
                                    <img alt = 'fb social' src = {fb} className = {classes.imgSocial} />
                                    <img alt = 'gg social' src = {gg} className = {classes.imgSocial} />
                                    <img alt = 'tw social' src = {twt} className = {classes.imgSocial} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item container xs = {3} alignItems = {'center'} justify = {'center'}>
                    <div className = {classes.boxPoints}>
                        <Grid container justify = {'center'} alignItems = {'center'}>
                            <Grid item xs = {10}>
                                <Typography variant = 'h5' align = 'center' className = {classes.typo}>You have
                                                                                                       earned</Typography>
                                <Typography variant = 'h3' align = 'center'
                                            className = {classes.typoPoints}>109.225</Typography>
                                <Typography variant = 'h4' align = 'center'
                                            className = {classes.typo}>Points</Typography>
                                <Button variant = 'outlined' fullWidth
                                        className = {classes.btExchange}>Exchange</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Grid container className = {classes.rowMargin}>
                <Grid item xs = {12}>
                    <Paper square>
                        <img alt = 'Travel the world' src = {OneWorldBanner} width = '100%' />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container className = {classes.rowImage}>
                <Grid item xs = {6} container>
                    <div className = {classes.imgLeft}>
                        <Paper square><img alt = 'Travel the world' src = {aroundTheWorld} width = '100%' /></Paper>
                    </div>
                </Grid>
                <Grid item xs = {6} container>
                    <Grid item xs = {12}>
                        <Paper square className = {classes.imgRight1}>
                        </Paper>
                    </Grid>
                    <Grid item xs = {12}>
                        <Paper square className = {classes.imgRight2}>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
};
export default compose<IRewardsProfile,any>(
    withStyles(styles)
)(RewardsProfile);
