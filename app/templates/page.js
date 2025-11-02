import Templates from "@/components/Website/Templates";

export const metadata = {
  title: 'Qviq - Templates',
  keywords: ['quick sites', 'templates', 'website builder'],
};

export default function templates({searchParams}) {
  return (
    <Templates searchParams={searchParams}/>
  )
}
