module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'media', //記得要是字串
  theme: {
    extend: {
      colors:{
        'background': '#dde5f4',
      },
      backgroundImage: {
        'logo1': "url('/src/Image/logo1.png')",
        'logo2': "url('/src/Image/logo2.png')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}