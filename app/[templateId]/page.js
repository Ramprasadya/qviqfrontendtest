import Error404 from "@/components/UiComponents/Error404";
import { clientUrl, hostname, serverUrl } from "@/config";
import axios from "axios";
import AffiliateLink from "@/components/AffiliateLink/AffiliateLink";

export async function generateMetadata({ params }, parent) {
    try{
        const affiliateLink = await getLinkData(params.templateId);
        if(affiliateLink){
            return {
                title:"Qviq",
            };
        }
        else{
            return {
                title:"404 -Page Not Found",
            };
        }
    }
    catch(e){
        // console.log("Error Fetching Profile Image!");
        return {
            title:"404 -Page Not Found",
        };
    }
  }

async function getLinkData(link){
    try{
        const { data } = await axios.get(`${serverUrl}/admin/getAffiliateLink/${link}`);
        if(data.length == 0){
            return null;
        }
        else{
            return data[0];
        }
    }catch(err){
        // console.log(err);
        return null;
    }
}

export default async function page({params}){
    const affiliateLink = await getLinkData(params.templateId);
    return (<>
    {!affiliateLink?
        <Error404/>
        :
        <AffiliateLink data={affiliateLink}/>
    }
    </>
    );
}