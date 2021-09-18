import {useMemo, useRef, useState} from "react";

export default function useHistory() {
    const versions = useRef([])
    const [currentVersion, setCurrentVersion] = useState(-1)

    const getPrevious = () => {
        if (versions.current.length === 0 || currentVersion < 0)
            return null
        else if (currentVersion === 0)
            return versions.current[currentVersion]
        else {
            const ver = currentVersion - 1
            setCurrentVersion(ver)
            return versions.current[ver]
        }
    }
    const getFollowing = () => {
        if (currentVersion < (versions.current.length - 1) && (currentVersion + 1) <= (versions.current.length - 1)) {
            const ver = currentVersion + 1
            setCurrentVersion(ver)

            return versions.current[ver]
        } else if (versions.current.length === 0 || currentVersion < 0)
            return null
        else
            return versions.current[currentVersion]
    }

    const pushChange = (change, action) => {
        if (versions.current.length === 10)
            versions.current = versions.current.shift()

        do {
            versions.current.pop()
        } while (currentVersion > -1 && currentVersion < (versions.current.length - 1))

        versions.current.push({
            change: change,
            action: action
        })

        setCurrentVersion(versions.current.length - 1)
    }

    const hasFuture = useMemo(() => {
        return versions.current.length > 0 && currentVersion < (versions.current.length - 1)
    }, [versions, currentVersion])

    const hasPast = useMemo(() => {
        return versions.current.length > 0 && currentVersion > 0
    }, [versions, currentVersion])

    return {getPrevious, getFollowing, pushChange, hasFuture, hasPast}
}