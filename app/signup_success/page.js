import SignupThankyou from "@/components/UiComponents/SignupThankyou";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { serverUrl } from "@/config";
import axios from "axios";

export const metadata = {
  title: "Qviq - Signup Success",
};

const getData = async (profile, type) => {
  const obj = {};
  try {
    const { data } = await axios.get(`${serverUrl}/device/infoall/${profile}`);

    if (data.user.length !== 0) {
      if (
        data.profileShared.length !== 0 &&
        data.profileShared[0]._id == type
      ) {
        obj.LeadCapture = data.profileShared[0].contactForm;
        obj.QuickSelect = data.profileShared[0].quickSelect;
        obj.ProductSwitch = data.profileShared[0].productSwitch;
        obj.ServiceSwitch = data.profileShared[0].serviceSwitch;
        obj.logoSwitch = data.profileShared[0].logoSwitch;
        obj.ReviewSwitch = data.profileShared[0].reviewSwitch;
        obj.ReviewButtonSwitch = data.profileShared[0].reviewButtonSwitch;
        obj.BusinessHoursSwitch = data.profileShared[0].businessHoursSwitch;
        obj.ProductLabel = data.profileShared[0].productLabel;
        obj.ServiceLabel = data.profileShared[0].serviceLabel;
        obj.ReviewLabel = data.profileShared[0].reviewLabel;
        obj.BusinessHoursLabel = data.profileShared[0].businessHoursLabel;
        obj.AvailabilitySwitch = data.profileShared[0].availabilitySwitch;
        obj.AvailabilityLabel = data.profileShared[0].availabilityLabel;
      } else if (data.profileUnshared.length !== 0) {
        for (let i = 0; i < data.profileUnshared.length; i++) {
          if (data.profileUnshared[i]._id == type) {
            obj.LeadCapture = data.profileUnshared[i].contactForm;
            obj.QuickSelect = data.profileUnshared[i].quickSelect;
            obj.ProductSwitch = data.profileUnshared[i].productSwitch;
            obj.ServiceSwitch = data.profileUnshared[i].serviceSwitch;
            obj.logoSwitch = data.profileUnshared[i].logoSwitch;
            obj.ReviewSwitch = data.profileUnshared[i].reviewSwitch;
            obj.ReviewButtonSwitch = data.profileUnshared[i].reviewButtonSwitch;
            obj.BusinessHoursSwitch =
              data.profileUnshared[i].businessHoursSwitch;
            obj.ProductLabel = data.profileUnshared[i].productLabel;
            obj.ServiceLabel = data.profileUnshared[i].serviceLabel;
            obj.ReviewLabel = data.profileUnshared[i].reviewLabel;
            obj.BusinessHoursLabel = data.profileUnshared[i].businessHoursLabel;
            obj.AvailabilitySwitch = data.profileUnshared[i].availabilitySwitch;
            obj.AvailabilityLabel = data.profileUnshared[i].availabilityLabel;
          }
        }
      }
    }

    let activeId = "";
    activeId = data.profileShared[0]?._id;

    const result = await axios.get(
      `${serverUrl}/getData/data/${activeId}/${profile}`
    );

    if (
      result.data.customTemplates[0] &&
      Object.keys(result.data.customTemplates[0]).length !== 0
    ) {
      obj.BackgroundColor =
        result.data.customTemplates[0].customizedTemplate.backgroundColor;
      obj.ButtonStyle =
        result.data.customTemplates[0].customizedTemplate.buttonStyle;
      obj.ButtonColor =
        result.data.customTemplates[0].customizedTemplate.buttonColor;
      obj.Color1 = result.data.customTemplates[0].customizedTemplate.color1;
      obj.Color2 = result.data.customTemplates[0].customizedTemplate.color2;
      obj.BgImage = result.data.customTemplates[0].customizedTemplate.bgImage;
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
      obj.DummyData = true;
    } else {
      obj.DummyData = false;
    }
    if (result.data.user.length > 0) {
      obj.Name =
        result.data.user[0].firstName + " " + result.data.user[0].lastName;
      obj.FirstName = result.data.user[0].firstName;
      obj.LastName = result.data.user[0].lastName;
      obj.Email1 = result.data.user[0].email;
      if (result.data.user[0].mobileNumber) {
        obj.MobileNumber =
          "+" +
          result.data.user[0].selectedCode +
          result.data.user[0].mobileNumber;
      }
      if (result.data.user[0].newmobileNumber) {
        obj.NewMobileNumber =
          "+" +
          result.data.user[0].selectedCode2 +
          result.data.user[0].newmobileNumber;
      }
      obj.Description = result.data.user[0].description;
      obj.CompanyName = result.data.user[0].companyName;
      obj.PImage = result.data.user[0].profileimage;
      obj.JobTitle = result.data.user[0].jobTitle;
    } else {
      obj.Name = data.user[0].name;
      obj.FirstName = data.user[0].firstName;
      obj.LastName = data.user[0].lastName;
    }
    obj.Images = result.data.img;
    obj.Videos = result.data.videos;
    obj.Apps = result.data.apps;
    obj.Products = result.data.products;
    obj.Services = result.data.services;
    obj.Reviews = result.data.reviews;
    obj.BusinessHours = result.data.businessHours;
    obj.Pdfs = result.data.pfds;
    obj.CustomLinks = result.data.customLinks;
    obj.Availability = result.data.availability;
  } catch (error) {
    //console.log(error);
    redirect("/login");
  }
  return obj;
};

const fetchProfile = async (profile) => {
  let obj = {};
  obj.Type = "";
  obj.ActiveTemplateName = "";
  obj.ComponentRendered = false;
  try {
    const res = await axios.get(`${serverUrl}/profile/profiletype/${profile}`);
    if (res.data.length > 0) {
      obj.Type = res.data[0]._id;
      obj.ActiveTemplateName = res.data[0].type;
      obj.ComponentRendered = true;
    }
  } catch (error) {
    console.log(error);
  }
  return obj;
};

const fetchId = async (profile) => {
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
    if (res.data.length > 0) {
      return {
        id: res.data[0]._id,
        emailVerified: res.data[0].emailVerified,
        hasGotPro: res.data[0].hasGotPro,
      };
    }
  } catch (error) {
    //console.log(error);
  }
};

const fetchreview = async (profile, type) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + cookies().get("jwt_token").value,
      },
    };
    const { data } = await axios.get(
      `${serverUrl}/record/record/${profile}/${type}`,
      config
    );
    return data;
  } catch (error) {
    // Handle error here, e.g. redirect to an error page
    //console.log(error?.response?.data?.error);
    redirect("/login");
  }
};

export default async function SignUpSuccess({ searchParams }) {
  const username = cookies().get("username")?.value;

  const templateData = await fetchProfile(username);
//console.log("templateData.Type", templateData.Type);

  // const data =
  //   templateData.Type != "" ? await getData(username, templateData.Type) : {};

  // const profileData =
  //   templateData.Type != "" ? await fetchId(username, templateData.Type) : {};

  // const toggleData =
  //   templateData.Type != ""
  //     ? await fetchreview(username, templateData.Type)
  //     : {};

  return (
    <SignupThankyou
      searchParams={searchParams}
      // data={data}
      templateData={templateData}
      // profileData={profileData}
      // toggleData={toggleData}
      templateId={templateData.Type}
      userName={username}
    />
  );
}
