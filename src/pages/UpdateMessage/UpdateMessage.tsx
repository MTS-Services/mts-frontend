import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateMessage() {
  const [profile, setProfile] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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
          Authorization: `Bearer 4d6166511563631c8dd3882ea61fffc0f03883c32089bfb87eb79bb85bbbb701`, // Add your token here
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
        data.choices?.[0]?.message?.content?.trim() || "No response";

      // Fiverr-safe replacements
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
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
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

        {/* Profile */}
        <div>
          <label className="mb-2 block font-medium">Profile</label>
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="border-accent/50 bg-background/90 w-full rounded border p-3"
            required
          >
            <option value="">Select Profile</option>
            <option value="Profile1">Profile1</option>
            <option value="Profile2">Profile2</option>
            <option value="Profile3">Profile3</option>
          </select>
        </div>

        {/* Client */}
        <div>
          <label className="mb-2 block font-medium">Client Name</label>
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="border-accent/50 bg-background/90 w-full rounded border p-3"
            required
          >
            <option value="">Select Client</option>
            <option value="Client A">Client A</option>
            <option value="Client B">Client B</option>
            <option value="Client C">Client C</option>
          </select>
        </div>

        {/* Status */}
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

        {/* Website URL */}
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

        {/* Message */}
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

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-3 font-semibold text-white transition hover:scale-95 hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Submit"}
        </button>
      </form>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-background border-primary text-accent relative w-full max-w-xl rounded-lg border p-6 shadow-2xl">
            <button
              className="absolute top-3 right-3 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
            <h3 className="mb-4 text-center text-lg font-semibold">
              Formatted Update Message
            </h3>
            <pre className="bg-secondary border-primary/30 max-h-[400px] overflow-auto rounded border p-4 break-words whitespace-pre-wrap">
              {formattedMessage}
            </pre>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(formattedMessage);
                  toast.success("Copied to clipboard!");
                }}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
