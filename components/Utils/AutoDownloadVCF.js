import React, { useState, useEffect } from 'react';

const AutoDownloadVCF = ({ data }) => {
  const [downloadStatus, setDownloadStatus] = useState('Initiating download...');
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    const generateVCard = () => {
      const { name, mobileNumber, email, jobTitle, companyName, userName } = data;
      const websiteURL = `https://${userName}.qviq.io`;

      const vcard = [
        `BEGIN:VCARD`,
        `VERSION:3.0`,
        `FN;CHARSET=UTF-8:${name}`,
        `N;CHARSET=UTF-8:${name.split(" ").length > 1 ? Array.from(name.split(" ")).slice(1).join(" ") : ""};${name.split(" ").length > 0 ? name.split(" ")[0] : ""};;;`,
        `EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${email}`,
        `TEL;TYPE=WORK,VOICE:${mobileNumber}`,
        `TITLE;CHARSET=UTF-8:${jobTitle}`,
        `ORG;CHARSET=UTF-8:${companyName}`,
        `URL;type=WORK;CHARSET=UTF-8:${websiteURL}`,
        `REV:${new Date().toISOString()}`,
        `END:VCARD`,
      ].join("\n");

      return new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    };

    const downloadVCF = () => {
      const vCardBlob = generateVCard();
      const blobUrl = URL.createObjectURL(vCardBlob);

      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = `${data.name}.vcf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      URL.revokeObjectURL(blobUrl);
      setDownloadStatus('Download complete. Attempting to close tab...');
    };

    const attemptCloseTab = () => {
      try {
        window.close();
        // If the window doesn't close immediately, we'll reach the next line
        setDownloadStatus("Unable to close tab automatically. You can manually close this tab now.");
        setCanClose(true);
      } catch (error) {
        setDownloadStatus("Unable to close tab. You can manually close this tab now.");
        setCanClose(true);
      }
    };

    // Trigger download
    downloadVCF();

    // Attempt to close tab after a short delay
    setTimeout(attemptCloseTab, 1000);
  }, [data]);

  return (
    <div className="Plus-Jakarta-Sans-font-div flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="z-[1] p-[40px] md:p-[50px] md:w-fit w-[80vw] bg-[#ffffff80] rounded-lg shadow-md text-center backdrop-blur-[10px]" style={{ border: "1px solid #fff" }}>
        <h2 className="md:text-2xl text-xl font-bold mb-[16px] md:mb-[24px] text-[#1c1c1c]">Contact Download</h2>
        <p className="text-[#555454]">{downloadStatus}</p>
      </div>

      <div className='z-[0] absolute top-[50%] left-[50%] translate-x-[-100%] md:translate-x-[-185%] md:translate-y-[-10%] translate-y-[20%] bg-[#e4084921] rotate-[-10deg] h-[100px] w-[170px] rounded-full filter blur-[50px]'></div>
      <div className='z-[0] absolute top-[50%] left-[50%] md:translate-x-[84%] translate-x-[-8%] md:translate-y-[-70%] translate-y-[-98%] bg-[#fb660933] rotate-[-10deg] h-[100px] w-[170px] rounded-full filter blur-[50px]'></div>
    </div>
  );
};

export default AutoDownloadVCF;