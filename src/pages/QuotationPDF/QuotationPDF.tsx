import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

const QuotationPDF = () => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    setIsDownloading(true);

    try {
      const element = pdfRef.current;
      if (!element) {
        console.error("pdfRef not found");
        setIsDownloading(false);
        return;
      }

      const logo = new Image();
      logo.src = "/black_logo.png";
      await new Promise((resolve, reject) => {
        logo.onload = resolve;
        logo.onerror = reject;
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgProps = {
        width: canvas.width,
        height: canvas.height,
      };

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
    } catch (error) {
      console.error("Error generating or saving PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "2rem",
        paddingBottom: "5rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          style={{
            backgroundColor: "#4f46e5",
            color: "#fff",
            padding: "0.75rem 2rem",
            fontSize: "1.125rem",
            fontWeight: 700,
            borderRadius: "0.75rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            cursor: isDownloading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            opacity: isDownloading ? 0.6 : 1,
          }}
        >
          {isDownloading ? "Downloading..." : "Download Attractive PDF"}
        </button>
      </div>

      <div
        ref={pdfRef}
        style={{
          backgroundColor: "#ffffff",
          color: "#1f2937",
          padding: "2.5rem",
          width: "794px",
          minHeight: "1123px",
          margin: "0 auto",
          position: "relative",
          borderRadius: "1rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          paddingBottom: "120px",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
              paddingBottom: "1rem",
              borderBottom: "1px dashed #000",
            }}
          >
            <img src="/black_logo.png" alt="Logo" style={{ height: "50px" }} />
            <div style={{ textAlign: "right" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Project Quotation
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                Prepared by JONI
              </p>
            </div>
          </div>

          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Hello There,
          </h1>
          <p style={{ marginBottom: "1.5rem" }}>
            I’ve carefully reviewed your requirements and documentation, and I
            fully understand your needs for this project. Based on your
            specifications, we will develop:
          </p>

          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              margin: "1.5rem 0 0.5rem",
            }}
          >
            Project Scope
          </h2>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>
              Content Repurposing Automation Tool – Converts long-form content
              into social posts and newsletters.
            </li>
            <li>
              Content Management & Distribution Platform – for creators to
              manage, schedule, and analyze content.
            </li>
          </ul>

          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              margin: "1.5rem 0 0.5rem",
            }}
          >
            Tech Stack Summary
          </h2>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>
              <strong>Frontend:</strong> React.js, Tailwind CSS, Framer Motion,
              Chart.js/Recharts
            </li>
            <li>
              <strong>Backend:</strong> Node.js, Express, JWT,
              MongoDB/PostgreSQL
            </li>
            <li>
              <strong>AI Integration:</strong> OpenAI API, Google Speech-to-Text
            </li>
            <li>
              <strong>APIs:</strong> YouTube, Spotify, Mailchimp, SEMrush/Ahrefs
            </li>
            <li>
              <strong>Cloud:</strong> AWS S3/GCP, EC2/Compute Engine
            </li>
            <li>
              <strong>CI/CD:</strong> GitHub Actions
            </li>
          </ul>

          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              margin: "1.5rem 0 0.5rem",
            }}
          >
            Third-Party APIs Required
          </h2>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>AWS S3 / Google Cloud Storage</li>
            <li>YouTube, Google Speech-to-Text, OpenAI Whisper</li>
            <li>OpenAI API (GPT-4)</li>
            <li>SEMrush / Ahrefs</li>
            <li>Twitter, Instagram, LinkedIn</li>
            <li>Mailchimp</li>
            <li>Google/YouTube Analytics, Facebook/Google Ads</li>
          </ul>

          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              margin: "1.5rem 0 0.5rem",
            }}
          >
            Development Plan & Timeline
          </h2>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Phase 1: Planning & Prototyping (2–4 Weeks)</li>
            <li>Phase 2: Backend Development (6–8 Weeks)</li>
            <li>Phase 3: Frontend Development (6–8 Weeks)</li>
            <li>Phase 4: API Integration (4–6 Weeks)</li>
            <li>Phase 5: Testing & Optimization (4–6 Weeks)</li>
            <li>Phase 6: Deployment & Maintenance (Ongoing)</li>
          </ul>

          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              margin: "1.5rem 0 0.5rem",
            }}
          >
            Quotation
          </h2>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Total Cost:</strong> $25,000 USD
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Duration:</strong> 03 Months
          </p>

          <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
            Note: We may require materials or access during the project to
            fulfill requirements effectively.
          </p>

          <p style={{ marginBottom: "1rem" }}>
            Let me know if you have any questions or changes. Looking forward to
            working together!
          </p>

          <p style={{ fontWeight: 600 }}>
            Best regards,
            <br />
            JONI
            <br />
            Full Stack Web Developer
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuotationPDF;
