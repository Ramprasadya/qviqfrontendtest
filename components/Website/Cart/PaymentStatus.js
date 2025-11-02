import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl, hostname } from "../../../config";
import { useRouter } from "next/navigation";

const PaymentStatus = () => {
  const navigate = useRouter();
  const { mtId } = useParams();

  //console.log("this is mtid", mtId);
  useEffect(() => {
    const paymentStatusCheck = async () => {
      try {
        const response = await axios.post(
          `${serverUrl}/payment/paymentStatusCheck/${mtId}`
        );
        // console.log(response.data);
        if (response.data.data.success) {
          navigate.push("/success", { state: { mtId } });
        }
      } catch (error) {
        console.error(error);
      }
    };

    paymentStatusCheck();
  }, [mtId]);

  return null;
};

export default PaymentStatus;
