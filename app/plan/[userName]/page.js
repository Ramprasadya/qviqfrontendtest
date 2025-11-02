import ChoosePlan from "@/components/ProfileCategory/ChoosePlan";

export const metadata = {
  title: 'Qviq - Choose Plan',
};

export default function ChoosePlans({searchParams}) {
  return (
   <ChoosePlan searchParams={searchParams}/>
  )
}