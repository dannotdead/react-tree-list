type Payload = {
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

export const randomizeId = (): number => Math.floor(Math.random() * 10e8)

export const initialState: ITreeList[] = [
	{
		id: randomizeId(),
		nodeName: 'Node 1',
		children: [
			{ id: randomizeId(), nodeName: 'Node 1.1', children: [] },
			{ id: randomizeId(), nodeName: 'Node 1.2', children: [] },
			{
				id: randomizeId(),
				nodeName: 'Node 1.3',
				children: [
					{ id: randomizeId(), nodeName: 'Node 1.3.1', children: [] },
					{ id: randomizeId(), nodeName: 'Node 1.3.2', children: [] },
				],
			},
		],
	},
	{ id: randomizeId(), nodeName: 'Node 2', children: [] },
]

export const recursiveAdd = (
	list: ITreeList[],
	payload: Payload
): ITreeList[] => {
	return list.map((item: ITreeList) => {
		if (item.id === payload?.id) {
			const newItem: ITreeList = {
				id: randomizeId(),
				nodeName: `Node ${item.nodeName.split(' ')[1]}.${
					item.children.length + 1
				}`,
				children: [],
			}

			item.children.push(newItem)
		}

		if ('children' in item) {
			item.children = recursiveAdd(item.children, payload)
		}

		return { ...item }
	})
}

export const recursiveEdit = (
	list: ITreeList[],
	payload: Payload
): ITreeList[] => {
	return list.map((item: ITreeList) => {
		if (item.id === payload?.id) {
			if (payload.editValue != null) {
				item.nodeName = payload.editValue
			}
		}

		if ('children' in item) {
			item.children = recursiveEdit(item.children, payload)
		}

		return { ...item }
	})
}

export const recursiveRemove = (
	list: ITreeList[],
	payload: Payload
): ITreeList[] => {
	return list
		.map((item: ITreeList) => {
			return { ...item }
		})
		.filter((item: ITreeList) => {
			if ('children' in item) {
				item.children = recursiveRemove(item.children, payload)
			}
			return item.id !== payload?.id
		})
}
