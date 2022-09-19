type Payload = number | null

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

export const recursiveAdd = (list: ITreeList[], id: Payload): ITreeList[] => {
	return list.map((item: ITreeList) => {
		if (item.id === id) {
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
			item.children = recursiveAdd(item.children, id)
		}

		return { ...item }
	})
}

export const recursiveRemove = (
	list: ITreeList[],
	id: Payload
): ITreeList[] => {
	return list
		.map((item: ITreeList) => {
			return { ...item }
		})
		.filter((item: ITreeList) => {
			if ('children' in item) {
				item.children = recursiveRemove(item.children, id)
			}
			return item.id !== id
		})
}
