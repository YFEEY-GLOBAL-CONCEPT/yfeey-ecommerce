import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface OrderItem {
  name: string;
  size?: string;
  quantity: number;
  price: number;
  discountPrice?: number;
}

interface OrderReceiptProps {
  orderNumber: string;
  orderDate: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  shippingMethod: string;
  shippingCost: number;
  items: OrderItem[];
  subtotal: number;
  total: number;
}

const OrderReceipt = ({
  orderNumber,
  orderDate,
  customerEmail,
  customerName,
  shippingAddress,
  shippingMethod,
  shippingCost,
  items,
  subtotal,
  total,
}: OrderReceiptProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadAsPDF = useCallback(async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`yfeey-order-${orderNumber}.pdf`);
  }, [orderNumber]);

  const downloadAsImage = useCallback(async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = `yfeey-order-${orderNumber}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [orderNumber]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Downloadable receipt area */}
      <div ref={receiptRef} className="bg-white p-8 md:p-10" style={{ color: "#1a1a1a" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6" style={{ borderBottom: "1px solid #e5e5e5" }}>
          <div>
            <h2 className="text-2xl font-semibold tracking-wider" style={{ color: "#2d1650" }}>YFEEY</h2>
            <p className="text-xs mt-1" style={{ color: "#888" }}>www.yfeey.com</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium" style={{ color: "#1a1a1a" }}>Order Receipt</p>
            <p className="text-xs mt-1" style={{ color: "#888" }}>{orderDate}</p>
          </div>
        </div>

        {/* Order number */}
        <div className="mb-6 p-4 rounded" style={{ backgroundColor: "#f8f6fb" }}>
          <p className="text-xs" style={{ color: "#888" }}>Order Number</p>
          <p className="text-lg font-medium tracking-wide" style={{ color: "#2d1650" }}>#{orderNumber}</p>
        </div>

        {/* Customer & Shipping info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "#888" }}>BILL TO</p>
            <p className="text-sm font-medium">{customerName}</p>
            <p className="text-sm" style={{ color: "#666" }}>{customerEmail}</p>
          </div>
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "#888" }}>SHIP TO</p>
            <p className="text-sm">{shippingAddress.address}</p>
            <p className="text-sm" style={{ color: "#666" }}>
              {shippingAddress.city}{shippingAddress.state ? `, ${shippingAddress.state}` : ""} {shippingAddress.postalCode}
            </p>
            <p className="text-sm" style={{ color: "#666" }}>{shippingAddress.country}</p>
          </div>
        </div>

        {/* Items table */}
        <table className="w-full mb-6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #2d1650" }}>
              <th className="text-left py-2 text-xs font-medium" style={{ color: "#888" }}>ITEM</th>
              <th className="text-center py-2 text-xs font-medium" style={{ color: "#888" }}>QTY</th>
              <th className="text-right py-2 text-xs font-medium" style={{ color: "#888" }}>PRICE</th>
              <th className="text-right py-2 text-xs font-medium" style={{ color: "#888" }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              const unitPrice = item.discountPrice ?? item.price;
              return (
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  <td className="py-3">
                    <p className="text-sm font-medium">{item.name}</p>
                    {item.size && <p className="text-xs" style={{ color: "#888" }}>Size: {item.size}</p>}
                  </td>
                  <td className="text-center text-sm py-3">{item.quantity}</td>
                  <td className="text-right text-sm py-3">${unitPrice.toFixed(2)}</td>
                  <td className="text-right text-sm font-medium py-3">${(unitPrice * item.quantity).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Totals */}
        <div className="ml-auto" style={{ maxWidth: "250px" }}>
          <div className="flex justify-between py-1 text-sm">
            <span style={{ color: "#888" }}>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 text-sm">
            <span style={{ color: "#888" }}>Shipping ({shippingMethod})</span>
            <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between py-2 text-base font-semibold mt-2" style={{ borderTop: "2px solid #2d1650" }}>
            <span>Total</span>
            <span style={{ color: "#2d1650" }}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 text-center" style={{ borderTop: "1px solid #e5e5e5" }}>
          <p className="text-xs" style={{ color: "#888" }}>Thank you for shopping with Yfeey Store!</p>
          <p className="text-xs mt-1" style={{ color: "#aaa" }}>Questions? Contact us at support@yfeey.com</p>
        </div>
      </div>

      {/* Download buttons - outside receipt area */}
      <div className="flex gap-3 mt-6 justify-center">
        <button
          onClick={downloadAsPDF}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-none bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PDF
        </button>
        <button
          onClick={downloadAsImage}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-none border border-border text-foreground hover:bg-muted transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          Download Image
        </button>
      </div>
    </div>
  );
};

export default OrderReceipt;