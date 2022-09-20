import React from 'react'
import {
	IEditTreeItemState,
	IAction,
	ITreeList,
} from '../../interfaces/interfaces'

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
			<button onClick={() => editTreeItem(item, editTreeItemState.value)}>
				Save
			</button>
			<button
				onClick={() =>
					setEditTreeItemState({
						id: 0,
						isEdit: false,
						value: '',
					})
				}
			>
				Cancel
			</button>
		</>
	)
}

export default EditTreeItem
