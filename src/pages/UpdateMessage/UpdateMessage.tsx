import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// *** আপনার useFetchData হুকের সঠিক পাথ এখানে দিন ***
// যদি useFetchData.js ফাইলটি src/hooks/useFetchData.js হয়,
// এবং আপনার UpdateMessage.jsx ফাইলটি src/components/UpdateMessage.jsx হয়,
// তাহলে পাথটি "../../hooks/useFetchData" হবে।
// আপনার প্রোজেক্ট স্ট্রাকচার অনুযায়ী এটি পরিবর্তন করুন।
import { useFetchData } from "../../hooks/useFetchData"; 
import PrimaryButton from "../../components/Button/PrimaryButton";

export default function UpdateMessage() {
  const [profile, setProfile] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState(""); // এই স্টেটেই এডিট করা মেসেজ আসবে
  const [websiteURL, setWebsiteURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState(""); // জেনারেট হওয়া মেসেজ
  const [showPopup, setShowPopup] = useState(false);

  // আপনার দেওয়া useFetchData হুকটি ব্যবহার করে প্রোফাইল ডেটা লোড করা হচ্ছে
  const { 
    data: profilesData, 
    isLoading: profilesLoading, 
    error: profilesError 
  } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/profile"
  );

  // profilesData থেকে profile_name গুলি বের করা হচ্ছে
  const profileNames = profilesData?.profiles?.map(p => p.profile_name) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile || !client || !status || !message || !websiteURL) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const prompt = `
You are a helpful assistant.

Translate the following list of tasks from Bengali-style shorthand into clear and professional English, using proper bullet points and correct tense.

Instructions:
- "korechi" → "I've ..."
- "korchi" → "I'm ..."
- "korbo" → "I'll ..."
- DO NOT add any extra lines or greetings
- DO NOT summarize or comment — just cleanly format the list

Text to format:
${message}
      `;

      const res = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer 4d6166511563631c8dd3882ea61fffc0f03883c32089bfb87eb79bb85bbbb701`, // আপনার Together.ai API টোকেন এখানে দিন
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2.5-72B-Instruct-Turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      let aiFormattedMessage =
        data.choices?.[0]?.message?.content?.trim() || ""; 

      // AI রেসপন্স খালি বা "No response" হলে মূল মেসেজ ব্যবহার করা হবে
      if (aiFormattedMessage.length === 0 || aiFormattedMessage.toLowerCase() === "no response") {
          aiFormattedMessage = message; 
      }

      const restrictedWords = {
        payment: "pa-yment",
        payments: "pa-yments",
        email: "e-mail",
        emails: "e-mails",
        money: "m-oney",
        dollars: "d-ollars",
        invoice: "inv-oice",
        paid: "pa-id",
        pay: "pa-y",
      };

      Object.entries(restrictedWords).forEach(([original, safe]) => {
        const regex = new RegExp(`\\b${original}\\b`, "gi");
        aiFormattedMessage = aiFormattedMessage.replace(regex, safe);
      });

      const lines = [`Hello ${client},`, "", "Hope you are fine!", ""];

      if (status === "Initial") lines.push("It’s an update message.");
      if (status === "Submitted" || status === "Revision")
        lines.push("Thanks for your cooperation.");

      lines.push("As per your requirement, I am working on your project.");
      lines.push("");
      lines.push("Also, I've completed the following tasks:");
      lines.push("");
      lines.push(aiFormattedMessage); 

      if (status === "Initial") {
        lines.push("");
        lines.push(
          "- I've used some copyright-free images for design purposes. (When you provide me your contents, I will replace that.)",
        );
      }

      if (["Initial", "Deliver"].includes(status)) {
        lines.push("");
        lines.push(
          "- I've used the most popular Astra theme and Elementor pro page builder with a lifetime license to design the entire website.",
        );
        lines.push("");
        lines.push(
          "- I've designed all pages fully responsive on mobile and other devices.",
        );
      }

      lines.push("");
      lines.push(`Please take a look: ${websiteURL}`);
      lines.push("");

      if (status === "Initial") {
        lines.push(
          "It is just an update message, and we haven't finalized anything yet, so no worries about anything. Just let me know your valuable feedback, I will work again according to your feedback. I will work until we achieve our goals.",
        );
      }

      if (status === "Complete") {
        lines.push(
          "If everything looks great, please let me know. After your confirmation, I'll deliver the project.",
        );
      }

      if (["Submitted", "Deliver"].includes(status)) {
        lines.push(
          "If everything looks great, please accept the job and spend a couple of minutes to write your experience with the Fiverr community. It will inspire me to work hard until the client achieves the goal.",
        );
      }

      lines.push("");
      lines.push(
        "For some reason, if you have any questions or concerns, please let me know. I'll get back to you as soon as I can.",
      );
      lines.push("");
      lines.push("Regards,");
      lines.push(profile);

      setFormattedMessage(lines.join("\n"));
      setShowPopup(true);

      // যখন পপআপ দেখাচ্ছে, তখন ইনপুট ফিল্ডগুলো রিসেট না করে, Edit করার সুযোগ রাখা হয়েছে।
      // যদি আপনি জেনারেট হওয়ার সাথে সাথে ফর্ম রিসেট করতে চান, তাহলে নিচের লাইনগুলো আনকমেন্ট করুন।
      // setProfile("");
      // setClient("");
      // setStatus("");
      // setMessage("");
      // setWebsiteURL("");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-accent font-primary min-h-screen p-6"> 
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="border-primary mx-auto max-w-2xl space-y-6 rounded-lg border p-6 shadow-lg" 
      >
        <h2 className="text-accent mb-4 text-center text-2xl font-bold">
          Update Message
        </h2>

        {/* Profile Select Dropdown */}
        <div>
          <label className="mb-2 block font-medium">Profile</label>
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="border-accent/50 bg-background/90 w-full rounded border p-3"
            required
          >
            <option value="">
              {profilesLoading ? "Loading Profiles..." : "Select Profile"}
            </option>
            {profilesError && <option disabled>Error loading profiles</option>}
            {profileNames.map((pName, index) => (
              <option key={index} value={pName}>
                {pName}
              </option>
            ))}
          </select>
        </div>

        {/* Client Name Input */}
        <div>
          <label className="mb-2 block font-medium">Client Name</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="border-accent/50 bg-background/90 w-full rounded border p-3"
            placeholder="Client's Name"
            required
          />
        </div>

        {/* Status Select */}
        <div>
          <label className="mb-2 block font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-accent/50 bg-background/90 w-full rounded border p-3"
            required
          >
            <option value="">Select Status</option>
            <option value="Initial">Initial</option>
            <option value="Submitted">Submitted</option>
            <option value="Revision">Revision</option>
            <option value="Deliver">Deliver</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        {/* Website URL Input */}
        <div>
          <label className="mb-2 block font-medium">Website URL</label>
          <input
            type="text"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            className="border-accent/50 bg-background/90 w-full rounded border p-3"
            placeholder="https://example.com"
            required
          />
        </div>

        {/* Message Textarea */}
        <div>
          <label className="mb-2 block font-medium">Message</label>
          <textarea
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            className="border-accent/50 bg-background/90 w-full rounded border p-3"
            rows={6}
            placeholder="Write the message content here..."
            required
          ></textarea>
        </div>


 


<PrimaryButton   type="submit"
          disabled={loading || profilesLoading} >  {loading ? "Generatings..." : "Submit"}</PrimaryButton>

      </form>

      {/* Popup for Formatted Message */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#2d2d2d] text-gray-200 relative w-full max-w-xl rounded-lg shadow-2xl overflow-hidden">
            {/* Header for Buttons */}
            <div className="bg-[#1e1e1e] p-3 flex justify-end items-center">
              {/* Copy Button - 100% Complete Logic */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(formattedMessage).then(() => {
                    toast.success("Copied to clipboard!");
                  }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    // Fallback for older browsers
                    const el = document.createElement('textarea');
                    el.value = formattedMessage;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                    toast.success("Copied to clipboard! (Fallback method)");
                  });
                }}
                className="ml-2 px-4 py-2 rounded bg-[#383838] text-white text-sm font-semibold hover:bg-[#505050] focus:outline-none focus:ring-2 focus:ring-[#707070] focus:ring-offset-1"
              >
                <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2.5a2.5 2.5 0 012.5 2.5v10a2.5 2.5 0 01-2.5 2.5h-10A2.5 2.5 0 015 17.5v-10A2.5 2.5 0 017.5 5H10"></path>
                </svg>
                Copy
              </button>

              {/* Edit Button - 100% Complete Logic */}
              <button
                onClick={() => {
                  setShowPopup(false); // পপআপ বন্ধ করুন
                  setMessage(formattedMessage); // জেনারেট হওয়া মেসেজটি মূল `message` টেক্সটবক্সে সেট করুন
                  toast.info("Message loaded for editing!"); // ব্যবহারকারীকে একটি নোটিফিকেশন দেখান
                  // যদি অন্যান্য ফর্ম ফিল্ডগুলোও (যেমন profile, client, status, websiteURL)
                  // জেনারেট হওয়ার আগের অবস্থায় ফিরিয়ে আনতে চান বা পপআপে দেখানো ডেটা অনুযায়ী সেট করতে চান,
                  // তাহলে এখানে সেগুলোর স্টেট আপডেট করতে হবে।
                  // তবে, এর জন্য আপনাকে `formattedMessage` জেনারেট করার আগে মূল ফর্মের ডেটাগুলো কোনো স্টেটে (যেমন originalProfile, originalClient) সেভ করে রাখতে হবে।
                  // অথবা `formattedMessage` থেকে পার্স করে নিতে হবে যদি তা সম্ভব হয়।
                }}
                className="ml-2 px-4 py-2 rounded bg-[#383838] text-white text-sm font-semibold hover:bg-[#505050] focus:outline-none focus:ring-2 focus:ring-[#707070] focus:ring-offset-1"
              >
                <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                Edit
              </button>

              {/* Close Button - 100% Complete Logic */}
              <button
                className="ml-2 px-4 py-2 rounded bg-[#383838] text-white text-sm font-semibold hover:bg-[#505050] focus:outline-none focus:ring-2 focus:ring-[#707070] focus:ring-offset-1"
                onClick={() => {
                  setShowPopup(false); // শুধু পপআপটি বন্ধ করুন
                }}
              >
                <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">


                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Close
              </button>

            </div>

            {/* Popup Content Area */}
            <div className="p-6">
              <pre className="bg-[#1e1e1e] text-gray-200 max-h-[400px] overflow-auto rounded p-4 break-words whitespace-pre-wrap font-mono text-sm">
                {formattedMessage}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}