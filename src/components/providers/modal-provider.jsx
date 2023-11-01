"use client"

import { useEffect, useState } from "react"

import {EditProfile} from "../modals/EditProfile"

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <EditProfile />
            {/* add anyother modal you created in the use modal hook  */}
        </>
    )
}