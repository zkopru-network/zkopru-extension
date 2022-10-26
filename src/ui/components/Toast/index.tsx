import React from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'

/**
 * Container for toast, styled to fit the current wallet theme
 * @see https://react-hot-toast.com/docs
 * @export
 * @return {*}
 */
export default function ToastContainer() {
  return (
    <Toaster
      position="bottom-center"
      containerStyle={{
        position: 'absolute'
      }}
      toastOptions={{
        iconTheme: {
          primary: 'rgb(var(--color-text-primary) / 1)',
          secondary: 'rgb(var(--color-text-primary) / .4)'
        }
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            backgroundColor: 'rgb(var(--color-pure) / 0.75)',
            fontSize: '0.875rem' /* 14px */,
            lineHeight: '1.25rem' /* 20px */,
            color: 'rgb(var(--color-text-primary) / 1)',
            backdropFilter: 'blur(4px)'
          }}
        >
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    x="0"
                    y="0"
                    viewBox="0 0 30 30"
                    fill="currentColor"
                  >
                    <path d="M7 4a.995.995 0 00-.707.293l-2 2a.999.999 0 000 1.414L11.586 15l-7.293 7.293a.999.999 0 000 1.414l2 2a.999.999 0 001.414 0L15 18.414l7.293 7.293a.999.999 0 001.414 0l2-2a.999.999 0 000-1.414L18.414 15l7.293-7.293a.999.999 0 000-1.414l-2-2a.999.999 0 00-1.414 0L15 11.586 7.707 4.293A.996.996 0 007 4z"></path>
                  </svg>
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}
