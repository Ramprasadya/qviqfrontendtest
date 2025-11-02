// import UserDetails from "@/components/Admin/UserDetails";

import dynamic from "next/dynamic";

const UserDetails = dynamic(
  () => import("../../components/Admin/UserDetails"),
  {
    ssr: false, // This ensures the component is not SSR'd
  }
);

export default function UserDetailsPage() {
  return <UserDetails />;
}
