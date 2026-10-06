const Navbar = (props) => {
  return (
    <nav
      className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-xs"
      dir="ltr"
    >
      <div className="flex w-full items-center justify-between px-4 py-3.5 sm:px-8">
        <button
          type="button"
          onClick={props.onHome}
          className="text-xl font-bold text-gray-900 hover:text-emerald-700"
        >
          User Management
        </button>
        <span className="text-sm text-gray-500">Users</span>
      </div>
    </nav>
  );
};

export default Navbar;
