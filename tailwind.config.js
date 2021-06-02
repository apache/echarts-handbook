const colors = require('tailwindcss/colors')

module.exports = {
  jit: true,
  // add '~tailwind.config` alias
  exposeConfig: true,

  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        'blue-gray': colors.blueGray,
        emerald: colors.emerald,
        lime: colors.lime,
        teal: colors.teal,
        'light-blue': colors.lightBlue
      }
    }
  }
}
