import jsPDF from "jspdf";

export const generateRetirementCertificate = (credit) => {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString();

  // Set font
  doc.setFont("helvetica");

  // Header
  doc.setFontSize(24);
  doc.setTextColor(34, 139, 34); // Forest green
  doc.text("CARBON CREDIT RETIREMENT CERTIFICATE", 105, 30, {
    align: "center",
  });

  // Credit details
  doc.setFontSize(12);
  const startY = 110;
  const lineHeight = 15;

  // UNIC ID
  doc.setFont("helvetica", "bold");
  doc.text("UNIC ID:", 30, startY);
  doc.setFont("helvetica", "normal");
  doc.text(credit.unic_id, 80, startY);

  // Project Name
  doc.setFont("helvetica", "bold");
  doc.text("Project Name:", 30, startY + lineHeight);
  doc.setFont("helvetica", "normal");
  const projectName = doc.splitTextToSize(credit.project_name, 110);
  doc.text(projectName, 80, startY + lineHeight);

  // Vintage
  doc.setFont("helvetica", "bold");
  doc.text("Vintage Year:", 30, startY + lineHeight * 2);
  doc.setFont("helvetica", "normal");
  doc.text(credit.vintage.toString(), 80, startY + lineHeight * 2);

  // Status
  doc.setFont("helvetica", "bold");
  doc.text("Status:", 30, startY + lineHeight * 3);
  doc.setFont("helvetica", "normal");
  doc.text(credit.status, 80, startY + lineHeight * 3);

  //  timestamp
  doc.setFont("helvetica", "bold");
  doc.text("Certificate Generated:", 30, startY + lineHeight * 4);
  doc.setFont("helvetica", "normal");
  doc.text(timestamp, 80, startY + lineHeight * 4);

  // Save the PDF
  doc.save(`retirement-certificate-${credit.unic_id}.pdf`);
};

export const generateHTMLCertificate = (credit) => {
  const timestamp = new Date().toLocaleString();

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Carbon Credit Retirement Certificate</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
            }
            .certificate {
                background: white;
                border: 3px solid #228B22;
                border-radius: 10px;
                padding: 40px;
                text-align: center;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .header {
                color: #228B22;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .subheader {
                color: #666;
                font-size: 14px;
                margin-bottom: 30px;
            }
            .content {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .details {
                text-align: left;
                background: #f8f8f8;
                padding: 20px;
                border-radius: 5px;
                margin: 20px 0;
            }
            .detail-row {
                display: flex;
                margin-bottom: 10px;
            }
            .detail-label {
                font-weight: bold;
                width: 150px;
            }
            .footer {
                font-size: 12px;
                color: #666;
                margin-top: 30px;
            }
            @media print {
                body { background-color: white; }
            }
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="header">CARBON CREDIT CERTIFICATE</div>
            <div class="subheader">Official Certificate of Carbon Credit</div>
    
      
            <div class="details">
                <div class="detail-row">
                    <span class="detail-label">UNIC ID:</span>
                    <span>${credit.unic_id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Project Name:</span>
                    <span>${credit.project_name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Vintage Year:</span>
                    <span>${credit.vintage}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span>${credit.status}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Certificate Generated:</span>
                    <span>${timestamp}</span>
                </div>
            </div>
            
        </div>
        
        <script>
            window.onload = function() {
                window.print();
            }
        </script>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const newWindow = window.open(url, "_blank");

  // Cleanup
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};
