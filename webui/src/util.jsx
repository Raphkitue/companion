import React, { useEffect } from 'react'
import pTimeout from 'p-timeout'
import { CAlert, CButton } from '@coreui/react'
import { ErrorBoundary } from 'react-error-boundary'

export const CompanionContext = React.createContext({
	socket: undefined,
})

export function socketEmit(socket, name, args, timeout) {
	const p = new Promise((resolve, reject) => {
		console.log('send', name)

		socket.emit(name, ...args, (...res) => resolve(res))
	})

	return pTimeout(p, timeout ?? 5000)
}


function ErrorFallback ({error, resetErrorBoundary}) {
	return (
		<CAlert color="danger">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<CButton color='primary' size="sm" onClick={resetErrorBoundary}>Try again</CButton>
		</CAlert>
	)
}

export function MyErrorBoundary ({ children }) {
	return <ErrorBoundary FallbackComponent={ErrorFallback}>
		{ children }
	</ErrorBoundary>
}

export function KeyReceiver ({children, ...props}) {
	return <div {...props} style={{ ...props.style, outline: 'none' }}>
		{ children }
	</div>
}

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (fun) => useEffect(fun, [])
