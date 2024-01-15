import React from 'react'
import { useStateContext } from '../context/SateContext';
import axios from 'axios'



const Live = () => {
    const { setSlide } = useStateContext()
    const componentRef = React.useRef(null);
    const [weatherData, setWeather] = React.useState()
    React.useEffect(() => {
        const handleScroll = () => {
            const element = componentRef.current;
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight - 500 && rect.bottom >= 0) {
                    setSlide('#form')
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleFetchWeather = async(latlong) => {
        const lat = latlong.split(',')[0]
        const long = latlong.split(',')[1]
        const response = await axios.get(`http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=astro&output=json`)
        console.log(response)
        setWeather(response.data.dataseries)
    }


    const getCloudcoverRange = (cloudcover) => {
    if (cloudcover >= 0 && cloudcover <= 6) return '0%-6%';
        else if (cloudcover > 6 && cloudcover <= 19) return '6%-19%';
        else if (cloudcover > 19 && cloudcover <= 31) return '19%-31%';
        else if (cloudcover > 31 && cloudcover <= 44) return '31%-44%';
        else if (cloudcover > 44 && cloudcover <= 56) return '44%-56%';
        else if (cloudcover > 56 && cloudcover <= 69) return '56%-69%';
        else if (cloudcover > 69 && cloudcover <= 81) return '69%-81%';
        else if (cloudcover > 81 && cloudcover <= 94) return '81%-94%';
        else return '';
    };
    const getWindSpeedRange = (windSpeed) => {
        if (windSpeed < 0.3) return 'Below 0.3m/s (calm)';
        else if (windSpeed >= 0.3 && windSpeed <= 3.4) return '0.3-3.4m/s (light)';
        else if (windSpeed > 3.4 && windSpeed <= 8.0) return '3.4-8.0m/s (moderate)';
        else if (windSpeed > 8.0 && windSpeed <= 10.8) return '8.0-10.8m/s (fresh)';
        else if (windSpeed > 10.8 && windSpeed <= 17.2) return '10.8-17.2m/s (strong)';
        else if (windSpeed > 17.2 && windSpeed <= 24.5) return '17.2-24.5m/s (gale)';
        else if (windSpeed > 24.5 && windSpeed <= 32.6) return '24.5-32.6m/s (storm)';
        else if (windSpeed > 32.6) return 'Over 32.6m/s (hurricane)';
        else return '';
    };

    const getLiftedIndexRange = (liftedIndex) => {
        if (liftedIndex < -7) return 'Below -7';
        else if (liftedIndex >= -7 && liftedIndex < -5) return '-7 to -5';
        else if (liftedIndex >= -5 && liftedIndex < -3) return '-5 to -3';
        else if (liftedIndex >= -3 && liftedIndex < 0) return '-3 to 0';
        else if (liftedIndex >= 0 && liftedIndex < 4) return '0 to 4';
        else if (liftedIndex >= 4 && liftedIndex < 8) return '4 to 8';
        else if (liftedIndex >= 8 && liftedIndex < 11) return '8 to 11';
        else if (liftedIndex >= 11) return 'Over 11';
        else return '';
    };
  return (
    <>
        <div ref={componentRef} id="form" className='component md:ml-7 relative z-30 h-screen'>
            <div className='flex md:flex-row flex-col'>
                <div className='bg-white px-5 py-10 w-screen'>
                    <h2 className='text-center font-semibold md:text-4xl text-3xl'>Live Weather Details</h2>
                    <div className='my-10 grid'>
                        <label htmlFor="" className='text-black text-left mr-3'>Select Location</label>
                        <select name="place" onChange={(e) => handleFetchWeather(e.target.value)} className='my-5 px-5 py-3 rounded-[5px] border-[1.5px] border-zinc-500 '>
                            <option value="">Select</option>
                            <option value="27.0238,74.2179">Rajasthan</option>
                            <option value="22.6708,71.5724">Gujarat</option>
                        </select>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Day</th>
                                    <th className="py-2 px-4 border-b">Cloudcover</th>
                                    {/* <th className="py-2 px-4 border-b">Seeing</th> */}
                                    <th className="py-2 px-4 border-b">Transparency</th>
                                    <th className="py-2 px-4 border-b">Lifted Index</th>
                                    <th className="py-2 px-4 border-b">RH2M</th>
                                    <th className="py-2 px-4 border-b">Wind 10m</th>
                                    <th className="py-2 px-4 border-b">Temperature 2m</th>
                                    <th className="py-2 px-4 border-b">Precipitation Type</th>
                                </tr>
                                </thead>
                                <tbody>
                                {weatherData && weatherData.slice(0, 7).map((data, index) => (
                                    <tr key={index}>
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{getCloudcoverRange(data.cloudcover)}</td>
                                    {/* <td className="py-2 px-4 border-b">{data.seeing}</td> */}
                                    <td className="py-2 px-4 border-b">{data.transparency}</td>
                                    <td className="py-2 px-4 border-b">{getLiftedIndexRange(data.lifted_index)}</td>
                                    <td className="py-2 px-4 border-b">{data.rh2m}</td>
                                    <td className="py-2 px-4 border-b">{getWindSpeedRange(data.wind10m.speed)}</td>
                                    <td className="py-2 px-4 border-b">{data.temp2m}</td>
                                    <td className="py-2 px-4 border-b">{data.prec_type}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>
            </div>    
        </div>
        <div className='component'></div>
    </>
  )
}

export default Live