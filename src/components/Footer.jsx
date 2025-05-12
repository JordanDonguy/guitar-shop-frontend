import facebookLogo from '../assets/img/facebook-logo.png';
import instagramLogo from '../assets/img/instagram-logo.png';
import youtubeLogo from '../assets/img/youtube-logo.png';
import xLogo from '../assets/img/x-logo.png';

export default function Footer() {
    return (
        <footer class="flex justify-between items-center bg-neutral-800 px-[10%] h-80 text-teal-50">
            <div class="flex items-center justify-between w-120">
                <a href="http://facebook.com" target="_blank"><img src={facebookLogo} class="w-24 h-24 hover:brightness-125"/></a>
                <a href="http://instagram.com" target="_blank"><img src={instagramLogo} class="w-20 h-20 hover:brightness-125"/></a>
                <a href="http://youtube.com" target="_blank"><img src={youtubeLogo} class="w-24 h-24 hover:brightness-125"/></a>
                <a href="http://x.com" target="_blank"><img src={xLogo} class="w-24 h-24 hover:brightness-200"/></a>
            </div>
            <div class="flex flex-col justify-between h-64">
                <h3 class="text-5xl mb-4">Features</h3>
                <ul class="flex flex-col justify-between h-45 list-disc text-xl font-light pl-5">
                    <li>3 years warranty</li>
                    <li>30-days free return</li>
                    <li>Repair service</li>
                    <li>Expert advice</li>
                    <li>Satisfaction guarantee</li>
                </ul>
            </div>
            <div class="flex flex-col justify-between pr-[10%] h-64">
                <h3 class="text-5xl mb-4">Company</h3>
                <ul class="flex flex-col justify-between text-2xl h-45 font-light">
                    <a href="#" class="hover:text-teal-400"><li>About us</li></a>
                    <a href="#" class="hover:text-teal-400"><li>Shipping fees</li></a>
                    <a href="#" class="hover:text-teal-400"><li>Contact</li></a>
                    <a href="#" class="hover:text-teal-400"><li>Services</li></a>
                </ul>
            </div>
        </footer>
    )
}
