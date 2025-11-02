import React from 'react'
import analyticimg from './analyticEmpty.png';
import PrimaryButton from '../UiComponents/PrimaryButton';
import { HiOutlineBolt } from 'react-icons/hi2';
import { useContext } from 'react';
import { UserContext } from '../Contexts/context';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AnalyticEmpty = () => {
    const { userType, username } = useContext(UserContext);
    const router = useRouter();
    const navigate =(page)=>{
        router.push(page);
    }

    const handleClick = () => {
        navigate(`/plan/${username}`);
    }

    return (
        <div className='flex flex-col items-center text-center gap-6 text-base md:text-lg font-semibold text-[#1A1A1A] rounded-lg bg-transparent md:bg-[#ffffff] py-16' style={{boxShadow:'0px 2px 20px rgba(216, 216, 216, 0.12)'}}>
            <Image src={analyticimg} alt='analytic img' className='w-[156px] h-[160px] md:w-[300px] md:h-[300px]' />
            <p>No profile data available</p>
            <p className='font-medium text-[#817C7C] text-sm md:text-lg'>There’s no profile activity in selected time-range</p>
            {userType === 'Basic' &&
                <>
                    <p>Upgrade your plan to see detailed analytics and statistic reports.</p>
                    <PrimaryButton text='Upgrade Plan' icon={<HiOutlineBolt />} onClick={handleClick}/>
                </>
            }
        </div>
    )
}

export default AnalyticEmpty
