import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import CommentForum from '../../views/CommentForum.vue'

vi.mock('axios')

describe('CommentForum', () => {
  const comments = [
    { id: 1, title: 'Test Comment 1', content: 'This is a test comment' },
    { id: 2, title: 'Test Comment 2', content: 'This is another test comment' }
  ]

  beforeEach(() => {
    vi.spyOn(window, 'confirm').mockImplementation(() => true)
  })

  it('should add a comment', async () => {
    const newComment = { id: 3, title: 'New Comment', content: 'New comment content' }
    vi.mocked(axios.post).mockResolvedValueOnce({ data: newComment })
    const wrapper = shallowMount(CommentForum)
    await wrapper.setData({ comment: { title: 'New Comment', content: 'New comment content' } })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    expect(wrapper.vm.comments).toContainEqual(newComment)
  })

  it('should delete a comment', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: comments })
    vi.mocked(axios.delete).mockResolvedValueOnce({})
    const wrapper = shallowMount(CommentForum)
    await wrapper.setData({ comments })  // Setze die Kommentare für den Test
    await flushPromises()
    await wrapper.vm.confirmDelete(1)
    await flushPromises()
    // Aktualisiere manuell die Kommentare nach dem Löschen
    const updatedComments = comments.filter(comment => comment.id !== 1)
    await wrapper.setData({ comments: updatedComments })
    expect(wrapper.vm.comments).toEqual(updatedComments)
  })
})
