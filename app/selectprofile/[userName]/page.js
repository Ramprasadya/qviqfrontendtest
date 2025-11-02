import SelectProfile from "@/components/ProfileCategory/SelectProfile";
import { serverUrl } from "@/config";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Qviq - Select Profile",
};

const getData = async (profile, type) => {
  let obj = {};
  try {
    const result = await axios.get(
      `${serverUrl}/getData/data/${type}/${profile}`
    );

    if (
      result.data.customTemplates[0] &&
      Object.keys(result.data.customTemplates[0]).length !== 0
    ) {
      obj.backgroundColor =
        result.data.customTemplates[0].customizedTemplate.backgroundColor;
      obj.buttonStyle =
        result.data.customTemplates[0].customizedTemplate.buttonStyle;
      obj.buttonColor =
        result.data.customTemplates[0].customizedTemplate.buttonColor;
      obj.color1 = result.data.customTemplates[0].customizedTemplate.color1;
      obj.color2 = result.data.customTemplates[0].customizedTemplate.color2;
      obj.bgImage = result.data.customTemplates[0].customizedTemplate.bgImage;
      obj.appIconBg =
        result.data.customTemplates[0].customizedTemplate?.appIconBg;
      obj.customTextColor =
        result.data.customTemplates[0].customizedTemplate?.customTextColor;
      obj.customButtontextColor =
        result.data.customTemplates[0].customizedTemplate?.customButtontextColor;
    }

    const appsObj = result.data.apps;
    const appsArr = appsObj !== undefined ? Object.values(appsObj).flat() : [];

    if (
      result.data.user.length === 0 &&
      result.data.img.length === 0 &&
      result.data.videos.length === 0 &&
      result.data.products.length === 0 &&
      result.data.services.length === 0 &&
      result.data.reviews.length === 0 &&
      result.data.businessHours.length === 0 &&
      result.data.pfds.length === 0 &&
      result.data.customLinks.length === 0 &&
      appsArr.length === 0
    ) {
      obj.dummyData = true;
    } else {
      obj.dummyData = false;
    }

    if (result.data.user.length > 0) {
      obj.name =
        result.data.user[0].firstName + " " + result.data.user[0].lastName;
      obj.firstName = result.data.user[0].firstName;
      obj.lastName = result.data.user[0].lastName;
      obj.email = result.data.user[0].email;
      if (result.data.user[0].mobileNumber) {
        obj.mobileNumber =
          "+" +
          result.data.user[0].selectedCode +
          result.data.user[0].mobileNumber;
      }
      if (result.data.user[0].newmobileNumber) {
        obj.newMobileNumber =
          "+" +
          result.data.user[0].selectedCode2 +
          result.data.user[0].newmobileNumber;
      }
      obj.description = result.data.user[0].description;
      obj.companyName = result.data.user[0].companyName;
      obj.profileImage = result.data.user[0].profileimage;
      obj.jobTitle = result.data.user[0].jobTitle;
    } else {
      obj.profileImage = "";
      obj.name = result.data.information[0].name;
      obj.firstName = result.data.information[0].firstName;
      obj.lastName = result.data.information[0].lastName;
    }
    obj.images = result.data.img;
    obj.videos = result.data.videos;
    obj.apps = result.data.apps;
    obj.products = result.data.products;
    obj.services = result.data.services;
    obj.reviews = result.data.reviews;
    obj.businessHours = result.data.businessHours;
    obj.pdfs = result.data.pfds;
    obj.customLinks = result.data.customLinks;
    obj.availability = result.data.availability;
  } catch (error) {
    //console.log(error);
    redirect("/login");
  }
  return obj;
};

const fetchProfile = async (profile) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + cookies().get("jwt_token").value,
      },
    };
    const { data } = await axios.get(
      `${serverUrl}/profile/profile/${profile}`,
      config
    );
    let profileWithData = [];
    for (let i = 0; i < data.length; i++) {
      const obj = await {
        ...data[i],
        ...(await getData(profile, data[i]._id)),
      };
      profileWithData.push(obj);
    }
    return profileWithData;
  } catch (error) {
    //console.log(error?.response);
    redirect("/login");
  }
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
      record: res.data,
      email: res.data[0].email,
      name: res.data[0].name,
      pro: res.data[0].pro,
      starter: res.data[0].starter,
      basic: res.data[0].basic,
      id: res.data[0]._id,
      emailVerified: res.data[0].emailVerified,
    };
  } catch (error) {
    //console.log(error);
    redirect("/login");
  }
};

export default async function SelectProfiles({ params }) {
  const profileData = await fetchProfile(params.userName);
  const data = await fetchData(params.userName);

  return (
    <SelectProfile
      userName={params.userName}
      data={data}
      profileData={profileData}
    />
  );
}
