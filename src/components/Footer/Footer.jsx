import React from "react";
import "./Footer.css"; // Create this file for custom styling
import { FaGithub } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="footer mt-20 ">
      <div className="footer-content">
        <p>Created by ❤️</p>
        <ul className="footer-names flex justify-evenly py-10">
          <span className="flex flex-col justify-center items-center">
            <a
              className="flex flex-col justify-center items-center"
              href="https://github.com/Harshbailurkar"
            >
              <li className="text-2xl">Harsh Bailurkar</li>

              <FaGithub size={22} />
            </a>
          </span>
          <span className="flex flex-col justify-center items-center">
            <a
              className="flex flex-col justify-center items-center"
              href="https://github.com/Spikree"
            >
              <li className="text-2xl">Avishkar Mahalingpure</li>

              <FaGithub size={22} />
            </a>
          </span>
          <span className="flex flex-col justify-center items-center">
            <a
              className="flex flex-col justify-center items-center"
              href="https://github.com/shreykiee"
            >
              <li className="text-2xl">Shreyash Mahalingpure</li>

              <FaGithub size={22} />
            </a>
          </span>
          <span className="flex flex-col justify-center items-center">
            <a
              className="flex flex-col justify-center items-center"
              href="https://github.com/Sukhankar"
            >
              <li className="text-2xl">Sukhankar Hanminahal</li>

              <FaGithub size={22} />
            </a>
          </span>
        </ul>
      </div>
    </footer>
  );
}
