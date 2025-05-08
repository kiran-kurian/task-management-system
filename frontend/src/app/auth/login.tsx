export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Token received on login:", data.access_token);
      localStorage.setItem("token", data.access_token);
      console.log("Token stored in localStorage:", localStorage.getItem("token"));
      window.location.href = "/dashboard";
    } else {
      console.error("Login failed:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
}
