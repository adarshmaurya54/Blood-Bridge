import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="header h-[15%]">
        <Header />
      </div>
      <div className="flex flex-1 h-[85%]">
        {/* Sidebar
        <aside className="w-64 bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-6">Sidebar</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Link 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Link 2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Link 3
                </a>
              </li>
            </ul>
          </nav>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 bg-white p-6">
          <div className="content">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
