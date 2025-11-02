import ChooseProfile from "@/components/ProfileCategory/ChooseProfile";

export const metadata = {
  title: 'Qviq - Choose Profile',
};

export default function ChooseProfiles({searchParams}) {
  return (
   <ChooseProfile searchParams={searchParams} />
  )
}