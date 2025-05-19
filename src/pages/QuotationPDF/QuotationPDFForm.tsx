import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QuotationPDFForm() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [preparedBy, setPreparedBy] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async () => {
    if (!preparedBy || !message) {
      toast.error("Both fields are required");
      return;
    }

    setLoading(true);

    try {
      const prompt = `
You are a helpful AI assistant.

Take the following raw client message and visually enhance it for a PDF (without changing any actual text). Follow these rules:
- Format it using real HTML (NOT inside triple backticks or code blocks)
- Use <b>, <br>, <ul>, <li>, <h2>, <h3> tags where appropriate
- Headings should be clearly styled using <h2 style='font-size:18px;margin-top:16px;margin-bottom:8px;color:#000'>...
- Make all text pure black (color:#000000)
- Use proper line spacing and indentation
- Add spacing before and after headings
- DO NOT rephrase or modify any wording
- Output clean HTML ONLY — no explanations, no markdown, no triple backticks

Client Message:
${message}
      `;

      const response = await fetch(
        "https://api.together.xyz/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 4d6166511563631c8dd3882ea61fffc0f03883c32089bfb87eb79bb85bbbb701`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            model: "Qwen/Qwen2.5-72B-Instruct-Turbo",
            messages: [{ role: "user", content: prompt }],
          }),
        },
      );

      const data = await response.json();
      const aiHTML =
        data.choices?.[0]?.message?.content?.trim() || "No response";

      const element = pdfRef.current;
      if (!element) throw new Error("PDF container not found");

      const logo = new Image();
      logo.src = "/black_logo.png";
      await new Promise((res, rej) => {
        logo.onload = res;
        logo.onerror = rej;
      });

      const messageNode = document.getElementById("formattedMessage")!;
      messageNode.innerHTML = aiHTML;

      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgProps = { width: canvas.width, height: canvas.height };
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 5;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = pdfHeight - margin * 2;
      const ratio = contentWidth / imgProps.width;
      const scaledCanvasHeight = imgProps.height * ratio;
      const pageHeightPx = (contentHeight / contentWidth) * imgProps.width;
      const totalPages = Math.ceil(imgProps.height / pageHeightPx);

      for (let i = 0; i < totalPages; i++) {
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgProps.width;
        pageCanvas.height = pageHeightPx;

        const pageCtx = pageCanvas.getContext("2d");
        if (!pageCtx) continue;

        pageCtx.drawImage(
          canvas,
          0,
          i * pageHeightPx,
          imgProps.width,
          pageHeightPx,
          0,
          0,
          imgProps.width,
          pageHeightPx,
        );

        const pageImgData = pageCanvas.toDataURL("image/png");
        if (i > 0) pdf.addPage();

        pdf.addImage(
          pageImgData,
          "PNG",
          margin,
          margin,
          contentWidth,
          contentHeight,
        );

        if (pdf.setGState) {
          const gState = new pdf.GState({ opacity: 0.03 });
          pdf.setGState(gState);
        }

        pdf.addImage(logo, "PNG", 50, 120, 110, 110);
      }

      pdf.save("quotation.pdf");
      toast.success("🎉 PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans text-gray-800">
      <ToastContainer />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGeneratePDF();
        }}
        className="mx-auto max-w-2xl space-y-6 rounded-lg border border-gray-300 bg-white p-6 shadow-md"
      >
        <h2 className="text-center text-2xl font-bold text-blue-700">
          Quotation PDF Generator ✨
        </h2>

        <div>
          <label className="mb-2 block font-semibold">Prepared By</label>
          <input
            type="text"
            placeholder="Your name"
            value={preparedBy}
            onChange={(e) => setPreparedBy(e.target.value)}
            className="w-full rounded border border-gray-300 p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">Client Message</label>
          <textarea
            rows={10}
            placeholder="Paste client message (in Bengali shorthand)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded border border-gray-300 p-3 font-mono"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {loading ? "Generating PDF..." : "Submit & Download PDF"}
        </button>
      </form>

      {/* Hidden render container for PDF */}
      <div
        ref={pdfRef}
        style={{
          width: "794px",
          minHeight: "1123px",
          padding: "2.5rem",
          margin: "2rem auto",
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "'Segoe UI', sans-serif",
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px dashed #000",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
          }}
        >
          <img src="/black_logo.png" alt="Logo" style={{ height: "50px" }} />
          <div style={{ textAlign: "right" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Project Quotation
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Prepared by {preparedBy}
            </p>
          </div>
        </div>

        <div
          id="formattedMessage"
          style={{
            fontSize: "1rem",
            lineHeight: "1.75",
            paddingTop: "0.5rem",
          }}
        ></div>
      </div>
    </div>
  );
}
