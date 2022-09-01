import { beforeEach, describe, expect, it } from 'vitest'

import checkFriendship, { FriendshipStatus } from '../../utils/checkFriendship'
import defaultUser from '../../utils/defaultValues'

const user1: User = { ...defaultUser, id: '1' }
const user2: User = { ...defaultUser, id: '2' }

describe('checkFriendship', () => {
  beforeEach(() => {
    user1.friends = []
    user1.friendRequests = []
    user2.friends = []
    user2.friendRequests = []
  })

  describe('given users are friends', () => {
    it('should return "FRIENDS"', () => {
      user1.friends.push(user2)
      user2.friends.push(user1)

      const friendship = checkFriendship(user1, user2)

      expect(friendship).toBe(FriendshipStatus.FRIENDS)
    })
  })

  describe('given users are not friends', () => {
    it('should return "NOT_FRIENDS"', () => {
      const friendship = checkFriendship(user1, user2)

      expect(friendship).toBe(FriendshipStatus.NOT_FRIENDS)
    })
  })

  describe('given the first user sent a request', () => {
    it('should return "REQUEST_SENT"', () => {
      user2.friendRequests.push(user1)

      const friendship = checkFriendship(user1, user2)

      expect(friendship).toBe(FriendshipStatus.REQUEST_SENT)
    })
  })

  describe('given the first user received a request', () => {
    it('should return "REQUEST_RECEIVED"', () => {
      user1.friendRequests.push(user2)

      const friendship = checkFriendship(user1, user2)

      expect(friendship).toBe(FriendshipStatus.REQUEST_RECEIVED)
    })
  })
})
