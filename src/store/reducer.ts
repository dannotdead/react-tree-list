import {
	IAction,
	ITreeList,
	randomizeId,
	recursiveAdd,
	recursiveRemove,
} from './actions'

export const reducerTreeList = (
	state: ITreeList[],
	action: IAction
): ITreeList[] => {
	switch (action.type) {
		case 'addRoot':
			return [
				...state,
				{
					id: randomizeId(),
					nodeName: `Node ${state.length + 1}`,
					children: [],
				},
			]
		case 'add':
			return recursiveAdd(state, action.payload)
		case 'delete':
			return recursiveRemove(state, action.payload)
		default:
			return state
	}
}
