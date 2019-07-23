import fileType from 'file-type'

export const bufferToDataURI = buffer => {
  const { ext, mime } = fileType(buffer)
  return `data:${mime};base64,${buffer.toString('base64')}`
}
