import { ThemeCustom } from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment } from 'react';
import { compose } from 'recompose';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import imgRoomDemo3 from '@/assets/room_demo3.jpeg';

interface IProps {
	classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({
	card: {
		width: '96%',
	},
	media: {
		height: '20em',
	},
});

// @ts-ignore
const RoomCollection: ComponentType<IProps> = (props: IProps) => {
	const classes = useStyles(props);

	return (
		<Fragment>
			<Card className={classes.card}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={imgRoomDemo3}
						title="Ảnh bộ sưu tập"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Lizard
				   	</Typography>
						<Typography component="p">
							Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
							across all continents except Antarctica
				   	</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Fragment>
	);
};

export default compose<IProps, any>(
	withStyles(styles),
)(RoomCollection);
