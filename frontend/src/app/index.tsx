import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './ui/App';
import { RouterProvider } from 'react-router';
import { routerConfig } from './router/router';



const reactRoot = createRoot(
  document.getElementById('root')!,
)

reactRoot.render(
  <React.StrictMode>
             <RouterProvider
                router={routerConfig} />
  </React.StrictMode>
)
