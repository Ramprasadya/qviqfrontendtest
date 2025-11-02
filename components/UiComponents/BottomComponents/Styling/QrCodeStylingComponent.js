import React, { useEffect, useRef, useState } from "react";

// Below is QR Code stying object with default attributes
// We can also pass these all attributes as a props for different different uses, colors and data
function initQR() {
  const QRCodeStyling = require("qr-code-styling").default;
  const qrCode = new QRCodeStyling({
    width: 250,
    height: 250,
    margin: 5,
    image: "",
    dotsOptions: {
      color: "white",
      type: "rounded",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 6.5,
    },
    backgroundOptions: {
      color: "#e9ebee",
    },
    cornersSquareOptions: {
      color: "black",
    },
  });
  return qrCode;
}
// const downloadQR=()=>{
//   qrCode.download({ name: "qr", extension: "svg" })
// }

export default function QrCodeStylingComponent(props) {
  const ref = useRef(null);
  const [qrCode, setqrcode] = useState();

  useEffect(() => {
    setqrcode(initQR());
    const options = qrCode._options;
    options.cornersSquareOptions.color = props.eyeColor;
    options.image = props.centerImageSrc;
    options.backgroundOptions.color = props.bgColor;
    options.dotsOptions.color = props.fgColor;
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode?.update({
      data: props.data,
    });
  });

  return (
    // This is outer div which have some dynamic styles based on props, you can remove this div if you dont need any parent div.
    <div
      style={{
        backgroundColor: props.bgColor && props.bgColor,
        display: "inline-block",
      }}
    >
      {props.qrdownload
        ? qrCode?.download({ name: "qr", extension: "svg" })
        : null}
      {/* Below div is most important, where canvas will be rendered of QR code*/}
      <div id={props.id} ref={ref}></div>

      <p style={{ color: "white", textAlign: "center" }}></p>
    </div>
  );
}
