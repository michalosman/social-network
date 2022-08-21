import { Flex } from '@chakra-ui/react'

import PostItem from './PostItem'

interface PostListProps {
  posts: Post[]
}

function PostList({ posts }: PostListProps) {
  return (
    <Flex direction="column" gap={4}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Flex>
  )
}

export default PostList
