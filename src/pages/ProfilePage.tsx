import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  FaCheck,
  FaFacebookMessenger,
  FaUserMinus,
  FaUserPlus,
} from 'react-icons/fa'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'

import * as postsAPI from '../api/postsAPI'
import * as usersAPI from '../api/usersAPI'
import Avatar from '../components/Avatar'
import EditProfile from '../components/EditProfile'
import PostList from '../components/PostList'
import useAuth from '../contexts/AuthContext'
import ErrorPage from './ErrorPage'
import LoadingPage from './LoadingPage'

enum FriendshipStatus {
  FRIENDS = 'friends',
  NOT_FRIENDS = 'notFriends',
  REQUEST_SENT = 'requestSent',
  REQUEST_RECEIVED = 'requestReceived',
  UNSET = 'unset',
}

function ProfilePage() {
  const { user } = useAuth()
  const { userId } = useParams()
  const queryClient = useQueryClient()
  const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>(
    FriendshipStatus.UNSET
  )

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: userError,
    isFetched: isProfileFetched,
  } = useQuery<User>(['profile', userId], () => usersAPI.getUser(userId!))

  const { data: timeline, isLoading: isTimelineLoading } = useQuery<Post[]>(
    ['timeline', userId],
    () => postsAPI.getTimeline(userId!, 0, 100)
  )

  const requestFriendMutation = useMutation(
    () => usersAPI.requestFriend(userId!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile')
        setFriendshipStatus(FriendshipStatus.REQUEST_SENT)
      },
    }
  )

  const acceptFriendMutation = useMutation(
    () => usersAPI.acceptFriend(userId!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile')
        setFriendshipStatus(FriendshipStatus.FRIENDS)
      },
    }
  )

  const rejectFriendMutation = useMutation(
    () => usersAPI.rejectFriend(userId!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile')
        setFriendshipStatus(FriendshipStatus.NOT_FRIENDS)
      },
    }
  )

  const removeFriendMutation = useMutation(
    () => usersAPI.removeFriend(userId!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile')
        setFriendshipStatus(FriendshipStatus.NOT_FRIENDS)
      },
    }
  )

  const checkInitialFriendship = (currentUser: User, profileUser: User) => {
    if (currentUser.friends.find((friend) => friend.id === profileUser.id))
      return FriendshipStatus.FRIENDS

    if (
      currentUser.friendRequests.find(
        (friendRequest) => friendRequest.id === profileUser.id
      )
    )
      return FriendshipStatus.REQUEST_RECEIVED

    if (
      profileUser.friendRequests.find(
        (friendRequest) => friendRequest.id === currentUser.id
      )
    )
      return FriendshipStatus.REQUEST_SENT

    return FriendshipStatus.NOT_FRIENDS
  }

  if (isProfileFetched && friendshipStatus === FriendshipStatus.UNSET) {
    setFriendshipStatus(checkInitialFriendship(user, profile!))
  }

  if (userError) return <ErrorPage />
  if (isProfileLoading || isTimelineLoading || !profile || !timeline)
    return <LoadingPage />

  return (
    <>
      <Box pb={4} bg="white" shadow="base">
        <Box maxW="1250px" m="auto">
          <Image
            w="100%"
            h={{ base: '250px', lg: '350px', xl: '500px' }}
            m="auto"
            borderRadius="lg"
            fallbackSrc="https://via.placeholder.com/2000/eee/eee?Text=qwerty"
          />
          <Flex
            justify={{ base: 'flex-start', lg: 'space-between' }}
            direction={{ base: 'column', lg: 'row' }}
          >
            <Flex
              align="center"
              direction={{ base: 'column', lg: 'row' }}
              mt={{ base: '-88px', lg: '-40px' }}
              px={6}
            >
              <Avatar
                size="176px"
                border="4px solid white"
                src={profile.image}
              />
              <Box
                ml={{ base: 0, lg: 4 }}
                textAlign={{ base: 'center', lg: 'left' }}
              >
                <Text
                  fontSize="32px"
                  fontWeight="bold"
                >{`${profile.firstName} ${profile.lastName}`}</Text>
                <Text color="gray.500" fontSize="16px" fontWeight="semibold">
                  {`${profile.friends.length} friends`}
                </Text>
              </Box>
            </Flex>
            <Flex align="flex-end" justify="center" gap={2} mt={4} px={6}>
              {user.id === userId ? (
                <EditProfile />
              ) : (
                <>
                  {friendshipStatus === FriendshipStatus.NOT_FRIENDS && (
                    <Button
                      colorScheme="messenger"
                      leftIcon={<FaUserPlus />}
                      onClick={() => requestFriendMutation.mutate()}
                    >
                      Add friend
                    </Button>
                  )}
                  {friendshipStatus === FriendshipStatus.FRIENDS && (
                    <Button
                      leftIcon={<FaUserMinus />}
                      onClick={() => removeFriendMutation.mutate()}
                      variant="gray"
                    >
                      Unfriend
                    </Button>
                  )}
                  {friendshipStatus === FriendshipStatus.REQUEST_RECEIVED && (
                    <>
                      <Button
                        colorScheme="whatsapp"
                        leftIcon={<FaUserPlus />}
                        onClick={() => acceptFriendMutation.mutate()}
                      >
                        Accept invitation
                      </Button>
                      <Button
                        colorScheme="red"
                        leftIcon={<FaUserMinus />}
                        onClick={() => rejectFriendMutation.mutate()}
                      >
                        Reject invitation
                      </Button>
                    </>
                  )}
                  {friendshipStatus === FriendshipStatus.REQUEST_SENT && (
                    <Button
                      colorScheme="messenger"
                      disabled
                      leftIcon={<FaCheck />}
                    >
                      Invitation sent
                    </Button>
                  )}

                  <Button leftIcon={<FaFacebookMessenger />} variant="gray">
                    Message
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Flex
        align={{ base: 'stretch', lg: 'flex-start' }}
        direction={{ base: 'column', lg: 'row' }}
        gap={4}
        maxW="1250px"
        m="auto"
        p={4}
      >
        <Flex
          direction="column"
          p={4}
          pt={3}
          bg="white"
          borderRadius="md"
          shadow="base"
        >
          <Text fontSize="20px" fontWeight="bold">
            Friends
          </Text>
          <Text
            color="gray.500"
            fontSize="17px"
          >{`${profile.friends.length} friends`}</Text>
          <Grid
            gap={4}
            templateColumns="repeat(3, 1fr)"
            w={{ base: 'none', lg: '490px' }}
            mt={3}
          >
            {profile.friends.map((friend) => (
              <GridItem key={friend.id}>
                <Link to={`/profile/${friend.id}`}>
                  <Image
                    borderRadius="lg"
                    _hover={{ cursor: 'pointer', filter: 'brightness(0.9)' }}
                    fallbackSrc="https://i.pravatar.cc/"
                    src=""
                  />
                </Link>
                <Link to={`/profile/${friend.id}`}>
                  <Text
                    mt={1}
                    fontSize="13px"
                    fontWeight="semibold"
                    _hover={{ textDecoration: 'underline' }}
                  >{`${profile.firstName} ${profile.lastName}`}</Text>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Flex>
        <Flex direction="column" flex={1} gap={4}>
          <PostList posts={timeline} />
        </Flex>
      </Flex>
    </>
  )
}

export default ProfilePage
