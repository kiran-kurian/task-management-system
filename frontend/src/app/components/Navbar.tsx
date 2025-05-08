import { logout } from "@/app/auth/logout";

export default function Navbar() {
  const handleLogout = () => {
    console.log("Logout button clicked"); // Debug log
    logout(); // Call the logout function
  };

  return (
    <nav>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
}