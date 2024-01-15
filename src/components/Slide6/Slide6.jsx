import React, { useState, useEffect } from "react";
import logo from '../../assets/spaceup_logo.svg'
import rocket from '../../assets/Rocket.png'
import { useStateContext } from "../../context/SateContext";
import './style.css'
import { Link } from "react-router-dom";



const Slide6 = () => {
    const { setSlide } = useStateContext()
    const componentRef = React.useRef(null);
    const [animate, setAnimate] = React.useState(false)
    useEffect(() => {
        const handleScroll = () => {
            const element = componentRef.current;
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight - 500 && rect.bottom >= 0) {
                    setSlide('#info')
                    setAnimate(true)
                } else {
                    setAnimate(false)
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div ref={componentRef} id="info" className='component relative z-30 bg-white max-w-full overflow-hidden'>
            <div className="flex flex-col lg:flex-row gap-x-24 gap-y-6 my-24 mx-8 md:mx-12 lg:mx-20 border-b-2 pb-6">
                <div className='col-span-1 '>
                    <h1 class="text-black roboto flex lg:flex-col gap-x-1 ">
                        <hr className='border-[1.5px] lg:rotate-0 rotate-90 lg:w-[100px] my-5' />
                        <span class="text-3xl">A</span>
                        <span class="text-3xl">B</span>
                        <span class="text-3xl">O</span>
                        <span class="text-3xl">U</span>
                        <span class="text-3xl">T</span>
                    </h1>
                </div>
                <div className="flex flex-1 justify-center items-center text-left lg:pt-5 text-sm sm:text-base font-normal font-satoshi">
                    <p>
                        
                        To alleviate water scarcity in arid lands, ie, in India for example, Thar desert, regions of Rajasthan, Punjab,  Gujurat, Haryana - we bring forth a novel innovation in water harvesting mechanism from desert air

    The solution is a dome-like structure which consists of 3 unique layers:
    A ridged outer layer (ROL)
    Hydrophilic condensation layer (HCL)
    Peltier-cooled condensation layer (PCCL)

    The ridged (bumpy) outer layer follows in the principle of Bernoulli’s effect, effectively exposing more surface area to the desert breeze. Beneath it, a hydrophilic condensation layer consisting of hydrogel-like material absorbs the water and streams it into a water collection basin below. The innermost layer is a Peltier cooler, powered by solar energy, which offers thermoelectric cooling for dew condensation. 
    <Link to='/about' className="text-blue-500 roboto"> Click here to View More</Link>
                    </p>

                </div>
            </div>
            <div className="flex justify-center">
                <div className='relative -z-10 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-[#41980a] flex justify-center'>
                    <img
                        src={rocket}
                        alt="Rocket"
                        className={`transform ${animate && 'rocketUp'}  h-36 sm:h-48 lg:h-80`}
                    />
                </div>
            </div>
            <div className="bg-Vector3 bg-cover bg-no-repeat bg-top -mt-36 sm:-mt-64 lg:-mt-96">
                <div className="flex justify-end items-center my-auto flex-col min-h-[50vh] p-10">
                    <img
                        src={logo}
                        alt="logo"
                        className="hidden h-48 -mb-10"
                    />
                    <h1 className="text-white text-xl font-normal roboto">TEAM CODE M</h1>
                </div>
            </div>

        </div>
    )
}

export default Slide6