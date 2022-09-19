import React, { useState } from 'react'
import TreeItem from './TreeItem'
import EditTreeItem from './EditTreeItem'
import {
	IEditTreeItemState,
	IAction,
	ITreeList,
} from '../../interfaces/interfaces'

const TreeList = ({
	treeList,
	dispatch,
}: {
	treeList: ITreeList[]
	dispatch: (action: IAction) => void
}) => {
	const [editTreeItemState, setEditTreeItemState] =
		useState<IEditTreeItemState>({
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
							<EditTreeItem
								item={item}
								editTreeItemState={editTreeItemState}
								setEditTreeItemState={setEditTreeItemState}
								dispatch={dispatch}
							/>
						) : (
							<TreeItem
								item={item}
								dispatch={dispatch}
								setEditTreeItemState={setEditTreeItemState}
							/>
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

export default TreeList
