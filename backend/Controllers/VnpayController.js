import crypto from "crypto";
import qs from "qs";
import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from "vnpay";
import db from "../db.js";

// === Cấu hình VNPay (Sandbox) ===
const vnp_TmnCode = "7JQAT9XC";
const vnp_HashSecret = "F2BWWDXA72WFSMHUG3QA8H132CHJ9QTF";
const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_ReturnUrl = "http://localhost:3001/vnpay/vnpay_return";

// Hàm sort object theo key
function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

// === Tạo URL thanh toán ===
export const createPayment = async (req, res) => {
  let { orderId, amount, bankCode } = req.body;

  const vnpay = new VNPay({
    tmnCode: vnp_TmnCode,
    secureSecret: vnp_HashSecret,
    vnpayHost: "https://sandbox.vnpayment.vn",
    testMode: true,
    hashAlgorithm: "SHA512",
    loggerFn: ignoreLogger,
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const vnpayResponse = await vnpay.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: "127.0.0.1",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderId,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: `http://localhost:3001/vnpay/api/payment/callback-vnpay`,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(new Date()),
      vnp_ExpireDate: dateFormat(tomorrow),
    });

    return res.status(201).json({
      message: "success",
      paymentUrl: vnpayResponse,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Không tạo được link VNPay",
    });
  }
};

// === Xử lý Return URL ===
export const callbackVnpay = async (req, res) => {
  let vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);
  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
      const rspCode = vnp_Params['vnp_ResponseCode'];
      const transactionStatus = vnp_Params['vnp_TransactionStatus'];
      const orderId = vnp_Params['vnp_TxnRef'];

      if (rspCode === '00' && transactionStatus === '00') {
          try {
              await db.query(
                  'UPDATE don_hang SET trang_thai_thanh_toan = ? WHERE id = ?',
                  ['da_thanh_toan', orderId]
              );
              // Chuyển hướng với query param thông báo thành công
              return res.redirect('http://localhost:5173/userorder?payment=success&orderId=' + orderId);
          } catch (err) {
              console.error(err);
              return res.redirect('http://localhost:5173/userorder?payment=failed&error=db_error');
          }
      } else {
          // Chuyển hướng với thông báo thất bại
          return res.redirect('http://localhost:5173/userorder?payment=failed&error=transaction_failed');
      }
  } else {
      // Chuyển hướng với thông báo lỗi checksum
      return res.redirect('http://localhost:5173/userorder?payment=failed&error=invalid_checksum');
  }
};

// === Xử lý IPN ===
export const ipnVnpay = async (req, res) => {
  let vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    const rspCode = vnp_Params["vnp_ResponseCode"];
    const transactionStatus = vnp_Params["vnp_TransactionStatus"];
    const orderId = vnp_Params["vnp_TxnRef"];

    if (rspCode === "00" && transactionStatus === "00") {
      try {
        await db.query(
          "UPDATE don_hang SET trang_thai_thanh_toan = ? WHERE id = ?",
          ["da_thanh_toan", orderId]
        );
        return res.status(200).json({ RspCode: "00", Message: "Success" });
      } catch (err) {
        console.error(err);
        return res.status(200).json({ RspCode: "99", Message: "Lỗi cập nhật DB" });
      }
    } else {
      return res.status(200).json({ RspCode: rspCode, Message: "Thanh toán thất bại" });
    }
  } else {
    return res.status(200).json({ RspCode: "97", Message: "Invalid checksum" });
  }
};
