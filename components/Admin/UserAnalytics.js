"use client";
import ProfileViews from "./utils/ProfileViews";
import ActiveUsers from "./utils/ActiveUsers";
import NewUsers from "./utils/NewUsers";
import { useEffect,useState } from "react";
import axios from "axios";
import { serverUrl } from "@/config";
import { getCookie } from "../utils";

export default function UserAnalytics() {

    const [totalUsers,setTotalUsers] = useState({basicCount:0,starterCount:0,proCount:0});

    const getNewUsers = async()=>{
        const config = {
            headers: {
              Authorization: "Bearer " + getCookie("jwt_token_admin"),
            },
          };
        const { data } = await axios.get(
        `${serverUrl}/analytics/getTotalUsers`,
        config,
        );
        if(data && data[0]) setTotalUsers(data[0]);
        else setTotalUsers({basicCount:0,starterCount:0,proCount:0});
    }
    useEffect(()=>{
        getNewUsers();
    },[]);

    return (<>
        <div className="flex gap-2 p-2 w-full items-center justify-around">
            <div className="flex flex-col items-center justify-center bg-white font-semibold shadow-lg rounded-xl p-3">
                <p className="text-sm md:text-base">Total Users</p>
                <p className=" pt-1">
                    {(totalUsers.basicCount+totalUsers.starterCount+totalUsers.proCount)}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white font-semibold shadow-lg rounded-xl p-3">
                <p className="text-sm md:text-base">Total Basic Users</p>
                <p className=" pt-1">
                    {(totalUsers.basicCount)}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white font-semibold shadow-lg rounded-xl p-3">
                <p className="text-sm md:text-base">Total Starter Users</p>
                <p className=" pt-1">
                    {(totalUsers.starterCount)}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white font-semibold shadow-lg rounded-xl p-3">
                <p className="text-sm md:text-base">Total Pro Users</p>
                <p className=" pt-1">
                    {(totalUsers.proCount)}
                </p>
            </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
            <ProfileViews/>
            <ActiveUsers/>
            <NewUsers/>
        </div>
    </>);
}
