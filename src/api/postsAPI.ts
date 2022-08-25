import axios from 'axios'

import { API_URL } from '../utils/constants'

const api = axios.create({
  baseURL: `${API_URL}/api/posts`,
  withCredentials: true,
})

const createPost = async (createPostData: CreatePostValues): Promise<Post> => {
  const { data } = await api.post('/', createPostData)
  return data
}

const getFeed = async (page: number): Promise<Post[]> => {
  const { data } = await api.get('/feed', {
    params: {
      offset: (page - 1) * 10,
      limit: 10,
    },
  })
  return data
}

const getTimeline = async (timelineData: TimelineValues): Promise<Post[]> => {
  const { userId, page } = timelineData
  const { data } = await api.get(`/timeline/${userId}`, {
    params: {
      offset: (page - 1) * 10,
      limit: 10,
    },
  })
  return data
}

const likePost = async (postId: string): Promise<Post> => {
  const { data } = await api.patch(`/${postId}/like`)
  return data
}

const unlikePost = async (postId: string): Promise<Post> => {
  const { data } = await api.patch(`/${postId}/unlike`)
  return data
}

const postsAPI = { createPost, getFeed, getTimeline, likePost, unlikePost }

export default postsAPI
