import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useStateContext } from '../context/SateContext';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const {slide, setSlide, black} = useStateContext()
    const [toggle, setToggle] = React.useState(false)
    React.useEffect(() => {
        setSlide(window.location.hash)
      }, []);

  return (
    <>
        {/* Laptop Navigation */}
        <div className='pl-5 mt-[20vh] md:flex flex-col hidden'>
            <a href="/#home" onClick={() => setSlide('#home')} className='flex items-center h-20'>
                <HomeOutlinedIcon className={`${(slide != '#events' && slide != '#speakers' && slide != '#plan' && slide != '#images' && slide != '#info' && slide != '/register') ? 'text-green-600' : black ? 'text-white' : 'text-black'} md:!text-[40px] text-[20px] hover:text-green-600 focus:text-green-600 hover:cursor-pointer`} />
            </a>
            <a href="/#speakers" onClick={() => setSlide('#speakers')} className='flex items-center h-20'>
                <VolumeUpOutlinedIcon className={`${slide == '#speakers' ? 'text-green-600' : black ? 'text-white' : 'text-black'} md:!text-[35px] text-[20px] hover:text-green-600 focus:text-green-600 hover:cursor-pointer`} />
            </a>
            <a href="/#info" onClick={() => setSlide('#info')} className='flex items-center h-20'>
                <InfoOutlinedIcon className={`${slide == '#info' ? 'text-green-600' : black ? 'text-white' : 'text-black'} md:!text-[30px] text-[20px] hover:text-green-600 focus:text-green-600 hover:cursor-pointer`} />
            </a>
            <a href="/live" onClick={() => setSlide('/register')} className='flex items-center h-20'>
                <button className='bg-[#41980a] text-white px-5 py-3 -ml-10 mt-20 -rotate-90'>LIVE WEATHER</button>
            </a>
        </div>

        {/* Mobile Navigation  */}
        <div onClick={() => setToggle(toggle => !toggle)} className='md:hidden w-screen absolute z-20 px-5 py-5'>
            {toggle ? <CloseOutlinedIcon fontSize="large" className={`${black ? 'text-white' : 'text-black'}`} /> : <MenuOutlinedIcon fontSize="large" className={`${black && slide != '#info' ? 'text-white' : 'text-black'}`} />}
        </div>
        {toggle && 
        <div onClick={() => setToggle(false)} className={`${black ? 'bg-[#080605]' : 'bg-white'} absolute w-screen h-screen px-10 flex flex-col justify-center items-center`}>
            <div className='mt-[0vh]'>
                <a href="/#home" onClick={() => setSlide('#home')} className='flex justify-center items-center h-20'>
                    <HomeOutlinedIcon className={`${(slide != '#events' && slide != '#speakers' && slide != '#plan' && slide != '#images' && slide != '#info' && slide != '/register') ? 'text-green-600' : black ? 'text-white' : 'text-black'} !text-[30px] hover:text-green-600 focus:text-green-600 hover:cursor-pointer`} />
                </a>
                <a href="/#speakers" onClick={() => setSlide('#speakers')} className='flex justify-center items-center h-20'>
                    <VolumeUpOutlinedIcon className={`${slide == '#speakers' ? 'text-green-600' : black ? 'text-white' : 'text-black'} !text-[30px] hover:text-green-600 focus:text-green-600 hover:cursor-pointer`} />
                </a>
                <a href="/#info" onClick={() => setSlide('#info')} className='flex justify-center items-center h-20'>
                    <InfoOutlinedIcon className={`${slide == '#info' ? 'text-green-600' : black ? 'text-white' : 'text-black'} !text-[30px] hover:text-green-600 focus:text-green-600 hover:cursor-pointer`} />
                </a>
                <a href="/live" onClick={() => setSlide('/register')} className='flex justify-center items-center h-20'>
                    <button className='bg-[#41980a] text-white px-5 py-3'>LIVE WEATHER</button>
                </a>
            </div>
        </div>
        }
    </>
  )
}

export default Sidebar