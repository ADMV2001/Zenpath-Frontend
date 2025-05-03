"use client"

import  React from "react"
import { useState, useEffect } from "react"




export function DashboardLayout({
  children,
  activeTab,
  setActiveTab,
  therapist,
  isLoggedIn,
  onNavigate,
}) {
  const [open, setOpen] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const navigation = [
    { name: "Overview", icon: BarChart3Icon, value: "overview" },
    { name: "Patients", icon: UsersIcon, value: "patients" },
    { name: "Requests", icon: InboxIcon, value: "requests" },
    { name: "Appointments", icon: CalendarIcon, value: "appointments" },
    { name: "Messages", icon: MessageSquareIcon, value: "messages", notification: 5 },
    { name: "Articles", icon: FileTextIcon, value: "articles" },
    { name: "Settings", icon: SettingsIcon, value: "settings" },
  ]

  const NavItems = () => (
    <>
      <div className="px-3 py-2">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <span className="text-lg font-semibold text-blue-700">HT</span>
          </div>
          <div>
            <p className="text-sm font-medium">Healing Together</p>
            <p className="text-xs text-gray-500">Mental Health Platform</p>
          </div>
        </div>
      </div>
      <div className="px-3 py-2">
        <p className="px-2 text-xs font-medium text-gray-500">MAIN MENU</p>
        <nav className="mt-2 flex flex-col gap-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`flex w-full items-center justify-start gap-3 rounded-md px-2 py-2 text-left text-sm font-medium transition-colors ${
                activeTab === item.value ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab(item.value)
                if (isMobile) setOpen(false)
              }}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
              {item.notification && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                  {item.notification}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-r from-white to-blue-100">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 md:hidden"
          onClick={() => setOpen(true)}
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex items-center gap-2 md:ml-auto">
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-blue-600" />
          </button>
          <div className="relative">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt={therapist?.name || "Therapist"}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="sr-only">Toggle user menu</span>
            </button>
            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">{therapist?.name || "Dr. Sarah Johnson"}</p>
                    <p className="truncate text-xs text-gray-500">{therapist?.email || "sarah.johnson@example.com"}</p>
                  </div>
                  <hr className="my-1" />
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setActiveTab("settings")}
                  >
                    Profile
                  </button>
                  <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Billing
                  </button>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setActiveTab("settings")}
                  >
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        {open && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setOpen(false)}></div>
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <NavItems />
            </div>
          </div>
        )}
        <aside className="hidden w-64 flex-col border-r bg-white md:flex">
          <NavItems />
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
