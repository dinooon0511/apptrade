export async function checkSubscription(tgId: number) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chek`, {
    method: "POST",
    body: JSON.stringify({user_id: tgId}),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Can not to check");
  }

  return await response.json() as Promise<{energi: number | null}>
}