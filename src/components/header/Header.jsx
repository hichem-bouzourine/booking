import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
  faGears,
  faCalendar,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useState } from "react";
import "./header.css";

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleIncrease = (name) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: options[name] + 1,
      };
    });
  };

  const handleDecrease = (name) => {
    const option = options[name];
    setOptions((prev) => {
      return {
        ...prev,
        [name]: option !== 0 ? options[name] - 1 : option,
      };
    });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="items">
          <div className="item active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faGears} />
            <span>Attracions</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1>Find your next stay</h1>
            <p className="headerDescription">
              Search low prices on hotels, homes and much more...
            </p>
            <button className="headerButton">Login/ Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerSearchIcon" />
                <input
                  type="text"
                  placeholder="Where is your destination"
                  className="headerSearchInput"
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="headerSearchIcon"
                />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerSearchIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenOptions(!openOptions)}
                >{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="counter">
                        <button
                          className="counterBtn"
                          onClick={() => handleDecrease("adult")}
                          disabled={options.adult == 0}
                        >
                          -
                        </button>
                        <span>{`${options.adult}`}</span>
                        <button
                          className="counterBtn"
                          onClick={() => handleIncrease("adult")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="counter">
                        <button
                          className="counterBtn"
                          onClick={() => handleDecrease("children")}
                          disabled={options.children == 0}
                        >
                          -
                        </button>
                        <span>{`${options.children}`}</span>
                        <button
                          className="counterBtn"
                          onClick={() => handleIncrease("children")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="counter">
                        <button
                          className="counterBtn"
                          onClick={() => handleDecrease("room")}
                          disabled={options.room <= 1}
                        >
                          -
                        </button>
                        <span>{`${options.room}`}</span>
                        <button
                          className="counterBtn"
                          onClick={() => handleIncrease("room")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerButton">Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
