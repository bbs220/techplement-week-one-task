import { FaGithub } from "react-icons/fa6";

// footer with link to repo and the zenquotes page for attribution

const Footer = () => {
  return (
    <footer className="flex justify-between w-full h-24 items-center p-4 flex-col md:flex-row gap-y-8">
      <aside className="items-center grid-flow-col">
        <div className="flex flex-col justify-center items-center text-center">
          <p className="text-sm">Developed by</p>
          <p className="text-xl">bbs220</p>
        </div>
      </aside>
      <nav className="flex justify-center items-center gap-x-8">
        <a
          href="https://github.com/bbs220/techplement-week-one-task"
          className="link flex justify-center items-center scale-125 hover:text-slate-500 mb-6 md:mb-0"
        >
          <FaGithub className="text-xl md:hidden" />
          <span className="hidden md:inline label">GitHub</span>
        </a>
        <a
          href="https://zenquotes.io/"
          className="link flex justify-center items-center scale-125 hover:text-slate-500 mb-6 md:mb-0"
        >
          <img
            src="/zen.png"
            alt="zenquote logo"
            className="size-5 md:hidden rounded-full"
          />
          <span className="hidden md:inline label">Zen Quotes</span>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
