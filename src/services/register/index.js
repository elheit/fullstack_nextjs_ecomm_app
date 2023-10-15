export const registerNewUser = async (FormData) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });
    const finaldata = await response.json();
    
    return finaldata;
  } catch (err) {
    console.log("error", err);
  }
};
