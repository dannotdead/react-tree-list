export type Payload = {
	id: number
	editValue?: string
} | null

export interface IAction {
	type: string
	payload: Payload
}

export interface ITreeList {
	id: number
	nodeName: string
	children: ITreeList[]
}

export interface IEditTreeItemState {
	id: number
	isEdit: boolean
	value: string
}
