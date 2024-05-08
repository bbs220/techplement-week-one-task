import ThemeToggle from "./ThemeToggle";

// responsive navbar with the dark mode toggle
const NavBar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 p-1 m-1">
        <div className="flex-1">
          <a className="label label-text font-bold text-3xl lg:text-4xl">Inspirational Quotes.</a>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavBar;
