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

	const recursiveAdd = (list: ITreeList[], id: number): ITreeList[] => {
		return list.map((item: ITreeList) => {
			if (item.id === id) {
				const newItem: ITreeList = {
					id: randomizeId(),
					nodeName: `Node ${item.nodeName.split(' ')[1]}.${
						item.children.length + 1
					}`,
					children: [],
				}

				item.children.push(newItem)
			}

			if ('children' in item) {
				item.children = recursiveAdd(item.children, id)
			}

			return { ...item }
		})
	}

	const deleteTreeItem = (item: ITreeList): void => {
		const res = recursiveRemove(treeList, item.id)
		setTreeList(res)
	}

	const addTreeItem = (item: ITreeList): void => {
		const res = recursiveAdd(treeList, item.id)
		setTreeList(res)
	}

	const addRootTreeItem = () => {
		setTreeList((prevState) => [
			...prevState,
			{
				id: randomizeId(),
				nodeName: `Node ${prevState.length + 1}`,
				children: [],
			},
		])
	}

	return (
		<div>
			<button>Reset</button>
			<button onClick={addRootTreeItem}>+</button>
			<TreeList
				treeList={treeList}
				deleteTreeItem={deleteTreeItem}
				addTreeItem={addTreeItem}
			/>
		</div>
	)
}

const TreeList = ({
	treeList,
	deleteTreeItem,
	addTreeItem,
}: {
	treeList: ITreeList[]
	deleteTreeItem: (item: ITreeList) => void
	addTreeItem: (item: ITreeList) => void
}) => {
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
							<TreeList
								treeList={item.children}
								deleteTreeItem={deleteTreeItem}
								addTreeItem={addTreeItem}
							/>
						)}
					</>
				</div>
			))}
		</ul>
	)
}

export default App
