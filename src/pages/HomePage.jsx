import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import guitar from "../assets/img/guitar-homepage.png";
import eGuitar from "../assets/img/e-guitar.png";
import aGuitar from "../assets/img/a-guitar.png";
import amp from "../assets/img/amp.png";
import newsletter from "../assets/img/newsletter.png";

export default function HomePage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsVisible(true);
    }, []);

    return (
        <div className="flex flex-col items-center w-full pt-[100px] font-onest">

            {/* Hero Section */}

            <div className={`${isVisible ? 'fade-in' : ''} flex h-218 shadow-lg`}>
                <div className="flex flex-col justify-between pt-5 pb-10 pl-[10%]">
                    <h1 className="text-8xl/30 text-shadow-lg">Find the guitar you’ve always wanted</h1>
                    <p className="w-170 text-4xl/15 font-light  text-shadow-lg">Explore our selection of electric and acoustic guitars, amps, effects and all the accessories and home-studio gear that you’re dreaming of !</p>
                    <Link to="/products" className="flex justify-center items-center w-60 h-15 bg-teal-50 text-2xl shadow-md border border-black rounded-4xl hover:bg-teal-200 hover:border-2">Explore now</Link>
                </div>
                <div className="flex justify-center items-center bg-neutral-200 w-[80%] pr-[10%]"><img src={guitar} alt="guitar" className="h-full py-10" style={{ filter: 'drop-shadow(30px 20px 5px rgba(139, 143, 143, 0.5))' }} /></div>
            </div>

            {/* Hottest Products Section */}

            <div className="flex flex-col items-center">
                <h1 className="text-6xl my-25 pl-12">Hottest products</h1>
                <div className="flex justify-center text-shadow-lg">
                    {/* Product card */}
                    <div className="flex flex-col items-center justify-between h-160 w-140 border-r-2 border-teal-200">
                        <img src={eGuitar} className="w-110" style={{ filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' }} />
                        <div className="flex flex-col items-center justify-between h-[30%] pt-5">
                            <h3 className="text-3xl font-medium">PRS</h3>
                            <h4 className="text-2xl text-center w-[60%]">John Mayer Silver Sky Electric Guitar Tungsten</h4>
                            <span className="text-3xl font-bold">$ 2749</span>
                        </div>
                    </div>
                    {/* Product card */}
                    <div className="flex flex-col items-center justify-between h-160 w-140 border-r-2 border-teal-200">
                        <img src={amp} className="w-100 pt-5 pb-5" style={{ filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' }} />
                        <div className="flex flex-col items-center justify-between h-[30%] pt-5">
                            <h3 className="text-3xl font-medium">Tone King</h3>
                            <h4 className="text-2xl text-center w-[60%]">Imperial MKII 20W 1x12 Tube Guitar Combo Amp</h4>
                            <span className="text-3xl font-bold">$ 2695</span>
                        </div>
                    </div>
                    {/* Product card */}
                    <div className="flex flex-col items-center justify-between h-160 w-140">
                        <img src={aGuitar} className="w-110" style={{ filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' }} />
                        <div className="flex flex-col items-center justify-between h-[30%] pt-5">
                            <h3 className="text-3xl font-medium">Martin</h3>
                            <h4 className="text-2xl text-center w-[60%]">Special D classNameic Dreadnought Acoustic</h4>
                            <span className="text-3xl font-bold">$ 889</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Corner Section */}
            <div className="flex flex-col items-center">
                <h1 className="text-6xl my-25 pl-12">Feedback Corner</h1>
                <div className="text-center text-2xl w-[75%] pb-8 border-b-2 border-teal-200">
                    ⭐️⭐️⭐️⭐️⭐️<br></br>
                    <p className="font-medium">“Absolutely blown away by the tone and build quality.”</p>
                    <p>I ordered the Fender Player Strat and it arrived in perfect condition, set up and ready to go. Super fast shipping and the customer support was top-notch. Will definitely buy again!<br></br></p>
                    <p className="font-bold"> — Liam R., Nashville, TN <br></br> </p>
                </div>
                <div className="text-center text-2xl w-[75%] py-8 border-b-2 border-teal-200">
                    ⭐️⭐️⭐️⭐️⭐️<br></br>
                    <p className="font-medium">“Excellent customer service for picky players.”</p>
                    <p>I had a few questions about neck profiles and pickup configs — their support team knew their stuff. Ended up with a Gretsch hollow body that fits my style perfectly.<br></br></p>
                    <p className="font-bold"> — Sophia M., Portland, OR<br></br> </p>
                </div>
                <div className="text-center text-2xl w-[75%] py-8">
                    ⭐️⭐️⭐️⭐️⭐️<br></br>
                    <p className="font-medium">“Beginner-friendly and trustworthy.”</p>
                    <p>As a total beginner, I wasn’t sure what to buy. Their live chat helped me pick the perfect starter bundle. Got my acoustic guitar in 3 days and I’ve been practicing daily since!<br></br></p>
                    <p className="font-bold"> — Derek S., Austin, TX <br></br> </p>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="flex flex-col items-center w-full px-[10%] bg-neutral-200 pb-30">
                <h1 className="text-6xl my-25 pl-10">Newsletter</h1>
                <div className="flex justify-evenly items-center w-full">
                    <img src={newsletter} className="w-80" alt="newsletter" />
                    <div className="w-120 text-center px-10">
                        <p className="text-4xl pb-5">Stay in Tune With the Latest Gear</p>
                        <p className="text-2xl"> Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals, and guitar tips straight from the pros. No spam — just great tone in your inbox.</p>
                    </div>
                    <form className="flex flex-col justify-between h-40">
                        <div>
                            <label htmlFor="email"></label>
                            <input id="email" name="email" type="text" placeholder="Email address" className="text-2xl border rounded-lg pl-5 h-12"></input>
                        </div>
                        <button type="submit" className="text-2xl border rounded-4xl h-15 text-teal-50 bg-black hover:bg-gray-800 hover:cursor-pointer">Subscribe now</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
