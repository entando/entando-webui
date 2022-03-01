/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IPage {
    title: string
    group: string
    secondaryGroups: Array<string>
}

export interface IContent {
    contentId: string
    attributes: Array<IAttribute>
}

export interface IAttribute {
    code: string
    values: Map<string, any>
    value: any
    elements: Array<IAttribute>
}
