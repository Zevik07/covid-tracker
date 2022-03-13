import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import CountUp from 'react-countup';

const useStyles = makeStyles({
	wrapper: (props) => {
		if (props.type === "confỉrmed")
			return {
				borderLeft: "5px solid red",
			};
		if (props.type === "active")
			return {
				borderLeft: "5px solid green",
			};

		return {
			borderLeft: "5px solid gray",
		};
	},
	title: {
		fontSize: 18,
		marginBottom: 5
	},
	count: {
		fontSize: 18,
		fontWeight: 'bold',
	}
});

function HighlightCard({ title, count, type }) {
	const styles = useStyles({
		type,
	});

	return (
		<Card className={styles.wrapper}>
			<CardContent>
				<Typography component="p" variant="body2" className={styles.title}>
					{title}
				</Typography>
				<Typography component="span" variant="body2" className={styles.count}>
					<CountUp end={count || 0} duration={2} seperator=' '/>
				</Typography>
			</CardContent>
		</Card>
	);
}

export default HighlightCard;
