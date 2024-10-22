"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

interface GeneralComponent {
    toggleSideBar: () => void,
    isOpened: boolean,
    setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const GeneralContext = createContext<GeneralComponent | undefined>(undefined)


export const GeneralProvider = ({children} : {children: ReactNode}) => {
    const [isOpened, setIsOpened] = useState(false)
    const toggleSideBar = () => {
        setIsOpened((prevmode) =>  !prevmode)
    }
  return (
  <GeneralContext.Provider value={{isOpened, toggleSideBar, setIsOpened}}>
    {children}
  </GeneralContext.Provider>
  )
}
