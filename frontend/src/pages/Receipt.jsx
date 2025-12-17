import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf"; // ✅ FIXED IMPORT

export default function Receipt() {
  const { state } = useLocation();
  const receiptRef = useRef(null);

  const downloadReceipt = async () => {
    try {
      const element = receiptRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("booking-receipt.pdf");
    } catch (err) {
      console.error(err);
      alert("PDF download failed");
    }
  };

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No receipt data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        {/* RECEIPT */}
        <div ref={receiptRef}>
          <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">
            Booking Receipt
          </h2>

          <div className="space-y-4 text-gray-700">
            <p><strong>Name:</strong> {state.name}</p>
            <p><strong>Service:</strong> {state.service}</p>
            <p><strong>Date:</strong> {state.date}</p>
            <p className="text-lg font-bold">
              <strong>Amount:</strong> ₹{state.price}
            </p>
          </div>

          <div className="mt-6 text-center text-gray-500">
            Thank you for booking with us!
          </div>
        </div>

        {/* BUTTON */}
      <button
  onClick={() => window.print()}
  className="mt-2 w-full border border-pink-600 text-pink-600 py-2 rounded-lg"
>
  Print / Save as PDF
</button>


      </div>
    </div>
  );
}
