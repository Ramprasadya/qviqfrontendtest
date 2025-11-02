import Devices from "@/components/Devices/Devices";

export const metadata = {
  title: 'Qviq - Devices',
};

export default function DevicesPage({params}) {
  return (
    <Devices userName={params.userName}/>
  )
}
