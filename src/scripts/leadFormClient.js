import { db } from "../lib/firebaseClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
  const leadForm = document.getElementById("leadForm");

  if (!leadForm) return;

  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);

    const addressLine = `${formData.get("addressNumber") || ""} ${formData.get("addressStreet") || ""}`.trim();
    const suburb = formData.get("addressSuburb") || "";
    const postcode = formData.get("addressPostcode") || "";

    const clientData = {
        name: formData.get("fullName"),
        phone: formData.get("phone"),

        neighborhood: suburb,
        note: `Address: ${addressLine}, ${suburb} ${postcode}`,

        stage: "leads",

        systemSize: formData.get("systemInterest") || null,
        batteryInterest: formData.get("batteryInterest") || null,

        preferredInstallTime: formData.get("preferredInstallTime") || "",
        preferredVisitDateTime: formData.get("preferredVisitDateTime") || "",

        inverterSelected: null,
        panelsSelected: null,
        panelsQty: null,

        visitNotes: "",
        createdAt: serverTimestamp(),
        source: "websiteTownsville"
    };

    try {
      await addDoc(collection(db, "clients"), clientData);
      alert("Thanks! We will contact you shortly.");
      leadForm.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  });
});
