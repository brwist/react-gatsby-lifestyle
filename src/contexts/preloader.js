/* eslint import/prefer-default-export: off */

import React from 'react'

export const PreloaderContext = React.createContext({
    preloaderState: 'preloader',
    setPreloaderState: () => {}
})