import React, { HTMLAttributes, ReactNode } from 'react'
import './Button.css'

interface IButton extends HTMLAttributes<HTMLButtonElement> {
	name: ReactNode
}

export const Button = ({ name, ...props }: IButton) => {
	return (
		<button {...props} className='button'>
			{name}
		</button>
	)
}
