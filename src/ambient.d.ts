declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.css"

declare module "react-helmet"

declare module "typography" {
  interface GoogleFont {
    name: string
    styles: string[]
  }

  interface TypographyOptions {
    baseFontSize?: string
    baseLineHeight?: string | number
    headerFontFamily?: string[]
    bodyFontFamily?: string[]
    googleFonts?: GoogleFont[]
  }

  export default class Typography {
    constructor(options: TypographyOptions)
  }
}

declare module "react-proximity-feedback" {
  import { MutableRefObject } from "react"

  export interface ProximityFeedbackOptions {
    threshold?: number
    throttleInMs?: number
  }

  export interface ProximityFeedback {
    ref: MutableRefObject<any>
    distance: number
    proximity: number
    isNearby: boolean
  }

  export function useProximityFeedback(
    options?: ProximityFeedbackOptions
  ): ProximityFeedback
}
