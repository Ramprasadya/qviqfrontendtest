import { clientUrl, hostname, serverUrl } from "@/config";
import { redirect } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
// import RedirectPage from "@/components/Redirect";

const RedirectPage = dynamic(() => import("@/components/Redirect"), {
  ssr: false,
});

export async function generateMetadata({ params }, parent) {
  try {
    const userName = params.subdomain;
    const { data } = await axios.get(`${serverUrl}/device/infoall/${userName}`);

    if (data.user.length !== 0 && !data.user[0].blocked) {
      let activeId =
        data.profileShared.length !== 0 ? data.profileShared[0]._id : "";

      if (activeId) {
        const result = await axios.get(
          `${serverUrl}/getData/data/${activeId}/${userName}`
        );

        if (result.data.user.length !== 0) {
          const user = result.data.user[0];
          // const profileImage = "/default-profile.jpg";
          const profileImage = user.profileimage || "/default-profile.jpg";

          const fullProfileImageUrl = new URL(
            profileImage,
            `https://${params.subdomain}.qviq.io`
          ).toString();

          return {
            metadataBase: new URL(`https://${params.subdomain}.qviq.io`),
             icons: {
              icon: [
                { url: profileImage, sizes: "any" },
                { url: profileImage, sizes: "16x16", type: "image/png" },
                { url: profileImage, sizes: "32x32", type: "image/png" },
                { url: profileImage, sizes: "192x192", type: "image/png" },
              ],
              apple: "/apple-touch-icon.png",
            },
            title: `${user.firstName}'s Profile - Qviq`,
            description:
              user.description || "Check out this profile on Qviq.io",
            openGraph: {
              type: "website",
              url: `https://${userName}.qviq.io`,
              siteName: "Qviq",
              title: `${user.firstName}'s Profile - Qviq`,
              description:
                user.description || "Check out this profile on Qviq.io",
              images: [
                {
                  url: fullProfileImageUrl,
                  width: 630,
                  height: 630,
                  alt: `${user.firstName}'s Profile Image`,
                },
              ],
            },
            twitter: {
              card: "summary_large_image",
              title: `${user.firstName}'s Profile - Qviq`,
              description:
                user.description || "Check out this profile on Qviq.io",
              images: [fullProfileImageUrl],
            },
            robots: {
              index: true,
              follow: true,
              googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
              },
            },
           
          };
        }
      }
    }
  } catch (e) {
    //console.log("Error Fetching Profile Image!", e);
  }
  return {
    title: "Qviq - Profile",
    description: "Check out this profile on Qviq.io",
    keywords: ["created with qviq.io"],
  };
}

const getData = async (userName) => {
  try {
    let obj = { userName: userName };
    const { data } = await axios.get(`${serverUrl}/device/infoall/${userName}`);

    if (data.user.length !== 0 && !data.user[0].blocked) {
      const { analyticsToggle } = axios.post(
        `${serverUrl}/tapopuser/toggle/analytics/${userName}`
      );

      let activeId = "";
      if (data.profileShared.length !== 0) {
        obj.leadCapture = data.profileShared[0].contactForm;
        obj.productSwitch = data.profileShared[0].productSwitch;
        obj.serviceSwitch = data.profileShared[0].serviceSwitch;
        obj.reviewSwitch = data.profileShared[0].reviewSwitch;
        obj.reviewButtonSwitch = data.profileShared[0].reviewButtonSwitch;
        obj.googleReviewButtonSwitch = data.profileShared[0].googleReviewButtonSwitch;
        obj.businessHoursSwitch = data.profileShared[0].businessHoursSwitch;
        obj.logoSwitch = data.profileShared[0].logoSwitch;
        obj.productLabel = data.profileShared[0].productLabel;
        obj.serviceLabel = data.profileShared[0].serviceLabel;
        obj.reviewLabel = data.profileShared[0].reviewLabel;
        obj.businessHoursLabel = data.profileShared[0].businessHoursLabel;
        obj.availabilitySwitch = data.profileShared[0].availabilitySwitch;
        obj.availabilityLabel = data.profileShared[0].availabilityLabel;
        obj.activeTemplate = data.profileShared[0].type;
        obj.templateId = data.profileShared[0]._id;

        activeId = data.profileShared[0]._id;

        const result = await axios.get(
          `${serverUrl}/getData/data/${activeId}/${userName}`
        );

        if (result.data.user.length !== 0 && result.data.user[0].profileimage) {
          obj.profileImage = result.data.user[0].profileimage;
        }

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
          obj.bgImage =
            result.data.customTemplates[0].customizedTemplate.bgImage;
          obj.appIconBg = result.data.customTemplates[0].customizedTemplate?.appIconBg
            obj.customTextColor = (result.data.customTemplates[0].customizedTemplate?.customTextColor);
         obj.customButtontextColor = (result.data.customTemplates[0].customizedTemplate?.customButtontextColor);
        }

        const appsObj = result.data.apps;
        const appsArr =
          appsObj !== undefined ? Object.values(appsObj).flat() : [];

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

        if (result.data.user.length !== 0) {
          obj.firstName = result.data.user[0].firstName;
          obj.lastName = result.data.user[0].lastName;
          obj.name =
            result.data.user[0].firstName + " " + result.data.user[0].lastName;
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
          obj.companyName = result.data.user[0].companyName;
          obj.description = result.data.user[0].description;
          obj.jobTitle = result.data.user[0].jobTitle;
          obj.mobileVisibility = result.data.user[0].mobileVisibility;
          obj.autodownload = result.data.user[0].autodownload;
          //console.log(data.user[0]);

          obj.pimage = result.data.user[0].profileimage;
        } else {
          obj.name = data.user[0].name;
          obj.firstName = data.user[0].firstName;
          obj.lastName = data.user[0].lastName;
        }
        if (result.data.img.length !== 0) {
          obj.images = result.data.img;
        }
        if (result.data.videos.length !== 0) {
          obj.videos = result.data.videos;
        }
        if (result.data.apps.length !== 0) {
          obj.apps = result.data.apps;
        }
        if (result.data.products.length !== 0) {
          obj.products = result.data.products;
        }
        if (result.data.services.length !== 0) {
          obj.services = result.data.services;
        }
        if (result.data.reviews.length !== 0) {
          obj.reviews = result.data.reviews;
        }
        if (result.data.businessHours.length !== 0) {
          obj.businessHours = result.data.businessHours;
        }
        if (result.data.availability.length !== 0) {
          obj.availability = result.data.availability;
        }
        if (result.data.pfds.length !== 0) {
          obj.pdfs = result.data.pfds;
        }
        if (result.data.customLinks.length !== 0) {
          obj.customLinks = result.data.customLinks;
        }

        if (data.profileShared[0].quickSelect === true) {
          obj.quickSelect = true;
          obj.redirectUrl = "";
          if (result.data.apps.social.length > 0) {
            obj.appLabel = result.data.apps.social[0].label;
            obj.redirectUrl =
              result.data.apps.social[0].link +
              result.data.apps.social[0].userName;
          }
          if (result.data.apps.music.length > 0) {
            obj.appLabel = result.data.apps.music[0].label;
            obj.redirectUrl =
              result.data.apps.music[0].link +
              result.data.apps.music[0].userName;
          }
          if (result.data.apps.blog.length > 0) {
            obj.appLabel = result.data.apps.blog[0].label;
            obj.redirectUrl =
              result.data.apps.blog[0].lin + result.data.apps.blog[0].userName;
          }
          if (result.data.apps.payment.length > 0) {
            obj.appLabel = result.data.apps.payment[0].label;
            obj.redirectUrl =
              result.data.apps.payment[0].link +
              result.data.apps.payment[0].userName;
          }
          if (result.data.apps.ecommerce.length > 0) {
            obj.appLabel = result.data.apps.ecommerce[0].label;
            obj.redirectUrl =
              result.data.apps.ecommerce[0].link +
              result.data.apps.ecommerce[0].userName;
          }
          if (result.data.apps.other.length > 0) {
            obj.appLabel = result.data.apps.other[0].label;
            obj.redirectUrl =
              result.data.apps.other[0].link +
              result.data.apps.other[0].userName;
          }
          if (result.data.apps.crypto.length > 0) {
            obj.appLabel = result.data.apps.crypto[0].label;
            obj.redirectUrl =
              result.data.apps.crypto[0].link +
              result.data.apps.crypto[0].userName;
          }
          if (result.data.customLinks.length > 0) {
            obj.customLabel = result.data.customLinks[0].label;
            obj.redirectUrl = result.data.customLinks[0].websiteUrl;
          }
        } else {
          obj.redirectUrl = "";
        }
        return obj;
      } else {
        //console.log("user has locked his profiles");
        throw { error: "Locked Profile" };
      }
    } else {
      //console.log("user not found");
      throw { error: "User Not Found" };
    }
  } catch (err) {
    if (err.error == "Locked Profile") redirect(`${clientUrl}/lockedprofile`);
    redirect(`${clientUrl}/err`);
  }
};



export default async function Redirect({ params, searchParams }) {
  const userName = params.subdomain;
  const obj = await getData(userName);
  
  

  return <RedirectPage data={obj} searchParams={searchParams} />;
}
