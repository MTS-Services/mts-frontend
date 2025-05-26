import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrimaryButton from "../../components/Button/PrimaryButton";

export default function QuotationPDFForm() {
  const pdfRef = useRef(null);
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
      const formattedHTML = `
        <div>
          <h2 style='font-size:18px;margin-top:16px;margin-bottom:8px;color:#000'>Client Message</h2>
          <p style='color:#000000;line-height:1.75;'>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `;

      const element = pdfRef.current;
      if (!element) throw new Error("PDF container not found");

      const logo = new Image();
      logo.src = "/black_logo.png";
      await new Promise((res, rej) => {
        logo.onload = res;
        logo.onerror = rej;
      });

      const messageNode = document.getElementById("formattedMessage");
      if (messageNode) {
        messageNode.innerHTML = formattedHTML;
      } else {
        throw new Error("Formatted message container not found in DOM");
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgProps = { width: canvas.width, height: canvas.height };
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 5;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = pdfHeight - margin * 2;
      const ratio = contentWidth / imgProps.width;
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
          pageHeightPx
        );

        const pageImgData = pageCanvas.toDataURL("image/png");
        if (i > 0) pdf.addPage();

        pdf.addImage(pageImgData, "PNG", margin, margin, contentWidth, contentHeight);
        if (pdf.setGState) {
          const gState = new pdf.GState({ opacity: 0.03 });
          pdf.setGState(gState);
        }

        pdf.addImage(logo, "PNG", 50, 120, 110, 110);
      }

      pdf.save("quotation.pdf");
      toast.success("🎉 PDF downloaded successfully!");
      setPreparedBy("");
      setMessage("");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  /// buttong part ----------------

  return (
    <div className="flex-1 p-6 bg-background min-h-screen flex justify-center items-center">
      <ToastContainer />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGeneratePDF();
        }}
        className="mx-auto lg:w-[600px]   space-y-6 rounded-lg border border-primary bg-background p-6 shadow-md"
      >
        <h2 className="text-center text-2xl font-bold  text-accent font-primary uppercase">Quotation PDF Generator</h2>

        <div>
          <label className="mb-2 block font-semibold text-accent font-primary">Prepared By</label>
          <input 
            type="text"
            placeholder="Your name"
            value={preparedBy}
            onChange={(e) => setPreparedBy(e.target.value)}
            className="w-full rounded border border-primary/60 p-3 text-accent  font-primary"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-accent font-primary">Client Message</label>
          <textarea 
            rows={10}
            placeholder="Paste client message ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded border border-primary/60 p-2.5 text-accent font-primary" 
            required
          ></textarea>
        </div>

<PrimaryButton  type="submit"
          disabled={loading}
          className="" >{loading ? "Generating PDF..." : "Submit & Download PDF"}</PrimaryButton>
        
      </form>

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
            <h2  className="text-accent" style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Project Quotation</h2>
            <p className="text-accent" style={{ fontSize: "0.875rem", color: "#6b7280" }}>Prepared by {preparedBy}</p>
          </div>
        </div>

        <div
          id="formattedMessage"
          style={{ fontSize: "1rem", lineHeight: "1.75", paddingTop: "0.5rem" }}
        ></div>
      </div>
    </div>
  );
}
