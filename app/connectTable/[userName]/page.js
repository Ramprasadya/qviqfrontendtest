import DataTable from '@/components/Connections/ConnectTable'
import { serverUrl } from '@/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Qviq - Connections',
};

const fetchData = async (profile) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + cookies().get("jwt_token").value,
      },
    };
    const response = await fetch(
      `${serverUrl}/connect/connect/${profile}`,
      config
    );
    if (response.status === 401 || response.status === 403) {
      throw new Error("Unauthorized");
    }
    const result = await response.json();
    return (result);
  } catch (error) {
    // console.log(error);
    redirect("/login");
  }
};

const fetchFavorites = async (profile) => {
  try {
    const response = await fetch(`${serverUrl}/connect/favorites/${profile}`);
    const result = await response.json();
    return (result);
  } catch (error) {
    console.error(error);
  }
  return [];
};

const fetchnewsort = async (profile) => {
  try {
    const response = await fetch(`${serverUrl}/connect/sortdata/${profile}`);
    const result = await response.json();
    return (result);
  } catch (error) {
    console.error(error);
  }
  return [];
};

const fetchnoldsort = async (profile) => {
  try {
    const response = await fetch(
      `${serverUrl}/connect/oldsortdata/${profile}`
    );
    const result = await response.json();
    return (result);
  } catch (error) {
    console.error(error);
  }
  return [];
};

const fetchcurrentsort = async (profile) => {
  try {
    const response = await fetch(
      `${serverUrl}/connect/currentmonth/${profile}`
    );
    const result = await response.json();
    return (result);
  } catch (error) {
    console.error(error);
  }
  return [];
};

const fetchthreesort = async (profile) => {
  try {
    const response = await fetch(
      `${serverUrl}/connect/last-three-months-data/${profile}`
    );
    const result = await response.json();
    return (result);
  } catch (error) {
    console.error(error);
  }
  return [];
};

const page = async({params}) => {
  const data = await fetchData(params.userName);
  const favorites = await fetchFavorites(params.userName);
  const newsort = await fetchnewsort(params.userName);
  const oldsort = await fetchnoldsort(params.userName);
  const currentsort = await fetchcurrentsort(params.userName);
  const threesort = await fetchthreesort(params.userName);
  return (
   <DataTable userName={params.userName} data={data} favorites={favorites} newsort={newsort} oldsort={oldsort} currentsort={currentsort} threesort={threesort}/>
  )
}

export default page