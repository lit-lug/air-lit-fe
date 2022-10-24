import { AesEncryption } from "./cipher";

export const Encryption = new AesEncryption({
    key: "icepieisacoolboy",
    iv: "gi0rr5yuxzr3b7hc",
})

export function encryptByAES(cipherText: string) {
    return Encryption.encryptByAES(cipherText);
}

export function decryptByAES(cipherText: string) {
    return Encryption.decryptByAES(cipherText);
}

