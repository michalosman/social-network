export enum FriendshipStatus {
  FRIENDS = 'FRIENDS',
  NOT_FRIENDS = 'NOT_FRIENDS',
  REQUEST_SENT = 'REQUEST_SENT',
  REQUEST_RECEIVED = 'REQUEST_RECEIVED',
}

const checkFriendship = (currentUser: User, otherUser: User) => {
  if (currentUser.friends.find((friend) => friend.id === otherUser.id))
    return FriendshipStatus.FRIENDS

  if (
    currentUser.friendRequests.find(
      (friendRequest) => friendRequest.id === otherUser.id
    )
  )
    return FriendshipStatus.REQUEST_RECEIVED

  if (
    otherUser.friendRequests.find(
      (friendRequest) => friendRequest.id === currentUser.id
    )
  )
    return FriendshipStatus.REQUEST_SENT

  return FriendshipStatus.NOT_FRIENDS
}

export default checkFriendship
