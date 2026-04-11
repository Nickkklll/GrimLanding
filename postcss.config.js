export default {
    plugins:{
        'postcss-custom-media':{},
      
    'postcss-media-minmax': {},

    autoprefixer: {},

    'postcss-sort-media-queries': {
      sort: 'mobile-first',
    },

    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: ['.no-rem'],
    },
    }
}