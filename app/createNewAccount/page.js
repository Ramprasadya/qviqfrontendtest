import dynamic from 'next/dynamic'

const CreateNewAccount = dynamic(() => import('../../components/Admin/CreateNewAccount'), {
  ssr: false 
})

const page = () => {
  return (
    <CreateNewAccount/>
  )
}

export default page