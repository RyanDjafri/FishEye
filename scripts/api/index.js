export const fetchData = async () => {
  try {
    const response = await fetch("../../data/photographers.json");
    if (!response.ok) {
      throw new Error("Bad Fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
// je fetch ma data avec la methode js fetch puis je la transform en json pour pouvoir l'utiliser a travers mon code et je l'exporte
