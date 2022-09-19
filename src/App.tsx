import React, { useReducer, useState } from 'react'
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
			payload: { id: item.id },
		})
	}

	const editTreeItem = (item: ITreeList, value: string): void => {
		dispatch({
			type: 'edit',
			payload: { id: item.id, editValue: value },
		})
		setEditTreeItemState({
			id: 0,
			isEdit: false,
			value: '',
		})
	}

	const deleteTreeItem = (item: ITreeList): void => {
		dispatch({
			type: 'delete',
			payload: { id: item.id },
		})
	}

	const [editTreeItemState, setEditTreeItemState] = useState({
		id: 0,
		isEdit: false,
		value: '',
	})

	return (
		<ul>
			{treeList.map((item) => (
				<div key={item.id}>
					<li>
						{editTreeItemState.id === item.id ? (
							<>
								<input
									value={editTreeItemState.value}
									onChange={(event) => {
										setEditTreeItemState({
											...editTreeItemState,
											value: event.target.value,
										})
									}}
								/>
								<button
									onClick={() => {
										editTreeItem(item, editTreeItemState.value)
									}}
								>
									Save
								</button>
								<button
									onClick={() => {
										setEditTreeItemState({
											id: 0,
											isEdit: false,
											value: '',
										})
									}}
								>
									Cancel
								</button>
							</>
						) : (
							<>
								{item.nodeName}
								<button onClick={() => addTreeItem(item)}>+</button>
								<button onClick={() => deleteTreeItem(item)}>-</button>
								<button
									onClick={() => {
										setEditTreeItemState({
											id: item.id,
											isEdit: true,
											value: item.nodeName,
										})
									}}
								>
									Edit
								</button>
							</>
						)}
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
