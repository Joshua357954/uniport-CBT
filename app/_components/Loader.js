 
const Gif = '/images/Loading (1).gif'

export default function Loader({open}) {
    if (!open)
        return <p></p>

    return (
        <div className='fixed z-10 top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.5)] flex justify-center items-center'>
            <div className='flex justify-center items-center w-78 h-68 bg-white rounded-lg px-10 py-8'>
                <img src={Gif} className='w-38 h-32'/>
            </div>
          
        </div>
    )
}
