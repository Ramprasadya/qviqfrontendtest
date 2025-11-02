import ShowReview from '@/components/review/ShowReview'
import { serverUrl } from '@/config';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Qviq - Reviews',
};

const fetchProfile = async (profile) => {
  try {
    const res = await axios.get(
      `${serverUrl}/profile/profiletype/${profile}`
    );
    if (res.data.length > 0) {
      return (res.data[0]._id);
    }
  } catch (error) {
    //console.log(error?.response?.data?.error);
  }
  return "";
};

const fetchreview = async (profile,type) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + cookies().get("jwt_token").value,
      },
    };
    const response = await fetch(
      `${serverUrl}/review/getReview/${type}/${profile}`,
      config
    );
    if (response.status === 401 || response.status === 403) {
      throw new Error("Unauthorized");
    }
    const result = await response.json();
    return (result);
  } catch (error) {
    //console.log(error);
    redirect("/login");
  }
};

const page = async({params}) => {
  const type = await fetchProfile(params.userName);
  const review = (type != ""? await fetchreview(params.userName,type):[]);
  return (
      <ShowReview userName={params.userName} type={type} review={review}/>
  )
}

export default page