"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Menu,
  LayoutDashboard,
  Settings,
  FileText,
  Layers,
  Briefcase,
  Building,
  Users,
  Image,
  Mail,
  BookMarked,
  HelpCircle,
  MessageSquare,
  Phone,
  ChevronDown,
  ChevronUp,
  CircleDot,
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);
  const pathname = usePathname();

  const current_path = pathname.split("/")[2] || "";

  const dashboard_menu = [""];
  const settings_menu = ["settings", "settings/create", "settings/edit"];
  const page_child_1 = ["pages", "pages/create", "pages/edit"];
  const page_child_2 = ["blocks", "blocks/create", "blocks/edit"];
  const page_menu = [...page_child_1, ...page_child_2];

  const service_child_1 = ["service-category", "service-category/create", "service-category/edit"];
  const service_child_2 = ["services", "services/create", "services/edit"];
  const services_menu = [...service_child_1, ...service_child_2];

  const company_child_1 = ["company-users", "company-users/create", "company-users/edit"];
  const company_child_2 = ["companies", "companies/create", "companies/edit"];
  const company_menu = [...company_child_1, ...company_child_2];

  return (
    <>
      <div className="flex mt-13">
        {/* Sidebar */}
        <aside
          className={`bg-[#1f2937] text-white w-64 min-h-screen fixed transition-all duration-300 ${
            isSidebarOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="space-y-1 p-4 text-sm">

            <SidebarLink href="/dashboard" label="Dashboard" Icon={LayoutDashboard} active={dashboard_menu.includes(current_path)} />

            <SidebarLink href="/dashboard/settings" label="Settings" Icon={Settings} active={settings_menu.includes(current_path)} />

            <SidebarGroup label="Pages" Icon={FileText} open={page_menu.includes(current_path)}>
              <SidebarLink href="/dashboard/pages" label="Manage Pages" Icon={CircleDot} active={page_child_1.includes(current_path)} />
              <SidebarLink href="/dashboard/blocks" label="Manage Blocks" Icon={CircleDot} active={page_child_2.includes(current_path)} />
            </SidebarGroup>

            <SidebarGroup label="Services" Icon={Briefcase} open={services_menu.includes(current_path)}>
              <SidebarLink href="/dashboard/service-category" label="Service Categories" Icon={CircleDot} active={service_child_1.includes(current_path)} />
              <SidebarLink href="/dashboard/services" label="Services" Icon={CircleDot} active={service_child_2.includes(current_path)} />
            </SidebarGroup>

            <SidebarGroup label="Companies" Icon={Building} open={company_menu.includes(current_path)}>
              <SidebarLink href="/dashboard/company-users" label="Company Users" Icon={CircleDot} active={company_child_1.includes(current_path)} />
              <SidebarLink href="/dashboard/companies" label="Companies" Icon={CircleDot} active={company_child_2.includes(current_path)} />
            </SidebarGroup>

            <SidebarLink href="/dashboard/user-role" label="Manage Role" Icon={ShieldCheck} />
            <SidebarLink href="/dashboard/users" label="Manage Admins" Icon={Users} />
            <SidebarLink href="/dashboard/banner-category" label="Banners" Icon={Image} />
            <SidebarLink href="/dashboard/email-templates" label="Email Templates" Icon={Mail} />

            <SidebarGroup label="Blog" Icon={BookMarked}>
              <SidebarLink href="/dashboard/blog-category" label="Blog Category" Icon={CircleDot} />
              <SidebarLink href="/dashboard/blogs" label="Blogs" Icon={CircleDot} />
            </SidebarGroup>

            <SidebarLink href="/dashboard/faq" label="F.A.Q" Icon={HelpCircle} />
            <SidebarLink href="/dashboard/testimonial" label="Testimonial" Icon={MessageSquare} />
            <SidebarLink href="/dashboard/contact" label="Contact" Icon={Phone} />
          </ul>
        </aside>

      </div>
    </>
  );
};

const SidebarLink = ({ href, label, Icon, active }) => (
  <li>
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition ${
        active ? "bg-gray-800 font-semibold" : ""
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  </li>
);

const SidebarGroup = ({ label, Icon, open = false, children }) => {
  const [show, setShow] = useState(open);
  return (
    <li>
      <button
        onClick={() => setShow(!show)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <Icon size={18} />
        <span className="flex-1 text-left">{label}</span>
        {show ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {show && <ul className="ml-6 mt-1 space-y-1">{children}</ul>}
    </li>
  );
};

export default Sidebar;
