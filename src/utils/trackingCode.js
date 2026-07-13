// src/utils/trackingCode.js

export const generateSecureTrackingCode = () => {
  const prefix = 'TD'
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const length = 8
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  
  // Checksum
  let checksum = 0
  for (let i = 0; i < result.length; i++) {
    checksum += result.charCodeAt(i)
  }
  const checksumChar = characters.charAt(checksum % characters.length)
  
  return `${prefix}${result}${checksumChar}`
}