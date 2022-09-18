import React, { useEffect, useState } from 'react'
import './App.css'

interface ITreeList {
	id: number
	nodeName: string
	children: ITreeList[]
}

const App = () => {
	const [treeList, setTreeList] = useState<ITreeList[]>([])

	const randomizeId = (): number => Math.floor(Math.random() * 10e8)

	useEffect(() => {
		setTreeList([
			{
				id: randomizeId(),
				nodeName: 'Node 1',
				children: [
					{ id: randomizeId(), nodeName: 'Node 1.1', children: [] },
					{ id: randomizeId(), nodeName: 'Node 1.2', children: [] },
					{
						id: randomizeId(),
						nodeName: 'Node 1.3',
						children: [
							{ id: randomizeId(), nodeName: 'Node 1.3.1', children: [] },
							{ id: randomizeId(), nodeName: 'Node 1.3.2', children: [] },
						],
					},
				],
			},
			{ id: randomizeId(), nodeName: 'Node 2', children: [] },
		])
	}, [])

	const recursiveRemove = (list: ITreeList[], id: number): ITreeList[] => {
		return list
			.map((item: ITreeList) => {
				return { ...item }
			})
			.filter((item: ITreeList) => {
				if ('children' in item) {
					item.children = recursiveRemove(item.children, id)
				}
				return item.id !== id
			})
	}

	const deleteTreeItem = (item: ITreeList): void => {
		const res = recursiveRemove(treeList, item.id)
		setTreeList(res)
	}

	return (
		<div>
			<button>Reset</button>
			<TreeList treeList={treeList} deleteTreeItem={deleteTreeItem} />
		</div>
	)
}

const TreeList = ({
	treeList,
	deleteTreeItem,
}: {
	treeList: ITreeList[]
	deleteTreeItem: (item: ITreeList) => void
}) => {
	return (
		<ul>
			{treeList.map((item, index) => (
				<div key={Date.now() + index}>
					<li style={{ whiteSpace: 'nowrap' }}>
						{item.nodeName}
						<button onClick={() => console.log(item)}>+</button>
						<button onClick={() => deleteTreeItem(item)}>-</button>
						<button onClick={() => console.log(item)}>Edit</button>
					</li>
					<>
						{item.children && (
							<TreeList
								treeList={item.children}
								deleteTreeItem={deleteTreeItem}
							/>
						)}
					</>
				</div>
			))}
		</ul>
	)
}

export default App
