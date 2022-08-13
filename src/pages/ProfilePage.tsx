import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { FaFacebookMessenger, FaUserPlus } from 'react-icons/fa'

import Avatar from '../components/Avatar'
import Post from '../components/Post'
import { posts, user } from '../utils/data.json'

function ProfilePage() {
  return (
    <div>
      <Box pb={4} bg="white" shadow="base">
        <Box maxW="1250px" m="auto">
          <Image
            w="100%"
            h={{ base: '250px', lg: '500px' }}
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
              mt={{ base: '-88px', lg: '-70px' }}
              px={6}
            >
              <Avatar size="176px" border="4px solid white" src={user.image} />
              <Box
                mt={{ base: 0, lg: '60px' }}
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
              <Button colorScheme="messenger" leftIcon={<FaUserPlus />}>
                Add friend
              </Button>
              <Button leftIcon={<FaFacebookMessenger />} variant="gray">
                Message
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Flex direction="column" gap={4} maxW="1250px" m="auto" p={4}>
        {posts.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </Flex>
    </div>
  )
}

export default ProfilePage
