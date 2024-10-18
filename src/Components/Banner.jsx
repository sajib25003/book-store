import '../index.css';
import banner from '../assets/banner.jpg'

const Banner = () => {
    return (
        <div id="banner-container">
            <img src={banner} />
            <div id='banner-text'>
                <h2>Enjoy Reading?</h2>
                <h4>Here is our collection for you...</h4>
            </div>
        </div>
    );
};

export default Banner;