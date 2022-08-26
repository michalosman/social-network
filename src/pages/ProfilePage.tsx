import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import {
  FaCheck,
  FaFacebookMessenger,
  FaUserMinus,
  FaUserPlus,
} from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

import defaultAvatar from '../assets/default_avatar.png'
import Avatar from '../components/Avatar'
import EditProfile from '../components/EditProfile'
import Loading from '../components/Loading'
import PostList from '../components/PostList'
import useFriendship from '../hooks/useFriendship'
import useProfile from '../hooks/useProfile'
import useUser from '../hooks/useUser'
import checkFriendship from '../utils/checkFriendship'
import { TEST_USER_ID } from '../utils/constants'
import ErrorPage from './ErrorPage'
import LoadingPage from './LoadingPage'

function ProfilePage() {
  const { user } = useUser()
  const { requestFriend, acceptFriend, rejectFriend, removeFriend } =
    useFriendship()
  const { profileUser, profileUserInfo, timeline, timelineInfo } = useProfile()
  const { ref, inView } = useInView()
  const toast = useToast()

  useEffect(() => {
    if (inView) {
      timelineInfo.fetchNextPage()
    }
  }, [inView])

  if (profileUserInfo.isError) return <ErrorPage />
  if (profileUserInfo.isLoading || timelineInfo.isLoading)
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
                src={profileUser.image}
              />
              <Box
                ml={{ base: 0, lg: 4 }}
                textAlign={{ base: 'center', lg: 'left' }}
              >
                <Text
                  fontSize="32px"
                  fontWeight="bold"
                >{`${profileUser.firstName} ${profileUser.lastName}`}</Text>
                <Text color="gray.500" fontSize="16px" fontWeight="semibold">
                  {`${profileUser.friends.length} friends`}
                </Text>
              </Box>
            </Flex>
            <Flex align="flex-end" justify="center" gap={2} mt={4} px={6}>
              {user.id === profileUser.id ? (
                <EditProfile />
              ) : (
                <>
                  {checkFriendship(user, profileUser) === 'NOT_FRIENDS' && (
                    <Button
                      colorScheme="messenger"
                      leftIcon={<FaUserPlus />}
                      onClick={() => requestFriend(profileUser.id)}
                    >
                      Add friend
                    </Button>
                  )}
                  {checkFriendship(user, profileUser) === 'FRIENDS' && (
                    <Button
                      leftIcon={<FaUserMinus />}
                      onClick={
                        user.id === TEST_USER_ID &&
                        profileUser.firstName === 'Test'
                          ? () =>
                              toast({
                                title: 'Action denied.',
                                description:
                                  'Test user cannot unfriend other test users.',
                                status: 'error',
                                duration: 6000,
                                isClosable: true,
                              })
                          : () => removeFriend(profileUser.id)
                      }
                      variant="gray"
                    >
                      Unfriend
                    </Button>
                  )}
                  {checkFriendship(user, profileUser) ===
                    'REQUEST_RECEIVED' && (
                    <>
                      <Button
                        colorScheme="whatsapp"
                        leftIcon={<FaUserPlus />}
                        onClick={() => acceptFriend(profileUser.id)}
                      >
                        Accept invitation
                      </Button>
                      <Button
                        colorScheme="red"
                        leftIcon={<FaUserMinus />}
                        onClick={() => rejectFriend(profileUser.id)}
                      >
                        Reject invitation
                      </Button>
                    </>
                  )}
                  {checkFriendship(user, profileUser) === 'REQUEST_SENT' && (
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
          >{`${profileUser.friends.length} friends`}</Text>
          <Grid
            gap={4}
            templateColumns="repeat(3, 1fr)"
            w={{ base: 'none', lg: '490px' }}
            mt={3}
          >
            {profileUser.friends.slice(0, 9).map((friend) => (
              <GridItem key={friend.id}>
                <Link to={`/profile/${friend.id}`}>
                  <Image
                    borderRadius="lg"
                    _hover={{ cursor: 'pointer', filter: 'brightness(0.9)' }}
                    fallbackSrc={defaultAvatar}
                    src={friend.image}
                  />
                </Link>
                <Link to={`/profile/${friend.id}`}>
                  <Text
                    mt={1}
                    fontSize="13px"
                    fontWeight="semibold"
                    _hover={{ textDecoration: 'underline' }}
                  >{`${friend.firstName} ${friend.lastName}`}</Text>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Flex>
        <Flex direction="column" flex={1} gap={4}>
          <PostList posts={timeline} />
          {timelineInfo.isFetchingNextPage && timelineInfo.hasNextPage && (
            <Loading />
          )}
          {!timelineInfo.hasNextPage && timeline.length !== 0 && (
            <Text align="center" color="gray.600" fontWeight="semibold">
              No more posts to show
            </Text>
          )}
          <div ref={ref} />
        </Flex>
      </Flex>
    </>
  )
}

export default ProfilePage
