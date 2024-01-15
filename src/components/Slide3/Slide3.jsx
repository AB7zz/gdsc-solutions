import React, { useEffect } from 'react'
import { useStateContext } from "../../context/SateContext";
import tessy1 from '../../assets/photo1.png'
import tessy2 from '../../assets/photo2.png'
import brindha1 from '../../assets/brindha1.png'
import brindha2 from '../../assets/brindha2.png'
import vais1 from '../../assets/vais1.jpeg'
import vais2 from '../../assets/vais2.jpeg'
import kerala from '../../assets/kerala.png'
import right_tree from '../../assets/right_tree.png'
import pattern from '../../assets/Pattern 01.png'

const Slide3 = () => {

    const { setSlide } = useStateContext()
    const componentRef = React.useRef(null);
    const [speaker, setSpeaker] = React.useState(1)
    useEffect(() => {
        const handleScroll = () => {
            const element = componentRef.current;
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight - 500 && rect.bottom >= 0) {
                    setSlide('#speakers')
                } else {

                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const speakers = [
        {
            name: "Problem",
            designation: "",
            location: "",
            desc: "In regions with limited water resources, the challenge is to design and implement sustainable, innovative, and equitable solutions that alleviate water scarcity, ensure reliable access to clean water, and promote efficient water management practices while considering the ecological and socio- economic factors at play.",
            img1: tessy1,
            img2: tessy2,
            subname1: "",
            subname2: "",
        },
        {
            name: "What we are Optimizing",
            designation: "",
            location: "",
            desc: "Water harvesting capabilities of exisitng inventions - introduced a low-cost cooling mechanism Water holding capacities of existing inventions - cheap production material with high absorbent properties",
            img1: brindha1,
            img2: brindha2,
            subname1: "",
            subname2: "",
        }
    ]

    const handleDec = () => {
        if(speaker > 1){
            setSpeaker(speaker => speaker - 1)
        }else{
            setSpeaker(2)
        }
    }

    const handleInc = () => {
        if(speaker < 2){
            setSpeaker(speaker => speaker + 1)
        }else{
            setSpeaker(1)
        }
    }
    return (
        <div ref={componentRef} id="speakers" className='component bg-white md:h-full h-[100%] w-full relative z-30 py-10 px-5'>
            {/* <hr className='absolute border-[1.5px] md:rotate-0 rotate-90 md:h-[700px] h-[200px] md:ml-[1px] ml-[10px] ' /> */}
            <div className='grid md:grid-cols-6 grid-cols-1'>  
                <div className='md:col-span-1 flex md:flex-col items-center'>
                    <p onClick={handleDec} className='transform md:-rotate-90 rotate-180 text-4xl md:text-5xl mt-2 md:mt-0 md:-ml-3 hover:cursor-pointer'>&gt;</p>
                    <hr className='md:h-[200px] md:w-[2px] md:min-w-[2px] h-[2px] w-[35%] min-w-[35%] bg-black'/>
                    <h1 className=' text-black text-3xl md:text-5xl my-5'>{speaker}/2</h1>
                    <hr className='md:h-[200px] md:w-[2px] md:min-w-[2px] h-[2px] w-[35%] min-w-[35%] bg-black'/>
                    <p onClick={handleInc} className='transform md:rotate-90 rotate-0 text-4xl md:text-5xl mb-1 md:mb-0 md:ml-3 hover:cursor-pointer'>&gt;</p>
                </div>
                <div className='col-span-5'>
                    <div className='grid grid-cols-1'>
                        <pre><h1 className='quicksand md:text-5xl text-3xl text-center md:text-left font-normal'>{speakers[speaker-1].name}</h1> </pre>
                        <div className='grid md:grid-cols-2 grid-cols-1'>
                            <div className='my-10 grid grid-rows-2'>
                                <p className="md:row-span-1 row-span-2 quicksand md:text-left text-center pr-10">{speakers[speaker-1].desc}</p>
                                <div className='md:block hidden absolute bottom-0 right-[45%]'>
                                    <div className=''>
                                        <img src={right_tree} alt='right tree' className='top-40 relative w-[300px]'  />
                                        <img src={pattern} alt='pattern' className='w-[300px] h-[250px]'/>
                                    </div>
                                    <div className='-mt-20 flex justify-end items-center'>
                                        <h1 className="lg:text-3xl  roboto">
                                        {speakers[speaker-1].subname1} <br/>{speakers[speaker-1].subname2}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1'>
                                <h1 className='quicksand text-2xl md:text-left text-center'>{speakers[speaker-1].designation}</h1>
                                <div className='my-10 grid md:grid-cols-2 grid-cols-1'>
                                    <div className='grid md:grid-rows-2'>
                                        <img src={speakers[speaker-1].img1} alt='tessy1' className='md:w-[100%] h-[80%]' />
                                        {/* <img src={speakers[speaker-1].img2} alt='tessy1' className='md:w-[100%] h-[90%]' /> */}
                                    </div>
                                    {/* <div className='ml-5 md:block hidden'>
                                        <pre><h1 className='text-xl ml-5 my-5 quicksand'>Kerala, India</h1> </pre>
                                        <img src={kerala} alt='kerala' className='h-[350px]' />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <hr className='absolute border-[1.5px]  md:rotate-0 rotate-90 md:h-[700px] h-[200px]  lg:mx-[110px] md:mx-[100px]' />
            <hr className=' border-[1.5px] md:rotate-0 rotate-90 md:w-[700px] lg:w-[1420px] lg:my-[110px] md:my-[70px] md:ml-[100px] lg:ml-[110px] ' />
            <hr className=' absolute border-[1.5px] md:-rotate-0 -rotate-90 md:w-[620px] lg:w-[767px]  lg:my-[-10px] md:my-[158px] md:ml-[570px] lg:ml-[770px]' />
            <hr className='absolute border-[1.5px] md:rotate-0 rotate-90 md:h-[700px] lg:h-[3000px] lg:mt-[-135px] md:mt-[45px]  lg:ml-[770px] md:ml-[570px] ' />  */}
        </div>
    )
}

export default Slide3