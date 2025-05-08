export async function register(email: string, password: string) {
  try {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL); // Debug log

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Registration successful");
    } else {
      console.error("Registration failed:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
  }
}
