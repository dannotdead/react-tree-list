import React, { useReducer } from 'react'
import { reducerTreeList } from './store/reducer'
import { IAction, ITreeList, initialState } from './store/actions'
import './App.css'

const App = () => {
	const [treeList, dispatch] = useReducer(reducerTreeList, initialState)

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
			<button onClick={resetTreeList}>Reset</button>
			<button onClick={addRootTreeItem}>+</button>
			<TreeList treeList={treeList} dispatch={dispatch} />
		</div>
	)
}

const TreeList = ({
	treeList,
	dispatch,
}: {
	treeList: ITreeList[]
	dispatch: (action: IAction) => void
}) => {
	const addTreeItem = (item: ITreeList): void => {
		dispatch({
			type: 'add',
			payload: item.id,
		})
	}

	const deleteTreeItem = (item: ITreeList): void => {
		dispatch({
			type: 'delete',
			payload: item.id,
		})
	}

	return (
		<ul>
			{treeList.map((item, index) => (
				<div key={Date.now() + index}>
					<li>
						{item.nodeName}
						<button onClick={() => addTreeItem(item)}>+</button>
						<button onClick={() => deleteTreeItem(item)}>-</button>
						<button onClick={() => console.log(item)}>Edit</button>
					</li>
					<>
						{item.children && (
							<TreeList treeList={item.children} dispatch={dispatch} />
						)}
					</>
				</div>
			))}
		</ul>
	)
}

export default App
