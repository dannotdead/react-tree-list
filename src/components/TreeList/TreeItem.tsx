import React from 'react'
import {
	IEditTreeItemState,
	IAction,
	ITreeList,
} from '../../interfaces/interfaces'
import Button from '../Button/Button'

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
			<Button onClick={() => addTreeItem(item)} name='Add' />
			<Button onClick={() => deleteTreeItem(item)} name='Delete' />
			<Button
				onClick={() =>
					setEditTreeItemState({
						id: item.id,
						isEdit: true,
						value: item.nodeName,
					})
				}
				name='Edit'
			/>
		</>
	)
}

export default TreeItem
