import { Container, Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import { useEffect, useState, useCallback, useMemo } from "react";
import moment from "moment";
import "moment/locale/vi";
import "@fontsource/roboto";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

moment.locale("vi");

function App() {
	const [countries, setCountries] = useState([]);
	const [selectedCountryId, setSelectedCountryId] = useState("");
	const [report, setReport] = useState([]);

	useEffect(() => {
		getCountries().then((res) => {
			const { data } = res;
			const countries = sortBy(data, "Country");
			setCountries(countries);
			setSelectedCountryId("vn");
		});
	}, []);

	const handleOnChange = useCallback((e) => {
		setSelectedCountryId(e.target.value);
	}, []);

	useEffect(() => {
		if (selectedCountryId) {
			const { Slug } = countries.find(
				(country) => country.ISO2.toLowerCase() === selectedCountryId
			);
			// Call API
			getReportByCountry(Slug).then((res) => {
				// Du lieu ngay hien tai chua ket thuc nen xoa di
				res.data.pop();
				setReport(res.data);
			});
		}
	}, [countries, selectedCountryId]);

	const summary = useMemo(() => {
		if (report && report.length) {
			const latestData = report[report.length - 1];
			return [
				{
					title: "Số ca nhiễm",
					count: latestData.Confirmed,
					type: "confirmed",
				},
				{
					title: "Khỏi",
					count: latestData.Recovered,
					type: "recovered",
				},
				{
					title: "Tử vong",
					count: latestData.Deaths,
					type: "death",
				},
			];
		}
		return [];
	}, [report]);

	return (
		<Container style={{ marginTop: 20 }}>
			<Typography variant="h2" component="h2">
				Số liệu COVID-19
			</Typography>
			<Typography>{moment().format("LLL")}</Typography>
			<CountrySelector
				countries={countries}
				handleOnChange={handleOnChange}
				value={selectedCountryId}
			/>
			<Highlight summary={summary} />
			<Summary report={report} selectedCountryId={selectedCountryId} />
		</Container>
	);
}

export default App;
