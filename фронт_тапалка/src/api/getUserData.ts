export interface UserData {
  energi: number,
  money: number,
  max_energi: number
}

export async function getUserData(tgId: number) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/data`, {
    method: "POST",
    body: JSON.stringify({ user_id: tgId}),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Cannot load user data");
  }

  return await response.json() as Promise<UserData>;
}