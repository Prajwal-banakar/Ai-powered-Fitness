export function generatePDF(content: string, title: string, userName: string) {
  const date = new Date().toLocaleDateString();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      color: #333;
    }
    h1 {
      color: #2563eb;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    h2 {
      color: #1e40af;
      margin-top: 25px;
      margin-bottom: 15px;
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: white;
      border: none;
      margin: 0;
    }
    .meta {
      font-size: 14px;
      color: rgba(255,255,255,0.9);
      margin-top: 10px;
    }
    .content {
      white-space: pre-wrap;
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #2563eb;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${title}</h1>
    <div class="meta">
      <div>Generated for: ${userName}</div>
      <div>Date: ${date}</div>
      <div>Powered by Fitness AI</div>
    </div>
  </div>
  <div class="content">${content}</div>
  <div class="footer">
    <p>This plan is AI-generated based on your personal metrics.</p>
    <p>Always consult with healthcare professionals before starting any new diet or exercise program.</p>
    <p>&copy; ${new Date().getFullYear()} Fitness AI - Your Personal Fitness Assistant</p>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title.replace(/\s+/g, '_')}_${date.replace(/\//g, '-')}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
