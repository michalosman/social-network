import { useQuery } from '@tanstack/react-query'

import usersAPI from '../api/usersAPI'

const useSearch = (searchPhrase: string) => {
  const { data: searchResults, ...searchResultsInfo } = useQuery<User[]>(
    ['searchResults', searchPhrase],
    () => {
      const [firstName, lastName] = searchPhrase.trim().split(' ')
      return usersAPI.getSearched({
        firstName,
        lastName,
        limit: 10,
      })
    }
  )

  return { searchResults: searchResults || [], searchResultsInfo }
}

export default useSearch
