import MainBody from "../components/MainBody";

// Section components
import Hero from "../components/landing/Hero";
import ControlLED from "../components/landing/ControlLED";

import LunarImg from "../assets/img/ocs/lunar-oc.png";

import ControlNav from "../data/control-navigation.json";

function MainPage () {
    return (<>
        <MainBody>
            <Hero
                img={LunarImg}
                shortNav={ControlNav}
            />
            <ControlLED />
        </MainBody>
    </>)
}

export default MainPage;