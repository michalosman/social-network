import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react'
import { FaFacebookMessenger, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Avatar from '../components/Avatar'
import Post from '../components/Post'
import Settings from '../components/Settings'
import { posts, user, users } from '../utils/data.json'

function ProfilePage() {
  const isOwnProfile = true

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
              <Avatar size="176px" border="4px solid white" src={user.image} />
              <Box
                ml={{ base: 0, lg: 4 }}
                textAlign={{ base: 'center', lg: 'left' }}
              >
                <Text
                  fontSize="32px"
                  fontWeight="bold"
                >{`${user.firstName} ${user.lastName}`}</Text>
                <Text color="gray.500" fontSize="16px" fontWeight="semibold">
                  {`${user.friends.length} friends`}
                </Text>
              </Box>
            </Flex>
            <Flex align="flex-end" justify="center" gap={2} mt={4} px={6}>
              {isOwnProfile && <Settings />}
              {!isOwnProfile && (
                <>
                  <Button colorScheme="messenger" leftIcon={<FaUserPlus />}>
                    Add friend
                  </Button>
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
        align="flex-start"
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
          >{`${user.friends.length} friends`}</Text>
          <Grid
            gap={4}
            templateColumns="repeat(3, 1fr)"
            w={{ base: 'none', lg: '490px' }}
            mt={3}
          >
            {users.map((friend) => (
              <GridItem key={friend.id}>
                <Link to="/profile/1">
                  <Image
                    borderRadius="lg"
                    _hover={{ cursor: 'pointer', filter: 'brightness(0.9)' }}
                    fallbackSrc="https://i.pravatar.cc/"
                    src=""
                  />
                </Link>
                <Link to="/profile/1">
                  <Text
                    mt={1}
                    fontSize="13px"
                    fontWeight="semibold"
                    _hover={{ textDecoration: 'underline' }}
                  >{`${user.firstName} ${user.lastName}`}</Text>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Flex>
        <Flex direction="column" gap={4}>
          {posts.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </Flex>
      </Flex>
    </>
  )
}

export default ProfilePage
