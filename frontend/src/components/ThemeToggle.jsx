import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  // if the page is previously visited then sets the theme from local storage
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );

  // switches the theme
  const handleToggle = (e) => {
    if (e.target.checked) setTheme("light");
    else setTheme("dark");
  };

  // runs immediately and stores the current theme of page
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="m-2">
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          value="light"
          checked={theme === "light"}
          onChange={handleToggle}
        />
        <IoSunnyOutline className="swap-off size-8 text-yellow-500" />
        <IoMoonOutline className="swap-on size-8 text-slate-500" />
      </label>
    </div>
  );
};

export default ThemeToggle;
