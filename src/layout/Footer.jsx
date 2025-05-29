import React from "react";
import {
    Rocket,
  } from "lucide-react";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className=" w-full">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row ">
        <a href="#" className="">
          <span className="text-neutral-700 flex items-center gap-1">
            {" "}
            Work Space <Rocket size={20} />
          </span>
        </a>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          © Copyright {dayjs().year()}. All Rights Reserved.
        </p>

        <div className="flex -mx-2">
          <a
            href="#"
            className="mx-2 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="Reddit"
          >
            <Icon icon="mdi:github" width="24" height="24" />
          </a>
          <a
            href="#"
            className="mx-2 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="Reddit"
          >
            <Icon icon="ic:baseline-discord" width="24" height="24" />
          </a>

          <a
            href="#"
            className="mx-2 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="Reddit"
          >
            <Icon icon="ri:twitter-x-fill" width="24" height="24" />
          </a>
        </div>
      </div>
    </footer>
  );
}
