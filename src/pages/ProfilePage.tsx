import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react'
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
import ErrorPage from './ErrorPage'
import LoadingPage from './LoadingPage'

function ProfilePage() {
  const queryClient = useQueryClient()
  const { profileId } = useParams()

  const { data: user } = useQuery<User>('user', usersAPI.getCurrentUser)

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery<User>(['profile', profileId], () => usersAPI.getUser(profileId!))

  const { data: timeline, isLoading: isTimelineLoading } = useQuery<Post[]>(
    ['timeline', profileId],
    () =>
      postsAPI.getTimeline({
        userId: profileId!,
        offset: 0,
        limit: 10,
      })
  )

  const { mutate: requestFriend } = useMutation(
    () => usersAPI.requestFriend(profileId!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        queryClient.invalidateQueries('profile')
      },
    }
  )

  const { mutate: acceptFriend } = useMutation(
    () => usersAPI.acceptFriend(profileId!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        queryClient.invalidateQueries('profile')
      },
    }
  )

  const { mutate: rejectFriend } = useMutation(
    () => usersAPI.rejectFriend(profileId!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        queryClient.invalidateQueries('profile')
      },
    }
  )

  const { mutate: removeFriend } = useMutation(
    () => usersAPI.removeFriend(profileId!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        queryClient.invalidateQueries('profile')
      },
    }
  )

  const checkFriendship = (currentUser: User, otherUser: User) => {
    enum FriendshipStatus {
      FRIENDS = 'friends',
      NOT_FRIENDS = 'notFriends',
      REQUEST_SENT = 'requestSent',
      REQUEST_RECEIVED = 'requestReceived',
    }

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

  if (profileError) return <ErrorPage />
  if (isProfileLoading || isTimelineLoading || !profile || !timeline || !user)
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
              {user.id === profileId ? (
                <EditProfile />
              ) : (
                <>
                  {checkFriendship(user, profile) === 'notFriends' && (
                    <Button
                      colorScheme="messenger"
                      leftIcon={<FaUserPlus />}
                      onClick={() => requestFriend()}
                    >
                      Add friend
                    </Button>
                  )}
                  {checkFriendship(user, profile) === 'friends' && (
                    <Button
                      leftIcon={<FaUserMinus />}
                      onClick={() => removeFriend()}
                      variant="gray"
                    >
                      Unfriend
                    </Button>
                  )}
                  {checkFriendship(user, profile) === 'requestReceived' && (
                    <>
                      <Button
                        colorScheme="whatsapp"
                        leftIcon={<FaUserPlus />}
                        onClick={() => acceptFriend()}
                      >
                        Accept invitation
                      </Button>
                      <Button
                        colorScheme="red"
                        leftIcon={<FaUserMinus />}
                        onClick={() => rejectFriend()}
                      >
                        Reject invitation
                      </Button>
                    </>
                  )}
                  {checkFriendship(user, profile) === 'requestSent' && (
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
