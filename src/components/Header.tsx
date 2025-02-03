"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const cartItems = useSelector((state: any) => state.cart.items);
  const cartCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);

  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="w-full h-[64px] md:h-[74px] bg-[#F0F2F3] flex justify-center items-center">
        <div className="w-11/12 md:w-4/5 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <Image src="/images/chair.png" alt="logo" width={30} height={30} />
              <h1 className="text-lg md:text-xl font-semibold pl-2">Comforty</h1>
            </div>
          </Link>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/cart">
              <div className="flex items-center bg-white px-3 py-1 rounded-lg cursor-pointer relative">
                <FaShoppingCart className="text-base md:text-lg" />
                <span className="ml-2 text-xs md:text-lg">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-800 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-white text-xs rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Icon */}
            <button className="sm:hidden text-gray-700 text-2xl" onClick={toggleDrawer}>
              {isDrawerOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full h-[74px] bg-white flex justify-center items-center border-b">
        <div className="w-11/12 md:w-4/5 flex justify-between items-center">
          {/* Navigation Links */}
          <nav className="hidden sm:flex">
            <ul className="flex space-x-6 text-sm font-medium">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/category", label: "Category" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href} className="relative">
                  <Link href={href}>
                    <span
                      className={`relative cursor-pointer transition-all duration-300 ${
                        pathname === href
                          ? "text-[#379393] font-bold"
                          : "text-gray-700 hover:text-[#379393]"
                      }`}
                    >
                      {label}
                      {/* Underline Animation */}
                      <span
                        className="absolute left-0 bottom-0 h-[2px] w-0 hover:bg-[#379393] transition-all duration-300 origin-left hover:w-full"
                      ></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="hidden sm:block text-sm text-gray-500">
            Contact: <span className="text-black">(808) 555-0111</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 p-6 sm:hidden">
          <nav>
            <ul className="space-y-4 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/category", label: "Category" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span
                      className={`block py-2 ${
                        pathname === href ? "text-[#379393] font-bold" : "text-gray-700"
                      }`}
                      onClick={toggleDrawer}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
