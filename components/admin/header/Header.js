"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, CircleUserRound, Settings, LogOut, ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/redux/uiSlice';

const Header = () => {
	const dispatch = useDispatch();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const { data } = useSession();
	const [isMounted, setIsMounted] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	const handleClickOutside = (event) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target) &&
			buttonRef.current &&
			!buttonRef.current.contains(event.target)
		) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		document.body.classList.remove("toggle-sidebar");
	}, []);

	return isMounted ? (
		<header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
			<div className="flex items-center justify-between px-4 py-3">
				{/* Left: Logo and toggle */}
				<div className="flex items-center gap-4">
					<button
						// onClick={toggleSidebar}
						onClick={() => dispatch(toggleSidebar())}
						className="text-gray-700 hover:text-black transition"
					>
						<Menu size={24} />
					</button>
					<Link href="/admin/dashboard" className="flex items-center gap-2">
						<Image src="/header_logo.png" width={95} height={30} alt="Logo" />
					</Link>
				</div>

				{/* Right: Profile dropdown */}
				<div className="flex items-center gap-4">
					<div className="relative">
						<div className="flex items-center" ref={buttonRef} onClick={toggleDropdown}>
							<button
								className="h-8 w-8 rounded-full focus:outline-none mr-1"
							>
								<CircleUserRound className="h-8 w-8 text-gray-600" strokeWidth={2} />
							</button>
							<span className="text-sm text-gray-600 font-medium cursor-pointer">{data?.user?.name}</span>
							<ChevronDown className="h-4 w-4 text-gray-600 mt-1" strokeWidth={4} />
						</div>

						{isDropdownOpen && (
							<div
								ref={dropdownRef}
								className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
							>
								<Link
									href="#"
									className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b"
								>
									<CircleUserRound className="h-5 w-5 text-gray-600 mr-2" strokeWidth={2} />
									Profile
								</Link>
								<Link
									href="#"
									className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b"
								>
									<Settings className="h-5 w-5 text-gray-600 mr-2" strokeWidth={2} />
									Settings
								</Link>
								<button
									onClick={() => signOut({ callbackUrl: "/login" })}
									className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
								>
									<LogOut className="h-5 w-5 text-red-600 mr-2" strokeWidth={2} />
									Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	) : null;
};

export default Header;
