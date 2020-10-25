import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const dailyDataUrl = `https://covid19.mathdro.id/api/daily`;

export const fetchData = async (country) => {
  let dynamicUrl = url;
  if (country) {
    dynamicUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, deaths, recovered, lastUpdate },
    } = await axios.get(dynamicUrl);
    return { confirmed, deaths, recovered, lastUpdate };
  } catch (error) {
    console.log("Network Error");
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(dailyDataUrl);
    // console.log(dailyData.data);
    const dailyData = data.map((data) => ({
      confirmed: data.confirmed.total,
      deaths: data.deaths.total,
      date: data.reportDate,
    }));
    return dailyData;
  } catch (error) {
    console.log(error);
    console.log("Network Error");
  }
};

export const countries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
