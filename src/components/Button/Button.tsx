import React, { HTMLAttributes, ReactNode } from 'react'
import './Button.css'

interface IButton extends HTMLAttributes<HTMLButtonElement> {
	name: ReactNode
}

const Button = ({ name, ...props }: IButton) => {
	return (
		<button {...props} className='button'>
			{name}
		</button>
	)
}

export default Button
