import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { ThemeCustom } from '@/components/Theme/Theme';
interface IProps {
  description: string,
  space: string,
  note: string,
  isPreviewPage?: boolean,
}
const useStyles = makeStyles((theme: ThemeCustom) =>
  createStyles({
    root: {
      lineHeight: '1.8rem'
    },
    name: {
      fontWeight: 700,
      [theme.breakpoints.down('xs')]: {
        margin: '1.5rem 0 0.4rem 0'
      }
    },
    icon: {
      marginBottom: 10
    },
    button: {
      padding: 0,
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      }
    },
    iconPlus: {
      fontSize: '15px'
    },
    title: {
      fontWeight: 700,
      margin: '8px 0',
    }
  })
);

const RoomDescription: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { description, note, space, isPreviewPage } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const transformHtmlTitle = (node: any, index: number) => {
    let validNodeIndex = index === 0 || index === 1;
    if (!validNodeIndex) {
      return null;
    }
  };

  const notFoundContent = `<p> Không tìm thấy nội dung </p>`;
  const desHTML = description ? `<div> ${description} </div>` : '';
  const spaceHTML = space ? `<div> ${space} </div>` : '';
  const noteHTML = note ? `<div> ${note} </div>` : '';

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.name}>
            Mô tả căn hộ
          </Typography>
          {ReactHtmlParser(isPreviewPage && !desHTML ? notFoundContent : desHTML, {
            transform: transformHtmlTitle
          })}
        </Grid>
        {isOpen ? (
          <Fragment>
            <Grid item xs={12}>
              <Typography variant='subtitle2' className={classes.title}>
                Không gian
              </Typography>
              {ReactHtmlParser(isPreviewPage && !spaceHTML ? notFoundContent : spaceHTML, {
                transform: transformHtmlTitle
              })}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' className={classes.title}>
                Nội quy
              </Typography>
              {ReactHtmlParser(isPreviewPage && !noteHTML ? notFoundContent : noteHTML, {
                transform: transformHtmlTitle
              })}
            </Grid>
            <Button onClick={toggle} className={classes.button} style={{ color: '#ff9800' }} size="small">
              Ẩn bớt
            </Button>
          </Fragment>
        ) : (
            <Button onClick={toggle} className={classes.button} style={{ color: '#ff9800' }} size="small">
              &#8230; Xem thêm
            </Button>
          )}
      </Grid>
    </Fragment>
  );
};

export default RoomDescription;
