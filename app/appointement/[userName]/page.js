import Appointement from "@/components/UiComponents/BottomComponents/Meeting/Appointement";
import { serverUrl } from "@/config";
import axios from "axios";

export const metadata = {
  title: 'Qviq - Appointments',
};

const getMonth = async (profile,month,year) => {
  try {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const res = await axios.get(
    `${serverUrl}/meeting/getmonth/${profile}/${months.includes(month)? months.indexOf(month):new Date().getMonth()}/${year? year:new Date().getFullYear()}`
    );
    return (res.data);
  } catch (error) {
    // console.log(error);
  }
  return [];
};

export default async function Appointements({params, searchParams}) {
  const allMeeting = await getMonth(params.userName,searchParams.month,searchParams.year);
  return (
    <Appointement searchParams={searchParams} userName={params.userName} allMeeting={allMeeting}/>
  )
}
