import Header from "./Header";
import ImageAnalysisSlider from "./ImageSliderFour";
// import ImageSliderThree from "./ImageSliderThree";

import SideBar from "./SideBar";

const Home = () => {
  return (
    <div className="h-svh">
      <Header />
      <div className="block md:flex mt-5 md:mt-0">
        <SideBar />
        {/* <ImageSliderThree /> */}
        <ImageAnalysisSlider />
      </div>
    </div>
  );
};

export default Home;
