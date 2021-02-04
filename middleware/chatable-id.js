export default async function ({
  store,
  redirect,
  route
}) {
  try {
    const canChat = await store.dispatch('chat/openChat', route.params.chat)

    if (!canChat) {
      throw new Error('Cant manage chat')
    }
  } catch (e) {
    return redirect('/')
  }
}
