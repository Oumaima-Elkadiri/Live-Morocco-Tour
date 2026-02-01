import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import "../i18n";
import "../styles/Header.css";
import logo from "../assets/images/Logo.png";
import { useEffect } from "react";


const Header = memo(() => {
  const { t } = useTranslation(["nav", "tours_lists", "dayTripsList"]);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDayDropdown, setOpenDayDropdown] = useState(null);

  // Tours lists (all tours)
  const safeToursList = t("tours_lists:tours_lists", { returnObjects: true });
  const toursList = Array.isArray(safeToursList) ? safeToursList : [];

  // Day Trips List
  const safeDayTripsList = t("dayTripsList:tours_Lists", { returnObjects: true });
  const dayTripsList = Array.isArray(safeDayTripsList) ? safeDayTripsList : [];

  // We now use ONLY the ID sent by navigation
  const activeTourId = location.state?.id || null;

  // Check if the active ID belongs to Tours menu
  const isActiveTourInTours =
    activeTourId &&
    toursList.some(item => item.tours.some(t => t.id === activeTourId));

  // Check if the active ID belongs to Day Trips menu
  const isActiveTourInDayTrips =
    activeTourId &&
    dayTripsList.some(item => item.tours.some(t => t.id === activeTourId));

  return (
    <header>
      {/* LOGO */}
      <Link to="/">
        <img src={logo} alt="Live Morocco Tour" />
      </Link>

      {/* BURGER MENU */}
      <nav>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div style={{ transform: menuOpen ? "rotate(45deg) translate(6px, 6px)" : "" }}></div>
          <div style={{ opacity: menuOpen ? "0" : "1" }}></div>
          <div style={{ transform: menuOpen ? "rotate(-45deg) translate(6px, -6px)" : "" }}></div>
        </div>

        {/* MENU */}
        <ul className={menuOpen ? "open" : ""}>
          {/* HOME */}
          <li onClick={() => setMenuOpen(false)} className={isActive("/") ? "active" : ""}>
            <Link to="/">{t("nav:home")}</Link>
          </li>

          {/* ABOUT */}
          <li onClick={() => setMenuOpen(false)} className={isActive("/About") ? "active" : ""}>
            <Link to="/About">{t("nav:about")}</Link>
          </li>

          {/* -----------------------
              TOURS DROPDOWN
          ----------------------- */}
          <li className={isActive("/AllTours") || isActiveTourInTours ? "active" : ""}>
            <div className="mobile-dropdown">
              <span className="tours">{t("nav:tours")} ▾</span>
            </div>

            <ul className="submenu">
              {toursList.map((item, index) => (
                <li key={index}>
                  <div
                    className="mobile-dropdown"
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  >
                    <span
                      className={
                        activeTourId &&
                        item.tours.some((t) => t.id === activeTourId)
                          ? "active-sub"
                          : ""
                      }
                    >
                      {item.from} ▾
                    </span>
                  </div>

                  {/* Submenu */}
                  <ul className={`submenu-right ${openDropdown === index ? "open-mobile" : ""}`}>
                    {item.tours.map((tour, tIndex) => (
                      <li key={tIndex}>
                        <Link
                          to="/details"
                          state={{ id: tour.id }}   // Send ONLY ID
                          className={activeTourId === tour.id ? "active-sub-link" : ""}
                          onClick={() => setMenuOpen(false)}
                        >
                          {tour.to}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>

          {/* -----------------------
              DAY TRIPS DROPDOWN
          ----------------------- */}
          <li className={isActive("/dayTrips") || isActiveTourInDayTrips ? "active" : ""}>
            <div className="mobile-dropdown">
              <span className="trips">{t("nav:trips")} ▾</span>
            </div>

            <ul className="submenu">
              {dayTripsList.map((item, index) => (
                <li key={index}>
                  <div
                    className="mobile-dropdown"
                    onClick={() => setOpenDayDropdown(openDayDropdown === index ? null : index)}
                  >
                    <span
                      className={
                        activeTourId &&
                        item.tours.some((t) => t.id === activeTourId)
                          ? "active-sub"
                          : ""
                      }
                    >
                      {item.from} ▾
                    </span>
                  </div>

                  {/* Submenu */}
                  <ul className={`submenu-right ${openDayDropdown === index ? "open-mobile" : ""}`}>
                    {item.tours.map((trip, tIndex) => (
                      <li key={tIndex}>
                        <Link
                          to="/details"
                          state={{ id: trip.id }}
                          className={activeTourId === trip.id ? "active-sub-link" : ""}
                          onClick={() => setMenuOpen(false)}
                        >
                          {trip.to}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>

      {/* CONTACT BUTTON */}
      <Link to="/Contact" className="contact-btn">
        {t("nav:contact")}
      </Link>
    </header>
  );
});

export default Header;
