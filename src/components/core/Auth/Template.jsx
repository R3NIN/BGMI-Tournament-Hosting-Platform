import { useEffect } from 'react';
import { useSelector } from "react-redux";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading) {
      document.querySelector('.spinner')?.classList.add('hidden');
    }
  }, [loading]);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">

            <img
              src={image}
              alt="Login or signup illustration"
              width={558}
              height={504}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg shadow-lg md:absolute md:-top-4 md:right-4 md:z-10"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;