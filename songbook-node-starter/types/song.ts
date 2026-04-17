export type Song = {
  id: string
  number: number
  title: string
  firstLine?: string
  key?: string
  pages: number[]
  section?: string
  scriptureRefs: string[]
  alternateTitles?: string[]
  chorusFirstLine?: string
  tags?: string[]
}
