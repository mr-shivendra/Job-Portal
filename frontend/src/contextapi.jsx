import {createContext,useState} from 'react'

export const MyContext=createContext();

 const ContextProvider = ({children}) => {
    const [contacts,setContact]=useState([])
    const [asUser,setAsUser]=useState(false)
    const [isEdit,setIsEdit]=useState(false)
    const [idx,setIdx]=useState('')
    const [isLogin,setIsLogin]=useState(true)
    const [isDelete,setIsDelete]=useState(false)
    const [wantLogout,setWantLogout]=useState(false)
  return (
    <MyContext.Provider value={{isEdit,setIsEdit,idx,setIdx,isDelete,setIsDelete,wantLogout,setWantLogout,isLogin,setIsLogin,contacts,setContact,asUser,setAsUser}}>
        {children}
    </MyContext.Provider>
  )
}

export default ContextProvider