import cryptoJS from 'crypto-js';

const key = cryptoJS.enc.Utf8.parse('slouu3ljmwj2anbr'); //十六位十六进制数作为密钥
const iv = cryptoJS.enc.Utf8.parse('2145214654789521'); //十六位十六进制数作为密钥偏移量（盐值）

// 加密
export function encrypt(word: string) {
  let srcs = cryptoJS.enc.Utf8.parse(word);
  let encrypted = cryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: cryptoJS.mode.CBC,
    padding: cryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
}
// 解密
export function decrypt(word: string) {
  let encryptedHexStr = cryptoJS.enc.Hex.parse(word);
  let srcs = cryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = cryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: cryptoJS.mode.CBC,
    padding: cryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(cryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
