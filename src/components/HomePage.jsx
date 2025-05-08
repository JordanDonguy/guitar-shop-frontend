import guitar from "../assets/img/guitar-homepage.png";
import eGuitar from "../assets/img/e-guitar.png";
import aGuitar from "../assets/img/a-guitar.png";
import amp from "../assets/img/amp.png";
import newsletter from "../assets/img/newsletter.png";

export default function HomePage() {
    return (
        <div class="flex flex-col pt-[140px] font-onest">

            {/* Hero Section */}

            <div class="flex justify-between h-180 px-[10%]">
                <div class="flex flex-col justify-between">
                    <h1 class="text-8xl/30">Find the guitar you’ve always wanted</h1>
                    <p class="w-170 text-4xl/15 font-light">Explore our selection of electric and acoustic guitars, amps, effects and all the accessories and home-studio gear that you’re dreaming of !</p>
                    <a href="#" class="flex justify-center items-center w-60 h-15 bg-teal-50 text-2xl shadow-md border border-black rounded-4xl hover:bg-teal-200 hover:border-2">Explore now</a>
                </div>
                <img src={guitar} alt="guitar" class= "rotate-[10deg] h-full mt-8"style={{ filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' }}/>
            </div>

            {/* Hottest Products Section */}

            <div class="flex flex-col items-center">
                <h1 class="text-6xl my-25 pl-12">Hottest products</h1>
                <div class="flex justify-center text-shadow-lg">
                    {/* Product card */}
                    <div class="flex flex-col items-center justify-between h-130 border-r-2 border-teal-200">
                        <img src={eGuitar} class="w-90" style={{ filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' }}/>
                        <div class="flex flex-col items-center justify-between h-[30%] pt-5">
                            <h3 class="text-2xl font-medium">PRS</h3>
                            <h4 class="text-xl text-center w-[60%]">John Mayer Silver Sky Electric Guitar Tungsten</h4>
                            <span class="text-2xl font-bold">$ 2749</span>
                        </div>
                    </div>
                    {/* Product card */}
                    <div class="flex flex-col items-center justify-between  h-130 border-r-2 border-teal-200">
                        <img src={amp} class="w-80 pt-5" style={{ filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' }}/>
                        <div class="flex flex-col items-center justify-between h-[30%] pt-5">
                            <h3 class="text-2xl font-medium">Tone King</h3>
                            <h4 class="text-xl text-center w-[60%]">Imperial MKII 20W 1x12 Tube Guitar Combo Amp</h4>
                            <span class="text-2xl font-bold">$ 2695</span>
                        </div>
                    </div>
                    {/* Product card */}
                    <div class="flex flex-col items-center justify-between h-130">
                        <img src={aGuitar} class="w-90" style={{ filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))' }}/>
                        <div class="flex flex-col items-center justify-between h-[30%] pt-5">
                            <h3 class="text-2xl font-medium">Martin</h3>
                            <h4 class="text-xl text-center w-[60%]">Special D Classic Dreadnought Acoustic</h4>
                            <span class="text-2xl font-bold">$ 889</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Corner Section */}
            <div class="flex flex-col items-center">
                <h1 class="text-6xl my-25 pl-12">Feedback Corner</h1>
                <div class="text-center text-2xl w-[75%] pb-8 border-b-2 border-teal-200">
                    ⭐️⭐️⭐️⭐️⭐️<br></br>
                    <p class="font-medium">“Absolutely blown away by the tone and build quality.”</p>
                    <p>I ordered the Fender Player Strat and it arrived in perfect condition, set up and ready to go. Super fast shipping and the customer support was top-notch. Will definitely buy again!<br></br></p>
                    <p class="font-bold"> — Liam R., Nashville, TN <br></br> </p>
                </div>
                <div class="text-center text-2xl w-[75%] py-8 border-b-2 border-teal-200">
                    ⭐️⭐️⭐️⭐️⭐️<br></br>
                    <p class="font-medium">“Excellent customer service for picky players.”</p>
                    <p>I had a few questions about neck profiles and pickup configs — their support team knew their stuff. Ended up with a Gretsch hollow body that fits my style perfectly.<br></br></p>
                    <p class="font-bold"> — Sophia M., Portland, OR<br></br> </p>
                </div>
                <div class="text-center text-2xl w-[75%] py-8 border-b-2 border-teal-200">
                    ⭐️⭐️⭐️⭐️⭐️<br></br>
                    <p class="font-medium">“Beginner-friendly and trustworthy.”</p>
                    <p>As a total beginner, I wasn’t sure what to buy. Their live chat helped me pick the perfect starter bundle. Got my acoustic guitar in 3 days and I’ve been practicing daily since!<br></br></p>
                    <p class="font-bold"> — Derek S., Austin, TX <br></br> </p>
                </div>
            </div>

            {/* Newsletter Section */}
            <div class="flex flex-col items-center px-[10%]">
                <h1 class="text-6xl my-25 pl-10">Newsletter</h1>
                <div class="flex justify-evenly items-center w-full">
                    <img src={newsletter} class="w-80" alt="newsletter" />
                    <div class="w-120 text-center px-10">
                        <p class="text-4xl pb-5">Stay in Tune With the Latest Gear</p>
                        <p class="text-2xl"> Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals, and guitar tips straight from the pros. No spam — just great tone in your inbox.</p>
                    </div>
                    <form class="flex flex-col justify-between h-40">
                        <div>
                            <label for="email"></label>
                            <input id="email" name="email" type="text" placeholder="Email address" class="text-2xl border rounded-lg pl-5 h-12"></input>
                        </div>
                        <button type="submit" class="text-2xl border rounded-4xl h-15 text-teal-50 bg-black hover:bg-gray-800 hover:cursor-pointer">Subscribe now</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
