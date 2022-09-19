import React from 'react'
import {
	IEditTreeItemState,
	IAction,
	ITreeList,
} from '../../interfaces/interfaces'

const TreeItem = ({
	item,
	dispatch,
	setEditTreeItemState,
}: {
	item: ITreeList
	dispatch: (action: IAction) => void
	setEditTreeItemState: (value: IEditTreeItemState) => void
}) => {
	const addTreeItem = (item: ITreeList): void => {
		dispatch({
			type: 'add',
			payload: { id: item.id },
		})
	}

	const deleteTreeItem = (item: ITreeList): void => {
		dispatch({
			type: 'delete',
			payload: { id: item.id },
		})
	}

	return (
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
	)
}

export default TreeItem
