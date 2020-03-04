const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  info: state => state.user.info,
  tabs:state => state.user.tabs,
  activePath:state => state.user.activePath,
}
export default getters
