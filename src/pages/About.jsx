import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.jpeg"
import BannerImage1 from "../assets/Images/aboutus1.jpeg"
import BannerImage2 from "../assets/Images/aboutus2.jpeg"
import BannerImage3 from "../assets/Images/aboutus3.jpeg"
import Footer from "../components/Common/Footer"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"

const About = () => {
  return (
    <div>
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
          Our Story: Crafting the Future <br />
            <HighlightText text={"Gaming Tournaments"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
            At Home, we're not just a gaming platform we're the architects of immersive, unforgettable eSports experiences. Born from a deep passion for gaming, our journey began with a vision: to build a space where every gamer can thrive. Here, competition meets camaraderie, and every match is a step toward greatness. We’re more than just tournaments; we’re a community where every player is the hero of their own gaming story. Join us, and help shape the future of competitive play.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[85%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-15">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              In the heart of our passion for gaming, the idea sparked an ambition to redefine the landscape of BGMI tournaments. A group of enthusiasts, united by a common love for eSports, set out on a mission to create a platform where competition and community converged. Late night discussions turned into late-night coding sessions, fueled by the dream of empowering gamers worldwide.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              What began as a shared passion among students quickly grew into something bigger a space where gamers, dreamers, and innovators unite. From late-night planning sessions to organizing our first tournament, we built this platform with dedication and teamwork. Today, it stands as a student-driven eSports hub, where every player helps shape a growing legacy. Our journey proves that with collaboration, creativity, and a love for gaming, students can lead real change.
              </p>
            </div>

            <div className="w-[80%] flex flex-row justify-around">
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767] w-[60%] h-[50%]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              As students passionate about gaming and technology, our vision for Maverix is to create an engaging platform for BGMI tournaments that promotes skill, fair play, and community. This project aims to foster an inclusive environment where players of all levels can compete, connect, and grow. With a focus on innovation and teamwork, we aspire to contribute to the evolving world of eSports and provide a meaningful gaming experience through every tournament we host.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              To revolutionize eSports and BGMI tournaments by creating a dynamic platform that celebrates skill, camaraderie, and fair play. We aim to build an inclusive gaming community where every player, whether a novice or a pro, can embark on a journey of competition and growth. Through creativity, passion, and dedication, we're working to be the driving force behind the evolution of eSports fostering an environment where every match on our platform is a step toward gaming excellence!
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        {/* <LearningGrid /> */}
        <ContactFormSection />
      </section>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        {/* <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1> */}
        {/* <ReviewSlider /> */}
      </div>
      <Footer />
    </div>
  )
}

export default About
