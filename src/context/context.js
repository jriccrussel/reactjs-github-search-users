import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({children}) => {

    const [githubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollowers] = useState(mockFollowers)

    // request loading
    const [requests, setRequests] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    // error
    const [error, setError] = useState({ show: false, msg: '' })

    const searchGithubUser = async (user) => {
        toggleError()
        setIsLoading(true)

        // grabbing the data by getting the user 
        const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
          console.log(err)
        )
        console.log(response)
        if (response) {
          setGithubUser(response.data)
        } else {
          toggleError(true, 'there is no user with that username')
        }
        checkRequests()
        setIsLoading(false)
    }

    // Get Request to get the data
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
          .then(({ data }) => {
            console.log(data)
            let {
                rate: { remaining },
            } = data
            // remaining = 0 // to test to display ang error
            setRequests(remaining)

            if (remaining === 0) {
                toggleError(true, 'sorry, you have exceeded your hourly rate limit!')
            }
          })
          .catch((err) => console.log(err))
    }

    // Toggle Error | Error Message
    const toggleError = (show = false, msg = '') => {
        setError({ show, msg });
    }

    // "checkRequests" - call back action equivalent to "checkRequests()" inside the useEffect "useEffect(() => { checkRequests() }, [])"
    useEffect(checkRequests, [])

    return (
        // Checking if ang "value={'Hello'}" ma passed or makita sa laing mga components
        // <GithubContext.Provider value={'Hello'}>{children}</GithubContext.Provider>
        <GithubContext.Provider value={{
            githubUser,
            repos,
            followers,
            requests,
            error,
            searchGithubUser,
        }}>
            {children}
        </GithubContext.Provider>
    )
}
export {GithubProvider, GithubContext}