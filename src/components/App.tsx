import React, { useReducer } from 'react'
import { reducerTreeList } from '../store/reducer'
import { initialState } from '../store/actions'
import TreeList from './TreeList/TreeList'
import Button from './Button/Button'

const App = () => {
	const [treeList, dispatch] = useReducer(
		reducerTreeList,
		JSON.parse(JSON.stringify(initialState))
	)

	const addRootTreeItem = (): void => {
		dispatch({
			type: 'addRoot',
			payload: null,
		})
	}

	const resetTreeList = (): void => {
		dispatch({
			type: 'reset',
			payload: null,
		})
	}

	return (
		<div>
			<Button onClick={addRootTreeItem} name='Add Root Node' />
			<Button onClick={resetTreeList} name='Reset' />
			<TreeList treeList={treeList} dispatch={dispatch} />
		</div>
	)
}

export default App
