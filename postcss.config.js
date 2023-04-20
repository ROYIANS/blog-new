/*
 * @Author: ROYIANS
 * @Date: 2023/2/8 15:05
 * @Description:
 * @sign:
 * ╦═╗╔═╗╦ ╦╦╔═╗╔╗╔╔═╗
 * ╠╦╝║ ║╚╦╝║╠═╣║║║╚═╗
 * ╩╚═╚═╝ ╩ ╩╩ ╩╝╚╝╚═╝
 */
module.exports = {
  from: undefined,
  plugins: {
    'postcss-import': {
      root: './themes/maple/source/css/'
    },
    tailwindcss: {},
    autoprefixer: {}
  }
}
