import EmailSignature from '@/components/EmailSignature/EmailSignature';

export const metadata = {
  title: 'Qviq - Email Signature',
};

export default function EmailSignaturePage({params}) {
  return (
    <EmailSignature userName={params.userName} />
  )
}
