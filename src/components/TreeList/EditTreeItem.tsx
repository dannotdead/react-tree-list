import React from 'react'
import {
	IEditTreeItemState,
	IAction,
	ITreeList,
} from '../../interfaces/interfaces'
import Button from '../Button'

const EditTreeItem = ({
	item,
	editTreeItemState,
	setEditTreeItemState,
	dispatch,
}: {
	item: ITreeList
	editTreeItemState: IEditTreeItemState
	setEditTreeItemState: (value: IEditTreeItemState) => void
	dispatch: (action: IAction) => void
}) => {
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
	return (
		<>
			<input
				value={editTreeItemState.value}
				onChange={(event) =>
					setEditTreeItemState({
						...editTreeItemState,
						value: event.target.value,
					})
				}
			/>
			<Button
				onClick={() => editTreeItem(item, editTreeItemState.value)}
				name='Save'
			/>
			<Button
				onClick={() =>
					setEditTreeItemState({
						id: 0,
						isEdit: false,
						value: '',
					})
				}
				name='Cancel'
			/>
		</>
	)
}

export default EditTreeItem
