import React from 'react'

const HeroProfile = (props) => {
  return (
    <div className='flex flex-col items-center gap-[73px]'>
      <div className="relative w-[220px] xsm:w-[240px] h-[300px] mt-24">
        <div className="absolute !w-[240px] !h-[300px] bg-white" style={{ zIndex: '10', transform: 'rotate(3.995deg)' }} />
        <img src={props.profilePic} alt="" className="absolute !w-[240px] !h-[300px]" style={{ zIndex: '20', transform: 'rotate(-4deg)', objectFit: 'cover' }} />
        <div className="absolute top-[-100px] text-[44px] text-center w-full break-all text-[#736CED] font-extrabold flex flex-col" style={{ zIndex: '30' }}>
          <p className='leading-[45px]' style={{ fontFamily: 'Playfair Display, sans-serif' }}>{props.firstName}</p>
          <p className='leading-[45px]' style={{ fontFamily: 'Playfair Display, sans-serif' }}>{props.lastName}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroProfile
