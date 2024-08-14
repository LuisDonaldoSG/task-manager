import { useEffect, useState } from "react"

export default function useClientSide() {

    const [isInClientSide, setIsInClientSIde] = useState<boolean>(false)
    const hasWindow = typeof window !== 'undefined'

    useEffect(() => {
        if (hasWindow) {
            setIsInClientSIde(true)
        } else {
            setIsInClientSIde(false)
        }
    }, [hasWindow])

    return isInClientSide
}