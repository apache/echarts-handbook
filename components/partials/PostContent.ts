export default {
  functional: true,
  props: {
    content: String
  },
  render(h, context) {
    return h({
      template: '<article>' + context.props.content + '</article>'
    })
  }
}
