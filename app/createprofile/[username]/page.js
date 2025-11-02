import CreateProfile from "@/components/ProfileCategory/CreateProfile";

export const metadata = {
  title: "Qviq - Choose Profile",
};

export default function ChooseProfiles({ params, searchParams }) {
  const userName = params.username;
  // console.log(userName, "username");
  return <CreateProfile searchParams={searchParams} userName={userName} />;
}
