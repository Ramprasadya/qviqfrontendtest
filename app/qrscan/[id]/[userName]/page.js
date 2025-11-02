import QRScanCounter from "@/components/UiComponents/BottomComponents/QRScanCounter"

export default function QRScanCounterPage({params}) {
  return (
    <QRScanCounter id={params.id} userName={params.userName}/>
  )
}
