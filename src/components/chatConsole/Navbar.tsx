"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { useState } from "react";

interface NavbarProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, setIsDark }) => {
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <div className="dark:bg-[#282828] bg-[#F6F5F2] absolute  h-14 z-10 w-full top-0 flex items-center ps-5 justify-between">
      <div className="flex gap-1 items-center">
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="100%"
          viewBox="5.000375747680664 8.805000305175781 89.99962615966797 82.38999938964844"
        >
          <path
            className="dark:text-white"
            d="M92.726 17.19c-3.03-5.25-8.46-8.385-14.523-8.385H21.797c-6.063 0-11.492 3.135-14.523 8.385s-3.032 11.52 0 16.77l28.202 48.85c3.032 5.25 8.461 8.385 14.524 8.385 6.063 0 11.493-3.135 14.523-8.385l28.203-48.85c3.032-5.25 3.032-11.519 0-16.77zm-82.438 1.74c2.402-4.16 6.705-6.645 11.509-6.645h31.046c4.398 0 8.195 2.207 10.417 6.055 2.333 4.04 2.32 9.08-.016 13.128l-.6 1H36.153l-.02.033-2.13-.033c-5.736 0-10.866 2.954-13.722 7.901a16.149 16.149 0 0 0-1.995 5.705l-7.998-13.853c-2.403-4.162-2.403-9.13 0-13.29zm39.604 35.593L39.167 35.948h21.449L49.892 54.523zM61.509 81.07c-2.402 4.16-6.704 6.645-11.509 6.645-4.804 0-9.107-2.484-11.51-6.645L23.336 54.82c-2.311-4.001-2.326-8.753-.041-12.71 2.227-3.859 6.23-6.162 10.68-6.162l1.184.019 13.212 22.882 1.058 1.905c2.904 5.029 8.104 8.031 13.91 8.031a16.18 16.18 0 0 0 5.902-1.107L61.509 81.07zm28.203-48.85l-15.47 26.797-.006-.003c-2.274 3.94-6.348 6.291-10.896 6.291s-8.623-2.352-10.882-6.267l-.566-1.019 13.245-22.941 1.106-1.846c2.972-5.145 2.983-11.518.031-16.632a15.778 15.778 0 0 0-3.654-4.315h15.583c4.805 0 9.108 2.484 11.51 6.646 2.402 4.16 2.402 9.129 0 13.29z"
            fill="currentColor"
          ></path>
        </svg>
        <p className="text-lg font-semibold">ChatBOT</p>
      </div>
      <div className="flex me-5 ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {isDark ? (
                <svg
                  onClick={() => setIsDark(false)}
                  width="30"
                  height="30"
                  id="light-icon"
                >
                  {" "}
                  <circle cx="15" cy="15" r="6" fill="currentColor" />{" "}
                  <line
                    id="ray"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    x1="15"
                    y1="1"
                    x2="15"
                    y2="4"
                  ></line>{" "}
                  <use href="#ray" transform="rotate(45 15 15)" />{" "}
                  <use href="#ray" transform="rotate(90 15 15)" />{" "}
                  <use href="#ray" transform="rotate(135 15 15)" />{" "}
                  <use href="#ray" transform="rotate(180 15 15)" />{" "}
                  <use href="#ray" transform="rotate(225 15 15)" />{" "}
                  <use href="#ray" transform="rotate(270 15 15)" />{" "}
                  <use href="#ray" transform="rotate(315 15 15)" />{" "}
                </svg>
              ) : (
                <svg
                  onClick={() => setIsDark(true)}
                  width="30"
                  height="30"
                  id="dark-icon"
                >
                  {" "}
                  <path
                    fill="currentColor"
                    d=" M 23, 5 A 12 12 0 1 0 23, 25 A 12 12 0 0 1 23, 5"
                  />{" "}
                </svg>
              )}
            </TooltipTrigger>
            <TooltipContent>
              {isDark ? <p>Dark Theme</p> : <p>Light Theme</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <form action="/auth/signout" method="post" className="ms-4">
          <Button type="submit" className="mx-1 h-9 w-[5.6rem] px-0"  onClick={()=>{setLoader(true)}}>
            {loader &&
              <div
                className="me-1 inline-block h-3 w-3 animate-spin rounded-full border-[0.2rem] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>}
            <>Sign out</>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
