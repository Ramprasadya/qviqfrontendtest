import Analytics from '@/components/Analytics/Analytics'
import { serverUrl } from '@/config';
import axios from 'axios';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Qviq - Analytics',
};

const fetchConnectionData = async (profile) => {
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
  }
  return [];
};

const fetchProfileData = async (profile) => {
  try {
    const { data } = await axios.get(
      `${serverUrl}/device/infoall/${profile}`
    );
    let tempArray = [];
    data.profileShared.forEach((item) => {
      tempArray.push(item);
    });
    data.profileUnshared.forEach((item) => {
      tempArray.push(item);
    });
    if (tempArray.length !== 0) {
      return [(tempArray),(tempArray[0]._id)];
    } else {
      return [([]),("")];
    }
  } catch (error) {
    // console.log(error);
  }
  return [[],("")];
};

const fetchData = async (profile) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + cookies().get("jwt_token").value,
      },
    };
    const res = await axios.get(
      `${serverUrl}/getUser/getUser/${profile}`,
      config
    );
    return {
      record:(res.data),
      pro:(res.data[0].pro),
      starter:(res.data[0].starter),
      basic:(res.data[0].basic),
      hasAnalytics:(res.data[0].hasAnalytics),
    };
  } catch (error) {
    // console.log(error);
  }
  return {};
};

const getTotalData = async (profile) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + cookies().get("jwt_token").value,
      },
    };
    const { data } = await axios.get(
      `${serverUrl}/analytics/totalview/${profile}`,
      config
    );
    return (data);
  } catch (error) {
    // console.log(error);
  }
  return [];
};

const fetchreview = async (profile,shared) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + cookies().get("jwt_token").value,
      },
    };
    const { data } = await axios.get(
      `${serverUrl}/record/record/${profile}/${shared}`,
      config
    );
    const array = [];
    data.forEach((item) => {
      array.push({ label: item.label, value: 0 });
    });
    return (array);
  } catch (error) {
    // console.log(error);
  }
  return [];
};

const getHeaderData = (totalData) => {
  let views = 0;
  let downloads = 0;
  // let taps = 0;
  totalData.forEach((data) => {
    if (data.viewCount) {
      views += data.viewCount;
    }
    if (data.profiledownloads) {
      downloads += data.profiledownloads;
    }
    // if (data.deviceTaps) {
    //   taps += data.deviceTaps;
    // }
  });
  return [(views),(downloads)];
  // setTotalDeviceTaps(taps);
};

const page = async({params}) => {
  const [accordingItems,shared] = await fetchProfileData(params.userName);
  const data = await fetchData(params.userName);
  const totalData = await getTotalData(params.userName);
  const connectionData = await fetchConnectionData(params.userName);
  const dummyLinksData = shared != ""? await fetchreview(params.userName,shared):[];
  const [totalProfileViews,totalDownloads] = getHeaderData(totalData);
  
  return (
    <>
        <Analytics userName={params.userName} totalProfileViews={totalProfileViews} totalDownloads={totalDownloads} data={data} totalData={totalData} accordingItems={accordingItems} shared={shared} connectionData={connectionData} dummyLinksData={dummyLinksData}/>
    </>
  )
}

export default page