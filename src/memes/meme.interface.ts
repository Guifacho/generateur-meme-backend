export type MemeText = {
  content: string
  x: number
  y: number
  fontSize: number
  color: string
  strokeColor: string
  fontFamily: string
  textAlign: 'center' | 'left' | 'right'
  bold: boolean
  italic: boolean
}

export type Meme = {
  id: string
  title: string
  image: string
  texts: MemeText[]
  createdAt: string
}
