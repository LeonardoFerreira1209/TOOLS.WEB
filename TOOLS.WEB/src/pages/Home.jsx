import FeaturesHome from "../partials/home/FeaturesHome";
import Footer from "../partials/home/Footer";
import HeroHome from "../partials/home/HeroHome";
import HomeHeader from "../partials/home/HomeHeader";
import News from "../partials/home/News";
import Newsletter from "../partials/home/Newsletter";
import PageIllustration from "../partials/home/PageIllustration";
import Process from "../partials/home/Process";
import Tabs from "../partials/home/Tabs";
import Target from "../partials/home/Target";


function Home() {

  return (
    <div className="bg-white flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <HomeHeader />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <HeroHome />
        <Process />
        <FeaturesHome />
        <Tabs />
        <Target />
        <News />
        <Newsletter />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;