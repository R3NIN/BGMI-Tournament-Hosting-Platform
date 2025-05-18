import React, { useState, useEffect } from "react"
import Footer from "../components/Common/Footer"
import CourseCard from "../components/core/Catalog/CourseCard"
import { apiConnector } from "../services/apiConnector"
import { courseEndpoints } from "../services/apis"

const Catalog = ()=> {
  const[loading,setLoading] = useState(true);
  const [error, setError] = useState("");
  // const { catalogName } = useParams()
  // const [active, setActive] = useState(1)
  // const [catalogPageData, setCatalogPageData] = useState(null)
  // const [categoryId, setCategoryId] = useState("")
  const [courses,setCourses] = useState([])
  // Fetch All Categories
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API)
        console.log("The response of get all courses api is ",res)
        setCourses(res?.data?.data || []);
        setLoading(false)
      } catch (error) {
        setError("Could not fetch tournaments. Please try again later.");
        setLoading(false);
        console.log("Could not fetch courses.", error)
      }
    })()
  }, [])
  // useEffect(() => {
  //   if (categoryId) {
  //     ;(async () => {
  //       try {
  //         const res = await getCatalogPageData(categoryId)
  //         setCatalogPageData(res)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     })()
  //   }
  // }, [categoryId])
  
  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  //  else if (!loading && !courses.success) {
  //    return <Error />
  //  }
  
  return (
    <>
      {console.log("I am inside tournaments page")}

      {/* Show error message if API fails */}
      {error ? (
        <div className="text-center py-10 text-red-500">
          Error loading tournaments. Please try again later.
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">BGMI Tournaments</h1>
            <p className="text-gray-300">Compete in exciting BGMI tournaments and win amazing prizes</p>
          </div>

          {/* Tournaments Grid */}
          {courses.length === 0 ? (
            <div className="text-center">
              <div className="text-lg text-gray-400 py-10">
                No tournaments found.
              </div>
              {/* Sample Tournament Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border border-dashed border-gray-600 p-6 bg-gray-900 text-gray-300 flex flex-col">
                    <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Tournament Image</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Tournament Name</h2>
                    <div className="space-y-2 mb-4">
                      <p>Prize: <span className="text-yellow-400">₹10,000</span></p>
                      <p>Date: <span className="text-gray-400">DD/MM/YYYY</span></p>
                      <p>Time: <span className="text-gray-400">HH:MM</span></p>
                      <p>Seats Left: <span className="text-green-400">24/100</span></p>
                    </div>
                    <button 
                      className="mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    >
                      Register Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, i) => (
                <CourseCard key={i} course={course} Height={"h-48"} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      {/* <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>
  
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <Course_Slider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <Course_Slider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {*
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>
      */}
      <Footer />
    </>
  )
}

export default Catalog
