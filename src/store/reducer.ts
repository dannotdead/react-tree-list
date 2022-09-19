import {
	IAction,
	ITreeList,
	initialState,
	randomizeId,
	recursiveAdd,
	recursiveRemove,
	recursiveEdit,
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
		case 'edit':
			return recursiveEdit(state, action.payload)
		case 'delete':
			return recursiveRemove(state, action.payload)
		case 'reset':
			return initialState
		default:
			return state
	}
}
