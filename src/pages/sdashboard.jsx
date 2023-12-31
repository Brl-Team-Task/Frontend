import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef, useEffect } from "react";
import "./sdashboard.css";
import clgImg from "../assets/AKGEC.png";
import { useNavigate } from "react-router";
import Attendance from "../Components/attendance";
import Timetable from "../Components/TimeTable";
import Events from "../Components/Events";
import StudentComponent from "../Components/sprofile";
import Exam from "../Components/Exam";
import Prediction from "../Components/prediction";

export default function SDashboard() {
  const token = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.clear();
    navigate("/");
  };

  const changePasswrod = () => {
    navigate("/changePassword");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        "https://erp-backend-mqly.onrender.com/api/attendance/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);

      if (response.data.status === 201) {
        toast.success("Attendance fetched successfully");
      } else {
        toast.error("Failed to fetch attendance. Please try again.");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };
  const [count, setCount] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const slidesRef = useRef(null);
  const totalSlides = 5;
  useEffect(() => {
    showSlide(slideIndex);
  }, [slideIndex]);

  const showSlide = (index) => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(${-index * 70}%)`;
    }
  };

  const showNextSlide = () => {
    console.log(count);
    setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    setCount((count + 1) % 5);
  };

  const showPrevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    setCount((count + 5 - 1) % 5);
  };

  const toggleSection = () => {
    const sectionEle = document.querySelector("section");
    sectionEle.classList.toggle("active");
  };

  const toggleSmallNav = () => {
    const verticalSmallNav = document.querySelector(".vertical-small-nav");
    verticalSmallNav.classList.toggle("active");
  };

  const toggleSmallUser = () => {
    const smallUserContainer = document.querySelector(".small-user-container");
    smallUserContainer.classList.toggle("active");
  };

  useEffect(() => {
    if (window.location.pathname === "/sdashboard") {
      handleSubmit();
    }
  }, []);

  const [selectedComponent, setSelectedComponent] = useState("Attendance");

  const handleToggleClick = (component) => {
    setSelectedComponent(component);
  };
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Attendance":
        return <Attendance prop={data} />;
      case "TimeTable":
        return <Timetable />;
      case "Events":
        return <Events />;
      case "Profile":
        return <StudentComponent />;
      case "Exam":
        return <Exam />;
      case "Prediction":
        return <Prediction />;

      default:
        return null;
    }
  };
  const renderCarsoleComponent = () => {
    switch (count) {
      case 0:
        return <Attendance prop={data} />;
      case 1:
        return <Timetable />;
      case 2:
        return <Exam />;
      case 3:
        return <Prediction />;
      case 4:
        return <Events />;
      default:
        return null;
    }
  };
  return (
    <>
      <div>
        <nav>
          <div className="left-nav">
            <svg
              className="big-hamburger"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              onClick={toggleSection}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 42.5C7.5 43.8807 8.61929 45 10 45H50C51.3807 45 52.5 43.8807 52.5 42.5V42.5C52.5 41.1193 51.3807 40 50 40H10C8.61929 40 7.5 41.1193 7.5 42.5V42.5ZM7.5 30C7.5 31.3807 8.61929 32.5 10 32.5H50C51.3807 32.5 52.5 31.3807 52.5 30V30C52.5 28.6193 51.3807 27.5 50 27.5H10C8.61929 27.5 7.5 28.6193 7.5 30V30ZM10 15C8.61929 15 7.5 16.1193 7.5 17.5V17.5C7.5 18.8807 8.61929 20 10 20H50C51.3807 20 52.5 18.8807 52.5 17.5V17.5C52.5 16.1193 51.3807 15 50 15H10Z"
                fill="black"
              />
            </svg>
            <svg
              className="hamburger-icon"
              onClick={toggleSmallNav}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="10"
              viewBox="0 0 20 10"
              fill="none"
            >
              <path
                d="M1 1H11.675M1 8.625H18.7917"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p id="home">Home</p>
          </div>
          <div className="right-nav">
            <p>{data.name}</p>
            <img
              className="user-img"
              src={data.profile_url}
              alt=""
              onClick={toggleSmallUser}
            />
            <p id="line"></p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="45"
              viewBox="0 0 36 45"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.6479 31.2986C33.7978 30.4162 33.3084 29.1267 33.3085 27.7693V16.578C33.3085 7.4067 26.4579 0 18 0C9.54208 0 2.69155 7.4067 2.69155 16.578V27.7693C2.69162 29.1267 2.2022 30.4162 1.35206 31.2986C-1.53741 34.433 0.510093 39.7733 4.6051 39.7733H11.8766C12.8044 42.9087 15.2544 45 18 45C20.7456 45 23.1956 42.9087 24.1234 39.7733H31.3949C35.4899 39.7733 37.5374 34.433 34.6479 31.2986ZM18 41.5147C16.861 41.5095 15.7878 40.8669 15.0914 39.7733H20.8321C20.1578 40.8497 19.1141 41.4915 18 41.5147ZM31.414 36.2905C32.1097 36.367 32.7721 35.9143 33.0788 35.1528C33.2277 34.6941 33.0921 34.1715 32.7535 33.899C31.3117 32.3385 30.4782 30.1135 30.4572 27.7694V16.578C30.4572 9.35707 24.8696 3.48279 18.0191 3.48279C11.1686 3.48279 5.58099 9.35707 5.58099 16.578V27.7694C5.56 30.1135 4.72647 32.3385 3.28472 33.899C2.93898 34.1646 2.795 34.6887 2.94028 35.1528C3.24701 35.9143 3.90938 36.367 4.60507 36.2905H31.414Z"
                fill="black"
              />
            </svg>
          </div>
        </nav>
        <section className="vertical-nav">
          <img src={clgImg} alt="" />
          <div className="icons">
            <div className="upper-icons">
              <a href="#" onClick={() => handleToggleClick("Attendance")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <path
                    d="M34.4537 16.6033C34.4537 15.7749 33.7822 15.1033 32.9537 15.1033C32.1253 15.1033 31.4537 15.7749 31.4537 16.6033H34.4537ZM9.54624 16.6033C9.54624 15.7749 8.87466 15.1033 8.04624 15.1033C7.21781 15.1033 6.54624 15.7749 6.54624 16.6033H9.54624ZM24.7935 35.3747L24.4486 33.9148L24.7935 35.3747ZM16.2065 35.3747L16.5514 33.9148L16.2065 35.3747ZM25.3319 8.56597L24.2675 9.62287L25.3319 8.56597ZM34.8106 20.241C35.3943 20.8288 36.344 20.8322 36.9319 20.2485C37.5198 19.6648 37.5231 18.715 36.9394 18.1272L34.8106 20.241ZM15.6681 8.56597L16.7325 9.62287V9.62287L15.6681 8.56597ZM4.06059 18.1272C3.47688 18.715 3.48025 19.6648 4.06811 20.2485C4.65596 20.8322 5.60571 20.8288 6.18941 20.241L4.06059 18.1272ZM16.6023 31.2972L15.1281 31.0205V31.0205L16.6023 31.2972ZM16.6353 31.1212L18.1096 31.3979V31.3979L16.6353 31.1212ZM24.3647 31.1212L22.8904 31.3979V31.3979L24.3647 31.1212ZM24.3977 31.2972L25.8719 31.0205L25.8719 31.0205L24.3977 31.2972ZM23.9026 35.1095L22.5482 34.4649V34.4649L23.9026 35.1095ZM22.3487 34.8841C21.9927 35.6322 22.3105 36.5272 23.0586 36.8831C23.8066 37.2391 24.7016 36.9213 25.0576 36.1733L22.3487 34.8841ZM17.0974 35.1095L15.7429 35.7541L15.7429 35.7541L17.0974 35.1095ZM15.9424 36.1733C16.2984 36.9213 17.1934 37.2391 17.9415 36.8831C18.6895 36.5271 19.0073 35.6321 18.6513 34.8841L15.9424 36.1733ZM19.4085 28.0894L19.0074 26.644L19.4085 28.0894ZM21.5915 28.0894L21.9926 26.644L21.5915 28.0894ZM31.4537 16.6033V25.0055H34.4537V16.6033H31.4537ZM9.54624 25.0055V16.6033H6.54624V25.0055H9.54624ZM24.4486 33.9148C21.8514 34.5284 19.1486 34.5284 16.5514 33.9148L15.8616 36.8345C18.9124 37.5552 22.0875 37.5552 25.1383 36.8345L24.4486 33.9148ZM16.5514 33.9148C12.4544 32.947 9.54624 29.2619 9.54624 25.0055H6.54624C6.54624 30.6395 10.3976 35.5437 15.8616 36.8345L16.5514 33.9148ZM25.1383 36.8345C30.6023 35.5437 34.4537 30.6395 34.4537 25.0055H31.4537C31.4537 29.2619 28.5455 32.947 24.4486 33.9148L25.1383 36.8345ZM24.2675 9.62287L34.8106 20.241L36.9394 18.1272L26.3963 7.50908L24.2675 9.62287ZM14.6037 7.50908L4.06059 18.1272L6.18941 20.241L16.7325 9.62287L14.6037 7.50908ZM26.3963 7.50908C25.2874 6.39225 24.3514 5.44513 23.5064 4.79583C22.6273 4.12027 21.6707 3.625 20.5 3.625V6.625C20.7445 6.625 21.065 6.70322 21.6785 7.17466C22.3262 7.67234 23.0986 8.44571 24.2675 9.62287L26.3963 7.50908ZM16.7325 9.62287C17.9014 8.44571 18.6738 7.67234 19.3215 7.17466C19.935 6.70322 20.2555 6.625 20.5 6.625V3.625C19.3293 3.625 18.3727 4.12027 17.4936 4.79583C16.6486 5.44513 15.7126 6.39225 14.6037 7.50908L16.7325 9.62287ZM18.0766 31.5739L18.1096 31.3979L15.1611 30.8444L15.1281 31.0205L18.0766 31.5739ZM22.8904 31.3979L22.9234 31.5739L25.8719 31.0205L25.8389 30.8444L22.8904 31.3979ZM22.5482 34.4649L22.3487 34.8841L25.0576 36.1733L25.2571 35.7541L22.5482 34.4649ZM15.7429 35.7541L15.9424 36.1733L18.6513 34.8841L18.4518 34.4649L15.7429 35.7541ZM22.9234 31.5739C23.1073 32.5537 22.9756 33.5667 22.5482 34.4649L25.2571 35.7541C25.9577 34.2818 26.1729 32.6236 25.8719 31.0205L22.9234 31.5739ZM15.1281 31.0205C14.8271 32.6236 15.0423 34.2818 15.7429 35.7541L18.4518 34.4649C18.0244 33.5667 17.8927 32.5537 18.0766 31.5739L15.1281 31.0205ZM19.8095 29.5348C20.2615 29.4093 20.7385 29.4093 21.1905 29.5348L21.9926 26.644C21.0158 26.3729 19.9842 26.3729 19.0074 26.644L19.8095 29.5348ZM25.8389 30.8444C25.46 28.8259 23.9715 27.1931 21.9926 26.644L21.1905 29.5348C22.0577 29.7754 22.7209 30.4949 22.8904 31.3979L25.8389 30.8444ZM18.1096 31.3979C18.2791 30.4949 18.9423 29.7754 19.8095 29.5348L19.0074 26.644C17.0285 27.1931 15.54 28.8259 15.1611 30.8444L18.1096 31.3979Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <rect
                    x="5.125"
                    y="3.41667"
                    width="30.75"
                    height="34.1667"
                    rx="15.375"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <path
                    d="M35.3151 27.3333H35.1572C29.8927 27.3333 25.625 31.601 25.625 36.8655V36.8655"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <path
                    d="M13.6666 15.375H20.8416M13.6666 20.5H25.625"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
              <a href="#" onClick={() => handleToggleClick("Profile")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="42"
                  viewBox="0 0 37 42"
                  fill="none"
                >
                  <path
                    d="M2 36.0131C2 30.9188 6.00084 26.5796 11.4381 25.7767L11.9279 25.7044C16.2817 25.0615 20.7183 25.0615 25.0721 25.7044L25.5619 25.7767C30.9992 26.5796 35 30.9188 35 36.0131C35 38.215 33.0707 40 30.6908 40H6.30916C3.92928 40 2 38.215 2 36.0131Z"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <path
                    d="M28.125 10.3125C28.125 14.9034 23.8158 18.625 18.5 18.625C13.1843 18.625 8.87505 14.9034 8.87505 10.3125C8.87505 5.72163 13.1843 2 18.5 2C23.8158 2 28.125 5.72163 28.125 10.3125Z"
                    stroke="white"
                    strokeWidth="3"
                  />
                </svg>
              </a>
            </div>
            <div className="lower-icons">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 13.6667C16.7261 13.6667 13.6667 16.7261 13.6667 20.5C13.6667 24.274 16.7261 27.3334 20.5 27.3334C24.274 27.3334 27.3334 24.274 27.3334 20.5C27.3334 16.7261 24.274 13.6667 20.5 13.6667ZM17.0834 20.5C17.0834 18.613 18.6131 17.0834 20.5 17.0834C22.387 17.0834 23.9167 18.613 23.9167 20.5C23.9167 22.387 22.387 23.9167 20.5 23.9167C18.6131 23.9167 17.0834 22.387 17.0834 20.5Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 13.6667C16.7261 13.6667 13.6667 16.7261 13.6667 20.5C13.6667 24.274 16.7261 27.3334 20.5 27.3334C24.274 27.3334 27.3334 24.274 27.3334 20.5C27.3334 16.7261 24.274 13.6667 20.5 13.6667ZM17.0834 20.5C17.0834 18.613 18.6131 17.0834 20.5 17.0834C22.387 17.0834 23.9167 18.613 23.9167 20.5C23.9167 22.387 22.387 23.9167 20.5 23.9167C18.6131 23.9167 17.0834 22.387 17.0834 20.5Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.3942 1.73751C18.779 1.70802 19.2109 1.70819 19.5631 1.70833L21.437 1.70833C21.7892 1.70819 22.2211 1.70802 22.6059 1.73751C23.0606 1.77236 23.6909 1.86096 24.3668 2.16848C25.221 2.55716 25.9522 3.17297 26.4805 3.94874C26.8984 4.56252 27.0929 5.16854 27.2045 5.61066C27.299 5.98486 27.3723 6.41049 27.432 6.75763L27.6739 8.15957L27.6786 8.16219C27.7381 8.19506 27.7973 8.22833 27.8562 8.26199L27.8605 8.26446L29.4611 7.68518C29.7858 7.56752 30.1851 7.42285 30.5511 7.32092C30.9844 7.20027 31.5964 7.07058 32.3245 7.12417C33.2466 7.19202 34.1331 7.50805 34.8902 8.03877C35.488 8.45785 35.88 8.94543 36.1392 9.31295C36.3583 9.62346 36.576 9.98811 36.7531 10.2846L37.6105 11.7192C37.7979 12.0325 38.0265 12.4147 38.2029 12.7702C38.4107 13.1888 38.6645 13.7943 38.7411 14.5561C38.8376 15.5154 38.6615 16.4825 38.233 17.3462C37.8928 18.0321 37.4418 18.5093 37.0998 18.8278C36.8094 19.0983 36.4607 19.3754 36.1749 19.6025L35.0209 20.5L36.1749 21.3976C36.4607 21.6247 36.8093 21.9017 37.0998 22.1722C37.4418 22.4907 37.8927 22.9679 38.2329 23.6538C38.6614 24.5175 38.8375 25.4846 38.741 26.4439C38.6644 27.2057 38.4106 27.8112 38.2029 28.2298C38.0264 28.5854 37.7978 28.9675 37.6104 29.2808L36.7528 30.7157C36.5758 31.0122 36.3581 31.3767 36.1392 31.6871C35.8799 32.0546 35.4879 32.5422 34.8901 32.9613C34.133 33.492 33.2465 33.808 32.3244 33.8759C31.5963 33.9295 30.9843 33.7998 30.551 33.6791C30.185 33.5772 29.7857 33.4325 29.4609 33.3148L27.8605 32.7356L27.8562 32.7381C27.7972 32.7717 27.7381 32.805 27.6786 32.8378L27.6739 32.8405L27.432 34.2424C27.3723 34.5895 27.299 35.0152 27.2045 35.3894C27.0929 35.8315 26.8984 36.4375 26.4805 37.0513C25.9522 37.8271 25.221 38.4429 24.3668 38.8316C23.6909 39.1391 23.0606 39.2277 22.6059 39.2625C22.2211 39.292 21.7892 39.2918 21.4369 39.2917H19.5632C19.2109 39.2918 18.779 39.292 18.3942 39.2625C17.9395 39.2277 17.3092 39.1391 16.6333 38.8316C15.779 38.4429 15.0479 37.8271 14.5196 37.0513C14.1017 36.4375 13.9072 35.8315 13.7956 35.3894C13.7011 35.0152 13.6278 34.5895 13.5681 34.2424L13.3262 32.8405L13.3215 32.8378C13.262 32.805 13.2028 32.7717 13.1439 32.7381L13.1396 32.7356L11.5391 33.3148C11.2144 33.4325 10.8151 33.5772 10.4491 33.6791C10.0158 33.7997 9.40379 33.9294 8.67568 33.8758C7.75361 33.808 6.86706 33.492 6.10998 32.9612C5.51216 32.5422 5.12018 32.0546 4.86092 31.6871C4.64191 31.3766 4.42419 31.012 4.24714 30.7154L3.3897 29.2808C3.20227 28.9675 2.9737 28.5854 2.79723 28.2298C2.58946 27.8112 2.33567 27.2057 2.25907 26.4439C2.16261 25.4846 2.33871 24.5175 2.76715 23.6538C3.10738 22.9679 3.55833 22.4907 3.90032 22.1722C4.1908 21.9017 4.53938 21.6247 4.82523 21.3976L5.94239 20.5091V20.4909L4.82516 19.6025C4.53931 19.3753 4.19073 19.0983 3.90024 18.8278C3.55826 18.5093 3.1073 18.0322 2.76708 17.3463C2.33864 16.4825 2.16253 15.5155 2.25899 14.5562C2.33559 13.7944 2.58939 13.1889 2.79715 12.7703C2.97362 12.4147 3.2022 12.0326 3.38964 11.7192L4.24706 10.2846C4.42411 9.98807 4.64183 9.62346 4.86085 9.31298C5.1201 8.94545 5.51208 8.45787 6.1099 8.03879C6.86698 7.50808 7.75353 7.19204 8.67561 7.12419C9.40372 7.07061 10.0157 7.20029 10.449 7.32094C10.815 7.42287 11.2143 7.56755 11.539 7.6852L13.1395 8.26447L13.1439 8.262C13.2028 8.22834 13.262 8.19507 13.3215 8.16219L13.3262 8.15957L13.5681 6.75764C13.6278 6.4105 13.7011 5.98486 13.7956 5.61066C13.9072 5.16854 14.1017 4.56252 14.5196 3.94874C15.0479 3.17297 15.779 2.55716 16.6333 2.16848C17.3092 1.86096 17.9395 1.77236 18.3942 1.73751ZM24.077 7.40782C23.9356 6.5879 23.8648 6.17794 23.6564 5.87181C23.4803 5.61322 23.2366 5.40796 22.9518 5.27839C22.6147 5.12502 22.1987 5.12502 21.3667 5.12502H19.6334C18.8014 5.12502 18.3854 5.12502 18.0483 5.27839C17.7635 5.40796 17.5198 5.61322 17.3437 5.87181C17.1352 6.17794 17.0645 6.5879 16.9231 7.40782L16.6565 8.95275C16.5614 9.504 16.5139 9.77962 16.4131 9.9915C16.3142 10.1995 16.2333 10.3132 16.0692 10.4749C15.9021 10.6396 15.5929 10.8105 14.9745 11.1524C14.9289 11.1776 14.8835 11.2031 14.8383 11.2289C14.2468 11.5667 13.951 11.7356 13.7314 11.7928C13.5157 11.849 13.3813 11.8606 13.1592 11.8421C12.933 11.8232 12.6796 11.7315 12.1728 11.5481L10.4413 10.9215C9.67385 10.6437 9.29012 10.5049 8.92636 10.5316C8.619 10.5543 8.32349 10.6596 8.07113 10.8365C7.77246 11.0459 7.56311 11.3962 7.14441 12.0967L6.35965 13.4098C5.91762 14.1494 5.6966 14.5192 5.65852 14.898C5.62636 15.2177 5.68507 15.5401 5.82788 15.828C5.99703 16.169 6.33422 16.4372 7.00859 16.9735L8.24695 17.9583C8.67714 18.3004 8.89223 18.4715 9.02709 18.6549C9.17284 18.8531 9.23501 18.982 9.29945 19.2195C9.35906 19.4392 9.35906 19.7928 9.35906 20.5C9.35906 21.2073 9.35906 21.5609 9.29944 21.7807C9.235 22.0181 9.17284 22.147 9.02711 22.3452C8.89225 22.5286 8.67714 22.6997 8.24692 23.0418L7.00868 24.0265C6.33431 24.5629 5.9971 24.831 5.82795 25.172C5.68514 25.4599 5.62644 25.7823 5.65859 26.1021C5.69668 26.4808 5.91769 26.8506 6.35973 27.5902L7.14448 28.9033C7.56318 29.6039 7.77254 29.9542 8.0712 30.1635C8.32356 30.3404 8.61908 30.4458 8.92644 30.4684C9.2902 30.4952 9.67392 30.3563 10.4414 30.0785L12.1728 29.4519C12.6796 29.2685 12.933 29.1768 13.1592 29.158C13.3813 29.1395 13.5157 29.151 13.7314 29.2072C13.9511 29.2644 14.2468 29.4333 14.8383 29.7711C14.8835 29.797 14.9289 29.8225 14.9745 29.8477C15.5929 30.1895 15.9021 30.3605 16.0692 30.5251C16.2333 30.6868 16.3142 30.8005 16.4131 31.0085C16.5139 31.2204 16.5614 31.496 16.6565 32.0473L16.9231 33.5922C17.0645 34.4121 17.1352 34.8221 17.3437 35.1282C17.5198 35.3868 17.7635 35.5921 18.0483 35.7216C18.3854 35.875 18.8014 35.875 19.6334 35.875H21.3667C22.1987 35.875 22.6147 35.875 22.9518 35.7216C23.2366 35.5921 23.4803 35.3868 23.6564 35.1282C23.8648 34.8221 23.9356 34.4121 24.077 33.5922L24.3436 32.0473C24.4387 31.496 24.4862 31.2204 24.587 31.0085C24.6859 30.8005 24.7668 30.6868 24.9308 30.5251C25.098 30.3605 25.4072 30.1895 26.0256 29.8477C26.0712 29.8225 26.1165 29.797 26.1617 29.7712C26.7532 29.4334 27.049 29.2644 27.2687 29.2072C27.4844 29.1511 27.6187 29.1395 27.8409 29.158C28.0671 29.1768 28.3205 29.2685 28.8272 29.4519L30.5587 30.0786C31.3262 30.3563 31.7099 30.4952 32.0737 30.4684C32.381 30.4458 32.6765 30.3405 32.9289 30.1635C33.2276 29.9542 33.4369 29.6039 33.8556 28.9033L34.6404 27.5903C35.0824 26.8506 35.3034 26.4808 35.3415 26.1021C35.3737 25.7823 35.315 25.46 35.1721 25.172C35.003 24.831 34.6658 24.5629 33.9914 24.0266L32.7532 23.0419C32.323 22.6997 32.1078 22.5286 31.973 22.3452C31.8272 22.147 31.7651 22.0181 31.7007 21.7807C31.641 21.561 31.641 21.2073 31.641 20.5C31.641 19.7928 31.641 19.4392 31.7007 19.2194C31.7651 18.982 31.8272 18.8531 31.973 18.6549C32.1079 18.4715 32.323 18.3004 32.7532 17.9583L33.9915 16.9735C34.6659 16.4372 35.0031 16.169 35.1722 15.828C35.315 15.5401 35.3737 15.2177 35.3416 14.8979C35.3035 14.5192 35.0825 14.1494 34.6404 13.4098L33.8557 12.0967C33.437 11.3961 33.2276 11.0459 32.929 10.8365C32.6766 10.6596 32.3811 10.5542 32.0737 10.5316C31.71 10.5048 31.3262 10.6437 30.5588 10.9215L28.8273 11.5481C28.3205 11.7315 28.0671 11.8232 27.8409 11.8421C27.6188 11.8606 27.4844 11.849 27.2687 11.7928C27.049 11.7356 26.7533 11.5667 26.1618 11.2289C26.1166 11.2031 26.0712 11.1776 26.0256 11.1524C25.4072 10.8105 25.098 10.6396 24.9308 10.4749C24.7668 10.3132 24.6859 10.1995 24.587 9.9915C24.4862 9.77962 24.4387 9.50399 24.3436 8.95275L24.077 7.40782Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button onClick={changePasswrod}>
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.8155 14.5707H29.1071V11.154C29.1071 6.43903 25.2805 2.61237 20.5655 2.61237C15.8505 2.61237 12.0238 6.43903 12.0238 11.154V14.5707H10.3155C8.4363 14.5707 6.8988 16.1082 6.8988 17.9874V35.0707C6.8988 36.9499 8.4363 38.4874 10.3155 38.4874H30.8155C32.6946 38.4874 34.2321 36.9499 34.2321 35.0707V17.9874C34.2321 16.1082 32.6946 14.5707 30.8155 14.5707ZM15.4405 11.154C15.4405 8.3182 17.7296 6.02903 20.5655 6.02903C23.4013 6.02903 25.6905 8.3182 25.6905 11.154V14.5707H15.4405V11.154ZM30.8155 35.0707H10.3155V17.9874H30.8155V35.0707ZM20.5655 29.9457C22.4446 29.9457 23.9821 28.4082 23.9821 26.529C23.9821 24.6499 22.4446 23.1124 20.5655 23.1124C18.6863 23.1124 17.1488 24.6499 17.1488 26.529C17.1488 28.4082 18.6863 29.9457 20.5655 29.9457Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button onClick={logout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.66077 10.25C3.66077 6.61083 6.61089 3.66071 10.2501 3.66071H21.2322C24.467 3.66071 27.0893 6.28304 27.0893 9.51785V11.9583C27.0893 12.767 26.4338 13.4226 25.6251 13.4226C24.8163 13.4226 24.1608 12.767 24.1608 11.9583V9.51785C24.1608 7.90044 22.8496 6.58928 21.2322 6.58928H10.2501C8.2283 6.58928 6.58934 8.22824 6.58934 10.25V30.75C6.58934 32.7718 8.2283 34.4107 10.2501 34.4107H21.2322C22.8496 34.4107 24.1608 33.0995 24.1608 31.4821V29.0417C24.1608 28.233 24.8163 27.5774 25.6251 27.5774C26.4338 27.5774 27.0893 28.233 27.0893 29.0417V31.4821C27.0893 34.7169 24.467 37.3393 21.2322 37.3393H10.2501C6.61089 37.3393 3.66077 34.3892 3.66077 30.75V10.25ZM31.423 14.3396C31.9948 13.7677 32.922 13.7677 33.4938 14.3396L38.6188 19.4646C39.1906 20.0364 39.1906 20.9636 38.6188 21.5354L33.4938 26.6604C32.922 27.2322 31.9948 27.2322 31.423 26.6604C30.8511 26.0886 30.8511 25.1614 31.423 24.5896L34.0483 21.9643L18.7917 21.9643C17.983 21.9643 17.3274 21.3087 17.3274 20.5C17.3274 19.6913 17.983 19.0357 18.7917 19.0357L34.0483 19.0357L31.423 16.4104C30.8511 15.8386 30.8511 14.9114 31.423 14.3396Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <div className="vertical-small-nav">
          <a href="">
            <img src={clgImg} alt="" />
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
            >
              <path
                d="M34.4537 16.6033C34.4537 15.7749 33.7822 15.1033 32.9537 15.1033C32.1253 15.1033 31.4537 15.7749 31.4537 16.6033H34.4537ZM9.54624 16.6033C9.54624 15.7749 8.87466 15.1033 8.04624 15.1033C7.21781 15.1033 6.54624 15.7749 6.54624 16.6033H9.54624ZM24.7935 35.3747L24.4486 33.9148L24.7935 35.3747ZM16.2065 35.3747L16.5514 33.9148L16.2065 35.3747ZM25.3319 8.56597L24.2675 9.62287L25.3319 8.56597ZM34.8106 20.241C35.3943 20.8288 36.344 20.8322 36.9319 20.2485C37.5198 19.6648 37.5231 18.715 36.9394 18.1272L34.8106 20.241ZM15.6681 8.56597L16.7325 9.62287V9.62287L15.6681 8.56597ZM4.06059 18.1272C3.47688 18.715 3.48025 19.6648 4.06811 20.2485C4.65596 20.8322 5.60571 20.8288 6.18941 20.241L4.06059 18.1272ZM16.6023 31.2972L15.1281 31.0205V31.0205L16.6023 31.2972ZM16.6353 31.1212L18.1096 31.3979V31.3979L16.6353 31.1212ZM24.3647 31.1212L22.8904 31.3979V31.3979L24.3647 31.1212ZM24.3977 31.2972L25.8719 31.0205L25.8719 31.0205L24.3977 31.2972ZM23.9026 35.1095L22.5482 34.4649V34.4649L23.9026 35.1095ZM22.3487 34.8841C21.9927 35.6322 22.3105 36.5272 23.0586 36.8831C23.8066 37.2391 24.7016 36.9213 25.0576 36.1733L22.3487 34.8841ZM17.0974 35.1095L15.7429 35.7541L15.7429 35.7541L17.0974 35.1095ZM15.9424 36.1733C16.2984 36.9213 17.1934 37.2391 17.9415 36.8831C18.6895 36.5271 19.0073 35.6321 18.6513 34.8841L15.9424 36.1733ZM19.4085 28.0894L19.0074 26.644L19.4085 28.0894ZM21.5915 28.0894L21.9926 26.644L21.5915 28.0894ZM31.4537 16.6033V25.0055H34.4537V16.6033H31.4537ZM9.54624 25.0055V16.6033H6.54624V25.0055H9.54624ZM24.4486 33.9148C21.8514 34.5284 19.1486 34.5284 16.5514 33.9148L15.8616 36.8345C18.9124 37.5552 22.0875 37.5552 25.1383 36.8345L24.4486 33.9148ZM16.5514 33.9148C12.4544 32.947 9.54624 29.2619 9.54624 25.0055H6.54624C6.54624 30.6395 10.3976 35.5437 15.8616 36.8345L16.5514 33.9148ZM25.1383 36.8345C30.6023 35.5437 34.4537 30.6395 34.4537 25.0055H31.4537C31.4537 29.2619 28.5455 32.947 24.4486 33.9148L25.1383 36.8345ZM24.2675 9.62287L34.8106 20.241L36.9394 18.1272L26.3963 7.50908L24.2675 9.62287ZM14.6037 7.50908L4.06059 18.1272L6.18941 20.241L16.7325 9.62287L14.6037 7.50908ZM26.3963 7.50908C25.2874 6.39225 24.3514 5.44513 23.5064 4.79583C22.6273 4.12027 21.6707 3.625 20.5 3.625V6.625C20.7445 6.625 21.065 6.70322 21.6785 7.17466C22.3262 7.67234 23.0986 8.44571 24.2675 9.62287L26.3963 7.50908ZM16.7325 9.62287C17.9014 8.44571 18.6738 7.67234 19.3215 7.17466C19.935 6.70322 20.2555 6.625 20.5 6.625V3.625C19.3293 3.625 18.3727 4.12027 17.4936 4.79583C16.6486 5.44513 15.7126 6.39225 14.6037 7.50908L16.7325 9.62287ZM18.0766 31.5739L18.1096 31.3979L15.1611 30.8444L15.1281 31.0205L18.0766 31.5739ZM22.8904 31.3979L22.9234 31.5739L25.8719 31.0205L25.8389 30.8444L22.8904 31.3979ZM22.5482 34.4649L22.3487 34.8841L25.0576 36.1733L25.2571 35.7541L22.5482 34.4649ZM15.7429 35.7541L15.9424 36.1733L18.6513 34.8841L18.4518 34.4649L15.7429 35.7541ZM22.9234 31.5739C23.1073 32.5537 22.9756 33.5667 22.5482 34.4649L25.2571 35.7541C25.9577 34.2818 26.1729 32.6236 25.8719 31.0205L22.9234 31.5739ZM15.1281 31.0205C14.8271 32.6236 15.0423 34.2818 15.7429 35.7541L18.4518 34.4649C18.0244 33.5667 17.8927 32.5537 18.0766 31.5739L15.1281 31.0205ZM19.8095 29.5348C20.2615 29.4093 20.7385 29.4093 21.1905 29.5348L21.9926 26.644C21.0158 26.3729 19.9842 26.3729 19.0074 26.644L19.8095 29.5348ZM25.8389 30.8444C25.46 28.8259 23.9715 27.1931 21.9926 26.644L21.1905 29.5348C22.0577 29.7754 22.7209 30.4949 22.8904 31.3979L25.8389 30.8444ZM18.1096 31.3979C18.2791 30.4949 18.9423 29.7754 19.8095 29.5348L19.0074 26.644C17.0285 27.1931 15.54 28.8259 15.1611 30.8444L18.1096 31.3979Z"
                fill="white"
              />
            </svg>
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
            >
              <rect
                x="5.125"
                y="3.41667"
                width="30.75"
                height="34.1667"
                rx="15.375"
                stroke="white"
                strokeWidth="3"
              />
              <path
                d="M35.3151 27.3333H35.1572C29.8927 27.3333 25.625 31.601 25.625 36.8655V36.8655"
                stroke="white"
                strokeWidth="3"
              />
              <path
                d="M13.6666 15.375H20.8416M13.6666 20.5H25.625"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a href="#" onClick={() => handleToggleClick("Profile")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="42"
              viewBox="0 0 37 42"
              fill="none"
            >
              <path
                d="M2 36.0131C2 30.9188 6.00084 26.5796 11.4381 25.7767L11.9279 25.7044C16.2817 25.0615 20.7183 25.0615 25.0721 25.7044L25.5619 25.7767C30.9992 26.5796 35 30.9188 35 36.0131C35 38.215 33.0707 40 30.6908 40H6.30916C3.92928 40 2 38.215 2 36.0131Z"
                stroke="white"
                strokesidth="3"
              />
              <path
                d="M28.125 10.3125C28.125 14.9034 23.8158 18.625 18.5 18.625C13.1843 18.625 8.87505 14.9034 8.87505 10.3125C8.87505 5.72163 13.1843 2 18.5 2C23.8158 2 28.125 5.72163 28.125 10.3125Z"
                stroke="white"
                strokeWidth="3"
              />
            </svg>
          </a>
        </div>
        <div className="small-user-container">
          <div className="small-user-content">
            <p>{data.name}</p>
            <a href="#">NOTICE</a>
          </div>
          <div className="small-user-content">
            <p>
              Change Password
              <button onClick={changePasswrod}>
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.25 7.66668H16.2917V5.75001C16.2917 3.10501 14.145 0.958344 11.5 0.958344C8.85504 0.958344 6.70837 3.10501 6.70837 5.75001V7.66668H5.75004C4.69587 7.66668 3.83337 8.52918 3.83337 9.58334V19.1667C3.83337 20.2208 4.69587 21.0833 5.75004 21.0833H17.25C18.3042 21.0833 19.1667 20.2208 19.1667 19.1667V9.58334C19.1667 8.52918 18.3042 7.66668 17.25 7.66668ZM8.62504 5.75001C8.62504 4.15918 9.90921 2.87501 11.5 2.87501C13.0909 2.87501 14.375 4.15918 14.375 5.75001V7.66668H8.62504V5.75001ZM17.25 19.1667H5.75004V9.58334H17.25V19.1667ZM11.5 16.2917C12.5542 16.2917 13.4167 15.4292 13.4167 14.375C13.4167 13.3208 12.5542 12.4583 11.5 12.4583C10.4459 12.4583 9.58337 13.3208 9.58337 14.375C9.58337 15.4292 10.4459 16.2917 11.5 16.2917Z"
                    fill="black"
                  />
                </svg>
              </button>
            </p>
            <p>
              Logout
              <button onClick={logout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.05359 5.74999C2.05359 3.70851 3.70854 2.05356 5.75002 2.05356H11.9107C13.7254 2.05356 15.1964 3.52462 15.1964 5.33927V6.70832C15.1964 7.16198 14.8287 7.52975 14.375 7.52975C13.9214 7.52975 13.5536 7.16198 13.5536 6.70832V5.33927C13.5536 4.43195 12.8181 3.69642 11.9107 3.69642H5.75002C4.61586 3.69642 3.69645 4.61583 3.69645 5.74999V17.25C3.69645 18.3841 4.61586 19.3036 5.75002 19.3036H11.9107C12.8181 19.3036 13.5536 18.568 13.5536 17.6607V16.2917C13.5536 15.838 13.9214 15.4702 14.375 15.4702C14.8287 15.4702 15.1964 15.838 15.1964 16.2917V17.6607C15.1964 19.4753 13.7254 20.9464 11.9107 20.9464H5.75002C3.70854 20.9464 2.05359 19.2915 2.05359 17.25V5.74999ZM17.6275 8.04415C17.9483 7.72336 18.4684 7.72336 18.7892 8.04415L21.6642 10.9191C21.985 11.2399 21.985 11.76 21.6642 12.0808L18.7892 14.9558C18.4684 15.2766 17.9483 15.2766 17.6275 14.9558C17.3067 14.635 17.3067 14.1149 17.6275 13.7941L19.1002 12.3214L10.5417 12.3214C10.088 12.3214 9.72026 11.9536 9.72026 11.5C9.72026 11.0463 10.088 10.6786 10.5417 10.6786L19.1002 10.6786L17.6275 9.20582C17.3067 8.88504 17.3067 8.36494 17.6275 8.04415Z"
                    fill="black"
                  />
                </svg>
              </button>
            </p>
          </div>
        </div>
        <div className="toggling-bar">
          <ul>
            <li>
              <a href="#" onClick={() => handleToggleClick("Attendance")}>
                ATTENDENCE
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleToggleClick("TimeTable")}>
                TIME TABLE
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleToggleClick("Exam")}>
                EXAMS
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleToggleClick("Prediction")}>PREDICTION</a>
            </li>
            <li>
              <a href="#" onClick={() => handleToggleClick("Events")}>
                EVENTS
              </a>
            </li>
          </ul>
        </div>

        <div className="carousel">
          <div className="slides" ref={slidesRef}>
            <div className="slide slide1">
              <a href="#">ATTENDENCE</a>
            </div>
            <div className="slide">
              <a href="#"></a>TIME TABLE
            </div>
            <div className="slide">
              <a href="#"></a>EXAMS
            </div>
            <div className="slide">
              <a href="#"></a>PREDICTION
            </div>
            <div className="slide slide5">
              <a href="#"></a>EVENTS
            </div>
          </div>
          <button className="prev" onClick={showPrevSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="20"
              viewBox="0 0 17 26"
              fill="none"
            >
              <path
                d="M15 2L3 13.6111L15 24"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="next" onClick={showNextSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="20"
              viewBox="0 0 17 26"
              fill="none"
            >
              <path
                d="M2 24L14 12.3889L2 2"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div id="showToggling" className="datato">
        {renderComponent()}.
      </div>
      <div id="showCarsole" className="datato">
        {renderCarsoleComponent()}
      </div>

      <ToastContainer />
    </>
  );
}
