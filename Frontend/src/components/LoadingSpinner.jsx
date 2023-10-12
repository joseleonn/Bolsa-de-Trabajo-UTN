import { Spinner } from '@nextui-org/react'

const LoadingSpinner = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center backdrop-blur-md bg-opacity-30'>
        <Spinner/>
    </div>
  )
}

export default LoadingSpinner