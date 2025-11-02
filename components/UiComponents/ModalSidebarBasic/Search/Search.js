import React from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import ProtagLarge from "../../ProtagLarge";
import { UserContext } from "../../../Contexts/context";
import DialogInBuilt from "../../../SocialLinks/DialogInBuilt";

function Search(props) {
  //props data
  const { profile, type, toggleStates, basic, starter, pro } = props;

  // data for social media  button
  const social = [
    {
      text: "Whatsapp",
      type: "basic",
    },
    {
      text: "Facebook",
      type: "basic",
    },
    {
      text: "Instagram",
      type: "basic",
    },
    {
      text: "Thread",
      type: "basic",
    },
    {
      text: "Snapchat",
      type: "basic",
    },

    {
      text: "Telegram",
      type: "basic",
    },
    {
      text: "Linkedin",
      type: "basic",
    },
    {
      text: "Twitter",
      type: "basic",
    },
    {
      text: "Youtube",
      type: "basic",
    },
    {
      text: "Linktree",
      type: "pro",
    },
    {
      text: "Signal",
      type: "pro",
    },

    {
      text: "Pinterest",
      type: "pro",
    },
    {
      text: "Reddit",
      type: "pro",
    },

    {
      text: "Roposo",
      type: "pro",
    },
    {
      text: "Meetup",
      type: "pro",
    },
    {
      text: "Behance",
      type: "pro",
    },
    {
      text: "Chingari",
      type: "pro",
    },
    {
      text: "Josh",
      type: "pro",
    },
    {
      text: "Clubhouse",
      type: "pro",
    },
    {
      text: "Onlyfans",
      type: "pro",
    },
    {
      text: "Patreon",
      type: "pro",
    },
    {
      text: "Quora",
      type: "pro",
    },
    {
      text: "Join my app",
      type: "pro",
    },
    {
      text: "Moj",
      type: "pro",
    },
    {
      text: "Google Map",
      type: "basic",
    },
    {
      text: "Google Drive",
      type: "basic",
    },
    {
      text: "Google Notes",
      type: "pro",
    },
  ];

  //array items for music
  const musicArray = [
    {
      text: "Spotify",
      type: "basic",
    },
    {
      text: "Gaana",
      type: "basic",
    },
    {
      text: "Apple Music",
      type: "basic",
    },
    {
      text: "Amazon Music",
      type: "basic",
    },
    {
      text: "Audio",
      type: "pro",
    },
    {
      text: "SoundCloud",
      type: "pro",
    },
    {
      text: "Apple Podcasts",
      type: "pro",
    },
    {
      text: "Saavan",
      type: "pro",
    },
    {
      text: "Wynk",
      type: "pro",
    },
    {
      text: "Tidal",
      type: "pro",
    },
  ];

  //array items for buisness
  const buisnessArray = [
    {
      text: "Website",
      type: "basic",
    },
    {
      text: "Swiggy",
      type: "basic",
    },
    {
      text: "Zomato",
      type: "basic",
    },
    {
      text: "Google Reviews",
      type: "basic",
    },
    {
      text: "Whatsapp Business",
      type: "basic",
    },
    {
      text: "GSTIN",
      type: "basic",
    },
    {
      text: "Calendely",
      type: "pro",
    },
    {
      text: "Google Play",
      type: "pro",
    },
    {
      text: "Apple Store",
      type: "pro",
    },
    {
      text: "Email",
      type: "pro",
    },
    {
      text: "Facetime",
      type: "pro",
    },
    {
      text: "Gmail",
      type: "pro",
    },
    {
      text: "Yahoo Mail",
      type: "pro",
    },
    {
      text: "Outlook",
      type: "pro",
    },
  ];

  //array for blog
  const blogArray = [
    {
      text: "Bloggers Spot",
      type: "basic",
    },
    {
      text: "Weebly",
      type: "basic",
    },
    {
      text: "Wordpress",
      type: "basic",
    },
    {
      text: "Medium",
      type: "pro",
    },
    {
      text: "Ghost",
      type: "pro",
    },
    {
      text: "Tumblr",
      type: "pro",
    },
    {
      text: "Joomla",
      type: "pro",
    },
    {
      text: "Jimdo",
      type: "pro",
    },
  ];

  //array for payment
  const paymentArray = [
    {
      text: "Google Pay",
      type: "basic",
    },
    {
      text: "PhonePe",
      type: "basic",
    },

    {
      text: "Paytm",
      type: "basic",
    },
    {
      text: "Amazon Pay",
      type: "basic",
    },
    {
      text: "BHIM UPI",
      type: "basic",
    },
    {
      text: "Paypal",
      type: "basic",
    },
  ];

  // array for ecommerce
  const ecomArray = [
    {
      text: "Flipkart",
      type: "pro",
    },
    {
      text: "Amazon",
      type: "pro",
    },

    {
      text: "Shopify",
      type: "pro",
    },
    {
      text: "Meesho",
      type: "pro",
    },

    {
      text: "Indiamart",
      type: "pro",
    },
    {
      text: "Coutloot",
      type: "pro",
    },
  ];

  const cryptoArray = [
    {
      text: "Bitcoin Wallet",
      type: "pro",
    },
    {
      text: "Ethereum",
      type: "pro",
    },
    {
      text: "Tether",
      type: "pro",
    },
    {
      text: "Solana",
      type: "pro",
    },
    {
      text: "Binance",
      type: "pro",
    },
    {
      text: "Opensea",
      type: "pro",
    },
    {
      text: "TradingView",
      type: "pro",
    },
  ];

  // adding showPro variable to each object
  [social, musicArray, buisnessArray].forEach((arr) => {
    arr.forEach((obj) => {
      if (
        basic &&
        (obj.type == "pro" ||
          toggleStates.some((item) => item.platform == obj.text))
      ) {
        obj.showPro = true;
      } else if (
        starter &&
        toggleStates.some((item) => item.platform == obj.text)
      ) {
        obj.showPro = true;
      } else {
        obj.showPro = false;
      }
    });
  });

  [blogArray, paymentArray, ecomArray].forEach((arr, index) => {
    const apptypename =
      index == 0 ? "blogapp" : index == 1 ? "paymentapp" : "ecommerceapp";
    arr.forEach((obj) => {
      if (
        basic &&
        (obj.type == "pro" ||
          toggleStates.some((item) => item.apptype == apptypename))
      ) {
        obj.showPro = true;
      } else if (
        starter &&
        toggleStates.some((item) => item.platform == obj.text)
      ) {
        obj.showPro = true;
      } else {
        obj.showPro = false;
      }
    });
  });

  cryptoArray.forEach((obj) => {
    if (pro) {
      obj.showPro = false;
    } else {
      obj.showPro = true;
    }
  });

  const finalArr = [
    social,
    musicArray,
    buisnessArray,
    blogArray,
    paymentArray,
    ecomArray,
    cryptoArray,
  ];

  const filteredButtons = finalArr.flat().filter((button) => {
    const searchTerm = props.searchTerm.toLowerCase();
    if (searchTerm === "x" && button.text.toLowerCase() === "twitter") {
      return true;
    }
    return button.text.toLowerCase().includes(searchTerm);
  });

  //Inbuilt Dialog
  const { inBuiltDialog, inBuiltDialogToggle, setInBuiltDialogPlatform } =
    React.useContext(UserContext);

  return (
    <div
      className={
        props.current === "search"
          ? "flex flex-col md:pl-3 lg:pl-7 w-full h-full"
          : "hidden"
      }
    >
      {/* BuiltInDialog Toggle  */}
      {!inBuiltDialog ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pb-3">
            {filteredButtons.map((app, key) => (
              <div
                className={`rounded-xl flex items-center justify-between px-3 xsm:px-4 py-3 xsm:py-4 flex-1 so-m
                ${
                  !pro && app.showPro
                    ? "hover:cursor-default"
                    : "hover:cursor-pointer"
                }`}
                key={key}
                onClick={
                  !pro && app.showPro
                    ? null
                    : () => {
                        setInBuiltDialogPlatform(app.text);
                        inBuiltDialogToggle();
                      }
                }
              >
                <div className="flex items-center gap-x-2">
                  <img
                    src={require(`../../../SocialLinks/logos/${app.text
                      .toLowerCase()
                      .split(" ")
                      .join("")}.png`).default.src}
                    alt="social-logo"
                    className="w-8 h-8"
                  />
                  <p className="text-sm font-medium">{app.text}</p>
                </div>

                {!pro && app.showPro ? (
                  <ProtagLarge />
                ) : (
                  <div className="flex items-center gap-x-2 text-pink1 font-medium">
                    <HiOutlinePlusCircle />
                    <p className="text-sm">Add</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <DialogInBuilt
          open={inBuiltDialog}
          handleClose={inBuiltDialogToggle}
          profile={profile}
          type={type}
          pro={pro}
          setDummyState={props.setDummyState}
          toggleStates={toggleStates}
          setToggleStates={props.setToggleStates}
          setShowtMessage={props.setShowtMessage}
          setMessage={props.setMessage}
          setLoading={props.setLoading}
        />
      )}
    </div>
  );
}

export default Search;
