// import React from "react";
import InventryLogo from "../assets/landingPage/inventorylogo.svg";
import LandingHero from "../assets/landingPage/landinghero.svg";
// import DashboardShowcase from "../assets/landingPage/dashboardShowcase.svg";
import DashboardShowcaseone from "../assets/landingPage/dashboard.svg";
import Accounting from "../assets/landingPage/accounting.svg";
import Stock from "../assets/landingPage/stock.svg";
import Purchase from "../assets/landingPage/purchase.svg";
import Support from "../assets/landingPage/support.svg";

function Landingpage() {
  const features = [
    {
      Id: 1,
      title: "Accounting",
      Description:
        "Keep all your sales, purchases, and expenses organized for smooth financial management.",
      Link: "Learn More >>",
      Img: Accounting,
    },
    {
      id: 2,
      title: "Stock Control",
      Description:
        "Track product quantities, expiry dates, and stock movement with ease.",
      Link: "Learn More >>",

      Img: Stock,
    },
    {
      id: 3,
      title: "Purchase Management",
      Description: "Easily record and manage purchase orders from suppliers.",
      Link: "Learn More >>",

      Img: Purchase,
    },
    {
      id: 4,
      title: "24/7 Support",
      Description:
        "Dedicated help whenever you need it — our team is always here for businesses using our system.",
      Link: "Learn More >>",

      Img: Support,
    },
  ];
  return (
    <div className="bg-[#D4EFFF] h-screen w-full">
      <header className="flex items-center justify-around h-20">
        {/* logo  */}
        <a href="/" className="logo">
          <img src={InventryLogo} alt="inventry-logo" />
        </a>
        {/* navbar item  */}
        <div className="flex items-center ">
          <nav>
            <ul className="flex items-center justify-around w-sm ">
              <li className=" px-3 py-2">
                <a href="/">Feature</a>
              </li>
              <li className=" px-3 py-2">
                <a href="/about">Pricing</a>
              </li>
              <li className=" px-3 py-2">
                <a href="/login">Login</a>
              </li>
            </ul>
          </nav>
          {/* cta button  */}
          <a
            className="py-2 px-8 bg-[#156CFE] text-white rounded-md font-semibold"
            href="/"
          >
            Try Free
          </a>
        </div>
      </header>
      <main>
        {/* hero section  */}
        <div className=" bg-gradient-to-b from-[#D4EFFF] via-[#FEFEFF] to-[#EEF2FD]">
          <div className=" flex items-center justify-center mt-15 p-5 max-w-6xl m-auto">
            <div className=" h-auto  w-1/2">
              <p className="bg-white text-[#293FCC] px-8 py-2 rounded-sm inline-block my-6">
                Welcome Techy Ladder solutions
              </p>
              <p className="font-extrabold text-5xl">
                <span className="text-[#090F4E] block mb-6">
                  Your Inventory,
                </span>
                <span className="text-[#156CFE]">Always Under Control</span>
              </p>
              <div className="my-10">
                <button className="py-2 px-8 bg-[#156CFE] text-white rounded-md font-semibold">
                  Try Free
                </button>
              </div>
            </div>
            <div className=" w-1/2">
              <img src={LandingHero} alt="landing-hero" />
            </div>
          </div>
          {/* product suite  #FDFEFF */}

          <div className=" max-w-6xl m-auto my-10">
            <div className="text-center mb-10">
              <span className="inline-block text-[#293FCC] bg-blue-100 px-6 py-2 rounded-md">
                product suite
              </span>
              <h4 className="font-semibold text-3xl text-[#090F4E] my-5">
                Join a Powerful & Personalized Inventory Management System
              </h4>
              <p className="text-xl/10 text-[#63657E] font-normal w-4xl m-auto">
                Our system tracks your stock in real time, analyzes sales
                trends, and automatically suggests restocks — ensuring the right
                products are always available at the right time.
              </p>
            </div>
            <div className="flex items-center justify-center max-w-4xl m-auto">
              <img
                className="shadow-xl rounded-xl max-w-full"
                // src={DashboardShowcase}
                src={DashboardShowcaseone}
                alt="dashboardshowcase"
              />
            </div>
          </div>
        </div>

        {/* features  */}
        <div className="max-w-5xl m-auto">
          <div className="text-center pt-7">
            <span className="inline-block text-[#293FCC] bg-blue-100 px-6 py-2 rounded-md">
              Techy Ladder Solutions
            </span>
            <h4 className="font-semibold text-3xl text-[#090F4E] my-5">
              Everything You Need to Run Your Business
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-2 place-items-center  ">
            {features.map((item, idx) => (
              <div
                className="w-80 p-4 h-auto bg-white  shadow-xl min-h-85 m-5 rounded-xs"
                key={idx}
              >
                <img className="w-22" src={item.Img} alt="icons" />
                <h5 className="font-medium text-3xl text-[#090F4E] py-3">
                  {item.title}
                </h5>
                <p className="text-[#63657E] text-xl py-4">
                  {item.Description}
                </p>
                <a
                  className="text-[#282D648C] text-xl font-semibold "
                  href={""}
                >
                  {item.Link}
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* form  */}
        <div className="max-w-5xl p-2 pt-7 m-auto flex items-center justify-center gap-x-6 ">
          <div className="w-1/2 p-5">
            <h5 className="text-4xl font-semibold text-[#090F4E]">
              We'd love to walk you through the platform
            </h5>
            <p className="text-[#63657E] text-xl my-2">
              Fill in the form and we'll schedule a free demo!
            </p>
          </div>
          <div className="p-3 w-1/2">
            <input
              className=" p-2 h-14 w-full rounded-md border-1 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 my-5 "
              type="name"
              placeholder="Enter Your Name"
            />
            <input
              className=" p-2 h-14 w-full rounded-md border-1 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 mb-5 "
              type="name"
              placeholder="Enter Your Email Address"
            />
            <input
              className=" p-2 h-14 w-full rounded-md border-1 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 "
              type="name"
              placeholder="Enter Your Phone Number"
            />
            <input
              className=" p-2 h-14 w-full rounded-md border-1 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 my-5 "
              type="name"
              placeholder="Enter Your City"
            />

            <div className="my-4">
              <a className="py-2 px-8 bg-[#156CFE] text-white rounded-md font-medium ">
                Submit
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landingpage;
